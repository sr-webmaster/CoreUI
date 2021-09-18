import { updateField, getField } from 'vuex-map-fields'

export default (initialState = {}) => ({
  namespaced: true,
  state: {
    title: 'FreshPlatform',
    logo: 'https://freshinup.com/wp-content/uploads/2018/08/logo_Freshinup_final-1.png',
    headerImage: null,
    footerColor: 'accent',
    items: [
      {
        action: 'dashboard',
        title: 'Dashboard',
        items: [
          { title: 'Home', to: { name: 'admin' } }
        ]
      },
      {
        action: 'supervised_user_circle',
        title: 'Base User',
        active: false,
        items: [
          { title: 'Users', to: { path: '/admin/users' } },
          { title: 'Teams', to: { path: '/admin/teams' } },
          { title: 'Companies', to: { path: '/admin/companies' } }
        ]
      },
      {
        action: 'settings',
        title: 'Platform Settings',
        active: false,
        items: [
          { title: 'Terms', to: { name: 'admin-terms' } }
        ]
      }
    ],
    isDrawerOpen: true,
    hideIcons: false,
    breadcrumbs: [],
    ...initialState
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
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
