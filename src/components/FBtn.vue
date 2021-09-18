<script>
import VBtn from 'vuetify/es5/components/VBtn/VBtn'
import Colorable from 'vuetify/es5/mixins/colorable'
export default {
  mixins: [VBtn],
  methods: {
    setBackgroundColor (value) {
      const data = Colorable.extendOptions.methods.setBackgroundColor.apply(this, arguments)
      data.class = {
        ...data.class,
        [`${value}-text--text`]: true
      }
      return data
    }
  }
}
</script>
