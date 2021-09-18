import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/core-ui/src/components/FDatePicker'
import VMenu from 'vuetify/lib/components/VMenu'
import * as Stories from './FDatePicker.stories'

describe('FDatePicker', () => {
  describe('Computed', () => {
    describe('dateFormatted', () => {
      test('defaults to standard without format set', () => {
        // Using shallowMount test the computed properties
        const vm = shallowMount(Component, {
          localVue: createLocalVue().localVue,
          propsData: {
            value: '2020-03-01'
          }
        }).vm
        expect(vm.dateFormatted).toEqual('Mar 01, 2020 • 12:00 AM')
      })
    })
  })

  describe('Methods', () => {
    describe('save', () => {
      test('emits input', () => {
        const wrapper = shallowMount(Component, {
          stubs: {
            VMenu
          }
        })
        wrapper.vm.save('2020-03-01')
        expect(wrapper.emitted('input')).toBeTruthy()
        expect(wrapper.emitted('input')).toHaveLength(1)
        expect(wrapper.emitted('input')[0]).toEqual(['2020-03-01'])
      })
    })
  })

  describe('Visuals / Stories', () => {
    test('NoDefaultDateSet', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.NoDefaultDateSet())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('VModel', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.VModel())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('InputOutline', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.InputOutline())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('InputIcons', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.InputIcons())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('InputSolo', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.InputSolo())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('NoTitle', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.NoTitle())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('Immediate', async () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.Immediate())

      expect(wrapper.isVueInstance()).toBe(true)
      await wrapper.vm.$nextTick()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
