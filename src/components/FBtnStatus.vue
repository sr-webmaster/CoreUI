<template>
  <f-btn-menu
    :items="items"
    :btn-color="color"
    @item="itemSelected"
  >
    {{ label }}
  </f-btn-menu>
</template>

<script>
import FBtnMenu from './FBtnMenu.vue'
import get from 'lodash/get'

export const DEFAULT_STATUSES = [
  {
    id: 'active',
    label: 'Active',
    color: 'success'
  },
  {
    id: 'inactive',
    label: 'Inactive',
    color: 'error'
  },
  {
    id: 'hold',
    label: 'Hold',
    color: 'warning'
  },
  {
    id: 'pending',
    label: 'Pending',
    color: 'warning'
  }
]

export default {
  components: { FBtnMenu },
  props: {
    value: {
      type: String,
      default: 'active'
    },
    items: {
      type: Array,
      default: () => DEFAULT_STATUSES
    }
  },
  computed: {
    activeItem () {
      return this.items.find(item => `${item.id}` === (`${this.value}`).toLowerCase())
    },
    color () {
      return get(this, 'activeItem.color', 'warning')
    },
    label () {
      return get(this, 'activeItem.label', 'Pending')
    }
  },
  methods: {
    itemSelected (item) {
      this.$emit('input', `${item.id}`)
    }
  }
}
</script>
