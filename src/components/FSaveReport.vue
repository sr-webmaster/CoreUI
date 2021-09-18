<template>
  <v-card class="pa-3">
    <v-card-title
      v-if="title"
      class="px-0 justify-center"
    >
      <slot name="title">
        <div class="title font-weight-bold">
          {{ title }}
        </div>
      </slot>
    </v-card-title>
    <v-divider v-if="title" />
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="name"
          label="Report name"
        />
        <v-select
          v-if="!hideModifiers"
          v-model="modifierOne"
          :items="itemsOne"
          item-text="name"
          item-value="id"
          label="Modifier 1"
        />
        <v-select
          v-if="!hideModifiers"
          v-model="modifierTwo"
          :items="itemsTwo"
          item-text="name"
          item-value="id"
          label="Modifier 2"
        />
        <v-checkbox
          v-if="!hideSaveFeature"
          v-model="isFeatured"
          label="Save as Featured"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <f-btn
        color="secondary"
        block
        flat
        @click="close"
      >
        Cancel
      </f-btn>
      <v-spacer />
      <f-btn
        color="primary"
        block
        @click="save"
      >
        Save
      </f-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FBtn from './FBtn'
export default {
  components: {
    FBtn
  },
  props: {
    title: {
      type: String,
      default: null
    },
    itemsOne: {
      type: Array,
      default: null
    },
    itemsTwo: {
      type: Array,
      default: null
    },
    hideSaveFeature: {
      type: Boolean,
      default: false
    },
    hideModifiers: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: null,
      modifierOne: null,
      modifierTwo: null,
      isFeatured: false
    }
  },
  methods: {
    save () {
      let { name, modifierOne, modifierTwo, isFeatured } = this
      this.$emit('save', { name, modifier_1_id: modifierOne, modifier_2_id: modifierTwo, isFeatured })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
