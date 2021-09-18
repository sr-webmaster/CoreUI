import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FCalendarEventsList'
import { WithEvents } from './FCalendarEventsList.stories'

describe('FCalendarEventsList', () => {
  describe('Methods', () => {
    // Using shallowMount test the methods
    const event = { name: 'test event' }
    const wrapper = shallowMount(Component)
    const vm = wrapper.vm
    vm.editItem(event)
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')).toEqual([
      [{ name: event.name }]
    ])
    vm.deleteItem(event)
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')).toEqual([
      [{ name: event.name }]
    ])
  })

  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(WithEvents(), {
        localVue: createLocalVue().vue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
