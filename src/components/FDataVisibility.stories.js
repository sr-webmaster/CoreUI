import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { select } from '@storybook/addon-knobs'
import { CORE } from '../../.storybook/categories'
// Components
import FDataVisibility from './FDataVisibility.vue'

const visibleParameters = [
  'status',
  'customer_name',
  'age',
  'lead_source',
  'sales_rep'
]

const parameters = [
  { name: 'status', label: 'Status' },
  { name: 'acquisition', label: 'Opportunity title' },
  { name: 'customer_name', label: 'Customer name / contact' },
  { name: 'age', label: 'Age' },
  { name: 'lead_source', label: 'Lead source' },
  { name: 'sales_rep', label: 'Sales Rep' },
  { name: 'opportunity_type', label: 'Opportunity type' },
  { name: 'import_date_time', label: 'Import date and time' },
  { name: 'internet_coordinator', label: 'Internet coordinator' },
  { name: 'sales_manager', label: 'Sales manager' },
  { name: 'fi_manager', label: 'F&I manager' },
  { name: 'estimated_budget', label: 'Estimated budget' },
  { name: 'deal_number', label: 'Deal # (when applicable)' }
]

const colorOptions = {
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  error: 'error',
  success: 'success',
  info: 'info',
  warning: 'warning'
}

storiesOf(`${CORE}|DataVisibility`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('inside dialog', () => ({
    components: { FDataVisibility },
    props: {
      btnColor: {
        default: select('Button Color', colorOptions, 'primary')
      },
      bgColor: {
        default: select('Background Color', colorOptions, 'secondary')
      }
    },
    data () {
      return {
        visibleParameters: visibleParameters,
        parameters: parameters,
        dialog: false
      }
    },
    methods: {
      closeDialog () {
        this.dialog = false
      },
      onSave (parameters) {
        this.dialog = false
        action('Save')(parameters)
      }
    },
    template: `
    <v-container>
        <v-dialog
            v-model="dialog"
            scrollable
            max-width="436"
          >
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Data Visibility
            </v-btn>
             <f-data-visibility
              :visible-parameters="visibleParameters"
              :parameters="parameters"
              :btn-color="btnColor"
              :bg-color="bgColor"
              @close="closeDialog"
              @save="onSave"
              />
        </v-dialog>
    </v-container>
` }))
