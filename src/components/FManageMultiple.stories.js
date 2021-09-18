import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import { FIXTURE_UI_BTNMENU_ITEMS } from '@freshinup/core-ui/tests/__data__/BtnMenu/items'
import { CORE } from '../../.storybook/categories'
import ManageMultiple from './FManageMultiple.vue'

const items = FIXTURE_UI_BTNMENU_ITEMS

storiesOf(`${CORE}|Manage Multiple`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { ManageMultiple },
      template: `
          <v-container>
            <manage-multiple  />
          </v-container>
      `
    }
  })
  .add('with items & knobs', () => {
    return {
      components: { ManageMultiple },
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
            <manage-multiple 
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
  .add('with one item & knobs', () => {
    return {
      components: { ManageMultiple },
      props: {
        color: {
          default: text('Color', 'primary')
        }
      },
      data: () => ({
        items: [items[0]]
      }),
      template: `
          <v-container>
            <manage-multiple 
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
