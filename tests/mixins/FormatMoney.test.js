import FormatMoney from '@freshinup/core-ui/src/mixins/FormatMoney'
describe('Mixins FormatMoney', () => {
  describe('method', () => {
    test('formatMoney(value) formatted value with default format', () => {
      expect(FormatMoney.methods.formatMoney(500)).toEqual('$500.00')
      expect(FormatMoney.methods.formatMoney(5000)).toEqual('$5,000.00')
    })
    test('formatMoney(value) rounds the number', () => {
      expect(FormatMoney.methods.formatMoney(0.58)).toEqual('$0.58') // testing this because in javascript 0.58*100 results in 57.999...
      expect(FormatMoney.methods.formatMoney(1.499999)).toEqual('$1.50')
    })
    test('formatMoney(value) returns empty string when passed non numeric', () => {
      expect(FormatMoney.methods.formatMoney(undefined)).toEqual('')
      expect(FormatMoney.methods.formatMoney('asd')).toEqual('')
    })
    test('formatMoney(value, format) formatted value in euros', () => {
      expect(FormatMoney.methods.formatMoney(500, { currency: 'EUR' })).toEqual('€500.00')
      expect(FormatMoney.methods.formatMoney(5000, { currency: 'EUR' })).toEqual('€5,000.00')
    })
    test('formatMoney(value, format) formatted value without decimals', () => {
      expect(FormatMoney.methods.formatMoney(500, { currency: 'USD', format: '$0,0' })).toEqual('$500')
      expect(FormatMoney.methods.formatMoney(5000, { currency: 'USD', format: '$0,0' })).toEqual('$5,000')
    })
  })
})
