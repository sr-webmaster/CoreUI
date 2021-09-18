import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import * as Stories from './admin-list.stories'

describe('Admin List layout', () => {
  describe('Visuals', () => {
    test('renders header image but not return button', (done) => {
      const wrapper = mount(Stories.HeaderImageStory(), {
        pluginValidation: true,
        pluginRouter: true
      })
      expect(wrapper.isVueInstance()).toBe(true)
      wrapper.beforeRouteEnterOrUpdate({ }, null, async () => {
        expect(wrapper.vm.$store.state.page.isLoading).toEqual(false)
        expect(wrapper.find('.f-admin__returnButton').exists()).toBe(false)
        expect(wrapper.find('.f-admin__headerImage').element.style.backgroundImage).toEqual('url(images/header-background.jpg)')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
  })
})
