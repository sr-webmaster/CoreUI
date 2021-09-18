import FormatDate from '@freshinup/core-ui/src/mixins/FormatDate'
describe('Mixins FormatDate', () => {
  describe('method', () => {
    test('formatDate(date) formatted date with default format', () => {
      expect(FormatDate.methods.formatDate('2019-04-21 17:23:00.000')).toEqual('Apr 21, 2019 • 5:23 PM')
      expect(FormatDate.methods.formatDate('2019-04-21 17:23:00.000')).toEqual('Apr 21, 2019 • 5:23 PM')
    })
    test('formatDate(date) returns null for invalid dates including Vuetify\'s "Invalid Date"', () => {
      expect(FormatDate.methods.formatDate('Invalid date')).toBeNull()
      expect(FormatDate.methods.formatDate()).toBeNull()
    })
    test('formatDate(date, format) formatted date with format MMM DD, YYYY', () => {
      expect(FormatDate.methods.formatDate('2019-04-21 17:23:00.000', 'MMM DD, YYYY')).toEqual('Apr 21, 2019')
      expect(FormatDate.methods.formatDate('2019-04-21 17:23:00.000', 'MMM DD, YYYY')).toEqual('Apr 21, 2019')
    })
    test('formatDate(date, format) returns null for invalid dates including Vuetify\'s "Invalid Date"', () => {
      expect(FormatDate.methods.formatDate('Invalid date', 'MMM DD, YYYY')).toBeNull()
      expect(FormatDate.methods.formatDate(undefined, 'MMM DD, YYYY')).toBeNull()
    })
  })
})
