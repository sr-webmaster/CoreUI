import { mount } from '@vue/test-utils'
import { FIXTURE_UI_BTNMENU_ITEMS } from '@freshinup/core-ui/tests/__data__/BtnMenu/items'
import Component from '@freshinup/core-ui/src/components/FManageMultiple.vue'

const items = FIXTURE_UI_BTNMENU_ITEMS

describe('Manage Multiple', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toMatchSnapshot()
  })
  it('snapshot with items', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('snapshot with one items', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items: [items[0]]
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
