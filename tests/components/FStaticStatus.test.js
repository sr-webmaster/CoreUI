import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FStaticStatus.vue'

describe('FStaticStatus', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('snapshot with value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 'inactive'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('snapshot with custom statuses', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 1,
        statuses: [
          { id: 1, name: 'Draft', color: 'accent' },
          { id: 2, name: 'Pending', color: 'warning' },
          { id: 3, name: 'Confirmed', color: 'success' },
          { id: 4, name: 'Past', color: 'secondary' },
          { id: 5, name: 'Cancelled', color: 'accent' }
        ]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('null activeItem on unmatched value', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 'willNotBeMatched'
      }
    })
    expect(wrapper.vm).toHaveProperty('activeItem', null)
  })
  it('computed label', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 'inactive'
      }
    })
    expect(wrapper.vm).toHaveProperty('label', 'Inactive')
  })
  it('computed label by name from passed in statuses', async () => {
    const wrapper = mount(Component, {
      propsData: {
        value: 3,
        statuses: [
          { id: 1, name: 'Draft', color: 'accent' },
          { id: 2, name: 'Pending', color: 'warning' },
          { id: 3, name: 'Confirmed', color: 'success' },
          { id: 4, name: 'Past', color: 'secondary' },
          { id: 5, name: 'Cancelled', color: 'accent' }
        ]
      }
    })
    expect(wrapper.vm).toHaveProperty('label', 'Confirmed')
  })
})
