import { mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { WithTitleAndContent, NoTitle, ExpandFalse } from './FExpansionPanel.stories'

describe('FExpansionPanel', () => {
  describe('Computed', () => {
    // Using shallowMount test the computed properties
  })

  describe('Methods', () => {
    // Using shallowMount test the methods
  })

  describe('Visuals', () => {
    test('WithTitleAndContent', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(WithTitleAndContent(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
    test('NoTitle', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(NoTitle(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
    test('ExpandFalse', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(ExpandFalse(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
