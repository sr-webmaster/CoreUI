<template>
  <div class="full-width csm-data-visibility">
    <v-card class="pa-4 pb-100">
      <v-layout
        row
        justify-space-between
      >
        <h2>Data visibility</h2>
        <v-btn
          icon
          large
          class="mr-0 mt-0 small-btn"
          @click="close"
        >
          <v-icon class="grey--text">
            far fa-times-circle
          </v-icon>
        </v-btn>
      </v-layout>
      <v-expansion-panel
        v-model="visible"
        expand
        class="mt-0 mb-3"
      >
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-btn
              flat
              small
              @click="clearAll"
            >
              clear
            </v-btn>
            <v-icon small>
              $vuetify.icons.expand
            </v-icon>
          </template>
          <template
            v-slot:header
            class="pl-0"
          >
            <div class="title">
              Active
            </div>
          </template>
          <div class="mt-4">
            <draggable v-model="visible_parameters">
              <v-layout
                v-for="(el,index) in visible_parameters"
                :key="index"
                row
                class="dotted-bottom mt-2"
              >
                <v-checkbox
                  :key="index"
                  v-model="visible_parameters"
                  :value="el"
                  :label="getParamLabel(el)"
                  color="primary"
                  class="my-0"
                  prepend-icon="fa-th"
                />
              </v-layout>
            </draggable>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel
        v-model="parameter"
        expand
        class="mt-0"
      >
        <v-expansion-panel-content>
          <template v-slot:actions>
            <v-btn
              flat
              small
              @click="clearAll"
            >
              clear
            </v-btn>
            <v-icon small>
              $vuetify.icons.expand
            </v-icon>
          </template>
          <template
            v-slot:header
            class="pl-0"
          >
            <div class="title">
              Inactive
            </div>
          </template>
          <v-text-field
            v-model="term"
            prepend-inner-icon="search"
            placeholder="Search parameter"
          />
          <div class="mt-4">
            <v-layout
              v-for="(el,index) in parameterSelectables"
              :key="index"
              row
              class="dotted-bottom mt-2"
            >
              <v-checkbox
                :key="index"
                v-model="unchecked"
                :label="el.name"
                color="secondary"
                class="my-0"
                @change="addSelected(el.id)"
              />
            </v-layout>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
    <v-layout
      row
      py-4
      :class="bgColor + ' fixed'"
    >
      <v-flex
        sm6
        class="mr-2 ml-4"
      >
        <v-btn
          block
          large
          @click="clearAll"
        >
          Clear
        </v-btn>
      </v-flex>
      <v-flex
        sm6
        class="ml-2 mr-4"
      >
        <v-btn
          block
          large
          :color="btnColor"
          @click="save"
        >
          Apply
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import reduce from 'lodash/reduce'
import filter from 'lodash/filter'
import debounce from 'lodash/debounce'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: {
    maxWidthBottomRow: {
      type: Number,
      default: 422
    },
    visibleParameters: {
      type: Array,
      required: true
    },
    parameters: {
      type: Array,
      required: true
    },
    btnColor: {
      type: String,
      default: 'primary'
    },
    bgColor: {
      type: String,
      default: 'primary'
    }
  },
  data () {
    return {
      visible: [true],
      parameter: [true],
      unchecked: false,
      visible_parameters: [...this.visibleParameters],
      term: null
    }
  },
  computed: {
    parameterSelectables () {
      return filter(this.parameters, (value) => {
        return !this.visible_parameters.includes(value.name) && (this.term == null || (this.term != null && value.label.toLowerCase().includes(this.term.toLowerCase())))
      }).map(value => ({ id: value.name, name: value.label }))
    },
    width () {
      return {
        'width': this.maxWidthBottomRow + 'px'
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    clearAll () {
      this.visible_parameters = []
    },
    save () {
      this.$emit('save', this.visible_parameters)
    },
    getParamLabel (name) {
      return reduce(this.parameters, (result, value, key) => {
        if (name === value.name) {
          result = value.label
        }
        return result
      }, '')
    },
    addSelected: debounce(function (value) {
      this.visible_parameters.push(value)
      this.unchecked = false
    }, 1)
  }
}
</script>
<style lang="styl" scoped>
    /deep/ .v-expansion-panel {
        box-shadow: none;
    }
    /deep/ .v-expansion-panel__header {
        padding-left: 0px;
        padding-right: 0px;
    }
    /deep/ .v-expansion-panel__body {
        border-top: 1px dotted #8c8b8b;
    }
    .dotted-bottom {
        border-bottom: 1px dotted #8c8b8b;
    }
    .underline {
        text-decoration: underline;
    }
    .v-card {
        border-radius: 6px 6px 0px 0px;
    }
    /deep/ .v-text-field--box.v-text-field--single-line input {
        margin-top: 0px;
    }
    /deep/ .v-input--checkbox .v-input__slot {
        margin-bottom: 0px;
    }
    .fixed-row {
        position: fixed;
        bottom: 0px;
        width: var(--max-width-bottom-row)px;
    }
    .pb-100 {
        padding-bottom: 100px !important;
    }
    .full-width {
        width: 100%;
    }
</style>
