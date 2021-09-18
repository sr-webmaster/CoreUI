<template>
  <a
    v-bind="$attrs"
    :class="'title ' + color + '--text text-truncate'"
    v-on="$listeners"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@freshinup/core-ui/src/styles/sass/_variables';
  .title {
    font-size: $fresh-typography--title-link !important;
  }
  .title:link {
    text-decoration: none;
  }
</style>
