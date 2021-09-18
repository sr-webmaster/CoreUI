<template>
  <v-btn-toggle
    v-bind="$attrs"
    class="f-page__toggle-button f-page__toggle-button--admin"
    v-on="$listeners"
  >
    <v-btn
      class="f-page__button-previous pr-4"
      :color="color"
      @click="previousStage"
    >
      <v-icon
        dark
        left
      >
        mdi-chevron-left
      </v-icon>PREV
    </v-btn>
    <v-btn
      class="f-page__button-next pl-4"
      :color="color"
      @click="nextStage"
    >
      NEXT<v-icon
        dark
        right
      >
        mdi-chevron-right
      </v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    nextStage () {
      this.$emit('nextStage')
    },
    previousStage () {
      this.$emit('previousStage')
    }
  }
}
</script>

<style lang="scss" scoped>
  .f-page__button-previous {
    border-top-left-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
  }
  .f-page__button-next {
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
  }
  .f-page__toggle-button {
    background: transparent !important;
    box-shadow: none !important;
  }
</style>
