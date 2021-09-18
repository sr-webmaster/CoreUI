import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, select } from '@storybook/addon-knobs'
import FBtnGroup from './FBtnGroup.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Button Group`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { FBtnGroup },
      template: `
          <v-container>
            <f-btn-group />
          </v-container>
      `
    }
  })
  .add('with actions', () => {
    return {
      components: { FBtnGroup },
      template: `
          <v-container>
            <f-btn-group
              @nextStage="nextStage"
              @previousStage="previousStage"
            />
          </v-container>
      `,
      methods: {
        nextStage () {
          action('nextStage')()
        },
        previousStage () {
          action('previousStage')()
        }
      }
    }
  })
  .add('with color and actions', () => {
    return {
      components: { FBtnGroup },
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
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-btn-group
              :color="color"
              @nextStage="nextStage"
              @previousStage="previousStage"
            />
          </v-container>
      `,
      methods: {
        nextStage () {
          action('nextStage')()
        },
        previousStage () {
          action('previousStage')()
        }
      }
    }
  })
