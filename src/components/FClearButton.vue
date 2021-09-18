<template>
  <v-btn
    flat
    icon
    v-bind="$attrs"
    depressed
    class="mr-0"
    @click="clickButton"
  >
    <v-icon class="clear-button-icon">
      fa fa-times
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    clickButton () {
      this.$emit('clear')
    }
  }
}
</script>
<style lang="styl" scoped>
  .clear-button-icon {
    font-size: 10px;
  }
  .v-btn--icon {
    width: 10px !important;
    height: 10px !important;
  }
</style>
