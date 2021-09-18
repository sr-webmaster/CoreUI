import Layout from './admin-edit.vue'
import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import { MAIN } from '../../.storybook/categories'
import { FIXTURE_USER } from '@freshinup/core-ui/tests/__data__/user'
import createStore from 'tests/createStore'

export default {
  title: `${MAIN}|layouts/AdminEdit`,
  id: 'layouts/AdminEdit'
}

const apiMocked = mockApi()

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

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
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
