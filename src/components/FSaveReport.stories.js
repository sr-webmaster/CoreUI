import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'
// Components
import FSaveReport from './FSaveReport.vue'

storiesOf(`${CORE}|SaveReportModal`, module)
  .add('without dialog', () => ({
    components: { FSaveReport },
    data () {
      return {
        items: [
          { id: 1, name: 'usque' },
          { id: 2, name: 'bianco' },
          { id: 3, name: 'leggere' },
          { id: 4, name: 'mescolare' }
        ]
      }
    },
    methods: {
      save (payload) {
        action('save')(payload)
      },
      close () {
        this.dialog = false
        action('close')('Close')
      }
    },
    template: `
      <v-container fluid>
          <v-layout
            row
          >
           <f-save-report
              :items-one="items"
              :items-two="items"
              @save="save"
              @close="close"
            />
       </v-layout>
    </v-container>
    `
  }))
  .add('inside a dialog', () => ({
    components: { FSaveReport },
    data () {
      return {
        items: [
          { id: 1, name: 'usque' },
          { id: 2, name: 'bianco' },
          { id: 3, name: 'leggere' },
          { id: 4, name: 'mescolare' }
        ],
        dialog: false,
        saveLoading: false
      }
    },
    methods: {
      save (payload) {
        action('save')(payload)
      },
      close () {
        this.dialog = false
        action('close')('Close')
      }
    },
    template: `
      <v-dialog
        v-model="dialog"
        max-width="400px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            btnColor="secondary"
            round
            :loading="saveLoading"
            :disabled="saveLoading"
            v-on="on"
          >
            Save Report
          </v-btn>
        </template>
         <v-toolbar>
            <v-toolbar-title>Save Report</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                icon
                @click="dialog = false"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
           <f-save-report
              :items-one="items"
              :items-two="items"
              @save="save"
              @close="close"
            />
      </v-dialog>
    `
  }))
  .add('title', () => ({
    components: { FSaveReport },
    data () {
      return {
        items: [
          { id: 1, name: 'usque' },
          { id: 2, name: 'bianco' },
          { id: 3, name: 'leggere' },
          { id: 4, name: 'mescolare' }
        ]
      }
    },
    template: `
      <v-container fluid>
          <v-layout
            row
          >
           <f-save-report
              :items-one="items"
              :items-two="items"
              title="Report Saving"
            />
       </v-layout>
    </v-container>
    `
  }))
  .add('hide modifiers', () => ({
    components: { FSaveReport },
    data () {
      return {
        items: [
          { id: 1, name: 'usque' },
          { id: 2, name: 'bianco' },
          { id: 3, name: 'leggere' },
          { id: 4, name: 'mescolare' }
        ]
      }
    },
    template: `
      <v-container fluid>
        <v-layout
            row
        >
          <f-save-report
              :items-one="items"
              :items-two="items"
              hide-modifiers
              title="Report Saving"
          />
        </v-layout>
      </v-container>
      `
  }))
