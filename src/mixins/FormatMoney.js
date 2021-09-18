import Dinero from 'dinero.js'
export default {
  methods: {
    formatMoney (value, options = { currency: 'USD' }) {
      if (isNaN(value)) return ''
      const amount = Math.round(value * 100)
      return Dinero({ amount, ...options }).toFormat(options.format)
    }
  }
}
