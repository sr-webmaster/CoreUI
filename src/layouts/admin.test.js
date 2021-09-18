import { shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import createStore from 'tests/createStore'
import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import Component from '@freshinup/core-ui/src/layouts/admin.vue'
import * as Stories from './admin.stories'

describe('Admin layout', () => {
  let localVue, store
  describe('Methods', () => {
    beforeEach(() => {
      const vue = createLocalVue({ validation: true })
      localVue = vue.localVue
      store = createStore({
        page: {
          isLoading: false
        }
      })
    })
    test('signout()', () => {
      const dispatchMock = jest.fn()
      const authMock = jest.fn()
      store.dispatch = dispatchMock
      const wrapper = shallowMount(Component, {
        localVue,
        store,
        mocks: {
          $auth: authMock
        }
      })
      const vm = wrapper.vm
      vm.signout()
      expect(store.dispatch).toHaveBeenCalledWith('currentUser/logout', { $auth: authMock })
    })
  })
  describe('Visuals', () => {
    test('with current user', (done) => {
      const wrapper = mount(Stories.UserWithAvatar(), { pluginRouter: true })
      expect(wrapper.isVueInstance()).toBe(true)
      wrapper.beforeRouteEnterOrUpdate({}, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
    test('Error Message', async (done) => {
      const wrapper = mount(Stories.ErrorMessage(), { pluginRouter: true })
      await wrapper.beforeRouteEnterOrUpdate({}, {}, async () => {
        wrapper.vm.$store.dispatch('generalErrorMessages/setErrors', 'User name must be set before saving')
        wrapper.vm.$store.dispatch('generalErrorMessages/setVisibility', true)
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('User name must be set before saving')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
  })
})
