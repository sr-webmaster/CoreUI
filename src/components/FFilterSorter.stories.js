import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'

// Components
import FFilterSorter from './FFilterSorter'

storiesOf(`${CORE}|FilterSorter`, module)
  .add('defaults', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter />
        </v-container>
    `
  }))
  .add('expanded property and events', () => ({
    components: { FFilterSorter },
    data () {
      return {
        expanded: true
      }
    },
    template: `
        <v-container>
            <f-filter-sorter :expanded="expanded" @expanded="open" @collapse="close">
              <template v-slot:expanded="slotProps">
                <v-layout column>
                  <div>We need the <code>expanded</code> slot populated to show the "More Filters" button</div>
                  <v-btn @click="close">Close</v-btn>
                </v-layout>
              </template>
            </f-filter-sorter>
        </v-container>
    `,
    methods: {
      open () {
        this.expanded = true
      },
      close () {
        this.expanded = false
      }
    }
  }))
  .add('clear event (on Clear Filter)', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
          <f-filter-sorter @clear="onClear">
            <template v-slot:expanded="slotProps">
              <span>We need the <code>expanded</code> slot populated to show the "More Filters" button</span>
            </template>
          </f-filter-sorter>
        </v-container>
    `,
    methods: {
      onClear (values) {
        action('clear')(values)
      }
    }
  }))
  .add('expanded slot', () => ({
    components: { FFilterSorter },
    data () {
      return {
        status: null,
        statuses: [
          { value: 1, text: 'Active' },
          { value: 2, text: 'Inactive' },
          { value: 3, text: 'Hold' }
        ]
      }
    },
    template: `
        <v-container>
            <f-filter-sorter @run="onRun">
              <template v-slot:expanded="slotProps">
                <v-select
                  v-model="status"
                  :items="statuses"
                  placeholder="All"
                  solo
                  flat
                  hide-details
                  @change="slotProps.run"
                />
                <v-btn @click="slotProps.run">Run</v-btn>
              </template>
            </f-filter-sorter>
        </v-container>
    `,
    methods: {
      onRun (values) {
        action('run')(values)
      }
    }
  }))
  .add('filters slot', () => ({
    components: { FFilterSorter },
    data () {
      return {
        company: null,
        companies: [
          { value: null, text: 'All companies' },
          { value: 1, text: 'Stark industries' },
          { value: 2, text: 'Umbrella Corp' }
        ]
      }
    },
    template: `
      <v-container>
          <f-filter-sorter
            @run="onRun"
            @clear="onClear"
          >
            <template v-slot:filters="slotProps">
              <v-flex>
                <v-select
                  v-model="company"
                  :items="companies"
                  placeholder="All"
                  solo
                  hide-details
                  @change="slotProps.run"
                />
              </v-flex>
              <v-flex>
                <v-btn
                    class="secondary"
                    @click="slotProps.clear"
                >
                    Clear filters
                </v-btn>
              </v-flex>
            </template>
          </f-filter-sorter>
      </v-container>
  `,
    methods: {
      onRun (values) {
        action('run')(values)
      },
      onClear () {
        this.company = null
        action('clear')(this.company)
      }
    }
  }))
  .add('with sort options', () => ({
    components: { FFilterSorter },
    data () {
      return {
        sortValues: [
          'doc', 'bus'
        ]
      }
    },
    template: `
        <v-container>
            <f-filter-sorter :sort-options="sortValues" raised />
        </v-container>
    `
  }))
  .add('without filters label', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter without-filter-label/>
        </v-container>
    `
  }))
  .add('raised property raises the Search input', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter raised/>
        </v-container>
    `
  }))
  .add('flat container', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter icon="search" flat-container/>
        </v-container>
    `
  }))
  .add('with icon on input', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter icon="search"/>
        </v-container>
    `
  }))
  .add('set color of add filter button', () => ({
    components: { FFilterSorter },
    data () {
      return {
        status: null,
        statuses: [
          { value: 1, text: 'Active' },
          { value: 2, text: 'Inactive' },
          { value: 3, text: 'Hold' }
        ]
      }
    },
    template: `
        <v-container>
          <f-filter-sorter
            color-add-filter-btn="primary"
          >
            <template v-slot:expanded="slotProps">
              <v-select
                solo
                flat
                hide-details
                @change="slotProps.run"
              />
              <v-btn @click="slotProps.run">Run</v-btn>
            </template>
          </f-filter-sorter>
        </v-container>
    `
  }))
  .add('set color of clear filter button', () => ({
    components: { FFilterSorter },
    data () {
      return {
        status: null,
        statuses: [
          { value: 1, text: 'Active' },
          { value: 2, text: 'Inactive' },
          { value: 3, text: 'Hold' }
        ]
      }
    },
    template: `
        <v-container>
            <f-filter-sorter
              color-clear-filter-btn="primary"
              expanded
            >
              <template v-slot:expanded="slotProps">
                <v-select
                  placeholder="All"
                  solo
                  flat
                  hide-details
                  @change="slotProps.run"
                />
                <v-btn @click="slotProps.run">Run</v-btn>
              </template>
            </f-filter-sorter>
        </v-container>
    `
  }))
  .add('with title slot', () => ({
    components: { FFilterSorter },
    template: `
      <v-container>
          <f-filter-sorter>
            <template v-slot:title>
                <span class="subheading font-weight-bold">Teams</span>
            </template>
          </f-filter-sorter>
      </v-container>
  `
  }))
  .add('set color to card', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter color='primary'/>
        </v-container>
    `
  }))
  .add('set different class to term input', () => ({
    components: { FFilterSorter },
    template: `
        <v-container>
            <f-filter-sorter term-input-class='sm5'/>
        </v-container>
    `
  }))
  .add('set different placholder', () => ({
    components: { FFilterSorter },
    template: `
      <v-container>
          <f-filter-sorter placeholder='Keyword Search'/>
      </v-container>
  `
  }))
