import { mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { defaultStory, dateAsString, withAppendSlotContent } from './FCalendarEvent.stories'

describe('FCalendarEvent', () => {
  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(defaultStory(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('date as string', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(dateAsString(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('with append slot', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(withAppendSlotContent(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
