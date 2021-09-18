import { createLocalVue } from '@vue/test-utils'
import { install } from '@freshinup/core-ui/src/http/client'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('HTTP Client (axios)', () => {
  describe('install()', () => {
    test('throws error if axios instance is not provided', () => {
      expect(() => install()).toThrow(/axios is a required option/)
    })

    test('adds axios to Vue context', () => {
      const Vue = createLocalVue()
      const mock = new MockAdapter(axios)
      install(Vue, { axios })
      expect(Vue).toHaveProperty('axios', axios)
      mock.restore()
    })

    test('sets defaults', () => {
      const Vue = createLocalVue()
      const mock = new MockAdapter(axios)
      install(Vue, { axios })
      expect(Vue.axios.defaults).toHaveProperty('baseURL', '/api')
      expect(Vue.axios.defaults).not.toHaveProperty('axios')
      mock.restore()
    })
  })
})
