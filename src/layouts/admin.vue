<template>
  <div>
    <slot name="navigation-drawer">
      <v-navigation-drawer
        v-model="isDrawerOpen"
        :clipped="isClipped"
        :mini-variant="typeof isMini === 'boolean' ? isMini : false"
        :dark="typeof isDark === 'boolean' ? isDark : true"
        :color="typeof isDark === 'boolean' ? '' : 'white'"
        :width="typeof hideIcons === 'boolean' && hideIcons === true ? 200 : 300"
        disable-resize-watcher
        stateless
        app
      >
        <f-navigation-drawer-list
          :items="items"
          :no-actions="typeof hideIcons === 'boolean' ? hideIcons : false"
          :background-active-color="backgroundActiveColor"
          :foreground-active-color="foregroundActiveColor"
        />
      </v-navigation-drawer>
    </slot>
    <slot name="navigation-top">
      <v-toolbar
        fixed
        app
        :clipped-left="isClipped"
      >
        <v-toolbar-side-icon @click.stop="isDrawerOpen = !isDrawerOpen" />
        <v-toolbar-title>
          <v-flex>
            <v-img
              contain
              height="38"
              width="178"
              position="left center"
              :src="logo"
            />
          </v-flex>
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-show="notifications"
          left
          offset-y
          max-width="320"
          origin="right top"
          :disabled="!notifications.length"
        >
          <v-btn
            slot="activator"
            icon
            flat
            :disabled="!notifications.length"
          >
            <v-badge
              color="red"
              overlap
            >
              <span
                v-if="notifications.length"
                slot="badge"
              >
                {{ notifications.length }}
              </span>
              <v-icon
                medium
                color="grey darken-2"
              >
                notifications
              </v-icon>
            </v-badge>
          </v-btn>

          <f-notification-menu
            v-if="!!notificationsFetchInterval"
            :interval="notificationsFetchInterval"
          />
        </v-menu>
        <v-menu
          v-if="currentUser"
          left
          offset-y
          content-class="user-menu"
          max-width="300"
        >
          <v-btn
            slot="activator"
            icon
            flat
            class="avatar"
          >
            <f-user-avatar
              :user="currentUser"
              :size="34"
              :is-dark="isDark"
            />
          </v-btn>

          <f-user-menu
            :user="currentUser"
            :user-is-admin="isCurrentUserAdmin"
            :menu-items="userMenuItems"
            :consumer-view="isConsumerViewAvailable"
            :user-field="displayedUserField"
            :hide-level="hideUserLevel"
            @signout="signout"
          />
        </v-menu>
      </v-toolbar>
    </slot>
    <v-content>
      <slot>
        <v-layout
          v-if="isLoading"
          column
          align-center
        >
          <v-progress-linear
            class="my-0"
            :indeterminate="true"
            :color="loadingColor"
            :height="loadingHeight"
          />
          <h2 :class="`${loadingColor}-text`">
            Loading ... Please Wait
          </h2>
        </v-layout>
        <router-view v-show="!isLoading" />
      </slot>
    </v-content>
    <slot name="messages">
      <v-snackbar
        v-model="isVisible"
        color="error"
        :timeout="6000"
        top
      >
        {{ errorMessages }}
        <v-btn
          dark
          flat
          @click="setErrorVisibility(false)"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="isMessageVisible"
        color="success"
        :timeout="6000"
        top
      >
        {{ message }}
        <v-btn
          dark
          flat
          @click="setMessageVisibility(false)"
        >
          Close
        </v-btn>
      </v-snackbar>
    </slot>
    <slot name="footer">
      <f-footer :color="footerColor" />
    </slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import FUserAvatar from '@freshinup/core-ui/src/components/FUserAvatar'
import FUserMenu from '@freshinup/core-ui/src/components/FUserMenu'
import FNavigationDrawerList from '@freshinup/core-ui/src/components/FNavigationDrawerList'
import FNotificationMenu from '@freshinup/core-ui/src/components/FNotificationMenu'
import FFooter from '@freshinup/core-ui/src/components/FFooter'

const generalErrorMessageFields = createHelpers({
  getterType: 'generalErrorMessages/getField',
  mutationType: 'generalErrorMessages/updateField'
}).mapFields

const generalMessageFields = createHelpers({
  getterType: 'generalMessage/getField',
  mutationType: 'generalMessage/updateField'
}).mapFields

const navigationAdminFields = createHelpers({
  getterType: 'navigationAdmin/getField',
  mutationType: 'navigationAdmin/updateField'
}).mapFields

export default {
  components: {
    FUserMenu,
    FNavigationDrawerList,
    FNotificationMenu,
    FFooter,
    FUserAvatar
  },
  computed: {
    ...generalErrorMessageFields([
      'isVisible'
    ]),
    ...navigationAdminFields({
      isDrawerOpen: 'isDrawerOpen',
      isClipped: 'isClipped'
    }),
    ...generalMessageFields({
      isMessageVisible: 'isVisible'
    }),
    ...mapState('navigationAdmin', [
      'items',
      'logo',
      'isDark',
      'isMini',
      'hideIcons',
      'backgroundActiveColor',
      'foregroundActiveColor',
      'footerColor'
    ]),
    ...mapGetters('generalErrorMessages', {
      errorMessages: 'errorMessages'
    }),
    ...mapGetters('generalMessage', {
      message: 'message'
    }),
    ...mapGetters(['currentUser']),
    ...mapGetters('currentUser', {
      isCurrentUserAdmin: 'isAdmin'
    }),
    ...mapState('navigation', {
      userMenuItems: state => state.userMenuItems,
      isConsumerViewAvailable: state => state.isConsumerViewAvailable,
      hideUserLevel: state => state.hideUserLevel,
      displayedUserField: state => state.displayedUserField
    }),
    ...mapGetters(['currentUser']),
    ...mapGetters('userNotifications', {
      notifications: 'unacknowledged'
    }),
    ...mapState('userNotifications', {
      notificationsFetchInterval: 'fetchInterval'
    }),
    ...mapState('page', [
      'isLoading',
      'loadingColor',
      'loadingHeight'
    ])
  },
  methods: {
    ...mapActions('generalErrorMessages', {
      setErrorVisibility: 'setVisibility'
    }),
    ...mapActions('generalMessage', {
      setMessageVisibility: 'setVisibility'
    }),
    signout () {
      this.$store.dispatch('currentUser/logout', { $auth: this.$auth })
    }
  },
  async beforeRouteEnterOrUpdate (vm, to, from, next) {
    try {
      await vm.$store.dispatch('currentUser/getCurrentUser')
    } finally {
      if (next) next()
    }
  }
}
</script>
