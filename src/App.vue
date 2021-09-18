<template>
  <v-app id="inspire">
    <component :is="layout">
      <slot />
    </component>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    layout () {
      return 'layout-' + (this.$route.meta.layout || 'default')
    }
  },
  beforeMount () {
    this.getCurrentUser()
  },
  methods: {
    ...mapActions('currentUser', ['getCurrentUser'])
  }
}
</script>

<style scoped>

</style>
