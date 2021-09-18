import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

import SimpleConfirm from './FSimpleConfirm'

storiesOf(`${CORE}|SimpleConfirm`, module)
  .add(
    'without dialog',
    () => ({
      components: { SimpleConfirm },
      methods: {
        ok () {
          action('ok')('Don\'t try to eat it standing up.')
        },
        cancel () {
          action('cancel')('No soup for you!  Come back, one year!')
        }
      },
      data () {
        return {
          title: 'Are you hungry?',
          text: 'Please tell us if you would like a nice hot bowl of mulligatawny soup.  It would really hit the spot!'
        }
      },
      template: `
        <v-container fluid>
          <v-layout
            row
          >
            <simple-confirm
             @ok="ok"
             @cancel="cancel"
             :title="title"
             :text="text"
             ok-label="Yes"
             cancel-label="No"
            />
          </v-layout>
        </v-container>
      `
    })
  )
  .add(
    'using slots',
    () => ({
      components: { SimpleConfirm },
      methods: {
        ok () {
          action('ok')('Don\'t try to eat it standing up.')
        },
        cancel () {
          action('cancel')('No soup for you!  Come back, one year!')
        }
      },
      data () {
        return {
          title: 'Are you hungry?',
          text: 'Please tell us if you would like a nice hot bowl of mulligatawny soup.  It would really hit the spot!'
        }
      },
      template: `
        <v-container fluid>
          <v-layout
            row
          >
            <simple-confirm
             @ok="ok"
             @cancel="cancel"
             :title="title"
             :text="text"
             ok-label="Yes"
             cancel-label="No"
            >
              <div class="title" slot="title">{{title}}</div>
              
              <div class="pa-5">
                <p class="subheading">
                  {{text}}
                </p>
                <p class="caption">...Just don't ask for bread</p>
              </div>
            </simple-confirm>
          </v-layout>
        </v-container>
      `
    })
  )
  .add(
    'inside dialog',
    () => ({
      components: { SimpleConfirm },
      methods: {
        ok () {
          this.dialog = false
          action('ok')('A Festivus for the rest of us!')
        },
        cancel () {
          this.dialog = false
          action('cancel')('I got a lot of problems with you people!')
        }
      },
      data () {
        return {
          dialog: false,
          title: 'Would you like to join us?',
          text: 'Join us for a fun-filled afternoon.  We\'ll start with the airing of grievances, followed by a delicious meal and wrap up with the feats of strength.  We\'re expecting a Festivus miracle!'
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

              <simple-confirm
              :title="title"
              :text="text"
              ok-label="I'm In"
              cancel-label="No Thanks"
              @ok="ok"
              @cancel="cancel"
              />
          </v-dialog>
        </v-container>
    `
    })
  )
