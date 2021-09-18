import { action } from '@storybook/addon-actions'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import { MAIN } from '../../.storybook/categories'

// Components
import FSearchSimple from './FSearchSimple'

import MockAdapter from 'axios-mock-adapter'

const getTitle = () => {
  return `${MAIN}|Search Simple`
}

export default {
  title: getTitle(),
  id: 'SearchSimple'
}

// Mock GET request to /users for colleagues
const mock = new MockAdapter(axios)
mock.onGet('/terms').reply(200, {
  data: [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Bob Loblaw' },
    { id: 3, name: 'Mario Brother' }
  ]
})

mock.onGet('/uuid').reply(200, {
  data: [
    { uuid: 1, other_field: 'John Smith' },
    { uuid: 2, other_field: 'Bob Loblaw' },
    { uuid: 3, other_field: 'Mario Brother' }
  ]
})

Vue.use(Vuex)

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const defaultStory = () => ({
  components: {
    FSearchSimple
  },
  template: `
        <v-container>
            <f-search-simple url="/terms" />
        </v-container>
      `
})
defaultStory.story = { name: 'defaults (url is required)' }

export const methodClearTerm = () => ({
  components: { FSearchSimple },
  template: `
        <v-container>
            <f-search-simple ref="simple" url="/terms" @termChange="onTermChange" />
            <v-btn @click="reset">
              Reset Term
            </v-btn>
        </v-container>
    `,
  methods: {
    onTermChange (value) {
      action('Term Change')(value)
    },
    onClose () {
      action('Close')()
    },
    reset () {
      this.$refs.simple.resetTerm()
    }
  }
})

export const changeModel = () => ({
  components: { FSearchSimple },
  template: `
        <v-container>
            <pre><code>Changing model does not dispatch the "input" nor "termChange" (see https://github.com/FreshinUp/fresh-bus-forms/issues/188)</code></pre>
            <f-search-simple :model="model" url="none" @termChange="onTermChange" @input="onInputChange" />
            <v-btn @click="reset" >
              Reset Model
            </v-btn>
        </v-container>
      `,
  data () {
    return {
      model: 'hi'
    }
  },
  methods: {
    onInputChange (value) {
      action('Input Change')(value)
    },
    onTermChange (value) {
      action('Term Change')(value)
    },
    onClose () {
      action('Close')()
    },
    reset () {
      this.model = 'hi'
    }
  }
})

export const withCustomResultTextKey = () => ({
  components: { FSearchSimple },
  template: `
        <v-container>
            <f-search-simple 
                url="/uuid"
                results-text-key="other_field"
                @termChange="onTermChange"
            />
        </v-container>
    `,
  methods: {
    onTermChange (value) {
      action('Term Change')(value)
    },
    onClose () {
      action('Close')()
    }
  }
})

export const withShowNoDataOption = () => ({
  components: { FSearchSimple },
  template: `
        <v-container>
            <f-search-simple 
                url="/terms"
                show-no-data
            />
        </v-container>
    `
})

export const withDataAlreadySet = () => ({
  components: { FSearchSimple },
  template: `
      <v-container>
          <f-search-simple 
              url="/terms"
              value="1"
          />
      </v-container>
  `
})

export const withDataAlreadySetButNotDefaultResult = () => ({
  components: { FSearchSimple },
  template: `
      <v-container>
          <f-search-simple 
              url="/terms"
              result-id-key="uuid"
              value="1"
          />
      </v-container>
  `
})
withDataAlreadySetButNotDefaultResult.story = {
  name: 'with already data set but not default result id key (uuid)'
}

export const optionNotClearable = () => ({
  components: { FSearchSimple },
  template: `
      <v-container>
          <f-search-simple 
              url="/terms"
              not-clearable
          />
      </v-container>
  `
})

optionNotClearable.story = {
  name: 'Option not-clearable'
}

export const optionMultiple = () => ({
  components: { FSearchSimple },
  template: `
      <v-container>
          <f-search-simple
              url="/terms"
              multiple
              @termChange="onTermChange"
              @input="onInputChange"
          />
      </v-container>
    `,
  methods: {
    onInputChange (value) {
      action('Input Change')(value)
    },
    onTermChange (value) {
      action('Term Change')(value)
    }
  }
})

export const optionNotSelection = () => ({
  components: { FSearchSimple },
  template: `
      <v-container>
          <f-search-simple
              url="/terms"
              multiple
              not-selection
          />
      </v-container>
  `
})
