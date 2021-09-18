import { getField, updateField } from 'vuex-map-fields'

export default (initialState = {}) => {
  return {
    namespaced: true,
    state: {
      isVisible: false,
      message: [],
      ...initialState
    },
    getters: {
      getField,
      message (state) {
        return state.message
      }
    },
    actions: {
      setMessage ({ commit }, message) {
        commit('message', message)
        commit('isVisible', true)
      },
      setVisibility ({ commit }, value) {
        commit('isVisible', value)
      }
    },
    mutations: {
      updateField,
      message (state, value) {
        state.message = value
      },
      isVisible (state, value) {
        state.isVisible = value
      }
    }
  }
}
