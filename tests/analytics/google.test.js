import { createLocalVue } from '@vue/test-utils'
import analytics from '@freshinup/core-ui/src/analytics/google'
jest.mock('google-analytics-load-script')
// Global scope required by the VueAnalytics Plugin
window.ga = jest.fn()

describe('Analytics Google', () => {
  beforeEach(() => {
    window.ga.mockClear()
  })

  it('installs into Vue', () => {
    const Vue = createLocalVue()
    const install = () => {
      analytics(Vue, { id: 'UA-1234-5', errorMethod: jest.fn(), router: jest.fn() })
    }
    expect(install).not.toThrow()
    const vm = new Vue({})
    expect(vm).toHaveProperty('$ga')
  })

  it('throws error if errorMethod not provided', () => {
    const Vue = createLocalVue()
    expect(() => {
      analytics(Vue)
    }).toThrow()

    expect(() => {
      analytics(Vue, {})
    }).toThrow()
  })

  it('errors logs if id not set (does not throw error) and does not bind Analytics', () => {
    const Vue = createLocalVue()
    const errorMethod = jest.fn()
    expect(() => {
      analytics(Vue, { errorMethod })
    }).not.toThrow()
    expect(errorMethod).toHaveBeenCalledWith('Analytics could not be installed. id is required')
    const vm = new Vue({})
    expect(vm).not.toHaveProperty('$ga')
  })

  it('errors logs if router not provided', () => {
    const Vue = createLocalVue()
    const errorMethod = jest.fn()
    expect(() => {
      analytics(Vue, { errorMethod, id: 'UA-1234-5' })
    }).not.toThrow()
    expect(errorMethod).toHaveBeenCalledWith('Analytics could not be installed. router is required')
    const vm = new Vue({})
    expect(vm).not.toHaveProperty('$ga')
  })
})
