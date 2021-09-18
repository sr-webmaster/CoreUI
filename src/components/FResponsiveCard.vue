<template>
  <f-expansion-panel
    v-if="$vuetify.breakpoint.xsOnly"
    :title="title"
    :card-class="cardClass"
  >
    <slot />
  </f-expansion-panel>

  <v-card
    v-else
    :class="cardClass"
  >
    <slot />
  </v-card>
</template>

<script>
import FExpansionPanel from '@freshinup/core-ui/src/components/FExpansionPanel'
export default {
  components: {
    FExpansionPanel
  },
  props: {
    cardClass: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
