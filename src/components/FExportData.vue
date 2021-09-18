<template>
  <v-card class="f-card-export">
    <v-card-title
      v-if="title"
      class="px-0 justify-center"
    >
      <slot name="title">
        <div>
          {{ title }}
        </div>
      </slot>
    </v-card-title>
    <v-divider v-if="title" />
    <v-card-text>
      <v-form>
        <v-radio-group v-model="opt">
          <v-radio
            label="PDF"
            value="pdf"
          />
          <v-radio
            label="CSV"
            value="csv"
          />
        </v-radio-group>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="secondary"
        block
        flat
        @click="close"
      >
        Cancel
      </v-btn>

      <v-btn
        color="primary"
        block
        @click="exportData"
      >
        Export
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    option: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      opt: this.option
    }
  },
  methods: {
    exportData () {
      let { opt } = this
      this.$emit('export', { opt })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
