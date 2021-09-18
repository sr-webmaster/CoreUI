<template>
  <v-card class="simple-confirm pa-3">
    <v-card-title
      class="px-0 justify-center"
    >
      <slot name="title">
        <div class="title font-weight-bold">
          {{ title }}
        </div>
      </slot>
    </v-card-title>
    <v-divider />

    <slot>
      <div class="py-5 px-4 text-xs-center">
        {{ text }}
      </div>
    </slot>

    <v-card-actions class="px-8">
      <v-btn
        block
        color="light"
        @click="$emit('cancel')"
      >
        {{ cancelLabel }}
      </v-btn>
      <v-spacer />
      <v-btn
        block
        color="primary"
        @click="close"
      >
        {{ okLabel }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    text: {
      type: String,
      default: null
    },
    okLabel: {
      type: String,
      default: 'Ok'
    },
    cancelLabel: {
      type: String,
      default: 'Cancel'
    }
  },
  methods: {
    close () {
      this.$emit('ok')
    }
  }
}
</script>
