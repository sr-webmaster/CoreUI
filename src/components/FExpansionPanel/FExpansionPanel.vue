<template>
  <v-expansion-panel
    expand
    focusable
    :value="[expand]"
  >
    <v-expansion-panel-content>
      <template v-slot:header>
        <h3>{{ title }}</h3>
      </template>
      <v-divider />
      <v-card :class="cardClass">
        <slot />
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    cardClass: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    expand: {
      type: Boolean,
      default: true
    }
  }
}
</script>
