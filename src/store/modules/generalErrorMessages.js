import get from 'lodash/get'
import isString from 'lodash/isString'
import reduce from 'lodash/reduce'
import { getField, updateField } from 'vuex-map-fields'

export default (initialState = {}) => {
  return {
    namespaced: true,
    state: {
      isVisible: false,
      errors: [],
      ...initialState
    },
    getters: {
      getField,
      hasErrors (state) {
        return get(state, 'errors', []).length > 0
      },
      errorMessages (state) {
        return reduce(state.errors, (result, value, key) => {
          return result + value + ' '
        }, '')
      }
    },
    actions: {
      setErrors ({ commit }, errors) {
        if (isString(errors)) {
          commit('errors', [errors])
        } else if (errors && errors.hasOwnProperty('errors')) {
          commit('errors', errors.errors)
        } else if (Array.isArray(errors)) {
          commit('errors', errors)
        } else {
          commit('errors', ['Unhandled System Error'])
        }

        commit('isVisible', true)
      },
      setVisibility ({ commit }, value) {
        commit('isVisible', value)
      }
    },
    mutations: {
      updateField,
      errors (state, value) {
        state.errors = value
      },
      isVisible (state, value) {
        state.isVisible = value
      }
    }
  }
}
