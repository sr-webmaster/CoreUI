import Vapi from 'vuex-rest-api'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

export default (initialState = {}) => {
  const api = new Vapi(
    {
      baseURL: '/api',
      state: {
        data: initialState
      }
    })
    .get({
      action: 'getCurrentUser',
      property: 'data',
      path: '/currentUser',
      queryParams: true
    })
  const store = api.getStore({ namespaced: true })
  store.actions = {
    ...store.actions,
    logout ({ dispatch, state }, payload = {}) {
      console.warn('Authentication should be using the documented approach not this hack')
      payload.$auth.logout({
        redirect: '/auth'
      })
    }
  }
  store.getters = {
    ...store.getters,
    isAdmin (state) {
      return get(state, 'data.has_admin_access', false)
    },
    isAuthenticated (state) {
      return !isEmpty(state.data)
    }
  }
  return store
}
