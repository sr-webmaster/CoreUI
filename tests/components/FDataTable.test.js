import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FDataTable.vue'

describe('Data Table', () => {
  describe('visuals', () => {
    it('snapshot default', async () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })

    it('shows header slot when multiple items are selected', async () => {
      const items = [
        { id: 1 },
        { id: 2 }
      ]

      const wrapper = mount(Component, {
        propsData: {
          items,
          headers: [
            { text: 'Id', value: 'id' }
          ]
        },
        scopedSlots: {
          'header-inner-id': '<div class="element-to-find" />'
        }
      })

      expect(wrapper.find('.element-to-find').exists()).toBe(false)
      wrapper.setData({
        selected: items
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.find('.element-to-find').exists()).toBe(true)
    })
  })

  describe('methods', () => {
    it('manage', async () => {
      const wrapper = mount(Component)
      const actionItem = { action: 'test' }
      wrapper.vm.manage(actionItem, 123)
      expect(wrapper.emitted()['manage-test']).toBeTruthy()
      expect(wrapper.emitted()['manage-test'][0]).toEqual([123])
      expect(wrapper.emitted()['manage']).toBeTruthy()
      expect(wrapper.emitted()['manage'][0]).toEqual(['test', 123])
    })
    it('manageMultiple', async () => {
      const wrapper = mount(Component)
      const actionItem = { action: 'test' }
      wrapper.vm.manageMultiple(actionItem, 123)
      expect(wrapper.emitted()['manage-multiple-test']).toBeTruthy()
      expect(wrapper.emitted()['manage-multiple-test'][0]).toEqual([123])
      expect(wrapper.emitted()['manage-multiple']).toBeTruthy()
      expect(wrapper.emitted()['manage-multiple'][0]).toEqual(['test', 123])
    })
  })
})
