import Layout from './admin-list.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import { MAIN } from '../../.storybook/categories'
import { FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import createStore from 'tests/createStore'

export default {
  title: `${MAIN}|layouts/AdminList`,
  id: 'layouts/AdminList'
}

const apiMocked = mockApi()
Vue.use(Vuex)

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const HeaderColorNoImageStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: false
    },
    navigationAdmin: {
      headerImage: null
    }
  })
  return makePageStory(Layout, store, {
    apiMocked,
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

export const HeaderColorNoImageLoadingStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true
    },
    navigationAdmin: {
      headerImage: null
    }
  })
  return makePageStory(Layout, store, {
    apiMocked,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    }
  })
}

export const HeaderImageStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: false
    }
  })
  return makePageStory(Layout, store, {
    apiMocked,
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

export const LoadingBarDefaultsStory = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      isLoading: true
    }
  })
  return makePageStory(Layout, store, {
    apiMocked,
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
    apiMocked,
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
    apiMocked,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    }
  })
}
