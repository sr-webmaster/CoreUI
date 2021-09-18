import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import FBtnStatus from './FBtnStatus.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Button Status`, module)
  .add('defaults', () => {
    return {
      components: { FBtnStatus },
      template: `
          <v-container>
            <f-btn-status @input="input" />
          </v-container>
      `,
      methods: {
        input (val) {
          action('input')(val)
        }
      }
    }
  })
  .add('v-model', () => {
    return {
      components: { FBtnStatus },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-btn-status 
              v-model="val"
              @input="input"
            />
          </v-container>
      `,
      methods: {
        input (val) {
          action('input')(val)
        }
      }
    }
  })
  .add('props', () => {
    return {
      components: { FBtnStatus },
      data () {
        return {
          val: '1',
          items: [
            {
              id: 1,
              label: 'One',
              color: 'success'
            }, {
              id: 2,
              label: 'Two',
              color: 'error'
            }
          ]
        }
      },
      template: `
          <v-container>
            <f-btn-status
              v-model="val"
              :items="items"
              @input="input"
            />
          </v-container>
      `,
      methods: {
        input (val) {
          action('input')(val)
        }
      }
    }
  })
