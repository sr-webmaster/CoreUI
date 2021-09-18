<template>
  <v-footer
    :color="color"
    class="px-3 white--text"
    app
  >
    <v-layout
      row
      wrap
    >
      <span>Powered by FreshinUp</span>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'accent',
      validator (value) {
        return ['primary', 'secondary', 'accent'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style scoped>

</style>
