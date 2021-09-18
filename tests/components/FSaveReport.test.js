import { mount, createLocalVue } from '@vue/test-utils'
import Component from '../../src/components/FSaveReport'

describe('Save Report', () => {
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
  })

  describe('Methods', () => {
    test('save emits save event with payload', () => {
      const wrapper = mount(Component, { localVue })

      wrapper.setData({
        name: 'usque',
        modifierOne: 1,
        modifierTwo: 2
      })

      wrapper.vm.save()
      expect(wrapper.emitted().save).toHaveLength(1)
      expect(wrapper.emitted().save[0]).toEqual([{
        name: 'usque',
        modifier_1_id: 1,
        modifier_2_id: 2,
        isFeatured: false
      }])
    })
  })

  describe('Visuals', () => {
    test('hideModifiers is false', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          hideModifiers: false
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('hideModifiers is true', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          hideModifiers: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('itemsOne and itemsTwo', () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          itemsOne: [
            { id: 1, name: 'usque' },
            { id: 2, name: 'bianco' }
          ],
          itemsTwo: [
            { id: 3, name: 'leggere' },
            { id: 4, name: 'mescolare' }
          ]
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('click on save report button', async () => {
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          itemsOne: [
            { id: 1, name: 'usque' },
            { id: 2, name: 'bianco' }
          ],
          itemsTwo: [
            { id: 3, name: 'leggere' },
            { id: 4, name: 'mescolare' }
          ]
        }
      })

      expect(wrapper.element).toMatchSnapshot()
      wrapper.find('button.secondary--text').trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted().close).toHaveLength(1)
    })
  })
})
