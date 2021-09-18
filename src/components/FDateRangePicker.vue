<template>
  <div class="picker-wrap">
    <vue-ctk-date-time-picker
      class="no-border"
      :value="value"
      v-bind="$attrs"
      no-clear-button
      @input="value => $emit('input', value)"
    />
    <div class="picker-icon">
      <v-icon>
        far fa-calendar-alt
      </v-icon>
    </div>
  </div>
</template>

<script>
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

export default {
  components: {
    VueCtkDateTimePicker
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [ String, Object ],
      default: null
    }
  }
}
</script>
<style lang="styl" scoped>
.picker-wrap{
  position: relative;
}
.picker-icon{
  position: absolute;
  right: 10px;
  top: 0;
  height: 48px;
  display: flex;
  align-items: center;
  pointer-events:none;
}
/deep/ .no-border input.field-input{
  border: none !important;
}
</style>
