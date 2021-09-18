import { mount } from '@vue/test-utils'
import { createStoreFromProviders } from '../App'
import Provider from '../Provider'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import Component from '@freshinup/core-ui/src/layouts/admin-edit.vue'

describe('Admin Edit layout', () => {
  let localVue, mock, store
  describe('Visuals', () => {
    beforeEach(async () => {
      store = createStoreFromProviders([ Provider() ], {
        currentUser: FIXTURE_USER,
        page: {
          title: 'Admin Edit template',
          isLoading: false
        },
        userNotifications: {
          fetchInterval: 0
        }
      })
      const vue = createLocalVue({ validation: true })
      localVue = vue.localVue
      mock = vue.mock
        .onGet('api/currentUser').reply(200, FIXTURE_USER)
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })
    afterEach(() => {
      mock.restore()
    })
    test('renders header with color (no image) and return button', (done) => {
      const wrapper = mount(Component, {
        localVue,
        store
      })
      expect(wrapper.isVueInstance()).toBe(true)
      Component.beforeRouteEnterOrUpdate(wrapper.vm, { }, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.f-admin__returnButton').exists()).toBe(true)
        expect(wrapper.find('.f-admin__headerImage').element.style.backgroundImage).not.toEqual('url(header-image.jpg)')
        expect(wrapper.find('.f-admin__headerImage').element.style.backgroundImage).toEqual('')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })

    test('renders header image', (done) => {
      store = createStoreFromProviders([ Provider() ], {
        currentUser: FIXTURE_USER,
        page: {
          title: 'Admin Edit template',
          isLoading: false
        },
        navigationAdmin: {
          headerImage: 'header-image.jpg'
        },
        userNotifications: {
          fetchInterval: 0
        }
      })
      const wrapper = mount(Component, {
        localVue,
        store
      })
      expect(wrapper.isVueInstance()).toBe(true)
      Component.beforeRouteEnterOrUpdate(wrapper.vm, { }, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.f-admin__returnButton').exists()).toBe(true)
        expect(wrapper.find('.f-admin__headerImage').element.style.backgroundImage).toEqual('url(header-image.jpg)')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })

    test('return button clicked triggers router', async (done) => {
      const $router = {
        go: jest.fn()
      }
      const wrapper = mount(Component, {
        localVue,
        store,
        mocks: {
          $router
        }
      })
      expect(wrapper.isVueInstance()).toBe(true)
      Component.beforeRouteEnterOrUpdate(wrapper.vm, { }, null, async () => {
        await wrapper.vm.$nextTick()
        wrapper.find('.f-admin__returnButton').trigger('click')
        expect($router.go).toHaveBeenCalled()
        expect($router.go).toHaveBeenCalledWith(-1)
        done()
      })
    })
  })
})
