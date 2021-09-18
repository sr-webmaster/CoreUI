<script>
import AdminList from './admin-list.vue'
export default {
  extends: AdminList,
  mixins: [
    AdminList
  ],
  data () {
    return {
      showReturnButton: true
    }
  },
  beforeRouteEnterOrUpdate () {
    return AdminList.beforeRouteEnterOrUpdate.apply(this, arguments)
  }
}
</script>
