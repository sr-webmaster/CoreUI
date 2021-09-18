<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :placeholder="placeholder"
    :clearable="!notClearable"
    :hide-no-data="!isNoDataAllowed"
    hide-details
    :item-text="resultsTextKey"
    :item-value="resultsIdKey"
    :multiple="multiple"
    label=""
    return-object
    v-bind="$attrs"
    v-on="$listeners"
    @input.native="termUpdate"
  >
    <template
      v-if="multiple"
      v-slot:prepend-item
    >
      <v-list-tile v-show="model && model.length > 0">
        <span class="search-section-title">SELECTION</span>
      </v-list-tile>
      <v-list-tile
        v-for="selectedItem in model"
        :key="selectedItem[resultsIdKey]"
        ripple
        @click="cancelSelected(selectedItem[resultsIdKey])"
      >
        <v-list-tile-action>
          <v-icon color="primary">
            fa-check-square
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ selectedItem.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-show="items.length > 0">
        <span class="search-section-title">RESULTS</span>
      </v-list-tile>
    </template>
    <template
      v-if="multiple && notSelection"
      v-slot:selection="{ item, index }"
    >
      <span />
    </template>
  </v-autocomplete>
</template>

<script>
import throttle from 'lodash/throttle'
import size from 'lodash/size'
import get from 'lodash/get'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    /**
     * Filter Property name
     */
    termParam: {
      type: String,
      default: 'term'
    },
    autocomplete: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Start typing to Search'
    },
    statusParam: {
      type: String,
      default: 'status'
    },
    resultsTextKey: {
      type: String,
      default: 'name'
    },
    resultsIdKey: {
      type: String,
      default: 'id'
    },
    showNoData: {
      type: Boolean,
      default: false
    },
    notClearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    notSelection: {
      type: Boolean,
      default: false
    },
    value: {
      type: [ String, Array ],
      default: null
    },
    /**
     * Search on Value Change (reactive to Value) - this is a precursor for Strangle Vine
     */
    fetchOnValueChange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    let defaultTerm = null
    if (this.$attrs['init-val']) {
      for (let i in this.$attrs['init-items']) {
        if (this.$attrs['init-items'][i][this[this.resultsIdKey]] === this.$attrs['init-val']) {
          defaultTerm = this.$attrs['init-items'][i][this.resultsTextKey]
        }
      }
    }

    return {
      descriptionLimit: 60,
      results: this.$attrs['init-items'] || [],
      isLoading: false,
      model: this.$attrs['init-val'] || null,
      term: defaultTerm,
      termCancelToken: null,
      lastSearchTerm: defaultTerm
    }
  },
  computed: {
    isNoDataAllowed () {
      return this.showNoData && (size(this.term) > 0 || size(this.model) > 0)
    },
    items () {
      if (!this.results) {
        return []
      }
      return this.results.map(result => {
        const label = result[this.resultsTextKey].length > this.descriptionLimit
          ? result[this.resultsTextKey].slice(0, this.descriptionLimit) + '...'
          : result[this.resultsTextKey]
        return Object.assign({}, result, { label })
      })
    }
  },
  watch: {
    term (val) {
      this.$emit('termChange', val)
      if (this.autocomplete) this.onTermChange(val)
    },
    model (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (this.fetchOnValueChange) {
        this.fetchWithIdKey(val)
      }
    }
  },
  beforeMount () {
    this.fetchWithIdKey(this.value)
  },
  methods: {
    // Update term
    termUpdate (event) {
      this.term = event.target.value
    },

    resetTerm () {
      this.term = ''
    },

    cancelSelected (value) {
      this.model = this.model.filter(item => item[this.resultsIdKey] !== value)
    },

    onTermChange: throttle(function () {
      this.fetch(this.term)
    }, 300),

    fetchWithIdKey (value) {
      // Empty value
      if (!value || value.length === 0) {
        return
      }

      if (!this.$http) {
        console.error('FSearchSimple cannot fetch without vue-axios plugin installed')
        return
      }

      // Build params
      let status = 1
      let params = {}
      if (value instanceof Array) {
        params['filter[' + this.resultsIdKey + ']'] = value.map(item => item[this.resultsIdKey])
      } else {
        params['filter[' + this.resultsIdKey + ']'] = value
      }
      params[this.statusParam] = status
      this.isLoading = true
      this.$http.get(this.url, {
        params
      })
        .then(response => {
          this.results = get(response, 'data.data', [])
          if (this.results.length > 0) {
            this.model = this.multiple ? this.results : this.results[0]
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => (this.isLoading = false))
    },

    // Load search
    fetch (value) {
      if (!this.$http) {
        console.error('FSearchSimple cannot fetch without vue-axios plugin installed')
        return
      }

      const term = value || this.term
      // Empty term
      if (!term) {
        this.results = []
        return
      }

      let CancelToken = this.$http.CancelToken

      // Skip the search
      if (this.lastSearchTerm === term) return

      // Set the last term
      this.lastSearchTerm = term

      // Cancel any existing requests
      if (this.termCancelToken !== null) this.termCancelToken()

      // Build params
      let status = 1
      let params = {}
      params[this.termParam] = term
      params[this.statusParam] = status
      this.isLoading = true
      return this.$http.get(this.url, {
        params,
        cancelToken: new CancelToken(function executor (c) {
          this.termCancelToken = c
        }.bind(this))
      })
        .then(response => {
          this.results = response.data.data
          this.isLoading = false
        })
        .catch(err => {
          console.error(err)
          this.isLoading = false
        })
    }
  }
}
</script>
