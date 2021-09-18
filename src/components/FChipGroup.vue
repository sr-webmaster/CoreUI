<template>
  <v-card class="f-chip-group">
    <v-card-title v-if="hasTitle">
      {{ title }}
    </v-card-title>
    <v-divider v-if="hasTitle" />
    <v-card-text>
      <f-chip
        v-for="item in tagsComputed"
        :key="item.id"
        :color="isSelected(item.id) ? 'primary' : 'accent'"
        @click.prevent="changeTags(item)"
      >
        {{ item.name }}
      </f-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import remove from 'lodash/remove'
import FChip from './FChip'

export default {
  components: {
    FChip
  },
  props: {
    title: {
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
  data () {
    return {
      selectedTagsData: [...this.selected]
    }
  },
  computed: {
    hasTitle () {
      return this.title.length > 0
    },
    tagsComputed () {
      return this.tags
    }
  },
  watch: {
    selected (val) {
      this.selectedTagsData = val
    }
  },
  methods: {
    changeTags (tag) {
      if (!this.isSelected(tag.id)) {
        this.selectedTagsData.push(tag)
      } else {
        this.selectedTagsData = remove(this.selectedTagsData, function (item) {
          return !(item.id === tag.id)
        })
      }
      this.$emit('input', this.selectedTagsData)
    },
    isSelected (id) {
      return this.selectedTagsData.some(element => element.id === id)
    }
  }
}
</script>

<style lang="scss">
@import '@freshinup/core-ui/src/styles/sass/_variables';
.title {
  font-size: $fresh-typography--title-link !important;
}
.title:link {
  text-decoration: none;
}
</style>
