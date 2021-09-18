export default (initialState = {}) => ({
  namespaced: true,
  state: {
    title: 'FreshPlatform',

    // Small Screens
    drawerItems: [],

    userMenuItems: [
      { title: 'My Profile', to: { name: 'myprofile' } },
      { title: 'My Teams', to: { name: 'myteams' } },
      { title: 'My Company', to: { name: 'mycompany' } },
      { title: 'My Settings', to: { name: 'settings' } },
      { title: 'My Company Settings', to: { name: '404' } }
    ],

    isConsumerViewAvailable: true,

    hideUserLevel: false,

    displayedUserField: 'title,company_name',

    items: [],

    breadcrumbs: [],

    ...initialState
  },
  mutations: {
    breadcrumbs (state, value) {
      state.breadcrumbs = value
    }
  },
  actions: {
    setBreadcrumbs ({ commit }, value) {
      commit('breadcrumbs', value)
    }
  }
})
