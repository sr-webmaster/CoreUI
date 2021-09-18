import isEmpty from 'lodash/isEmpty'
import VueAnalytics from 'vue-analytics'
export const install = (Vue, required, options = {}) => {
  const { id, errorMethod, router } = required
  if (isEmpty(id)) {
    errorMethod('Analytics could not be installed. id is required')
    return
  }
  if (isEmpty(router)) {
    errorMethod('Analytics could not be installed. router is required')
    return
  }
  Vue.use(VueAnalytics, {
    id,
    router
  })
}
export default (Vue, id, errorMethod, options = {}) => {
  install(Vue, id, errorMethod, options)
}
