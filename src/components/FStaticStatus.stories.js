import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, select } from '@storybook/addon-knobs'
import FStaticStatus from './FStaticStatus.vue'
import { CORE } from '../../.storybook/categories'

const statuses = [
  { id: 1, name: 'Draft', color: 'accent' },
  { id: 2, name: 'Pending', color: 'warning' },
  { id: 3, name: 'Confirmed', color: 'success' },
  { id: 4, name: 'Past', color: 'secondary' },
  { id: 5, name: 'Cancelled', color: 'accent' }
]

storiesOf(`${CORE}|StaticStatus`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { FStaticStatus },
      template: `
          <v-container>
            <f-static-status />
          </v-container>
      `,
      methods: {
        input (val) {
          action('input')(val)
        }
      }
    }
  })
  .add('with value', () => {
    return {
      components: { FStaticStatus },
      props: {
        status: {
          default: select('Status', {
            Active: 'active',
            Pending: 'pending',
            Hold: 'hold',
            Inactive: 'inactive'
          }, 'active')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-static-status 
              :value="status"
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
  .add('with custom statuses', () => {
    return {
      components: { FStaticStatus },
      props: {
        status: {
          default: select('Status', {
            Draft: 1,
            Pending: 2,
            Confirmed: 3,
            Past: 4,
            Cancelled: 5
          }, 1)
        }
      },
      data: () => ({
        statuses,
        val: 1
      }),
      template: `
          <v-container>
            <f-static-status 
              :value="status"
              :statuses="statuses"
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
