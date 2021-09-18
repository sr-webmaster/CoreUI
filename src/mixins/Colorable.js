export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    colorClass () {
      return this.color + ' ' + this.color + 'text--text'
    }
  }
}
