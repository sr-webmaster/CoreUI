import { MAIN } from '../../../.storybook/categories'
import { action } from '@storybook/addon-actions'
import FCalendarEvent from './FCalendarEvent.vue'
import FBtnMenu from '../FBtnMenu.vue'

const items = [{
  id: 'item1',
  label: 'Item 1'
}, {
  id: 'item2',
  label: 'Item 2'
}]

export default {
  title: `${MAIN}|FCalendarEvent`,
  id: 'FCalendarEvent',
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
export const defaultStory = () => ({
  components: {
    FCalendarEvent
  },
  data: () => ({
    date: new Date()
  }),
  template: `
    <f-calendar-event 
      title="This event is happening today, right now."
      :date="date"
    />
  `
})

export const dateAsString = () => ({
  components: {
    FCalendarEvent
  },
  data: () => ({
    date: '2020-01-01 09:00'
  }),
  template: `
    <f-calendar-event 
      title="Happy New Year!"
      subtitle="Holidays"
      :date="date"
      href="/calendar/event/1"
    />
  `
})

export const withAppendSlotContent = () => ({
  components: {
    FCalendarEvent,
    FBtnMenu
  },
  data: () => ({
    date: new Date(),
    items
  }),
  template: `
    <f-calendar-event 
      title="This event is happening today, right now."
      subtitle="Mind Blown"
      :date="date"
      @click="eventClick"
    >
      <template v-slot:append>
        <f-btn-menu :items="items" />
      </template>
    </f-calendar-event>
  `,
  methods: {
    eventClick () {
      action('eventClick')()
    }
  }
})
