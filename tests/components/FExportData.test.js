import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../../src/components/FExportData'

describe('Export Data', () => {
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
  })

  describe('Methods', () => {
    test('export emits export event with payload', () => {
      const wrapper = mount(Component, { localVue })

      wrapper.setData({
        opt: 'pdf'
      })

      wrapper.vm.exportData()
      expect(wrapper.emitted().export).toHaveLength(1)
      expect(wrapper.emitted().export[0]).toEqual([{
        opt: 'pdf'
      }])
    })
  })

  describe('Visuals', () => {
    test('Props option', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          option: 'pdf'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('click on export button', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          option: 'pdf'
        }
      })

      expect(wrapper.element).toMatchSnapshot()
      wrapper.find('button').trigger('click.prevent')
      await wrapper.vm.$nextTick()
      // Test radio button
      wrapper.find('input[type="radio"][value="csv"]').element.selected = true
      wrapper.find('input[type="radio"][value="csv"]').trigger('change')
      wrapper.findAll('button').trigger('click')
      expect(wrapper.emitted('close')).toHaveLength(2)
      expect(wrapper.emitted('export')).toHaveLength(1)
      expect(wrapper.emitted().export[0]).toEqual([{
        opt: 'csv'
      }])
    })
  })
})
