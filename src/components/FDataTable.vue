<template>
  <div>
    <v-data-table
      v-model="selected"
      v-bind="$attrs"
      class="ui-datatable elevation-1"
      :headers="headers"
      :items="items"
      :rows-per-page-items="[5, 10, 15, 25, 30, 50]"
      :pagination.sync="pagination"
      :loading="isLoading"
      :total-items="totalItems"
      item-key="id"
      hide-actions
      select-all
      must-sort
      v-on="$listeners"
    >
      <v-progress-linear
        slot="progress"
        indeterminate
        height="10"
      />

      <template
        slot="headerCell"
        slot-scope="props"
      >
        <f-manage-multiple
          v-if="selected.length > 1 && props.header.value === 'manage'"
          :items="multiItemActions"
          item-label="text"
          @item="manageMultiple($event, selected)"
        />

        <slot
          v-else-if="selected.length > 1"
          :name="'header-inner-'+props.header.value"
          :items="selected"
        >
          {{ props.header.text }}
        </slot>

        <span v-else>
          {{ props.header.text }}
        </span>
      </template>

      <template
        slot="items"
        slot-scope="props"
      >
        <td>
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          />
        </td>
        <template
          v-for="(header, headerIndex) in headers"
        >
          <slot
            v-if="header.value === 'id'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                {{ props.item.id }}
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'manage'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="justify-center text-xs-center"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <f-btn-menu
                  :items="itemActions"
                  item-label="text"
                  @item="manage($event, props.item)"
                >
                  Manage
                </f-btn-menu>
              </slot>
            </td>
          </slot>
          <slot
            v-else
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              :class="'text-xs-' + header.align"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                {{ props.item[header.value] }}
              </slot>
            </td>
          </slot>
        </template>
      </template>
    </v-data-table>
    <v-layout
      align-center
    >
      <v-flex
        grow
        justify-center
      >
        <v-layout
          justify-center
        >
          <v-pagination
            :value="page"
            :length="pagination.totalPages"
            :disabled="isLoading"
            :total-visible="6"
            @input="onPageChange"
          />
        </v-layout>
      </v-flex>
      <v-flex
        shrink
      >
        <v-select
          :value="rowsPerPage"
          :items="rowsPerPageItems"
          label="Results Per Page"
          @input="onRowsPerPageChange"
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Pagination from '../mixins/Pagination'
import FormatDate from '../mixins/FormatDate'
import FBtnMenu from './FBtnMenu'
import FManageMultiple from './FManageMultiple'

export const DEFAULT_HEADERS = [
  { text: 'ID', sortable: false, value: 'id', align: 'center' },
  { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
]
export const DEFAULT_ITEM_ACTIONS = [
  { action: 'view', text: 'View' },
  { action: 'edit', text: 'Edit' },
  { action: 'delete', text: 'Delete' }
]
export const DEFAULT_MULTI_ITEM_ACTIONS = [
  { action: 'delete', text: 'Delete' },
  { action: 'edit', text: 'Edit' }
]
export default {
  components: { FBtnMenu, FManageMultiple },
  mixins: [
    Pagination,
    FormatDate
  ],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => (DEFAULT_HEADERS)
    },
    itemActions: {
      type: Array,
      default: () => (DEFAULT_ITEM_ACTIONS)
    },
    multiItemActions: {
      type: Array,
      default: () => (DEFAULT_MULTI_ITEM_ACTIONS)
    }
  },
  data () {
    return {
      selected: [],
      actionBtnTitle: 'Manage'
    }
  },
  computed: {
    selectedUserActions () {
      if (!this.selected.length) return []
      let actions = []
      actions.push({ action: 'delete', text: 'Delete' })
      return actions
    }
  },
  methods: {
    onPageChange (value) {
      this.pagination = { ...this.pagination, page: value }
    },
    onRowsPerPageChange (value) {
      this.pagination = { ...this.pagination, rowsPerPage: value }
    },
    manage (actionItem, item) {
      this.$emit('manage-' + actionItem.action, item)
      this.$emit('manage', actionItem.action, item)
    },
    manageMultiple (actionItem, items) {
      this.$emit('manage-multiple-' + actionItem.action, items)
      this.$emit('manage-multiple', actionItem.action, items)
    }
  }
}
</script>

<style scoped lang="scss">
  .fresh-bus-admin-user-list {
    &__joined_date {
      white-space: nowrap;
    }
  }
  .highlight {
    background: #ffa;
  }
</style>
