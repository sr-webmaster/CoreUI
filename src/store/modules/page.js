export default (initialState = {}) => {
  return {
    namespaced: true,
    state: {
      isLoading: true,
      loadingColor: 'primary',
      loadingHeight: 20,
      ...initialState
    },
    mutations: {
      isLoading (state, value) {
        state.isLoading = value
      }
    },
    actions: {
      setLoading ({ commit }, value) {
        commit('isLoading', value)
      }
    },
    getters: {
      isLoading: state => state.isLoading
    }
  }
}
