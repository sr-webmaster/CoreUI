import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Component from '~/components/FClearButton.vue'

describe('FClearButton', () => {
  // Component instance "under test"
  let localVue
  describe('Snapshots', () => {
    test('defaults', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Methods', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('clickButton() emits clear', () => {
      const wrapper = shallowMount(Component)
      wrapper.vm.clickButton()
      expect(wrapper.emitted().clear).toBeTruthy()
    })
  })
})
