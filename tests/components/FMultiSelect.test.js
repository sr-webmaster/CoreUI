import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import { clear } from 'jest-date-mock'
import map from 'lodash/map'
import Component from '@freshinup/core-ui/src/components/FMultiSelect.vue'

const FIXTURE_STATUSES = [
  { id: 1, name: 'Draft' },
  { id: 2, name: 'Pending' },
  { id: 3, name: 'Confirmed' },
  { id: 4, name: 'Past' },
  { id: 5, name: 'Cancelled' }
]

const allSelected = FIXTURE_STATUSES.map(item => item.id)

describe('FMultiSelect', () => {
  // Component instance "under test"
  let localVue
  describe('Snapshots', () => {
    test('defaults', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          value: [],
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    beforeEach(() => {
      localVue = createLocalVue()
      clear()
    })

    test('toggle function select all', async () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: [],
          items: FIXTURE_STATUSES
        }
      })
      wrapper.vm.toggle()
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted()['input']).toBeTruthy()
      expect(wrapper.emitted()['input'][0][0]).toEqual(map(FIXTURE_STATUSES, 'id'))
    })

    test('toggle function clear all', async () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: allSelected,
          items: FIXTURE_STATUSES
        }
      })
      wrapper.vm.toggle()
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted()['input']).toBeTruthy()
      expect(wrapper.emitted()['input'][0][0]).toEqual([])
    })
  })

  describe('Computed', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('selectAll', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: allSelected,
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.vm.selectAll).toBeTruthy()
      expect(wrapper.vm.selectSome).toBeFalsy()
    })
    test('selectSome', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: [ 1, 2 ],
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.vm.selectAll).toBeFalsy()
      expect(wrapper.vm.selectSome).toBeTruthy()
    })
    test('icon for no select', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: [],
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.vm.icon).toBe('far fa-square')
    })
    test('icon for some select', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: [ 1, 2 ],
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.vm.icon).toBe('fa-minus-square')
    })
    test('icon for select all', () => {
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          value: allSelected,
          items: FIXTURE_STATUSES
        }
      })
      expect(wrapper.vm.icon).toBe('fa-check-square')
    })
  })
})
