import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

import SimpleModal from './FSimpleModal'

storiesOf(`${CORE}|SimpleModal`, module)
  .add(
    'without dialog',
    () => ({
      components: { SimpleModal },
      methods: {
        onOk () {
          action('ok')('Ok clicked')
        }
      },
      data () {
        return {
          title: 'Thank you for your request',
          text: 'Please stand by for admin validation'
        }
      },
      template: `
        <v-container fluid>
          <v-layout
            row
          >
            <simple-modal
             @ok="onOk"
             :title="title"
             :text="text"
            />
          </v-layout>
        </v-container>
      `
    })
  )
  .add(
    'inside dialog',
    () => ({
      components: { SimpleModal },
      methods: {
        onOk () {
          this.dialog = false
          action('close')('Close modal')
        }
      },
      data () {
        return {
          dialog: false,
          title: 'Thank you for your request',
          text: 'Please stand by for admin validation'
        }
      },
      template: `
        <v-container>
          <v-dialog
            v-model="dialog"
            max-width="500"
          >
              <v-btn
                slot="activator"
                color="primary"
                dark
              >
                Confirmation
              </v-btn>

              <simple-modal
              :title="title"
              :text="text"
              @ok="onOk"
              />
          </v-dialog>
        </v-container>
    `
    })
  )
