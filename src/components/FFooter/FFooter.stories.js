import { MAIN } from '../../../.storybook/categories'
import FFooter from './FFooter.vue'

export default {
  title: `${MAIN}|Footer`,
  id: 'FFooter',
  description: 'Hello'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const defaultStory = () => ({
  components: {
    FFooter
  },
  template: `
    <f-footer></f-footer>
  `
})

export const PrimaryColor = () => ({
  components: {
    FFooter
  },
  template: `
    <f-footer color="primary"></f-footer>
  `
})

export const SecondaryColor = () => ({
  components: {
    FFooter
  },
  template: `
    <f-footer color="secondary"></f-footer>
  `
})

export const AccentColor = () => ({
  components: {
    FFooter
  },
  template: `
    <f-footer color="accent"></f-footer>
  `
})
