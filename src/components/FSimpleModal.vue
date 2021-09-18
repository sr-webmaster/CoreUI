<template>
  <v-card class="pa-3">
    <v-card-title
      class="px-0 justify-center"
    >
      <div class="title font-weight-bold">
        {{ title }}
      </div>
    </v-card-title>
    <v-divider />
    <div class="py-5 px-4 text-xs-center">
      {{ text }}
    </div>
    <v-layout
      row
    >
      <v-flex
        xs6
        offset-xs3
      >
        <v-card-actions class="px-8">
          <v-btn
            block
            color="primary"
            @click="close"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
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
      default: null,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('ok')
    }
  }
}
</script>
