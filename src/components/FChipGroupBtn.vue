<template>
  <v-menu
    :bottom="true"
    :offset-y="true"
    :width="menuWidth"
    :max-width="menuMaxWidth"
    class="f-chip-group-btn"
  >
    <template v-slot:activator="{ on }">
      <f-btn
        class="f-chip-group-btn__activator"
        v-on="on"
      >
        {{ title }}
        <v-icon
          v-if="hasTitleIcon"
          right
        >
          {{ titleIcon }}
        </v-icon>
      </f-btn>
    </template>
    <f-chip-group
      :tags="tags"
      :selected="selected"
      @input="input"
    />
  </v-menu>
</template>

<script>
import FChipGroup from './FChipGroup.vue'
import FBtn from './FBtn.vue'

export default {
  components: {
    FChipGroup,
    FBtn
  },
  props: {
    title: {
      type: String,
      required: true
    },
    menuWidth: {
      type: [String, Number],
      default: 300
    },
    menuMaxWidth: {
      type: [String, Number],
      default: 300
    },
    titleIcon: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      required: true
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasTitleIcon () {
      return this.titleIcon.length > 0
    }
  },
  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
