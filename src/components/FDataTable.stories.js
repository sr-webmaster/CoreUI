import TitleLink from './FTitleLink'
import FBtnStatus from './FBtnStatus'
import FDataTable from './FDataTable'
import FDatePicker from './FDatePicker'
import FDateRangePicker from './FDateRangePicker'
import FChip from './FChip.vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import { MAIN } from '../../.storybook/categories'

const colorOptions = {
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  error: 'error',
  success: 'success',
  info: 'info',
  warning: 'warning'
}

const company1 = {
  name: 'ABC Brokers'
}

const company2 = {
  name: 'SmartCorp'
}

const users = [{
  id: 5,
  name: 'JON dealer',
  email: 'test@test2.com',
  title: 'dealer',
  level: 3,
  status: 'Active',
  company: company1,
  tags: ['Dealer', 'Corporate'],
  created_at: '2020-01-29T02:08:00Z',
  updated_at: '2020-03-29T02:08:00Z'
},
{
  id: 6,
  name: 'BOB broker',
  email: 'test@test1.com',
  title: 'broker',
  company: company2,
  level: 4,
  status: 'Active',
  requested_company: 'ABC Broker',
  tags: ['Broker', 'Employee'],
  created_at: '2019-01-01T02:08:00Z',
  updated_at: '2020-02-09T02:08:00Z'
}]

export default {
  title: `${MAIN}|FDataTable`,
  id: 'FDataTable',
  decorators: [
    withKnobs,
    () => ({
      template: `
        <v-container grid-list-md><story /></v-container>
      `
    })
  ]
}

export const EmptyItems = () => ({
  components: { FDataTable },
  data () {
    return {
      users
    }
  },
  template: `
    <f-data-table
      :items="[]"
    />
  `
})

export const DefaultColumns = () => ({
  components: { FDataTable },
  data () {
    return {
      users
    }
  },
  template: `
    <f-data-table
      :items="users"
    />
  `
})

export const IsLoadingUseKnob = () => ({
  components: { FDataTable },
  props: {
    isLoading: {
      default: boolean('Is Loading', true)
    }
  },
  data () {
    return {
      users
    }
  },
  template: `
    <f-data-table
      :items="users"
      :is-loading="isLoading"
    />    
  `
})

export const RowWithDatePickers = () => ({
  components: {
    FDataTable,
    FDatePicker,
    FDateRangePicker,
    FChip
  },
  data () {
    return {
      users,
      headers: [
        { text: 'FDatePicker', sortable: true, value: 'created_at', align: 'center' },
        { text: 'with Icon Appended', sortable: true, value: 'updated_at', align: 'center' }
      ]
    }
  },
  template: `
    <f-data-table
      :items="users"
      :headers="headers"
     >
       <template v-slot:item-inner-created_at="{ item }">
          <f-date-picker
            :value="item.created_at"
          />
      </template>
      <template v-slot:item-inner-updated_at="{ item }">
        <f-date-picker
          input-append-icon="event"
          :value="item.updated_at"
        />
      </template>
    </f-data-table>
  `
})

export const ItemActionsWithEvents = () => ({
  components: { FDataTable, TitleLink, FBtnStatus, FChip },
  props: {
    titleLinkColor: {
      default: select('Name Link Color', colorOptions, 'primary')
    },
    tagColor: {
      default: select('Tag Color', colorOptions, 'secondary')
    }
  },
  data () {
    return {
      users,
      headers: [
        { text: 'Status', sortable: true, value: 'status', align: 'center' },
        { text: 'Name / Email', value: 'first_name,email', align: 'left' },
        { text: 'Company', value: 'company_name', align: 'left' },
        { text: 'Tags', sortable: false, value: 'tags', align: 'center' },
        { text: 'Level', sortable: true, value: 'level', align: 'center' },
        { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
      ],
      itemActions: [
        { action: 'view', text: 'View' },
        { action: 'edit', text: 'Edit' },
        { action: 'delete', text: 'Delete' }
      ],
      levels: [
        { text: 'Level 1', value: 1 },
        { text: 'Level 2', value: 2 },
        { text: 'Level 3', value: 3 },
        { text: 'Level 4', value: 4 }
      ]
    }
  },
  template: `
        <f-data-table
          :items="users"
          :headers="headers"
          :item-actions="itemActions"
          @manage="onManage"
          @manage-multiple="onManageMultiple"
        >
          <template v-slot:item-inner-status="{ item }">
            <f-btn-status 
              :value="item.status"
              @input="onStatus($event, item)"
            />
          </template>
          <template v-slot:item-inner-first_name,email="{ item }">
            <title-link :href="'/users/' + item.id" :color="titleLinkColor">
                {{ item.name }}
            </title-link>
            <br />
            {{ item.email }}
          </template>
          <template v-slot:item-inner-company_name="{ item }">
            {{ item.company.name }}
          </template>
          <template v-slot:item-inner-tags="{ item }">
            <f-chip v-for="tag in item.tags" :key="tag" :color="tagColor">
              {{ tag }}
            </f-chip>
          </template>
          <template v-slot:item-inner-level="{ item }">
            <v-select
              :items="levels"
              :value="item.level"
              menu-props="auto"
              placeholder="Level"
              hide-details
              single-line
              solo
            />
          </template>
        </f-data-table>
      `,
  methods: {
    onManage (act, item) {
      action('manage')(act, item)
    },
    onManageMultiple (act, items) {
      action('manageMultiple')(act, items)
    },
    onStatus (status, item) {
      action('status')(status, item)
      item.status = status
    }
  }
})

export const WithOneMultipleActionAndSelectorAtHeader = () => ({
  components: { FDataTable, FBtnStatus },
  data () {
    return {
      users,
      headers: [
        { text: 'Status', sortable: true, value: 'status', align: 'center' },
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
      ],
      itemActions: [
        { action: 'view', text: 'View' },
        { action: 'edit', text: 'Edit' },
        { action: 'delete', text: 'Delete' }
      ],
      multiItemActions: [
        { action: 'delete', text: 'Delete' }
      ],
      levels: [
        { text: 'Level 1', value: 1 },
        { text: 'Level 2', value: 2 },
        { text: 'Level 3', value: 3 },
        { text: 'Level 4', value: 4 }
      ]
    }
  },
  template: `
        <f-data-table
          :items="users"
          :headers="headers"
          :item-actions="itemActions"
          :multi-item-actions="multiItemActions"
          class="users-list"
          @manage="onManage"
          @manage-multiple="onManageMultiple"
        >
          <template v-slot:header-inner-status="{ items }">
            <f-btn-status 
              @input="onMultipleStatus($event, items)"
            />
          </template>
          <template v-slot:item-inner-status="{ item }">
            <f-btn-status
              :value="item.status"
              @input="onStatus($event, item)"
            />
          </template>
        </f-data-table>
      `,
  methods: {
    onManage (act, item) {
      action('manage')(act, item)
    },
    onManageMultiple (act, items) {
      action('manageMultiple')(act, items)
    },
    onStatus (status, item) {
      action('status')(status, item)
      item.status = status
    },
    onMultipleStatus (status, items) {
      action('multipleStatus')(status, items)
    }
  }
})
