import { MAIN } from '../../../.storybook/categories'
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import StoryRouter from 'storybook-vue-router'
import FUserMenu from './FUserMenu.vue'

storiesOf(`${MAIN}|beta/User Menu`, module)
  .addDecorator(StoryRouter())
  .addParameters({
    background: [
      { name: 'Report Center', value: '#c5dbe3' }
    ]
  })
  .add(
    'defaults',
    () => ({
      components: { FUserMenu },
      data: () => ({
        menuItems: [
          { title: 'My Profile', to: { path: '/my-profile' } },
          { title: 'My Teams' },
          { title: 'My Company', to: { path: '/my-company' } },
          { title: 'My Settings' },
          { title: 'My Company Settings' }
        ]
      }),
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
                <f-user-menu 
                  :user="{
                    name: 'Gob Bluth',
                    level_name: 'Company Magician',
                    company_name: 'Bluth Company',
                    title: 'Magician',
                    avatar: 'https://alexburgessdotcodotuk.files.wordpress.com/2016/10/gobbluth.jpg?w=1240'
                  }"
                  :menu-items="menuItems"
                  @signout="signout"
                  style="width: 300px;"
                />
              </v-flex>
            </v-layout>
        </v-container>
      `,
      methods: {
        signout () {
          action('Signout')()
        }
      }
    })
  )
  .add('is admin',
    () => ({
      components: { FUserMenu },
      data: () => ({
        menuItems: [
          { title: 'My Profile', to: { path: '/my-profile' } },
          { title: 'My Teams' },
          { title: 'My Company', to: { path: '/my-company' } },
          { title: 'My Settings' },
          { title: 'My Company Settings' }
        ]
      }),
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
                <f-user-menu 
                  user-is-admin
                  :user="{
                    name: 'Gob Bluth',
                    level_name: 'Company Magician',
                    company_name: 'Bluth Company',
                    title: 'Magician',
                    avatar: 'https://alexburgessdotcodotuk.files.wordpress.com/2016/10/gobbluth.jpg?w=1240'
                  }"
                  :menu-items="menuItems"
                  style="width: 300px;"
                />
              </v-flex>
            </v-layout>
        </v-container>
      `
    })
  )
