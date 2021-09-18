import VeeValidate, { Validator } from 'vee-validate'
import { install as installRules } from './installRules'

export const install = (Vue) => {
  installRules(Validator)
  Vue.use(VeeValidate)
}
