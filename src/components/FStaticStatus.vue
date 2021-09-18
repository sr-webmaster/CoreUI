<template>
  <span
    class="v-btn v-btn--disabled"
    :class="colorClass"
  >{{ label }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 'active'
    },
    statuses: {
      type: Array,
      default: () => [
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
    }
  },
  data () {
    return {
      items: this.statuses
    }
  },
  computed: {
    activeItem () {
      for (let i in this.items) {
        if (this.items[i].id === this.value) return this.items[i]
      }
      return null
    },
    color () {
      return !this.activeItem ? 'warning' : this.activeItem.color
    },
    label () {
      if (!this.activeItem) return 'Pending'
      if (this.activeItem.name) return this.activeItem.name
      return this.activeItem.label
    },
    colorClass () {
      return this.color + ' ' + this.color + 'text--text'
    }
  }
}
</script>
