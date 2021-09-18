import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FDataVisibility.vue'

describe('FDataVisibility', () => {
  let visibleParameters = []
  let parameters = []

  beforeEach(() => {
    visibleParameters = [
      'status',
      'customer_name',
      'age',
      'lead_source',
      'sales_rep'
    ]

    parameters = [
      { name: 'status', label: 'Status' },
      { name: 'acquisition', label: 'Opportunity title' },
      { name: 'customer_name', label: 'Customer name / contact' },
      { name: 'age', label: 'Age' },
      { name: 'lead_source', label: 'Lead source' },
      { name: 'sales_rep', label: 'Sales Rep' },
      { name: 'opportunity_type', label: 'Opportunity type' },
      { name: 'import_date_time', label: 'Import date and time' },
      { name: 'internet_coordinator', label: 'Internet coordinator' },
      { name: 'sales_manager', label: 'Sales manager' },
      { name: 'fi_manager', label: 'F&I manager' },
      { name: 'estimated_budget', label: 'Estimated budget' },
      { name: 'deal_number', label: 'Deal # (when applicable)' }
    ]
  })
  it('inside dialog', async () => {
    const wrapper = mount(Component, {
      propsData: {
        btnColor: 'primary',
        bgColor: 'secondary',
        parameters: parameters,
        visibleParameters: visibleParameters
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('Computed', () => {
    it('width', () => {
      const wrapper = mount(Component, {
        propsData: {
          maxWidthBottomRow: 500,
          parameters,
          visibleParameters
        }
      })
      expect(wrapper.vm.width).toEqual({
        'width': '500px'
      })
    })
  })
  describe('Methods', () => {
    it('clearAll', () => {
      const wrapper = mount(Component, {
        propsData: {
          parameters,
          visibleParameters
        }
      })
      wrapper.vm.clearAll()
      expect(wrapper.vm.visible_parameters).toEqual([])
    })
    it('close', () => {
      const wrapper = mount(Component, {
        propsData: {
          parameters,
          visibleParameters
        }
      })
      wrapper.vm.close()
      expect(wrapper.emitted('close')).toBeTruthy()
    })
    it('save', () => {
      const wrapper = mount(Component, {
        propsData: {
          parameters,
          visibleParameters
        }
      })
      let visPar = [
        'something',
        'testing'
      ]
      wrapper.vm.visible_parameters = visPar
      wrapper.vm.save()
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0][0]).toEqual(visPar)
    })
  })
})
