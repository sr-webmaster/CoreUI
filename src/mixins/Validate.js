export default {
  data () {
    return {
      isValid: true
    }
  },
  methods: {
    async whenValid (onValid) {
      if (this.$validator && await this.$validator.validateAll()) {
        onValid()
      }
    }
  }
}
