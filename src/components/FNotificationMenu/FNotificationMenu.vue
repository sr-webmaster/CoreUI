<template>
  <v-card>
    <v-list>
      <v-list-tile
        v-if="notifications.length"
        class="clear-tile"
      >
        <v-list-tile-avatar />
        <v-list-tile-content />
        <v-list-tile-action>
          <v-btn
            icon
            title="Dismiss all notifications..."
            @click.prevent="dismissAll"
          >
            <v-icon class="grey--text">
              clear_all
            </v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <template v-for="notification in notifications">
        <v-divider :key="'divider-' + notification.id" />
        <v-list-tile
          :key="notification.id"
          avatar
          :href="notification.route"
        >
          <v-list-tile-avatar>
            <v-icon class="secondary white--text">
              {{ notification.icon }}
            </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-sub-title
              class="notification-headline"
              :title="headline(notification)"
            >
              {{ headline(notification) }}
            </v-list-tile-sub-title>
            <v-list-tile-title class="notification-label secondary--text">
              {{ notification.title }}
            </v-list-tile-title>
            <v-list-tile-sub-title class="notification-msg">
              {{ notification.msg }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              title="Dismiss notification..."
              @click.prevent="dismiss(notification)"
            >
              <v-icon class="grey--text">
                fas fa-times
              </v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

/**
 * Please note that without Semver Major change we will introduce a breaking change to this component soon.
 *  **Do not use directly** Use only indirectly through the Core UI Layouts
 */
export default {
  props: {
    interval: {
      type: Number,
      default: 60000
    }
  },
  data: () => ({
    fetchInterval: null
  }),
  computed: {
    ...mapGetters('userNotifications', { 'notifications': 'unacknowledged' })
  },
  watch: {
    '$store.getters.currentUser': function () {
      this.fetchNotifications()
    }
  },
  beforeMount () {
    this.fetchNotifications()
    this.fetchInterval = setInterval(this.fetchNotifications, this.interval)
  },
  methods: {
    headline (notification) {
      let parts = []
      if (notification.created_at) parts.push(notification.created_at)
      if (notification.event) parts.push(notification.event)
      return parts.join(' • ')
    },

    fetchNotifications () {
      if (!this.interval || !this.$store.getters.currentUser || !this.$store.getters.currentUser.id) return 'cannot fetch'
      this.$store.dispatch('userNotifications/setFilters', {
        acknowledged: 0
      })
      this.$store.dispatch('userNotifications/getItems', {
        params: {
          userId: this.$store.getters.currentUser.id
        }
      })
    },

    dismiss (notification) {
      this.dismissMultiple([notification])
    },
    dismissAll () {
      this.dismissMultiple(this.notifications)
    },
    dismissMultiple (notification) {
      for (let i in notification) {
        this.$store.dispatch('userNotifications/acknowledgeItem', {
          params: {
            userId: this.$store.getters.currentUser.id,
            id: notification[i].id
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .notification-headline, .notification-msg {
    font-size: 12px;
  }
  .notification-headline {
    overflow: initial;
    white-space: initial;
  }
  .notification-msg {
    overflow: initial;
    white-space: initial;
  }

  .notification-label {
    height: auto;
    overflow: initial;
    white-space: initial;
    font-size: 14px;
  }

  /deep/ .v-list {
    padding: 0;
  }

  /deep/ .v-list__tile {
    height: auto;
    padding: 12px;
    align-items: start;
  }
  /deep/ .clear-tile .v-list__tile {
    padding: 2px 12px;
    align-items: center;
  }

  /deep/ .v-list__tile__avatar {
    min-width: auto;
    padding-right: 10px;
  }

  /deep/ .v-list__tile__action {
    min-width: auto ;
    padding-left: 12px;
  }
  /deep/ .v-list__tile__action i {
    font-size: 14px;
  }
</style>
