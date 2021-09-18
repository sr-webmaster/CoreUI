<template>
  <div>
    <f-btn
      :color="color"
      :dark="dark"
      :flat="flat"
      light
      @click="toggle"
    >
      <v-icon
        dark
      >
        <template v-if="isOpening">
          keyboard_arrow_down
        </template>
        <template v-else>
          keyboard_arrow_right
        </template>
      </v-icon>
      <span v-if="isOpening">{{ openText }}</span>
      <span v-else>{{ closeText }}</span>
    </f-btn>
    <div v-show="isOpening">
      <slot />
    </div>
  </div>
</template>

<script>
import FBtn from './FBtn.vue'

export default {
  components: { FBtn },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      required: false
    },
    flat: {
      type: Boolean,
      required: false
    },
    color: {
      type: String,
      default: ''
    },
    openText: {
      type: String,
      default: ''
    },
    closeText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOpening: this.isOpen
    }
  },
  methods: {
    toggle () {
      this.isOpening = !this.isOpening
      this.$emit('change', this.isOpening)
    }
  }
}
</script>
