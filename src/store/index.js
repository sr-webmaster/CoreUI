import Vuex from 'vuex'
import get from 'lodash/get'
import page from './modules/page'
import generalErrorMessages from './modules/generalErrorMessages'
import generalMessage from './modules/generalMessage'
import Vue from 'vue'

export const install = (Vue) => {
  Vue.use(Vuex)
}

install(Vue)

/**
 * Wondering if we should have a method called getStoreShape
 * @param initialState
 * @param options
 * @returns {*}
 */
export const createStore = (initialState = {}, options = {}) => {
  const modules = options.modules || {}
  return new Vuex.Store({
    modules: {
      page: page(initialState.page),
      generalErrorMessages: generalErrorMessages(initialState.generalErrorMessages),
      generalMessage: generalMessage(initialState.generalMessage),
      ...modules
    },
    state: {
      status: '',
      token: localStorage.getItem('token') || '', // auth module
      env: initialState.env,
      registrationType: initialState.registrationType,
      loginSuccessRedirectPath: initialState.loginSuccessRedirectPath
    },
    mutations: {
      logout (state) {
        state.status = ''
        state.token = ''
      }
    },
    actions: {
      logout ({ commit }) {
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          if (options.axios) {
            delete options.axios.defaults.headers.common['Authorization']
          }
          resolve()
        })
      }
    },
    getters: {
      loginSuccessRedirectPath: state => (state.loginSuccessRedirectPath || '/'),
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      // John thinks this should belong to/on the currentUser module
      currentUser: state => get(state, 'currentUser.data', {})
    }
  })
}

export default createStore
