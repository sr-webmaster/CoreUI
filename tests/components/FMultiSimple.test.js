import { shallowMount, mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FMultiSimple.vue'

export const FIXTURE_TAGS = [
  { uuid: '32423', name: 'Tag 1' },
  { uuid: '930183', name: 'Tag 2' }
]

describe('FMultiSimple', () => {
  // Component instance "under test"
  let localVue, mock
  describe('Snapshots', () => {
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onGet('foodfleet/event-tags').reply(200, { data: FIXTURE_TAGS })
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })

    afterEach(() => {
      mock.restore()
    })

    test('defaults', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          url: 'foodfleet/event-tags',
          termParam: 'filter[name]',
          resultsIdKey: 'uuid'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onGet('foodfleet/event-tags').reply(200, { data: FIXTURE_TAGS })
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })

    afterEach(() => {
      mock.restore()
    })

    test('toggleMenu function chanage showMenu', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          url: 'foodfleet/event-tags',
          termParam: 'filter[name]',
          resultsIdKey: 'uuid'
        }
      })
      wrapper.setData({ showMenu: false })
      wrapper.vm.toggleMenu()
      expect(wrapper.vm.showMenu).toBeTruthy()
    })
  })

  describe('Computed', () => {
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onGet('foodfleet/event-tags').reply(200, { data: FIXTURE_TAGS })
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })

    afterEach(() => {
      mock.restore()
    })

    test('showText', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          url: 'foodfleet/event-tags',
          termParam: 'filter[name]',
          resultsIdKey: 'uuid'
        }
      })
      wrapper.setData({ value: null })
      expect(wrapper.vm.showText).toBeNull()
      wrapper.setData({ value: [] })
      expect(wrapper.vm.showText).toBeNull()
      wrapper.setData({ value: [ { uuid: 1, name: 'mock' } ] })
      expect(wrapper.vm.showText).toBe('mock')
      wrapper.setData({ value: [ { uuid: 1, name: 'mock' }, { uuid: 2, name: 'mock' } ] })
      expect(wrapper.vm.showText).toBe('2 selected')
    })
  })
})
