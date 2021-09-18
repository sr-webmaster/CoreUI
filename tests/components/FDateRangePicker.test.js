import { createLocalVue, mount } from '@vue/test-utils'
import Component from '~/components/FDateRangePicker.vue'

describe('FDateRangePicker', () => {
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
})
