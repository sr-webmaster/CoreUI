import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FFilterLabel'
import { defaultStory, alternativeColor } from './FFilterLabel.stories'

describe('FFilterLabel', () => {
  describe('Computed', () => {
    // Using shallowMount test the computed properties
    const vm = shallowMount(Component).vm
    expect(vm.color).toEqual('white')
  })

  describe('Visuals', () => {
    test('defaults', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(defaultStory(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
    test('alternative colors', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(alternativeColor(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
