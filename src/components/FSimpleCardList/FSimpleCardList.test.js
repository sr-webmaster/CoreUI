import { mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { FourItems } from './FSimpleCardList.stories'

describe('FSimpleCardList', () => {
  describe('Computed', () => {
    // Using shallowMount test the computed properties
  })

  describe('Methods', () => {
    // Using shallowMount test the methods
  })

  describe('Visuals', () => {
    test('Items', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(FourItems(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.findAll('.v-card')).toHaveLength(4)
      expect(wrapper.text()).toContain('TOTAL OPPORTUNITIES')
      expect(wrapper.text()).toContain('% IN PROGRESS')
      expect(wrapper.text()).toContain('% CLOSED WON')
      expect(wrapper.text()).toContain('% CLOSED LOST')
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
