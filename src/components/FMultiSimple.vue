<template>
  <v-menu
    v-model="showMenu"
    offset-y
  >
    <template v-slot:activator="on">
      <v-text-field
        :value="showText"
        append-icon="fas fa-caret-down"
        readonly
        hide-details
        v-bind="$attrs"
        @click="toggleMenu(on)"
      />
    </template>
    <f-search-simple
      ref="search"
      v-model="selected"
      v-bind="$attrs"
      multiple
      not-selection
      autofocus
      :menu-props="{ value: showAutocomplete, closeOnContentClick: false }"
    />
  </v-menu>
</template>
<script>
import FSearchSimple from './FSearchSimple'

export default {
  components: {
    FSearchSimple
  },
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      showMenu: false,
      showAutocomplete: false
    }
  },
  computed: {
    selected: {
      get () {
        return this.value || []
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    showText () {
      if (this.selected instanceof Array) {
        if (this.selected.length === 0) {
          return null
        }
        return this.selected.length > 1 ? `${this.selected.length} selected` : this.selected[0].name
      }

      return null
    }
  },
  watch: {
    showMenu (value) {
      if (value) {
        setTimeout(() => {
          const input = this.$refs.search.$el.querySelector('input')
          input.focus()
          this.showAutocomplete = true
        }, 100)
      } else {
        this.showAutocomplete = false
      }
    }
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    resetTerm () {
      this.$refs.search.resetTerm()
      this.value && this.value.forEach(item => {
        this.$refs.search.cancelSelected(item[this.$attrs['results-id-key'] || 'id'])
      })
    }
  }
}
</script>
