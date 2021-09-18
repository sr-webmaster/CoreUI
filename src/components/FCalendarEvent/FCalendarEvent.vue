<template>
  <v-list-tile class="px-0">
    <v-list-tile-action
      :class="`${color}--text f-calendar-event__cal text-xs-center py-0 pr-2 mr-2 pl-0`"
    >
      <div class="primary f-calendar-event__month-day">
        <slot
          name="month"
          :dt="dt"
        >
          <div
            class="f-calendar-event__month"
          >
            {{ monthAbbr }}
          </div>
        </slot>

        <slot
          name="date"
          :dt="dt"
        >
          <div
            class="f-calendar-event__date headline"
          >
            {{ dt.getDate() }}
          </div>
        </slot>
      </div>
      <slot
        name="time"
        :dt="dt"
      >
        <div
          class="f-calendar-event__time secondary caption pa-1"
        >
          {{ time }}
        </div>
      </slot>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>
        <slot
          name="title"
          :title="title"
        >
          <div
            class="f-calendar-event__title subtitle"
          >
            <f-title-link
              v-if="useTitleLink"
              v-bind="$attrs"
              v-on="$listeners"
            >
              {{ title }}
            </f-title-link>
            <span
              v-else
              class="primary--text"
            >
              {{ title }}
            </span>
          </div>
        </slot>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <slot
          name="subtitle"
          :subtitle="subtitle"
        >
          <div
            class="f-calendar-event__subtitle body-2 grey--text"
          >
            {{ subtitle }}
          </div>
        </slot>
      </v-list-tile-sub-title>
      <slot name="append" />
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import FTitleLink from '@freshinup/core-ui/src/components/FTitleLink'
const monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export default {
  components: {
    FTitleLink
  },
  props: {
    date: {
      type: [Date, String],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    useTitleLink: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      dt: new Date(this.date)
    }
  },
  computed: {
    monthAbbr () {
      return monthAbbrs[this.dt.getMonth()]
    },
    time () {
      return (this.dt.getHours() % 12 || 12) + ':' + ('0' + this.dt.getMinutes()).slice(-2) + this.ampm
    },
    ampm () {
      return this.dt.getHours() >= 12 ? ' PM' : ' AM'
    }
  }
}
</script>

<style scoped>
.f-calendar-event__title {
  white-space: normal;
}
.f-calendar-event__cal {
  min-width: 86px;
}
.f-calendar-event__month-day {
  width: 100%;
  border-radius: 5px 5px 0 0;
}
.f-calendar-event__time {
  width: 100%;
  border-radius: 0 0 5px 5px;
}
::v-deep .v-list__tile {
 height: auto;
 align-items: start;
}
::v-deep .v-list__tile__content {
  justify-content: start;
}
::v-deep .v-list__tile__title {
  height: auto;
  overflow: initial;
}
</style>
