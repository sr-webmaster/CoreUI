<template>
  <v-menu
    v-model="isOpen"
    v-bind="$attrs"
    offset-y
    :disabled="isDisabled"
    v-on="$listeners"
  >
    <template v-slot:activator="{ on }">
      <f-btn
        :color="btnColor"
        :dark="!isDisabled"
        :disabled="isDisabled"
        v-on="on"
      >
        <slot>Menu</slot>
        <v-icon
          v-if="items.length"
          right
          dark
        >
          <template v-if="isOpen">
            arrow_drop_up
          </template>
          <template v-else>
            arrow_drop_down
          </template>
        </v-icon>
      </f-btn>
    </template>
    <v-list>
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('item', item)"
      >
        <v-list-tile-title>{{ item[itemLabel] }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import FBtn from './FBtn.vue'

export default {
  components: { FBtn },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    itemLabel: {
      type: String,
      default: 'label'
    }
  },
  data: () => ({
    isOpen: false
  }),
  computed: {
    isDisabled () {
      return !this.items.length
    }
  }
}
</script>
