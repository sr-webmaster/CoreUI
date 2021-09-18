import { storiesOf } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'
import FNavigationDrawerList from './FNavigationDrawerList'
import { MAIN } from '../../../.storybook/categories'

storiesOf(`${MAIN}|Navigation Drawer List`, module)
  .addDecorator(StoryRouter())
  .addParameters({
    backgrounds: [
      { name: 'twitter', value: '#00aced' },
      { name: 'facebook', value: '#3b5998' }
    ]
  })
  .add(
    'non nested clickable item',
    () => ({
      components: { FNavigationDrawerList },
      data: () => ({
        menuItems: [
          {
            action: 'dashboard',
            title: 'Dashboard',
            to: { name: 'admin' }
          }
        ]
      }),
      template: `
        <v-container>
            <f-navigation-drawer-list
                :items="menuItems"
            />
        </v-container>
      `
    })
  )
  .add(
    'colored items',
    () => ({
      components: { FNavigationDrawerList },
      data: () => ({
        menuItems: [
          {
            action: 'dashboard',
            title: 'Dashboard',
            to: { name: 'admin' }
          },
          {
            action: 'fa-user',
            title: 'Users',
            to: { path: 'users' }
          }
        ]
      }),
      template: `
        <v-container>
            <f-navigation-drawer-list
                :items="menuItems"
                background-active-color="red"
                foreground-active-color="white"
            />
        </v-container>
      `
    })
  )
  .add(
    'nested items',
    () => ({
      components: { FNavigationDrawerList },
      data: () => ({
        menuItems: [
          {
            action: 'supervised_user_circle',
            title: 'Base User',
            active: true,
            items: [
              { title: 'Users', to: { path: '/admin/users' }, action: 'far fa-user' },
              { title: 'Teams', to: { path: '/admin/teams' } },
              { title: 'Companies', to: { path: '/admin/companies' } }
            ]
          }
        ]
      }),
      template: `
        <v-container>
            <f-navigation-drawer-list
                :items="menuItems"
            />
        </v-container>
      `
    })
  )
  .add(
    'no action icons',
    () => ({
      components: { FNavigationDrawerList },
      data: () => ({
        menuItems: [
          { title: 'Users', to: { path: '/admin/users' }, action: 'far fa-user' },
          { title: 'Teams', to: { path: '/admin/teams' } },
          { title: 'Companies', to: { path: '/admin/companies' } }
        ]
      }),
      template: `
        <v-container>
            <f-navigation-drawer-list
                :items="menuItems"
                no-actions
            />
        </v-container>
      `
    })
  )
