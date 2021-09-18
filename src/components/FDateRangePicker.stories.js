import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

// Components
import FDateRangePicker from './FDateRangePicker.vue'

storiesOf(`${CORE}|FDateRangePicker`, module)
  .add('default', () => ({
    components: { FDateRangePicker },
    data () {
      return {
        expireDate: null
      }
    },
    methods: {
      onInput (params) {
        action('input')(params)
      }
    },
    template: `
      <v-container>
        <f-date-range-picker
          v-model="expireDate"
          range
          only-date
          format="YYYY-MM-DD"
          formatted="MM-DD-YYYY"
          input-size="lg"
          label="Expiration date range"
          :color="$vuetify.theme.primary"
          :button-color="$vuetify.theme.primary"
          @input="onInput"
        />
      </v-container>
    `
  }))
