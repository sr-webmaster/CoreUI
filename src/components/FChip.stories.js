import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import FChip from './FChip.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Chip`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { FChip },
      template: `
          <v-container>
            <f-chip>Chip</f-chip>
          </v-container>
      `
    }
  })
  .add('with color', () => {
    return {
      components: { FChip },
      props: {
        color: {
          default: text('Color', 'primary')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-chip :color="color" close>Colored Chip</f-chip>
          </v-container>
      `
    }
  })
  .add('with text color property', () => {
    return {
      components: { FChip },
      props: {
        color: {
          default: text('Color', 'primary')
        },
        textColor: {
          default: text('Text Color', null)
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-chip :color="color" :text-color="textColor">Colored Chip</f-chip>
          </v-container>
      `
    }
  })
