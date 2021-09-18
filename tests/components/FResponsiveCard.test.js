import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FResponsiveCard.vue'

describe('FResponsiveCard', () => {
  it('snapshot desktop', async () => {
    const wrapper = mount(Component, {
      propsData: {
        cardClass: 'test-class'
      },
      mocks: {
        $vuetify: { breakpoint: { xsOnly: false } }
      },
      slots: {
        default: '<div class="slot" />'
      }
    })

    expect(wrapper.find('.v-card').classes()).toContain('test-class')
    expect(wrapper.find('.slot').exists()).toBe(true)
    expect(wrapper.find('.v-expansion-panel').exists()).toBe(false)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('snapshot mobile', async () => {
    const wrapper = mount(Component, {
      propsData: {
        cardClass: 'test-class',
        title: 'Test Title'
      },
      mocks: {
        $vuetify: { breakpoint: { xsOnly: true } }
      },
      slots: {
        default: '<div class="slot" />'
      }
    })

    expect(wrapper.find('.v-expansion-panel__header').text()).toContain('Test Title')
    expect(wrapper.find('.v-card').classes()).toContain('test-class')
    expect(wrapper.find('.slot').exists()).toBe(true)
    expect(wrapper.find('.v-expansion-panel').exists()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })
})
