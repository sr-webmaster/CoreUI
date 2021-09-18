import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

// Components
import FClearButton from './FClearButton.vue'

storiesOf(`${CORE}|ClearButton`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('default', () => ({
    methods: {
      onClear () {
        action('Clear')('Clicked')
      }
    },
    components: { FClearButton },
    template: `
      <v-container>
        <f-clear-button
          @clear="onClear"
        />
      </v-container>
`
  }))
