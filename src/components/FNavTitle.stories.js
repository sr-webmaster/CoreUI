import { storiesOf } from '@storybook/vue'
import { withKnobs, boolean, select } from '@storybook/addon-knobs'
import FNavTile from './FNavTitle.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Navigation Title`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { FNavTile },
      props: {
        dark: {
          default: boolean('Dark', false)
        },
        color: {
          default: select('Active Tile Color', {
            primary: 'primary',
            secondary: 'secondary',
            accent: 'accent',
            error: 'error',
            success: 'success',
            info: 'info',
            warning: 'warning'
          }, 'primary')
        }
      },
      data () {
        return {
          items: [
            { title: 'Home', icon: 'dashboard', active: true },
            { title: 'About', icon: 'question_answer', active: false }
          ],
          right: null
        }
      },

      template: `<v-navigation-drawer permanent :dark="dark">
          <v-list dense class="pt-0">
            <f-nav-tile
              v-for="(item, idx) in items"
              :key="idx"
              :href="item.to"
              :value="item.active"
              :color="color"
              @click="activateItem(idx)"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
      
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </f-nav-tile>
          </v-list>
        </v-navigation-drawer>`,
      methods: {
        activateItem (idx) {
          this.items.map((item, iidx) => (
            item.active = iidx === idx
          ))
        }
      }
    }
  })
