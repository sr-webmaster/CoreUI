import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios/index'
import { CORE } from '../../.storybook/categories'

// Components
import FMultiSimple from './FMultiSimple.vue'

const mock = new MockAdapter(axios)
mock.onGet('/tags').reply(200, {
  data: [
    { uuid: 1, name: 'Event Tag 1' },
    { uuid: 2, name: 'Event Tag 2' },
    { uuid: 3, name: 'Event Tag 3' },
    { uuid: 4, name: 'Event Tag 4' }
  ]
})
mock.onGet('/terms').reply(200, {
  data: [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Bob Loblaw' },
    { id: 3, name: 'Mario Brother' }
  ]
})

storiesOf(`${CORE}|Multi Simple`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('only url set', () => ({
    components: { FMultiSimple },
    template: `
      <v-container>
        <f-multi-simple
          url="/terms"
        />
      </v-container>
    `
  }))
  .add('set tags', () => ({
    components: { FMultiSimple },
    data () {
      return {
        selectTags: [1, 2, 3, 4]
      }
    },
    methods: {
      onInputChange (value) {
        action('Input Change')(value)
      }
    },
    template: `
      <v-container>
        <f-multi-simple
          :value="selectTags"
          url="/tags"
          term-param="filter[name]"
          results-id-key="uuid"
          placeholder="Search Tag"
          background-color="white"
          class="mt-0 pt-0"
          height="48"
          notClearable
          solo
          flat
          @input="onInputChange"
        />
      </v-container>
    `
  }))
