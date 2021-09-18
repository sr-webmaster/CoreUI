<template>
  <v-menu
    ref="menu"
    v-model="isOpen"
    :close-on-content-click="false"
    transition="scale-transition"
    :return-value.sync="date"
    offset-y
    full-width
    min-width="80px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="dateFormatted"
        :label="label"
        :outline="outline"
        :solo="solo"
        :flat="flat"
        :prepend-icon="prependIcon"
        :prepend-inner-icon="prependInnerIcon"
        :append-icon="appendIcon"
        :append-outer-icon="appendOuterIcon"
        readonly
        v-on="on"
      />
    </template>
    <vue-ctk-date-time-picker
      v-model="date"
      only-date
      inline
      :no-header="noTitle"
      :label="label"
      :auto-close="false"
      :color="$vuetify.theme.primary"
      :button-color="$vuetify.theme.primary"
      @input="immediate ? save(date) : null"
    />
    <template v-if="!immediate">
      <v-layout row>
        <v-spacer />
        <v-btn
          flat
          small
          @click="isOpen = false"
        >
          Cancel
        </v-btn>
        <v-btn
          flat
          small
          color="primary"
          @click="save(date)"
        >
          OK
        </v-btn>
      </v-layout>
    </template>
  </v-menu>
</template>

<script>
import FormatDate from '../../mixins/FormatDate'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
export default {
  components: {
    VueCtkDateTimePicker
  },
  mixins: [FormatDate],
  props: {
    noTitle: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, null],
      default: 'Select Date'
    },
    value: {
      type: [String, Date],
      default: null
    },
    format: {
      type: String,
      default: null
    },
    immediate: {
      type: Boolean,
      default: false
    },
    prependIcon: {
      type: [String, null],
      default: null
    },
    prependInnerIcon: {
      type: String,
      default: null
    },
    appendIcon: {
      type: String,
      default: null
    },
    appendOuterIcon: {
      type: String,
      default: null
    },
    outline: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false,
      date: this.dateFormatted
    }
  },
  computed: {
    dateFormatted () {
      return this.format ? this.formatDate(this.value, this.format) : this.formatDate(this.value)
    }
  },
  methods: {
    save (value) {
      this.$refs.menu.save(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style>
</style>
