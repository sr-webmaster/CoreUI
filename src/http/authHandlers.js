import get from 'lodash/get'
import has from 'lodash/has'
export const on401 = (context) => {
  if (context.$store) {
    context.$store.dispatch('logout')
  }
  if (context.$router && (!context.$route.meta || context.$route.meta.auth !== false)) {
    context.$router.push({ name: 'auth' })
  }
}

export const on403 = (context, error) => {
  if (has(error.response.data, 'redirect')) {
    context.$router.push({ name: error.response.data.redirect })
  }
  context.$store.dispatch('generalErrorMessages/setErrors', get(error, 'response.data.message', 'Not Permitted'))
}

export const addInterceptor = (vueInstance, options = { on401, on403 }) => {
  vueInstance.$http.interceptors.response.use(undefined, error => {
    return new Promise((resolve, reject) => {
      if (error.response.status === 401 && !get(error, 'config.__isRetryRequest', null)) {
        options.on401(vueInstance, error)
      } else if (error.response.status === 403) {
        options.on403(vueInstance, error)
      }
      reject(error)
    })
  })
}
