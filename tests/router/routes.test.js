import { getMeta, mapMiddleware, makePageRoutes } from '../../src/router/routes'

describe('mapMiddleware()', () => {
  test('requires list to be a Context object (https://webpack.js.org/api/module-methods/#requirecontext)', () => {
    const authMiddleware = {
      default: jest.fn()
    }
    const middlewareContext = () => {
      return authMiddleware
    }
    middlewareContext.keys = () => ['./auth.js']
    expect(() => {
      mapMiddleware()
    }).toThrow('Cannot read property \'keys\' of undefined')

    expect(() => {
      mapMiddleware([])
    }).toThrow('context.keys(...).forEach is not a function')

    expect(() => {
      mapMiddleware({})
    }).toThrow('context.keys is not a function')
  })
})

describe('getMeta()', () => {
  let originalConsoleWarn
  beforeEach(() => {
    originalConsoleWarn = console.warn
  })
  afterEach(() => {
    console.warn = originalConsoleWarn
  })
  test('does not require middleware (the second argument)', () => {
    expect(() => {
      const result = getMeta({})
      expect(result).toEqual({})
    }).not.toThrow(Error)
  })

  test('returns with layout when specified on PageClass', () => {
    const result = getMeta({ layout: 'admin' })
    expect(result).toHaveProperty('layout', 'admin')
  })

  test('returns without layout when NOT specified on PageClass', () => {
    const result = getMeta({ })
    expect(result).not.toHaveProperty('layout')
  })

  test('returns with middleware key but lacking missing middleware not available and warns on those missing', () => {
    console.warn = jest.fn()
    const result = getMeta({ middleware: ['auth'] })
    expect(result).toHaveProperty('middleware')
    expect(console.warn).toHaveBeenCalledWith('Middleware auth is not available, yet is specified by the Page')
  })

  test('returns with middleware as specified and available', () => {
    console.warn = jest.fn()
    const authMiddleware = {
      default: jest.fn()
    }
    const middlewareContext = () => {
      return authMiddleware
    }
    middlewareContext.keys = () => ['./auth.js']
    let result = getMeta({ middleware: ['auth'] }, middlewareContext)
    expect(console.warn).not.toHaveBeenCalledWith('Middleware auth is not available, yet is specified by the Page')
    expect(result).toHaveProperty('middleware', [authMiddleware.default])

    result = getMeta({ middleware: 'auth' }, middlewareContext)
    expect(console.warn).not.toHaveBeenCalledWith('Middleware auth is not available, yet is specified by the Page')
    expect(result).toHaveProperty('middleware', [authMiddleware.default])
  })
})

describe('makePageRoutes()', () => {
  test('returns using with excluded matches from being added as a route', () => {
    const PageClass = {
      default: jest.fn()
    }
    const pageContext = () => {
      return PageClass
    }
    pageContext.keys = () => ['./register.vue', './include.vue']
    const excludePage = (key) => key.indexOf('/register') > -1
    const result = makePageRoutes(pageContext, { excludePage })
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('name', 'include')
    expect(result[0]).toHaveProperty('path', '/include')
  })
})
