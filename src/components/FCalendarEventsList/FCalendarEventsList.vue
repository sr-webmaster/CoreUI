<template>
  <v-list>
    <f-calendar-event
      v-for="(event, idx) in events"
      :key="idx"
      :date="event.date_time"
      :title="event.name"
      :subtitle="event.type.name"
      class="f-calendar-events-list__item py-2 px-0"
    >
      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              small
              class="f-calendar-events-list__item-menu-button ma-0 px-1"
              v-on="on"
            >
              Edit
              <v-icon
                right
                dark
                class="mx-0"
              >
                expand_more
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-bind="$attrs"
              @click="editItem(event)"
            >
              <v-list-tile-title>Edit</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-bind="$attrs"
              @click="deleteItem(event)"
            >
              <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
    </f-calendar-event>
  </v-list>
</template>

<script>
import FCalendarEvent from '@freshinup/core-ui/src/components/FCalendarEvent'

export default {
  components: {
    FCalendarEvent
  },
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    editItem (value) {
      this.$emit('edit', value)
    },
    deleteItem (value) {
      this.$emit('delete', value)
    }
  }
}
</script>

<style>
.f-calendar-events-list__item-menu-button {
  min-width: auto;
}
</style>
