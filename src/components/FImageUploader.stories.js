import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'
import FImageUploader from './FImageUploader'

const methods = {
  onChange: action('Changed image'),
  onRemove: action('Removed image'),
  onError: action('Error')
}

storiesOf(`${CORE}|FImageUploader`, module)
  .add('default', () => ({
    components: { FImageUploader },
    template: `
        <v-container>
            <f-image-uploader
              @change="onChange"
              @remove="onRemove"
              @error="onError"
            />
        </v-container>
    `,
    methods
  }))
  .add('set src', () => ({
    components: { FImageUploader },
    template: `
        <v-container>
            <f-image-uploader
              src="https://placeimg.com/800/600/people?t=1551113577547"
              @change="onChange"
              @remove="onRemove"
              @error="onError"
            />
        </v-container>
    `,
    methods
  }))
  .add('use with slot', () => ({
    components: { FImageUploader },
    template: `
        <v-container>
            <f-image-uploader
              src="https://placeimg.com/800/600/people?t=1551113577547"
              @change="onChange"
              @remove="onRemove"
              @error="onError"
            >
            <template v-slot="slotProps">
              <v-avatar size="128">
                 <v-img
                  :src="slotProps.src"
                />
              </v-avatar>
            </template>
            </image-uploader>
        </v-container>
    `,
    methods
  }))
  .add('src set to null on action', () => ({
    components: { FImageUploader },
    data () {
      return {
        src: 'https://placeimg.com/800/600/people?t=1551113577547'
      }
    },
    template: `
        <v-container>
            <f-image-uploader
              :src="src"
              @change="onChange"
              @remove="onRemove"
              @error="onError"
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
