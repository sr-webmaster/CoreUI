import { FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import { mount, shallowMount } from '@vue/test-utils'
import { createStoreFromProviders } from '@freshinup/core-ui/src/App'
import Provider from '@freshinup/core-ui/src/Provider'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FNotificationMenu'
import { defaultStory } from './FNotificationMenu.stories'

describe('FNotificationMenu', () => {
  describe('Computed', () => {
    // None
  })

  describe('Methods', () => {
    let localVue, mock
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      mock = vue.mock
    })
    afterEach(() => {
      mock.restore()
    })
    describe('fetchNotifications()', () => {
      test('interval (default) will fetch notifications', () => {
        mock
          .onGet('api/currentUser').reply(200, FIXTURE_USER)
          .onAny()
          .reply(config => {
            console.warn('No mock match for ' + config.url, config)
            return [404, {}]
          })
        const store = createStoreFromProviders([ Provider() ], {
          currentUser: FIXTURE_USER
        })
        store.dispatch = jest.fn()
        const wrapper = shallowMount(Component, {
          localVue,
          store
        })
        const result = wrapper.vm.fetchNotifications()
        expect(result).toBeUndefined()
        expect(store.dispatch).toHaveBeenCalledWith('userNotifications/getItems', {
          params: {
            userId: 1
          }
        })
      })
      test('interval set to falsey will not fetch notifications', () => {
        mock
          .onGet('api/currentUser').reply(200, FIXTURE_USER)
          .onAny()
          .reply(config => {
            console.warn('No mock match for ' + config.url, config)
            return [404, {}]
          })
        const store = createStoreFromProviders([ Provider() ], {
          currentUser: FIXTURE_USER
        })
        store.dispatch = jest.fn()
        const wrapper = shallowMount(Component, {
          propsData: {
            interval: 0
          },
          localVue,
          store
        })
        const result = wrapper.vm.fetchNotifications()
        expect(result).not.toBeUndefined()
        expect(result).toEqual('cannot fetch')
        expect(store.dispatch).not.toHaveBeenCalledWith('userNotifications/getItems')
      })
    })
  })

  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(defaultStory(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})

describe('NavigationMenu', () => {

})
