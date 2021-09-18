import moment from 'moment'
export default {
  methods: {
    formatDate (date, format = 'MMM DD, YYYY • h:mm A') {
      return date && date !== 'Invalid date' ? moment(date).format(format) : null
    }
  }
}
