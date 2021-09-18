import { mount } from '@vue/test-utils'
import Component from '../../src/components/FSimpleConfirm.vue'

describe('SimpleConfirm', () => {
  it('snapshot default', async () => {
    const item = {
      title: 'Are you hungry?',
      text: 'Please tell us if you would like a nice hot bowl of mulligatawny soup.  It would really hit the spot!'
    }
    const wrapper = mount(Component, {
      propsData: {
        title: item.title,
        text: item.text
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toContain(item.title)
    expect(wrapper.text()).toContain(item.text)
  })
  test('click on close button', async () => {
    const wrapper = mount(Component)
    wrapper.findAll('button').trigger('click')
    expect(wrapper.emitted().cancel).toHaveLength(1)
    expect(wrapper.emitted().ok).toHaveLength(1)
  })
})
