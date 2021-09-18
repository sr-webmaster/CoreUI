import keys from 'lodash/keys'
import map from 'lodash/map'
import compact from 'lodash/compact'
import reduce from 'lodash/reduce'
import get from 'lodash/get'

export const enabledFields = (state) => {
  const properties = get(state, 'items.data.properties', [])
  return keys(properties)
}

export const readonlyFields = (state) => {
  const properties = get(state, 'items.data.properties', [])
  return compact(
    map(properties, (value, key) => value.readonly ? key : false)
  )
}

export const validationRules = (state) => {
  const properties = get(state, 'items.data.properties', {})
  return reduce(properties, (result, value, key) => {
    result[key] = translateLaravelToVeeValidate(value.rules, key)
    return result
  }, {})
}

export const labels = (state) => {
  const properties = get(state, 'items.data.properties', {})
  return reduce(properties, (result, value, key) => {
    result[key] = value.label
    return result
  }, {})
}

// https://laravel.com/docs/5.8/validation
// http://vee-validate.logaretm.com/v2/guide/rules.html

export const translateLaravelToVeeValidate = (rules, field = null) => {
  const isNumeric = rules.includes('numeric') || rules.includes('integer')
  const isFile = rules.includes('file') || rules.includes('image')
  let result = []

  rules.forEach(rule => {
    let [ruleName, params] = rule.split(':')

    switch (ruleName) {
      case 'after':
      case 'alpha':
      case 'alpha_dash':
      case 'alpha_num':
      case 'before':
      case 'date_format':
      case 'digits':
      case 'email':
      case 'image':
      case 'numeric':
      case 'regex':
      case 'required':
      case 'required_if':
      case 'url':
        result.push(rule)
        break

      case 'integer':
        result.push('numeric')
        break

      case 'ip':
        result.push('ip_or_fqdn')
        break

      case 'between':
        if (isNumeric) {
          result.push(rule)
        } else {
          let [min, max] = params.split(',')
          result.push(['min', min].join(':'))
          result.push(['max', max].join(':'))
        }
        break

      case 'digits_between':
        let [min, max] = params.split(',')
        result.push(['min', min].join(':'))
        result.push(['max', max].join(':'))
        break

      case 'mimes':
        ruleName = 'ext'
        result.push([ruleName, params].join(':'))
        break

      case 'in':
        ruleName = 'included'
        result.push([ruleName, params].join(':'))
        break

      case 'max':
        if (isNumeric) {
          ruleName = 'max_value'
        } else if (isFile) {
          ruleName = 'size'
        }
        result.push([ruleName, params].join(':'))
        break

      case 'min':
        if (isNumeric) {
          ruleName = 'min_value'
        }
        result.push([ruleName, params].join(':'))
        break

      case 'confirmed':
        result.push(`confirmed:${field}_confirmation`)
    }
  })

  return result.join('|')
}
