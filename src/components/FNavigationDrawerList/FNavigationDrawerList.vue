<template>
  <v-list :style="cssProps">
    <template v-for="item in items">
      <v-list-group
        v-if="item.items && item.items.length > 0"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="!noActions ? item.action : undefined"
        no-action
      >
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.to || null"
          :href="subItem.link"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action v-if="!noActions">
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
      <v-list-tile
        v-else
        :key="item.title"
        :to="item.to"
        :href="item.link"
      >
        <v-list-tile-action v-if="!noActions">
          <v-icon>{{ item.action }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    noActions: {
      type: Boolean,
      default: false
    },
    backgroundActiveColor: {
      type: String,
      default: null
    },
    foregroundActiveColor: {
      type: String,
      default: null
    }
  },
  computed: {
    cssProps () {
      return {
        '--bg-color': this.backgroundActiveColor,
        '--fg-color': this.foregroundActiveColor ? this.foregroundActiveColor : this.$vuetify.theme.primary
      }
    }
  }
}
</script>

<style lang="styl" scoped>

  /deep/ .v-list__tile.v-list__tile--link.theme--light:hover,
  /deep/ .v-list__tile.v-list__tile--link.theme--light:hover .v-icon {
    background-color: var(--bg-color);
    color: var(--fg-color) !important;
  }

  /deep/ .v-list__tile--active {
    background-color: var(--bg-color);
    color: var(--fg-color) !important;
  }

  /deep/ .v-list__tile--active:hover {
    background-color: var(--bg-color);
    color: var(--fg-color) !important;
  }

</style>
