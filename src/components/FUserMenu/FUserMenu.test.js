import Component from '@freshinup/core-ui/src/components/FUserMenu'
import { FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import { mount } from '@vue/test-utils'

describe('UserMenu', () => {
  describe('Snapshots', () => {
    test('default', async () => {
      const wrapper = mount(Component, {
        propsData: {
          user: FIXTURE_USER,
          userIsAdmin: true
        }
      })
      expect(wrapper.find('.f-userMenu__userLevel').exists()).toBe(true)
      expect(wrapper.text()).toContain('Switch to Admin View')
      expect(wrapper.element).toMatchSnapshot()
    })

    test('consumerView false', async () => {
      const wrapper = mount(Component, {
        propsData: {
          user: FIXTURE_USER,
          userIsAdmin: true,
          consumerView: false
        }
      })
      expect(wrapper.text()).not.toContain('Switch to Admin View')
      expect(wrapper.element).toMatchSnapshot()
    })

    test('hideLevel true', async () => {
      const wrapper = mount(Component, {
        propsData: {
          user: FIXTURE_USER,
          userIsAdmin: true,
          hideLevel: true
        }
      })
      expect(wrapper.find('.f-userMenu__userLevel').exists()).toBe(false)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('userField email', async () => {
      const wrapper = mount(Component, {
        propsData: {
          user: FIXTURE_USER,
          userIsAdmin: true,
          userField: 'email'
        }
      })
      expect(wrapper.text()).toContain(FIXTURE_USER.email)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Visuals', () => {
    test('displays "Switch to Admin View" when not on /admin and user is Admin', () => {
      const wrapper = mount(Component, {
        propsData: {
          userIsAdmin: true,
          user: FIXTURE_USER
        },
        mocks: {
          $route: {
            path: '/users/4'
          }
        }
      })
      expect(wrapper.text()).toContain('Switch to Admin View')
      expect(wrapper.text()).not.toContain('Switch to User View')
    })
    test('displays "Switch to User View" when on /admin and user is Admin', () => {
      const wrapper = mount(Component, {
        propsData: {
          userIsAdmin: true,
          user: FIXTURE_USER
        },
        mocks: {
          $route: {
            path: '/admin/users'
          }
        }
      })
      expect(wrapper.text()).toContain('Switch to User View')
      expect(wrapper.text()).not.toContain('Switch to Admin View')
    })
    test('does not display "Switch to Admin View" when not on /admin and user is not Admin', () => {
      const wrapper = mount(Component, {
        propsData: {
          userIsAdmin: false,
          user: FIXTURE_USER
        },
        mocks: {
          $route: {
            path: '/users/4'
          }
        }
      })
      expect(wrapper.text()).not.toContain('Switch to User View')
      expect(wrapper.text()).not.toContain('Switch to Admin View')
    })
  })
})
