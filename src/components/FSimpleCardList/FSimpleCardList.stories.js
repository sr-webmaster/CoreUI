import { MAIN } from '../../../.storybook/categories'
import FSimpleCardList from './FSimpleCardList.vue'

export default {
  title: `${MAIN}|FSimpleCardList`,
  id: 'FSimpleCardList'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const Single = () => ({
  components: { FSimpleCardList },
  data: () => ({
    items: [
      { header: 'TOTAL OPPORTUNITIES', value: '0000' }
    ]
  }),
  template: `
    <v-container>
      <f-simple-card-list :items="items"/>
    </v-container>
  `
})

export const FourItems = () => ({
  components: { FSimpleCardList },
  data: () => ({
    items: [
      { header: 'TOTAL OPPORTUNITIES', value: '0000' },
      { header: '% IN PROGRESS', value: '00%' },
      { header: '% CLOSED WON', value: '00%' },
      { header: '% CLOSED LOST', value: '00%' }
    ]
  }),
  template: `
    <v-container>
      <f-simple-card-list :items="items"/>
    </v-container>
  `
})

export const Multiple = () => ({
  components: { FSimpleCardList },
  data: () => ({
    items: [
      { header: 'TOTAL OPPORTUNITIES', value: '0000' },
      { header: '% IN PROGRESS', value: '00%' },
      { header: '% CLOSED WON', value: '00%' },
      { header: '% CLOSED LOST', value: '00%' },
      { header: 'TOTAL OPPORTUNITIES', value: '0000' },
      { header: '% IN PROGRESS', value: '00%' },
      { header: '% CLOSED WON', value: '00%' },
      { header: '% CLOSED LOST', value: '00%' },
      { header: 'TOTAL OPPORTUNITIES', value: '0000' },
      { header: '% IN PROGRESS', value: '00%' },
      { header: '% CLOSED WON', value: '00%' },
      { header: '% CLOSED LOST', value: '00%' }
    ]
  }),
  template: `
    <v-container>
      <f-simple-card-list :items="items"/>
    </v-container>
  `
})
