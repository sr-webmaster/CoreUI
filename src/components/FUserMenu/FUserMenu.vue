<template>
  <v-card>
    <v-layout
      row
      class="pa-3"
    >
      <v-flex shrink>
        <f-user-avatar
          :user="user"
          :size="64"
        />
      </v-flex>
      <v-flex class="pl-3">
        <h4 class="title secondary--text">
          {{ user.name }}
        </h4>
        <v-chip
          v-if="!hideLevel"
          class="mx-0 pl-3 pr-3 f-userMenu__userLevel"
          small
          color="secondary"
          disabled
          text-color="white"
        >
          {{ user.level_name }}
        </v-chip>
        <div>
          <template v-if="userField == 'title,company_name'">
            <span v-if="user.title">
              {{ user.title }} @
            </span>
            {{ user.company_name }}
          </template>
          <template v-else>
            {{ user[userField] }}
          </template>
        </div>
      </v-flex>
    </v-layout>
    <v-divider />
    <v-list class="pb-0">
      <v-list-tile
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        class="secondary--text darken-3"
        active-class="primary white--text"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-if="consumerView">
        <v-list-tile
          v-if="inAdmin"
          :to="{ name: 'index' }"
        >
          Switch to User View
        </v-list-tile>
        <v-list-tile
          v-else-if="userIsAdmin"
          href="/admin"
        >
          Switch to Admin View
        </v-list-tile>
      </template>
      <v-divider />
      <v-list-tile
        @click="$emit('signout')"
      >
        <v-list-tile-title>Sign Out</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import FUserAvatar from '@freshinup/core-ui/src/components/FUserAvatar'
export default {
  components: {
    FUserAvatar
  },
  props: {
    userIsAdmin: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    },
    menuItems: {
      type: Array,
      default: () => []
    },
    consumerView: {
      type: Boolean,
      default: true
    },
    hideLevel: {
      type: Boolean,
      default: false
    },
    userField: {
      type: String,
      default: 'title,company_name'
    }
  },
  computed: {
    inAdmin () {
      return this.$route && (this.$route.path === '/admin' || this.$route.path.startsWith('/admin/'))
    }
  }
}
</script>
