import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FNavTitle.vue'

describe('FNavTile', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('snapshot with color', async () => {
    const wrapper = mount(Component, {
      propsData: {
        color: 'info',
        value: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
