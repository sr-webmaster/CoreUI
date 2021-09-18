import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'
// Components
import FExportData from './FExportData.vue'

storiesOf(`${CORE}|ExportDataModal`, module)
  .add('without dialog', () => ({
    components: { FExportData },
    data () {
      return {
        option: 'pdf'
      }
    },
    methods: {
      exportData (payload) {
        action('Export')(payload)
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
           <f-export-data 
              :option="option"
              @export="exportData"
              @close="close"
            />
       </v-layout>
    </v-container>
    `
  }))
  .add('inside a dialog', () => ({
    components: { FExportData },
    data () {
      return {
        dialog: false,
        saveLoading: false,
        option: 'pdf'
      }
    },
    methods: {
      exportData (payload) {
        action('Export')(payload)
        this.dialog = false
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
            Export Data
          </v-btn>
        </template>
         <v-toolbar>
            <v-toolbar-title>Export Report</v-toolbar-title>
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
           <f-export-data 
              :option="option"
              @export="exportData"
              @close="close"
            />
      </v-dialog>
    `
  }))
  .add('title', () => ({
    components: { FExportData },
    data () {
      return {
        option: 'pdf'
      }
    },
    methods: {
      exportData (payload) {
        action('Export')(payload)
      },
      close () {
        action('close')('Close')
      }
    },
    template: `
        <v-container fluid>
            <v-layout
                    row
            >
                <f-export-data
                        :option="option"
                        title="Export Report"
                        @export="exportData"
                        @close="close"
                />
            </v-layout>
        </v-container>
    `
  }))
