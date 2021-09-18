import { mount, shallowMount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FChipGroupBtn.vue'
import { FIXTURE_UI_FCHIPGROUP_TAGS } from '@freshinup/core-ui/tests/__data__/FChipGroup/tags'

describe('FChipGroupBtn', () => {
  describe('Visuals', () => {
    test('setting required properties', async () => {
      const wrapper = mount(Component, {
        propsData: {
          title: 'Button Title',
          selected: [],
          tags: FIXTURE_UI_FCHIPGROUP_TAGS
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    test('input() emits input with value', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          title: 'Button Title',
          tags: FIXTURE_UI_FCHIPGROUP_TAGS
        }
      })
      wrapper.vm.input('tag 1')
      // assert event has been emitted
      expect(wrapper.emitted('input')).toBeTruthy()
      expect(wrapper.emitted('input')).toHaveLength(1)
      expect(wrapper.emitted('input')[0]).toEqual(['tag 1'])
    })
  })
})
