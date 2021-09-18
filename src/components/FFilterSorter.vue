<template>
  <v-card
    :color="color"
    class="f-filter-sorter"
    :flat="flatContainer"
  >
    <v-form v-model="valid">
      <v-container
        fluid
      >
        <slot
          name="title"
        />
        <v-layout
          row
          wrap
          class="f-filter-sorter__main-layout"
        >
          <v-flex
            v-if="!withoutFilterLabel"
            shrink
          >
            <v-card-text>Filter:</v-card-text>
          </v-flex>
          <v-flex :class="termInputClass">
            <v-text-field
              v-model="term"
              :placeholder="placeholder"
              solo
              :flat="!raised"
              :append-icon="icon"
              @input="run"
            />
          </v-flex>
          <v-flex
            v-if="sortOptions.length > 0"
            shrink
          >
            <v-select
              v-model="sort"
              :items="sortOptions"
              :label="sortLabel ? sortLabel : undefined"
              data-vv-name="sort"
              solo
              class="f-filter-sorter__sortable-select"
              :flat="!raised"
              @input="run"
            />
          </v-flex>
          <v-flex
            v-if="hasExpandedSlot"
            shrink
          >
            <f-btn
              :class="'ma-0 '"
              :color="colorAddFilterBtn"
              large
              @click="toggleExpanded"
            >
              {{ isExpanded ? 'Less' : 'More' }} Filters
            </f-btn>
          </v-flex>
          <slot
            name="filters"
            :run="run"
            :clear="clear"
          />
        </v-layout>
        <v-divider v-if="isExpanded" />
        <v-layout
          v-show="isExpanded"
          align-center
          justify-center
          row
          fill-height
          class="f-filter-sorter__expanded-layout"
        >
          <v-flex>
            <slot
              name="expanded"
              :run="run"
            />
          </v-flex>
          <v-flex class="text-no-wrap">
            <f-btn
              large
              :class="colorClearFilterBtn"
              @click="clear"
            >
              Clear Filters
            </f-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import FBtn from './FBtn'
import throttle from 'lodash/throttle'

export default {
  components: { FBtn },
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    sortLabel: {
      type: String,
      default: null
    },
    sortOptions: {
      type: Array,
      default: () => []
    },
    termInputClass: {
      type: String,
      default: 'grow'
    },
    icon: {
      type: String,
      default: ''
    },
    colorAddFilterBtn: {
      type: String,
      default: ''
    },
    colorClearFilterBtn: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Start typing to Search'
    },
    flatContainer: {
      type: Boolean,
      default: false
    },
    raised: {
      type: Boolean,
      default: false
    },
    withoutFilterLabel: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      sort: 'created_at',
      valid: false,
      term: '',
      isExpanded: this.expanded
    }
  },
  computed: {
    hasExpandedSlot () {
      return !!this.$slots['expanded'] || !!this.$scopedSlots['expanded']
    }
  },
  watch: {
    expanded (value) {
      this.isExpanded = value
    },
    deep: true
  },
  methods: {
    getRunParams () {
      return {
        term: this.term,
        orderBy: this.sort
      }
    },

    // Toggle to expand/collapse
    toggleExpanded () {
      this.isExpanded = !this.isExpanded
      this.$emit(this.isExpanded ? 'expanded' : 'collapsed')
    },

    // Expand to show more options
    expand () {
      this.isExpanded = true
      this.$emit('expanded')
    },

    // Collapse more options
    collapse () {
      this.isExpanded = false
      this.$emit('collapsed')
    },

    // Search term change
    termChange (val) {
      this.term = val
      this.run()
    },

    clear () {
      this.term = ''
      this.$emit('clear', this.getRunParams())
    },

    // Run the filter
    run: throttle(function () {
      this.$emit('run', this.getRunParams())
    }, 500)
  }
}
</script>

<style lang="styl" scoped>
  .f-filter-sorter__expanded-layout{
    align-items: flex-end;
  }
  .f-filter-sorter__expanded-layout>.flex.text-no-wrap>.v-btn{
    margin: 0;
    height: 48px;
  }
</style>
