<template>
  <f-btn
    v-if="items.length === 1"
    :color="btnColor"
    @click="$emit('item', items[0])"
  >
    {{ items[0][itemLabel] }}
  </f-btn>
  <f-btn-menu
    v-else
    :items="items"
    :item-label="itemLabel"
    :btn-color="btnColor"
    @item="$emit('item', $event)"
  >
    Manage Multiple
  </f-btn-menu>
</template>

<script>
import FBtn from './FBtn.vue'
import FBtnMenu from './FBtnMenu.vue'

export default {
  components: { FBtn, FBtnMenu },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    itemLabel: {
      type: String,
      default: 'label'
    }
  }
}
</script>
