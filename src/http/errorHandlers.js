import get from 'lodash/get'
import includes from 'lodash/includes'

export const onValidationError = (context, error) => {
  if (context.$store) {
    context.$store.dispatch('generalErrorMessages/setErrors', get(error, 'response.data', null))
  }
}
export const onSystemError = (context) => {
  if (context.$store) {
    context.$store.dispatch('generalErrorMessages/setErrors', ['System Errors'])
  }
}

export const onNonRetryError = (context, error, options = { onValidationError, onSystemError }) => {
  if (!get(error, 'config.__isRetryRequest', null)) {
    if (includes([400, 422], error.response.status)) {
      options.onValidationError(context, error)
    } else if (error.response.status >= 500) {
      options.onSystemError(context, error)
    }
  }
}

export const errorInterceptor = (vueInstance, error, options = { onNonRetryError }) => {
  return new Promise((resolve, reject) => {
    if (options.onNonRetryError) options.onNonRetryError(vueInstance)
    else onNonRetryError(vueInstance, error, options)
    reject(error)
  })
}

export const addInterceptor = (vueInstance, options = { onValidationError, onSystemError }) => {
  vueInstance.$http.interceptors.response.use(undefined, error => {
    return errorInterceptor(vueInstance, error, options)
  })
}
