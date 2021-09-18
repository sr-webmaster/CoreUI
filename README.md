# Installation
## With FreshPlatform UI projects
When building a UI only repository you should use `vue-cli-plugin-freshinup-ui`

## With Client Projects
`yarn add git+ssh://git@github.com/freshinup/core-ui.git`

Since the project isn't publishing a package (yet), you can either reference the source directory (__recommended__) or setup an alias in webpack

Example 
```javascript
import FBtn from '@freshinup/core-ui/src/components/FBtn'  
```

# Application Usage
The App instantiation is now a part of Core UI; moved from Fresh BUS Forms and updated.

It now allows easier registration of other UI "Modules" (FreshinUp term) by giving the `modules` property the corresponding Provider from each Module.

> **THIS MEANS the Fresh BUS Forms App is deprecated.**

Please see the tests for the latest examples but below is an example from FoodFleet

```javascript
import FreshBusProvider from 'fresh-bus/Provider'
import AppComponent from 'fresh-bus/App'
import ClientProvider from './Provider'
import App from '@freshinup/core-ui/src/App'
import theme from './theme'
import NotFoundPage from 'fresh-bus/pages/404.vue'
import axios from 'axios'
import Vue from 'vue'
import { install as installAuthRouter } from 'fresh-bus/router/auth'

const initialState = {
  loginSuccessRedirectPath: '/admin/dashboard',
  ...window.__INITIAL_STATE__
}

const appInstance = new App({
  modules: [
    FreshBusProvider,
    ClientProvider
  ],
  initialState,
  theme,
  redirectOnNotFound: false,
  NotFoundPage,
  axios,
  Vue,
  middleware: require.context('../../vendor/freshinup/fresh-bus-forms/resources/assets/js/middleware/', true, /\.js$/)
})
installAuthRouter(Vue)
appInstance.boot(AppComponent)
appInstance.addRoutes([{ path: '/', redirect: '/admin' }, { path: '', redirect: '/admin' }])

// We may consider only exposing the app when a certain key is set (true EXPOSE_APP=true)
window.__APP__ = appInstance
export default appInstance
```


## Module Providers

Please see the tests for usage. Note a good example is the following which is from Fresh BUS

```javascript
import auth from './store/modules/auth'
import currentUser from './store/modules/currentUser'
import companies from './store/modules/companies'
import companyTypes from './store/modules/companyTypes'
import countries from './store/modules/countries'
import industryRoles from './store/modules/industryRoles'
import teams from './store/modules/teams'
import policies from './store/modules/policies'
import userTypes from './store/modules/userTypes'
import userNotifiers from './store/modules/userNotifiers'
import userLevels from './store/modules/userLevels'
import userStatuses from './store/modules/userStatuses'
import userNotifications from './store/modules/userNotifications'
import users from './store/modules/users'
import navigation from './store/modules/navigation'
import navigationAdmin from './store/modules/navigationAdmin'
import permissions from './store/modules/permissions'
import { version, name } from '../../../composer.json'
const pages = require.context('./pages', true, /\.vue$/)
export default () => {
  return {
    name,
    pages,
    layouts: require.context('./layouts', false, /\.vue$/),
    store: {
      auth,
      currentUser,
      companies,
      companyTypes,
      countries,
      industryRoles,
      teams,
      policies,
      userTypes,
      userNotifiers,
      userLevels,
      userStatuses,
      userNotifications,
      permissions,
      users,
      navigation,
      navigationAdmin
    },
    version
  }
}
``` 


# Architecture
Single Page Application with Server Side rendered JSON data that is injected into the State Machine. Routes are handled on both the Javascript layer in the client and in PHP layer on the server within Laravel.

| TECHNOLOGY | PURPOSE | 
| :------------- |:-------------|
| ![https://vuejs.org/](https://img.shields.io/badge/vue-2.5-brightgreen.svg) | **Presentation Templating** of Pages and Components |
| ![https://vuetifyjs.com/en/](https://img.shields.io/badge/vuetify-1.4-brightgreen.svg) | Base **Component Library**. We customize it per client within the direction of our Creative Director's vision.| 
| ![https://vuex.vuejs.org/guide/state.html](https://img.shields.io/badge/vuex-3-brightgreen.svg) | Foundation of our **State Machine**|

<br/>


# Structure
| FOLDERS | PURPOSE | 
| :------------- |:-------------|
| `http` | Vue Plugins that focus on connecting axios or other HTTP Clients to Vue and Vuex systems |
| `components` | Dumb Single File Vue Components. These components only receive data from props and are NOT aware of the state machine. |
| `pages` | Smart Single File Vue Components that the **`router`** directly attempts to route to. *State Machine* aware. These leverage the `store/modules/page` component |
| `router` | The **router** that will build a page with a combination of a `page` component from that directory and a given `layout`|
| `layouts` | Smart Single File Vue Components. *State Machine* aware. These are allowed to leverage the `store/modules/page` component |
| `store` | Generally the State Machine (see *State Machine* section below) |

<br/>

## Router
| FILE | PURPOSE |
| :----------- |:-------------|
| `auth` | |

## Pages
Leveraging the design in Nuxt (https://nuxtjs.org/guide/views#pages)

| ATTRIBUTE | DESCRIPTION |
|:------------ |:-------------- |
| `middleware` | Defines middleware for this page. The middleware will be called before rendering the page. |
| `layout` | Specify a layout defined in the `./layouts` directory. |

## State Machine
**Directory** `store/`

**Utils** are contained in `store/utils` with the following highlights

| Util | Purpose |
| :----------- |:-------------|
| `makeRestStore` | `store/utils/makeRestStore` provides a rapid and very specific consistent way of creating modules using REST HTT API for Fresh BUS. This wraps ![https://christianmalek.github.io/vuex-rest-api/api.html](https://img.shields.io/badge/vapi-blue.svg) and should be used in most situations. |
| ![https://christianmalek.github.io/vuex-rest-api/api.html](https://img.shields.io/badge/vapi-blue.svg) | Is a third-party NPM module used as a utility to quickly create and make consistent State Modules that interact with our HTTP API. |

### `makeRestStore`
When setting filters and pagination ensure to use `setFilters` and `setPagination` instead of passing directly to the `getItems` parameters
