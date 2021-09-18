import {
  FIXTURE_USER_PERMISSIONS,
  FIXTURE_USER_PERMISSIONS_DATA_EMPTY,
  FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY
} from '@freshinup/core-ui/tests/__data__/userPermissions'
import {
  enabledFields,
  readonlyFields,
  validationRules,
  labels,
  translateLaravelToVeeValidate
} from '@/store/utils/permissionsHelpers'

describe('permissionsHelpers', () => {
  describe('enabledFields()', () => {
    test('returns empty array if "properties" property is not accessible', () => {
      let invoke = () => { return enabledFields() }
      expect(invoke).not.toThrow()
      expect(enabledFields()).toEqual([])

      invoke = () => { return enabledFields({}) }
      expect(invoke).not.toThrow()
      expect(enabledFields()).toEqual([])

      invoke = () => { return enabledFields(FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY) }
      expect(invoke).not.toThrow()
      expect(enabledFields()).toEqual([])

      invoke = () => { return enabledFields(FIXTURE_USER_PERMISSIONS_DATA_EMPTY) }
      expect(invoke).not.toThrow()
      expect(enabledFields()).toEqual([])
    })
    test('returns expected with full permissions state', () => {
      expect(enabledFields(FIXTURE_USER_PERMISSIONS)).toEqual([
        'status',
        'first_name',
        'last_name',
        'title',
        'industry_roles',
        'email',
        'level',
        'type',
        'office_phone',
        'mobile_phone',
        'street',
        'street_2',
        'city',
        'country_id',
        'post_code',
        'notes'
      ])
    })
  })

  describe('readonlyFields()', () => {
    test('returns empty array if "properties" property is not accessible', () => {
      let invoke = () => { return readonlyFields() }
      expect(invoke).not.toThrow()
      expect(readonlyFields()).toEqual([])

      invoke = () => { return readonlyFields({}) }
      expect(invoke).not.toThrow()
      expect(readonlyFields()).toEqual([])

      invoke = () => { return readonlyFields(FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY) }
      expect(invoke).not.toThrow()
      expect(readonlyFields()).toEqual([])

      invoke = () => { return readonlyFields(FIXTURE_USER_PERMISSIONS_DATA_EMPTY) }
      expect(invoke).not.toThrow()
      expect(readonlyFields()).toEqual([])
    })
    test('returns expected with full permissions state', () => {
      expect(readonlyFields(FIXTURE_USER_PERMISSIONS)).toEqual([
        'title',
        'office_phone',
        'mobile_phone',
        'street',
        'street_2'
      ])
    })
  })

  describe('validationRules()', () => {
    test('returns empty object if "properties" property is not accessible', () => {
      let invoke = () => { return validationRules() }
      expect(invoke).not.toThrow()
      expect(validationRules()).toEqual({})

      invoke = () => { return validationRules({}) }
      expect(invoke).not.toThrow()
      expect(validationRules()).toEqual({})

      invoke = () => { return validationRules(FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY) }
      expect(invoke).not.toThrow()
      expect(validationRules()).toEqual({})

      invoke = () => { return validationRules(FIXTURE_USER_PERMISSIONS_DATA_EMPTY) }
      expect(invoke).not.toThrow()
      expect(validationRules()).toEqual({})
    })
    test('returns expected with full permissions state', () => {
      const result = validationRules(FIXTURE_USER_PERMISSIONS)
      expect(result).toEqual({
        status: 'required',
        first_name: 'required',
        last_name: 'required',
        title: '',
        industry_roles: '',
        email: 'required|email',
        level: 'required',
        type: 'required',
        office_phone: '',
        mobile_phone: '',
        street: '',
        street_2: '',
        city: '',
        country_id: '',
        post_code: '',
        notes: ''
      })
    })
  })

  describe('labels()', () => {
    test('returns empty object if "properties" property is not accessible', () => {
      let invoke = () => { return labels() }
      expect(invoke).not.toThrow()
      expect(labels()).toEqual({})

      invoke = () => { return labels({}) }
      expect(invoke).not.toThrow()
      expect(labels()).toEqual({})

      invoke = () => { return labels(FIXTURE_USER_PERMISSIONS_ITEMS_EMPTY) }
      expect(invoke).not.toThrow()
      expect(labels()).toEqual({})

      invoke = () => { return labels(FIXTURE_USER_PERMISSIONS_DATA_EMPTY) }
      expect(invoke).not.toThrow()
      expect(labels()).toEqual({})
    })
    test('returns expected with full permissions state', () => {
      const result = labels(FIXTURE_USER_PERMISSIONS)
      expect(result).toEqual({
        status: 'Status',
        first_name: 'First Name',
        last_name: 'Last Name',
        title: 'Title',
        industry_roles: 'Industry Roles',
        email: 'Email',
        level: 'BUS Role',
        type: 'User Type',
        office_phone: 'Office Phone',
        mobile_phone: 'Mobile Phone',
        street: 'Street address',
        street_2: 'Street address 2',
        city: 'City',
        country_id: 'Country',
        post_code: 'Post Code',
        notes: 'Notes'
      })
    })
  })

  describe('translateLaravelToVeeValidate', () => {
    test('bypass rules', () => {
      const rules = [
        'after:start_date',
        'alpha',
        'alpha_dash',
        'alpha_num',
        'before:end_date',
        'date_format:dd/MM/yyyy',
        'digits',
        'email',
        'image',
        'numeric',
        'regex:/^.+@.+$/i',
        'required',
        'required_if:country,US,FM',
        'url'
      ]
      const result = translateLaravelToVeeValidate(rules)
      expect(result).toEqual(rules.join('|'))
    })

    test('integer', () => {
      const result = translateLaravelToVeeValidate(['integer'])
      expect(result).toEqual('numeric')
    })

    test('ip', () => {
      const result = translateLaravelToVeeValidate(['ip'])
      expect(result).toEqual('ip_or_fqdn')
    })

    test('between numeric', () => {
      const rules = [
        'numeric',
        'between:1,10'
      ]
      const result = translateLaravelToVeeValidate(rules)
      expect(result).toEqual('numeric|between:1,10')
    })

    test('between non numeric', () => {
      const result = translateLaravelToVeeValidate([
        'between:1,10'
      ])
      expect(result).toEqual('min:1|max:10')
    })

    test('digits_between', () => {
      const result = translateLaravelToVeeValidate([
        'digits_between:1,10'
      ])
      expect(result).toEqual('min:1|max:10')
    })

    test('mimes', () => {
      const result = translateLaravelToVeeValidate(['mimes:jpeg,png'])
      expect(result).toEqual('ext:jpeg,png')
    })

    test('in', () => {
      const result = translateLaravelToVeeValidate(['in:1,2,3'])
      expect(result).toEqual('included:1,2,3')
    })

    test('max numeric', () => {
      const result = translateLaravelToVeeValidate([
        'integer',
        'max:10'
      ])
      expect(result).toEqual('numeric|max_value:10')
    })

    test('max file', () => {
      const result = translateLaravelToVeeValidate([
        'image',
        'max:100'
      ])
      expect(result).toEqual('image|size:100')
    })

    test('max non numeric or file', () => {
      const result = translateLaravelToVeeValidate(['max:10'])
      expect(result).toEqual('max:10')
    })

    test('min numeric', () => {
      const result = translateLaravelToVeeValidate([
        'integer',
        'min:10'
      ])
      expect(result).toEqual('numeric|min_value:10')
    })

    test('min non numeric', () => {
      const result = translateLaravelToVeeValidate(['min:10'])
      expect(result).toEqual('min:10')
    })

    test('confirmed', () => {
      const result = translateLaravelToVeeValidate(['confirmed'], 'password')
      expect(result).toEqual('confirmed:password_confirmation')
    })

    test('validationRules with translation', () => {
      const result = validationRules({
        items: {
          data: {
            properties: {
              one: {
                rules: ['required', 'integer', 'min:10']
              },
              two: {
                rules: ['image', 'mimes:png,jpeg', 'max:1000']
              },
              three: {
                rules: ['required', 'confirmed', 'between:6,10']
              }
            }
          }
        }
      })
      expect(result).toEqual({
        one: 'required|numeric|min_value:10',
        two: 'image|ext:png,jpeg|size:1000',
        three: 'required|confirmed:three_confirmation|min:6|max:10'
      })
    })
  })
})
