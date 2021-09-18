import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { MAIN } from '../../../.storybook/categories'
import FDatePicker from './FDatePicker.vue'

export default {
  title: `${MAIN}|FDatePicker`,
  id: 'FDatePicker',
  decorators: [
    withKnobs,
    () => ({
      template: `
        <v-container grid-list-md>
          <story />
        </v-container>
      `
    })
  ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const NoDefaultDateSet = () => ({
  components: {
    FDatePicker
  },
  template: `
    <v-layout>
      <v-flex><f-date-picker @input="onValueChange"/></v-flex>
    </v-layout>
  `,
  methods: {
    onValueChange (value) {
      action('Date')(value)
    }
  }
})

export const VModel = () => ({
  components: {
    FDatePicker
  },
  data () {
    return {
      date: '2020-05-29T02:08:00Z'
    }
  },
  template: `
    <v-layout column>
      <v-flex>
        <v-text-field v-model="date"></v-text-field>
      </v-flex>
      <v-flex><f-date-picker v-model="date"/></v-flex>
    </v-layout>
  `
})

export const InputIcons = () => ({
  components: {
    FDatePicker
  },
  template: `
    <v-layout column>
      <v-flex><f-date-picker prepend-icon="event" /></v-flex>
      <v-flex><f-date-picker prepend-inner-icon="fa-calendar-plus" /></v-flex>
      <v-flex><f-date-picker append-icon="mdi-calendar" /></v-flex>
      <v-flex><f-date-picker append-outer-icon="mdi-calendar" /></v-flex>
    </v-layout>
  `
})

export const InputOutline = () => ({
  components: {
    FDatePicker
  },
  template: `
    <v-layout column>
      <v-flex><f-date-picker prepend-icon="event" outline/></v-flex>
      <v-flex><f-date-picker prepend-inner-icon="fa-calendar-plus" outline/></v-flex>
      <v-flex><f-date-picker append-icon="mdi-calendar" outline/></v-flex>
      <v-flex><f-date-picker append-outer-icon="mdi-calendar" outline/></v-flex>
    </v-layout>
  `
})

export const InputSolo = () => ({
  components: {
    FDatePicker
  },
  template: `
    <v-layout column>
      <v-flex><f-date-picker prepend-icon="event" solo flat/></v-flex>
      <v-flex><f-date-picker prepend-inner-icon="fa-calendar-plus" solo flat/></v-flex>
      <v-flex><f-date-picker append-icon="mdi-calendar" solo flat/></v-flex>
      <v-flex><f-date-picker append-outer-icon="mdi-calendar" solo flat/></v-flex>
    </v-layout>
  `
})

export const NoTitle = () => ({
  components: {
    FDatePicker
  },
  template: `
    <v-layout column>
      <v-flex><f-date-picker no-title /></v-flex>
    </v-layout>
  `
})

export const Immediate = () => ({
  components: {
    FDatePicker
  },
  data () {
    return {
      date: null
    }
  },
  template: `
    <v-layout column>
      <v-flex><f-date-picker immediate v-model="date"/></v-flex>
    </v-layout>
  `
})

export const Format = () => ({
  components: {
    FDatePicker
  },
  data () {
    return {
      date: '2020-05-29T02:08:00Z'
    }
  },
  template: `
    <v-layout column>
      <v-flex>
        <v-label>LLL</v-label>
        <f-date-picker format="LLL" v-model="date"/>
      </v-flex>
    </v-layout>
  `
})
