import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FNavigationDrawerList'

const items = [
  { title: 'Users', to: { path: '/admin/users' }, action: 'far fa-user' },
  { title: 'Teams', to: { path: '/admin/teams' } },
  { title: 'Companies', to: { path: '/admin/companies' } }
]

describe('FNavigationDrawerList', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.v-list .v-list__tile__action').exists()).toBe(true)
  })
  it('snapshot no actions', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items,
        noActions: true
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.v-list .v-list__tile__action').exists()).toBe(false)
  })
})

describe('ColoredFNavigationDrawerList', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items,
        backgroundActiveColor: 'red',
        foregroundActiveColor: 'white'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.v-list .v-list__tile__action').exists()).toBe(true)
  })

  it('snapshot no actions', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items,
        noActions: true,
        backgroundActiveColor: 'red',
        foregroundActiveColor: 'white'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.v-list .v-list__tile__action').exists()).toBe(false)
  })

  it('has colored active menu item', async () => {
    const wrapper = mount(Component, {
      propsData: {
        items,
        backgroundActiveColor: 'red',
        foregroundActiveColor: 'white'
      }
    })
    expect(wrapper.props().backgroundActiveColor).toBe('red')
    expect(wrapper.props().foregroundActiveColor).toBe('white')
  })
})
