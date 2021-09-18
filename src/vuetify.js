import Vuetify from 'vuetify'
import { install as installValidation } from './validation'

export const install = (Vue, options = {}) => {
  if (options.ignoreVuetifyStyles !== true) {
    require('./styles/stylus/main.styl')
  }
  Vue.use(Vuetify, {
    theme: {
      primary: '#f37021',
      'primary-text': '#fff',
      secondary: '#205a80',
      'secondary-text': '#fff',
      accent: '#888888',
      'accent-text': '#ffffff',
      error: '#FF5252',
      'error-text': '#fff',
      info: '#2196F3',
      'info-text': '#fff',
      success: '#4CAF50',
      'success-text': '#fff',
      warning: '#FFC107',
      'warning-text': '#fff',
      // TODO: Remove me (should just be using Primary, secondary, accent... ect.)
      'greyish-brown': '#3e3e3e',
      'new-grey': '#a2a1a1',
      ...options.theme
    },
    options: {
      customProperties: true
    }
  })
  installValidation(Vue)
}
