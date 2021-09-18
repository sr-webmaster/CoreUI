import mapValues from 'lodash/mapValues'
import get from 'lodash/get'
import { install as installVuetify } from './vuetify'
import { install as installRouter } from './router'
import { makePageRoutes } from './router/routes'
import { install as installAnalytics } from './analytics/google'
import { install as installStore, createStore } from './store'
import { install as installApiClient } from './http/client'
import { addInterceptor as authInterceptor } from './http/authHandlers'
import { addInterceptor as errorInterceptor } from './http/errorHandlers'
import { version as coreVersion } from '../package.json'
import themeDefault from './theme'

export const _createStoreModules = (providers, initialState = {}, options = {}) => {
  let modules = {}
  providers.forEach((provider) => {
    modules = {
      ...modules,
      ...mapValues(provider.store, (item, key) => {
        const value = item(initialState[key] || {}, { axios: options.axios })
        return {
          ...value,
          namespaced: true
        }
      })
    }
  })
  return modules
}

export const createStoreFromProviders = (providers, initialState = {}, options = {}) => {
  options.modules = _createStoreModules(providers, initialState, options)
  return createStore(initialState, options)
}

/**
 * Let's make it feel like a Vue App starting up
 */
class App {
  constructor (props = {}) {
    const excludePageDefault = (key) => {
      return key.indexOf('/register') > -1 && get(props, 'store.state.registrationType', null) === 2
    }

    this.Vue = props.Vue
    this.axios = props.axios
    this.analyticsOptions = {
      ...props.analytics
    }
    this._pendingPages = []
    this.routerMiddleware = props.middleware
    this.excludePage = props.excludePage || excludePageDefault
    this.register(props)
  }

  register (props = {}) {
    installStore(this.Vue)
    installVuetify(this.Vue, { theme: props.theme || themeDefault, ignoreVuetifyStyles: props.ignoreVuetifyStyles })
    installApiClient(this.Vue, { axios: this.axios })
    this.registerModules(props.modules)
    this.store = this.createStore(props.initialState)
    this._router = this.createRouter(props)
  }

  boot (AppComponent, options = {}) {
    installAnalytics(this.Vue, {
      id: this.analyticsOptions.id,
      router: this._router,
      errorMethod: console.error
    })
    const propComponents = options.components || {}
    this.vm = new this.Vue({
      router: this._router,
      el: '#app',
      components: {
        App: AppComponent,
        ...propComponents
      },
      template: '<App/>',
      store: this.store
    })
    authInterceptor(this.vm)
    errorInterceptor(this.vm)
  }

  createRouter (options = {}) {
    const router = installRouter(this.Vue, {
      redirectOnNotFound: options.redirectOnNotFound,
      NotFoundPage: options.NotFoundPage,
      middleware: this.routerMiddleware,
      pages: this._pendingPages.reverse(),
      excludePage: this.excludePage
    })
    this._pendingPages = []
    return router
  }

  createStore (initialState) {
    const options = {
      axios: this.axios
    }
    return createStoreFromProviders(this.modules, initialState, options)
  }

  registerModule (module) {
    const instance = module()
    this.modules.push(instance)
    if (instance.layouts) {
      this.addLayouts(instance.layouts)
    }
    if (instance.pages) {
      this.addPages(instance.pages)
    }
  }

  registerModules (list, options) {
    this.modules = Array.isArray(this.modules) ? this.modules : []
    if (!Array.isArray(list)) {
      throw new Error('registerModules must be called with an array of modules')
    }
    list.forEach((module) => {
      this.registerModule(module, {
        axios: this.axios,
        ...options
      })
    })
  }

  addLayouts (context) {
    context.keys().forEach(key => {
      this.Vue.component('layout-' + (key.slice(2, -4)), context(key).default)
    })
  }

  addPages (directory) {
    const options = {
      excludePage: this.excludePage,
      middleware: this.routerMiddleware
    }
    const pages = makePageRoutes(directory, options)
    if (this.getRouter()) {
      this.addRoutes(pages)
    } else {
      this._pendingPages = this._pendingPages.concat(pages.reverse())
    }
  }

  addRoutes (routes) {
    return this.getRouter().addRoutes(routes)
  }

  /**
   * Right now this may seem absurd but allows us to have a central interface for getting the Router that isn't the static property on Vue
   * @returns {*}
   */
  getRouter () {
    return this._router
  }

  getVersions () {
    let versions = {
      core: coreVersion
    }
    this.modules.forEach(module => {
      if (module.name) {
        versions[module.name] = module.version
      } else {
        console.error('unnamed FreshPlatform Module')
      }
    })
    return versions
  }
}

export default App
