import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FOpenBtn.vue'

describe('FOpenBtn', () => {
  describe('Snapshot', () => {
    it('should matched default', async () => {
      const wrapper = mount(Component, {
        propsData: {
          openText: 'Hide',
          closeText: 'Show'
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should matched opening', async () => {
      const wrapper = mount(Component, {
        propsData: {
          openText: 'Hide',
          closeText: 'Show',
          isOpen: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    it('should matched styles', async () => {
      const wrapper = mount(Component, {
        propsData: {
          openText: 'Hide',
          closeText: 'Show',
          color: 'primary',
          flat: true
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Method', () => {
    describe('toggle', () => {
      it('should toggle is opening', async () => {
        const wrapper = mount(Component, {
          propsData: {
            isOpen: true
          }
        })

        expect(wrapper.vm.isOpening).toEqual(true)

        wrapper.vm.toggle()

        expect(wrapper.vm.isOpening).toEqual(false)
      })

      it('should emit toggle with is opening', async () => {
        const wrapper = mount(Component, {
          propsData: {
            isOpen: true
          }
        })

        wrapper.vm.toggle()

        expect(wrapper.emitted('change')).toBeTruthy()
        expect(wrapper.emitted('change')[0][0]).toEqual(false)
      })
    })
  })
})
