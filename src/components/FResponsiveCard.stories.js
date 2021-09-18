import { MAIN } from '../../.storybook/categories'
import FResponsiveCard from './FResponsiveCard'

export default {
  title: `${MAIN}|FResponsiveCard`,
  id: 'FResponsiveCard',
  decorators: [
    () => ({
      template: `
        <v-container><story /></v-container>
      `
    })
  ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const DefaultStory = () => ({
  components: {
    FResponsiveCard
  },
  data () {
    return {
      card_text: 'Shrink the screen size down to a small screen (Vuetify Small Breakpoint).'
    }
  },
  template: `
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <f-responsive-card title="Kangaroo Valley Safari">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div> {{ card_text }} </div>
            </div>
          </v-card-title>
  
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </f-responsive-card>
      </v-flex>
    </v-layout>
  `
})
