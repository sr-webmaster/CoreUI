import { MAIN } from '../../../.storybook/categories'
import FCalendarEventsList from './FCalendarEventsList.vue'
import { action } from '@storybook/addon-actions'

const getTitle = () => {
  return `${MAIN}|FCalendarEventsList`
}

const events = [
  {
    name: 'Conference Call',
    date_time: '2019-01-01 11:28:00',
    type: {
      name: 'Phonecall'
    }
  },
  {
    name: 'Conference Call 1',
    date_time: '2019-02-28 14:30:00',
    type: {
      name: 'Phonecall'
    }
  },
  {
    name: 'Conference Call 2  with a very long title that may just go on forever and ever...  But seriously, why is this event title so long?  I do not really know, do you?',
    date_time: '2019-12-31 18:00:00',
    type: {
      name: 'Phonecall'
    }
  }
]

export default {
  title: getTitle(),
  id: 'FCalendarEventsList'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const WithEvents = () => ({
  components: {
    FCalendarEventsList
  },
  data: () => ({
    events
  }),
  template: `
    <f-calendar-events-list :events="events" @edit="editActivity" @delete="deleteActivity" />
  `,
  methods: {
    editActivity (event) {
      action('edit')(event)
    },
    deleteActivity (event) {
      action('delete')(event)
    }
  }
})
