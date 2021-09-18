import createLocalVue from '../createLocalVue'
import { mount, shallowMount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FBtnStatus.vue'

const ITEMS_WITH_NUMERIC_ID = [
  {
    id: 1,
    label: 'Active',
    color: 'success'
  },
  {
    id: 2,
    label: 'Inactive',
    color: 'error'
  },
  {
    id: 3,
    label: 'Hold',
    color: 'warning'
  },
  {
    id: 4,
    label: 'Pending',
    color: 'warning'
  }
]

describe('components/Button Status', () => {
  let localVue
  describe('Visuals', () => {
    beforeEach(() => {
      localVue = createLocalVue().vue
    })
    it('snapshot default', async () => {
      const wrapper = mount(Component, { localVue })
      expect(wrapper.element).toMatchSnapshot()
    })
    it('snapshot with value', async () => {
      const wrapper = mount(Component, {
        propsData: {
          value: 'active'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    it('snapshot with props', async () => {
      const items = [
        {
          id: 1,
          label: 'One',
          color: 'success'
        }, {
          id: 2,
          label: 'Two',
          color: 'error'
        }
      ]

      const wrapper = mount(Component, {
        localVue,
        propsData: {
          value: '1',
          items
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Computed', () => {
    describe('color', () => {
      test('returns default if activeItem.color is not viable', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            items: [
              {
                id: 'active',
                label: 'Active'
              }
            ]
          }
        })
        expect(wrapper.vm).toHaveProperty('color', 'warning')
      })
      test('returns default if activeItem is not viable', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: ''
          }
        })
        expect(wrapper.vm).toHaveProperty('color', 'warning')
      })

      test('returns selected item\'s color', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 'active'
          }
        })
        expect(wrapper.vm).toHaveProperty('color', 'success')
      })

      test('returns selected item\'s color using the items', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 1,
            items: ITEMS_WITH_NUMERIC_ID
          }
        })
        expect(wrapper.vm).toHaveProperty('color', 'success')
      })
    })
    describe('label', () => {
      test('returns default if activeItem.label is not viable', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            items: [
              {
                id: 'active'
              }
            ]
          }
        })
        expect(wrapper.vm).toHaveProperty('label', 'Pending')
      })
      test('returns default if activeItem is not viable', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: ''
          }
        })
        expect(wrapper.vm).toHaveProperty('label', 'Pending')
      })

      test('returns selected item', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 'active'
          }
        })
        expect(wrapper.vm).toHaveProperty('label', 'Active')
      })

      test('returns selected item\'s label using the items', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 1,
            items: ITEMS_WITH_NUMERIC_ID
          }
        })
        expect(wrapper.vm).toHaveProperty('label', 'Active')
      })
    })
    describe('activeItem', () => {
      test('returns undefined if value is not viable', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: null
          }
        })
        expect(wrapper.vm).toHaveProperty('activeItem')
        expect(wrapper.vm.activeItem).toBeUndefined()
      })
      test('does not throw error if value is not string', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 1
          }
        })
        expect(() => {
          expect(wrapper.vm.activeItem).toBeUndefined()
        }).not.toThrow(Error)
      })
      test('returns selected activeItem using numeric value', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue().vue,
          propsData: {
            value: 1,
            items: ITEMS_WITH_NUMERIC_ID
          }
        })
        expect(wrapper.vm.activeItem).toHaveProperty('id', 1)
      })
    })
  })
})
