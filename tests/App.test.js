import App, { createStoreFromProviders, _createStoreModules } from '../src/App'
import { version } from '../package.json'
import makeRestStore from '../src/store/utils/makeRestStore'

const ExampleProviderStub = () => {
  return {
    name: '@freshinup/example',
    version: '1.0.12',
    store: {
      todo: () => ({
        state: {
          items: []
        },
        getters: {
          doubleCount (state) {
            return state.count * 2
          }
        }
      })
    }
  }
}

const FranceProviderStub = () => {
  return {
    name: '@example/france',
    version: '1.0.0',
    store: {
      lyon: () => ({}),
      paris: () => ({
        namespaced: true,
        state: {
          location: 'Italy'
        }
      })
    }
  }
}

const TexasProviderStub = () => {
  return {
    name: '@example/texas',
    version: '1.0.0',
    store: {
      paris: () => ({
        namespaced: true,
        state: {
          location: 'Texas'
        }
      })
    }
  }
}

describe('App _createStoreModules()', () => {
  test('forces store modules to be namespaced', () => {
    const result = _createStoreModules([
      FranceProviderStub()
    ])
    expect(Object.keys(result)).toHaveLength(2)
    expect(result).toHaveProperty('lyon')
    expect(result.lyon).toHaveProperty('namespaced', true)
  })
  test('uses the last Provider store module of the same name (no duplicates)', () => {
    const result = _createStoreModules([
      TexasProviderStub(),
      FranceProviderStub()
    ])
    expect(Object.keys(result)).toHaveLength(2)
    expect(result).toHaveProperty('paris')
    expect(result.paris).toHaveProperty('state')
    expect(result.paris.state).toHaveProperty('location', 'Italy')
    expect(result).toHaveProperty('lyon')
  })
})

describe('App createStoreFromProviders()', () => {
  test('store modules are namespaced and do not pollute the main object', () => {
    const result = createStoreFromProviders([
      TexasProviderStub(),
      FranceProviderStub(),
      ExampleProviderStub()
    ])
    expect(result.state).toHaveProperty('todo')
    expect(result.getters).not.toHaveProperty('doubleCount')
    expect(result.getters).toHaveProperty('todo/doubleCount')
  })
  test('creates with default Store Modules: page, generalErrorMessages, generalMessage (regardless of Providers)', () => {
    const result = createStoreFromProviders([])
    expect(result.state).toHaveProperty('page')
    expect(result.state).toHaveProperty('generalErrorMessages')
    expect(result.state).toHaveProperty('generalMessage')
  })
})
describe('App instance', () => {
  describe('getVersions()', () => {
    test('returns core and any added modules version', () => {
      class AppStubbedRegister extends App {
        register (props) {
          this.registerModules(props.modules)
        }
      }
      const app = new AppStubbedRegister({
        modules: [
          ExampleProviderStub
        ]
      })
      expect(app.getVersions()).toHaveProperty('core', version)
      expect(app.getVersions()).toHaveProperty('@freshinup/example', '1.0.12')
    })
  })
  describe('createStore()', () => {
    test('creates the store from the optional modules passed in during instantiation (this.modules)', () => {
      class AppStubbedRegister extends App {
        register (props) {
          this.registerModules(props.modules)
        }
      }
      const userStoreMock = jest.fn()
      const axiosMock = jest.fn()
      const app = new AppStubbedRegister({
        modules: [
          () => {
            return {
              name: '@freshinup/example',
              version: '1.0.12',
              store: {
                user: (state, options) => {
                  userStoreMock(state, options)
                  return makeRestStore('user', { item: state }, 'user', options)
                }
              }
            }
          }
        ],
        axios: axiosMock
      })
      const userState = {
        firstName: 'Thomas'
      }
      const result = app.createStore({
        user: userState
      })
      expect(result.state).toHaveProperty('user')
      expect(result.state.user).toHaveProperty('item', userState)
      expect(userStoreMock).toHaveBeenCalledWith(userState, { axios: axiosMock })
    })
  })
  describe('addLayouts()', () => {
    test('requires argument to be a Context object (https://webpack.js.org/api/module-methods/#requirecontext)', () => {
      const Component = {
        default: jest.fn()
      }
      const middlewareContext = () => {
        return Component
      }
      middlewareContext.keys = () => ['./admin.js']
      class AppStubbedRegister extends App {
        register (props) {}
      }
      const app = new AppStubbedRegister()
      expect(() => {
        app.addLayouts()
      }).toThrow('Cannot read property \'keys\' of undefined')

      expect(() => {
        app.addLayouts([])
      }).toThrow('context.keys(...).forEach is not a function')

      expect(() => {
        app.addLayouts({})
      }).toThrow('context.keys is not a function')
    })
  })
  describe('registerModules()', () => {
    test('handles list being not an array', () => {
      const registerModule = jest.fn()
      class AppStubbedRegister extends App {
        register (props) {
          expect(props).toHaveProperty('modules')
          this.registerModules(props.modules)
        }
        registerModule = registerModule
      }
      expect(() => {
        (new AppStubbedRegister({
          modules: null
        }))()
      }).toThrow('registerModules must be called with an array of modules')
    })
    test('for each module axios is provided to the registerModule invocation', () => {
      const registerModule = jest.fn()
      const axiosStub = {}
      class AppStubbedRegister extends App {
        register (props) {
          expect(props).toHaveProperty('modules')
        }
        registerModule = registerModule
      }
      const app = new AppStubbedRegister({
        modules: [
          ExampleProviderStub
        ],
        axios: axiosStub
      })
      app.registerModules([
        ExampleProviderStub
      ], { axios: app.axios })
      expect(registerModule).toHaveBeenNthCalledWith(1, ExampleProviderStub, { axios: axiosStub })
    })
  })
  describe('addRoutes()', () => {
    test('calls through to router.addRoutes method', () => {
      const addRoutesMock = jest.fn()
      class AppStubbedRegister extends App {
        register (props) {
          this._router = {
            addRoutes: addRoutesMock
          }
        }
      }
      const app = new AppStubbedRegister()
      const routes = [ { name: '*' } ]
      app.addRoutes(routes)
      expect(addRoutesMock).toHaveBeenCalledWith(routes)
    })
  })
  describe('addPages()', () => {
    test('calls through to router.addPages method', () => {
      const addRoutesMock = jest.fn()
      class AppStubbedRegister extends App {
        register (props) {
          this._router = {
            addRoutes: addRoutesMock
          }
        }
      }
      const excludePage = (key) => key.indexOf('/register') > -1
      const app = new AppStubbedRegister({ excludePage })
      const PageClass = {
        default: jest.fn()
      }
      const pageContext = () => {
        return PageClass
      }
      pageContext.keys = () => ['./one.vue', './register.vue', './two.vue']
      app.addPages(pageContext)
      const pages = addRoutesMock.mock.calls[0][0]
      expect(pages).toHaveLength(2)
      expect(pages[0].name).toEqual('one')
      expect(pages[1].name).toEqual('two')
    })
  })
})
