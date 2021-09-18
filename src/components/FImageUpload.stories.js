import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'
import FImageUpload from './FImageUpload'

const methods = {
  onChange: action('Changed image'),
  onRemove: action('Removed image'),
  onError: action('Error')
}

storiesOf(`${CORE}|FImageUpload`, module)
  .add('default', () => ({
    components: { FImageUpload },
    template: `
        <v-container>
            <f-image-upload
              @change="onChange"
              @remove="onRemove"
            />
        </v-container>
    `,
    methods
  }))
  .add('src set', () => ({
    components: { FImageUpload },
    template: `
        <v-container>
            <f-image-upload
              src="https://placeimg.com/800/600/people?t=1551113577547"
              @change="onChange"
              @remove="onRemove"
            />
        </v-container>
    `,
    methods
  }))
  .add('src set to null on action', () => ({
    components: { FImageUpload },
    data () {
      return {
        src: 'https://placeimg.com/800/600/people?t=1551113577547'
      }
    },
    template: `
        <v-container>
            <f-image-upload
              :src="src"
              @change="onChange"
              @remove="onRemove"
            />
        </v-container>
    `,
    methods: {
      ...methods,
      onRemove () {
        action('Removed image')
        this.src = null
      }
    }
  }))
