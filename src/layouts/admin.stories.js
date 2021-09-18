import { MAIN } from '../../.storybook/categories'
import Layout from './admin.vue'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import { FIXTURE_USER_NO_AVATAR, FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import createStore from 'tests/createStore'
import PageStoryInstances from 'tests/PageStoryInstances'

export default {
  title: `${MAIN}|layouts/Admin`,
  id: 'layouts/Admin'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const WithCurrentUserNoAvatar = () => {
  const store = createStore({
    currentUser: FIXTURE_USER_NO_AVATAR,
    page: {
      isLoading: false
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER_NO_AVATAR]
      }
    },
    beforeMount () {
      Layout.beforeRouteEnterOrUpdate(this, {}, null)
    }
  })
}

export const UserWithAvatar = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: false
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    },
    beforeMount () {
      Layout.beforeRouteEnterOrUpdate(this, {}, null)
    }
  })
}

export const isLoading = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    },
    beforeMount () {
      this.$store.dispatch('page/setLoading', true)
    }
  })
}

export const ErrorMessage = () => {
  const store = createStore({
    currentUser: FIXTURE_USER_NO_AVATAR,
    page: {
      isLoading: false
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER_NO_AVATAR]
      }
    },
    beforeMount () {
      Layout.beforeRouteEnterOrUpdate(this, {}, null)
      this.$store.dispatch('generalErrorMessages/setErrors', 'User name must be set before saving')
      this.$store.dispatch('generalErrorMessages/setVisibility', true)
    }
  })
}

export const LoadingBarDefaultsStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    }
  })
}

export const LoadingBarColorStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true,
      loadingColor: 'secondary'
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    }
  })
}

export const LoadingBarHeight45Story = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true,
      loadingHeight: 45
    }
  })
  return makePageStory(Layout, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    }
  })
}
