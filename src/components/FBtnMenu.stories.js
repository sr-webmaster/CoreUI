import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { FIXTURE_UI_BTNMENU_ITEMS } from '@freshinup/core-ui/tests/__data__/BtnMenu/items'
import { CORE } from '../../.storybook/categories'
import BtnMenu from './FBtnMenu.vue'

const items = FIXTURE_UI_BTNMENU_ITEMS

storiesOf(`${CORE}|Button Menu`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { BtnMenu },
      template: `
          <v-container>
            <btn-menu  />
          </v-container>
      `
    }
  })
  .add('with items & knobs', () => {
    return {
      components: { BtnMenu },
      props: {
        color: {
          default: text('Color', 'primary')
        }
      },
      data: () => ({
        items
      }),
      template: `
          <v-container>
            <btn-menu 
              :items="items"
              :btn-color="color"
              @item="itemSelected"
            />
          </v-container>
      `,
      methods: {
        itemSelected (item) {
          action('item')(item)
        }
      }
    }
  })
