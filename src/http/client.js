/**
 * Configure and Bind the HTTP Client to Vue
 */
import VueAxios from 'vue-axios'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

export const install = (Vue, options = {}) => {
  if (!options.axios) {
    throw new Error('axios is a required option')
  }
  Vue.use(VueAxios, options.axios)
  Vue.axios.defaults = merge(Vue.axios.defaults, { baseURL: '/api' }, omit(options, 'axios'))
}

export default (Vue, options = {}) => {
  return install(Vue, options)
}
