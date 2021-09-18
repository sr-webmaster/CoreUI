import { MAIN } from '../../../.storybook/categories'
import FExpansionPanel from './FExpansionPanel.vue'

export default {
  title: `${MAIN}|FExpansionPanel`,
  id: 'FExpansionPanel',
  decorators: [
    () => ({
      template: `
        <v-container><story /></v-container>
      `
    })
  ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const WithTitleAndContent = () => ({
  data: () => ({
    items: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
    ]
  }),
  components: {
    FExpansionPanel
  },
  template: `
    <f-expansion-panel title="My Drive">
      <v-card-text>
        <v-list two-line>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn
          flat
          color="orange"
        >
          Share
        </v-btn>
        <v-btn
          flat
          color="orange"
        >
          Explore
        </v-btn>
      </v-card-actions>
    </f-expansion-panel>
  `
})

export const ExpandFalse = () => ({
  data: () => ({
    items: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
    ]
  }),
  components: {
    FExpansionPanel
  },
  template: `
    <f-expansion-panel title="My Drive" :expand="false">
      <v-card-text>
        <v-list two-line>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn
          flat
          color="orange"
        >
          Share
        </v-btn>
        <v-btn
          flat
          color="orange"
        >
          Explore
        </v-btn>
      </v-card-actions>
    </f-expansion-panel>
  `
})

export const NoTitle = () => ({
  data: () => ({
    items: [
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
      { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
    ]
  }),
  components: {
    FExpansionPanel
  },
  template: `
    <f-expansion-panel>
      <v-card-text>
        <v-list two-line>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            avatar
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn
          flat
          color="orange"
        >
          Share
        </v-btn>
        <v-btn
          flat
          color="orange"
        >
          Explore
        </v-btn>
      </v-card-actions>
    </f-expansion-panel>
  `
})
