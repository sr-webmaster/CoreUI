<template>
  <div :class="`${color}--text`">
    <span class="no-wrap font-weight-bold">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style>
  .no-wrap{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
