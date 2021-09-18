import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import capitalize from 'lodash/capitalize'

export default (fields = [], model = { prop: 'value', event: 'input' }) => {
  const result = {}
  fields.forEach((field) => {
    result[field] = {
      get () { return get(this[model.prop], field) },
      set (val) {
        const currentValue = get(this[model.prop], field)
        const emittingMethod = this['emit' + capitalize(model.event)]
        if (!isEqual(val, currentValue) && emittingMethod) {
          emittingMethod({ [field]: val })
        }
      }
    }
  })
  return result
}
