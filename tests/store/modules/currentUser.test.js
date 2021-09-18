import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import currentUser from '../../../src/store/modules/currentUser'

createLocalVue().use(Vuex)

describe('store/modules/currentUser', () => {
  describe('getter isAdmin', () => {
    it('returns from true when admin', () => {
      const results = currentUser().getters.isAdmin({
        data: {
          has_admin_access: true
        }
      })
      expect(results).toBeTruthy()
    })
    it('returns from false when not admin', () => {
      const results = currentUser().getters.isAdmin({
        data: {
          has_admin_access: false
        }
      })
      expect(results).toBeFalsy()
    })
  })

  describe.skip('getter isAuthenticated', () => {

  })

  describe.skip('actions getCurrentUser', () => {

  })

  describe('actions logout', () => {
    const authMock = jest.fn()
    authMock.logout = jest.fn()
    currentUser().actions.logout({}, { $auth: authMock })
    expect(authMock.logout).toHaveBeenCalled()
  })
})
