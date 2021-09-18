import { MAIN } from '../../../.storybook/categories'
import FFilterLabel from './FFilterLabel.vue'

export default {
  title: `${MAIN}|FFilterLabel`,
  id: 'FFilterLabel',
  decorators: [
    () => ({
      template: `
        <v-container class="grey"><story /></v-container>
      `
    })
  ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const defaultStory = () => ({

  components: {
    FFilterLabel
  },
  template: `
    <f-filter-label>Label</f-filter-label>
  `
})

export const alternativeColor = () => ({
  components: {
    FFilterLabel
  },
  template: `
    <f-filter-label color="black">Label</f-filter-label>
  `
})
