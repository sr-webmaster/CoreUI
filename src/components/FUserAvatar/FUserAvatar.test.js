import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FUserAvatar'
import { Initials, NoUser, Image } from './FUserAvatar.stories'

describe('FUserAvatar', () => {
  describe('Computed', () => {
    describe('initials', () => {
      test('returns empty string', () => {
        const wrapper = shallowMount(Component)
        const vm = wrapper.vm
        expect(vm.initials).toEqual('')
        wrapper.setProps({
          user: {}
        })
        expect(vm.initials).toEqual('')
        wrapper.setProps({
          user: {
            first_name: '',
            last_name: ''
          }
        })
        expect(vm.initials).toEqual('')
      })
      test('returns initials of the first and last name', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            user: {
              first_name: 'Tim',
              last_name: 'Baio'
            }
          }
        })
        const vm = wrapper.vm
        expect(vm.initials).toEqual('TB')
      })
    })
    describe('image', () => {
      test('returns empty string', () => {
        const wrapper = shallowMount(Component)
        const vm = wrapper.vm
        expect(vm.image).toEqual('')
        wrapper.setProps({
          user: {}
        })
        expect(vm.image).toEqual('')
        wrapper.setProps({
          user: {
            avatar: ''
          }
        })
        expect(vm.image).toEqual('')
      })
      test('returns avatar image path', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            user: {
              avatar: 'me.jpg'
            }
          }
        })
        const vm = wrapper.vm
        expect(vm.image).toEqual('me.jpg')
      })
    })
    describe('hasImage', () => {
      test('returns false', () => {
        const wrapper = shallowMount(Component)
        const vm = wrapper.vm
        expect(vm.hasImage).toEqual(false)
        wrapper.setProps({
          user: {}
        })
        expect(vm.hasImage).toEqual(false)
        wrapper.setProps({
          user: {
            avatar: ''
          }
        })
        expect(vm.hasImage).toEqual(false)
      })
      test('returns true', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            user: {
              avatar: 'me.jpg'
            }
          }
        })
        const vm = wrapper.vm
        expect(vm.hasImage).toEqual(true)
      })
    })
  })

  describe('Methods', () => {
    // none
  })

  describe('Visuals', () => {
    test('No User', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(NoUser(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('Initials', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Initials(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('Image', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Image(), {
        localVue: createLocalVue().localVue
      })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
