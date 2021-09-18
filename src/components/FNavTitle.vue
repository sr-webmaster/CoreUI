<template>
  <v-list-tile
    v-bind="$attrs"
    :active-class="colorClass"
    v-on="$listeners"
  >
    <!-- Pass on all named slots -->
    <slot
      v-for="slot in Object.keys($slots)"
      :slot="slot"
      :name="slot"
    />

    <!-- Pass on all scoped slots -->
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </v-list-tile>
</template>

<script>
import Colorable from '@freshinup/core-ui/src/mixins/Colorable'
export default {
  mixins: [Colorable]
}
</script>
