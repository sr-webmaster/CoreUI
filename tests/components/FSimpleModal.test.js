import { mount } from '@vue/test-utils'
import Component from '../../src/components/FSimpleModal.vue'

describe('SimpleModal', () => {
  const item = {
    title: 'Thank you for your request',
    text: 'Please stand by for admin validation'
  }
  it('snapshot default', async () => {
    const wrapper = mount(Component, {
      propsData: {
        title: item.title,
        text: item.text
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toContain(item.title)
  })
  test('click on close button', async () => {
    const wrapper = mount(Component)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().ok).toHaveLength(1)
  })
})
