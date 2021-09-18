<template>
  <v-select
    :value="value"
    :items="items"
    v-bind="$attrs"
    multiple
    @input="value => $emit('input', value)"
  >
    <template v-slot:prepend-item>
      <v-list-tile
        ripple
        @click="toggle"
      >
        <v-list-tile-action>
          <v-icon :color="value && value.length > 0 ? 'primary' : ''">
            {{ icon }}
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ selectAllName }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2" />
    </template>
    <template v-slot:selection="{ item, index }">
      <div
        v-if="index === 0"
        class="nowrap"
      >
        <span v-if="value && value.length === items.length">{{ selectAllName }}</span>
        <span v-else-if="value && value.length > 1">{{ value.length }} selected</span>
        <span v-else>{{ item[$attrs['item-text']] }}</span>
      </div>
    </template>
  </v-select>
</template>
<script>
export default {
  props: {
    value: {
      type: [ Object, Array ],
      default: () => []
    },
    items: {
      type: Array,
      required: true
    },
    selectAllName: {
      type: String,
      default: 'All Options'
    }
  },
  computed: {
    selectAll () {
      return this.value && this.value.length === this.items.length
    },
    selectSome () {
      return this.value && this.value.length > 0 && !this.selectAll
    },
    icon () {
      if (this.selectAll) return 'fa-check-square'
      if (this.selectSome) return 'fa-minus-square'
      return 'far fa-square'
    }
  },
  methods: {
    toggle () {
      this.$nextTick(() => {
        if (this.selectAll) {
          this.$emit('input', [])
        } else {
          this.$emit('input', this.items.map(item => item.id))
        }
      })
    }
  }
}
</script>
<style>
.nowrap{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
