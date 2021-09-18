<template>
  <f-admin-layout
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      class="f-admin__headerImage"
      :style="headerImageStyle"
    >
      <v-layout
        v-if="isLoading"
        column
        align-center
      >
        <v-progress-linear
          class="my-0"
          :indeterminate="true"
          :color="loadingColor"
          :height="loadingHeight"
        />
        <h2 :class="`${loadingColor}-text--text font-weight-thin`">
          Loading... Please Wait
        </h2>
      </v-layout>
      <v-btn
        v-if="!isLoading && showReturnButton"
        flat
        class="f-admin__returnButton"
        @click="$router.go(-1)"
      >
        <v-icon>arrow_back</v-icon>
        Return
      </v-btn>
      <router-view v-show="!isLoading" />
    </div>
  </f-admin-layout>
</template>

<script>
import { mapState } from 'vuex'
import FAdminLayout from './admin.vue'
export default {
  components: {
    FAdminLayout
  },
  mixins: FAdminLayout,
  data () {
    return {
      showReturnButton: false
    }
  },
  computed: {
    ...mapState('page', [
      'isLoading',
      'loadingColor',
      'loadingHeight'
    ]),
    ...mapState('navigationAdmin', [
      'headerImage'
    ]),
    headerImageStyle () {
      if (this.headerImage) {
        return `
          background-image: url('${this.headerImage}');
          background-size: 100% auto;
        `
      } else {
        return `
          background-image: linear-gradient(var(--v-accent-base) 0, var(--v-accent-base) 100%);
          background-size: 100% 250px;
        `
      }
    }
  },
  beforeRouteEnterOrUpdate () {
    return FAdminLayout.beforeRouteEnterOrUpdate.apply(this, arguments)
  }
}
</script>

<style lang="css" scoped>
.f-admin__headerImage {
  min-height: 550px;
  background-repeat: no-repeat;
  background-position: top left;
}
.f-admin__returnButton,
/deep/ .f-page__title--admin {
  color: white !important;
}
</style>
