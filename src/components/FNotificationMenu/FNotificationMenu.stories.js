import { MAIN } from '../../../.storybook/categories'
import FNotificationMenu from './FNotificationMenu.vue'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import UserNotifications from '../../store/modules/userNotifications'

const mock = new MockAdapter(axios)
Vue.use(Vuex)

const getTitle = () => {
  return `${MAIN}|beta/Notification Menu`
}
export default {
  title: getTitle(),
  id: 'FNotificationMenu'
}

const serverData = [
  {
    id: 1,
    icon: 'fas fa-file-alt',
    created_at: 'Mar 15, 10:32 AM',
    event: 'John Smith shared',
    title: 'Retail Industry Report Q4 2018',
    route: '/content/100',
    msg: ''
  },
  {
    id: 2,
    icon: 'fas fa-file-alt',
    created_at: 'Mar 15, 10:32 AM',
    event: 'John Smith shared',
    title: '8 Important Questions Answered by Proposed Regulations on Qualified Opportunity Funds',
    route: '/content/1',
    msg: 'Hey, John. This is really interesting. Please check this out.'
  }
]

mock
  .onGet('/users/1/notifications').reply(200, {
    data: serverData
  })
  .onAny('/users/1/notifications/1').reply(200, {
    data: serverData[0]
  })
  .onAny('/users/1/notifications/2').reply(200, {
    data: serverData[1]
  })

const notificationsStore = new Vuex.Store({
  getters: {
    currentUser () {
      return { id: 1 }
    }
  },

  modules: {
    userNotifications: UserNotifications({})
  }
})

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const defaultStory = () => ({
  components: { FNotificationMenu },
  store: notificationsStore,
  template: `
        <v-container grid-list-xl>
            <v-layout column>
              <v-flex>
                <v-alert
                  :value="true"
                  color="warning"
                  icon="priority_high"
                >
                  This component is currently in Beta. As such it can change without warning or semver Major version updates
                </v-alert>
              </v-flex>
              <v-flex>
                <f-notification-menu style="width: 320px;" />
                <v-btn @click="reset">Reset</v-btn>
              </v-flex>
            </v-layout>
        </v-container>
      `,
  methods: {
    reset () {
      this.$store.dispatch('userNotifications/getItems', { params: { userId: 1 } })
    }
  }
})
defaultStory.story = {
  name: 'defaults (uses Store)'
}
