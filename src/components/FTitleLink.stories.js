import { storiesOf } from '@storybook/vue'
import { withKnobs, select } from '@storybook/addon-knobs'
import FTitleLink from './FTitleLink.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Title Link`, module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { FTitleLink },
    props: {
      color: {
        default: select('Color', {
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
    template: `
      <v-container>
        <f-title-link href="admin/users/1/edit" :color="color">Welcome to the jungle</f-title-link>
      </v-container>
    `
  }))
