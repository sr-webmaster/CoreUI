import { mount } from '@vue/test-utils'
import Component from '@freshinup/core-ui/src/components/FBtnGroup.vue'

describe('Button Group', () => {
  describe('snapshot', () => {
    it('default', async () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    it('nextStage', async () => {
      const wrapper = mount(Component)
      wrapper.vm.nextStage()
      expect(wrapper.emitted().nextStage).toBeTruthy()
    })

    it('previousStage', async () => {
      const wrapper = mount(Component)
      wrapper.vm.previousStage()
      expect(wrapper.emitted().previousStage).toBeTruthy()
    })
  })
})
