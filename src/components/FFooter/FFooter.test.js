import { mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { defaultStory, PrimaryColor, SecondaryColor } from './FFooter.stories'

describe('FFooter', () => {
  describe('Computed', () => {
    // None
  })

  describe('Methods', () => {
    // None
  })

  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(defaultStory(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.find('.v-footer').classes()).toContain('accent')
      expect(wrapper.element).toMatchSnapshot()
    })

    test('footColor property (primary)', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(PrimaryColor(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.find('.v-footer').classes()).toContain('primary')
      expect(wrapper.element).toMatchSnapshot()
    })

    test('footColor property (secondary)', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(SecondaryColor(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.find('.v-footer').classes()).toContain('secondary')
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
