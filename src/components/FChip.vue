<script>
import VChip from 'vuetify/es5/components/VChip/VChip'
import Colorable from 'vuetify/es5/mixins/colorable'
import isString from 'lodash/isString'
export default {
  mixins: [VChip],
  methods: {
    setBackgroundColor (value) {
      const data = Colorable.extendOptions.methods.setBackgroundColor.apply(this, arguments)
      data.class = {
        ...data.class,
        [`${value}-text--text`]: !isString(this.textColor)
      }
      return data
    }
  }
}
</script>
