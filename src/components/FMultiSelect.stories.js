import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

// Components
import FMultiSelect from './FMultiSelect.vue'

let items = [
  { id: 1, name: 'Draft' },
  { id: 2, name: 'Pending' },
  { id: 3, name: 'Confirmed' },
  { id: 4, name: 'Past' },
  { id: 5, name: 'Cancelled' }
]

storiesOf(`${CORE}|Multi Select`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('item-value, item-text and items set', () => ({
    components: { FMultiSelect },
    data () {
      return {
        item: [],
        items: items
      }
    },
    methods: {
      onInputChange (value) {
        this.item = value
        action('Input Change')(value)
      }
    },
    template: `
      <v-container>
        <f-multi-select
          :value="item"
          item-value="id"
          item-text="name"
          :items="items"
          @input="onInputChange"
        />
      </v-container>
    `
  }))
  .add('with placeholder set', () => ({
    components: { FMultiSelect },
    data () {
      return {
        status: items.map(item => item.id),
        items: items
      }
    },
    template: `
      <v-container>
        <f-multi-select
          v-model="status"
          item-value="id"
          item-text="name"
          placeholder="Select Items"
          :items="items"
        />
      </v-container>
    `
  }))
  .add('with selectAllName set', () => ({
    components: { FMultiSelect },
    data () {
      return {
        status: items.map(item => item.id),
        items: items
      }
    },
    template: `
      <v-container>
        <f-multi-select
          v-model="status"
          item-value="id"
          item-text="name"
          placeholder="Select Types"
          select-all-name="All Types"
          :items="items"
        />
      </v-container>
    `
  }))
