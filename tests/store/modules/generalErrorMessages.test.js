import StoreModule from '@/store/modules/generalErrorMessages'

describe('generalErrorMessages Vuex Module', () => {
  describe('getters', () => {
    it('hasErrors returns true when errors are set', () => {
      const store = StoreModule()
      expect(store.getters).toHaveProperty('hasErrors')
      expect(store.getters.hasErrors({
        errors: ['invalid']
      })).toBe(true)
    })
    it('errorMessages returns a string of the errors array', () => {
      const store = StoreModule()
      expect(store.getters).toHaveProperty('errorMessages')
      expect(store.getters.errorMessages({})).toEqual('')
      expect(store.getters.errorMessages({
        errors: ['invalid']
      })).toEqual('invalid ')
      expect(store.getters.errorMessages({
        errors: ['invalid', 'validation failed for name']
      })).toEqual('invalid validation failed for name ')
    })
  })
  describe('actions', () => {
    describe('setErrors', () => {
      test('commits isVisible with true and errors for null and undefined error', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setErrors({ commit })
        expect(commit).toHaveBeenNthCalledWith(1, 'errors', ['Unhandled System Error'])
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', true)
      })
      test('commits isVisible with true and errors for array', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setErrors({ commit }, ['invalid fields'])
        expect(commit).toHaveBeenNthCalledWith(1, 'errors', ['invalid fields'])
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', true)
      })
      test('commits isVisible with true and errors for string', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setErrors({ commit }, 'invalid fields')
        expect(commit).toHaveBeenNthCalledWith(1, 'errors', ['invalid fields'])
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', true)
      })
      test('commits isVisible with true and errors for object with errors', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setErrors({ commit }, { errors: ['invalid fields'] })
        expect(commit).toHaveBeenNthCalledWith(1, 'errors', ['invalid fields'])
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', true)
      })
    })
    describe('setVisibility', () => {
      test('commits what is provided', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setVisibility({ commit }, true)
        actions.setVisibility({ commit }, false)
        expect(commit).toHaveBeenNthCalledWith(1, 'isVisible', true)
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', false)
      })
    })
  })
})
