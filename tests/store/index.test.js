import { createLocalVue } from '@vue/test-utils'
import { createStore, install } from '@/store'

describe('Store Base', () => {
  describe('createStore()', () => {
    beforeEach(() => {
      install(createLocalVue())
    })
    describe('state', () => {
      test('store is created with only a few states', () => {
        const store = createStore({})
        expect(Object.keys(store.state)).toHaveLength(8)
        expect(store.state).toHaveProperty('registrationType')
        expect(store.state).toHaveProperty('env')
        expect(store.state).toHaveProperty('loginSuccessRedirectPath')
        expect(store.state).toHaveProperty('token')
        // Legacy and not sure what is used for if at all
        expect(store.state).toHaveProperty('status', '')

        // Module States
        expect(store.state).toHaveProperty('page')
        expect(store.state).toHaveProperty('generalErrorMessages')
        expect(store.state).toHaveProperty('generalMessage')
      })
      test('store created with registrationType', () => {
        const store = createStore({ registrationType: 2 })
        expect(store.state).toHaveProperty('registrationType', 2)
      })
    })
    describe('modules', () => {
      describe('page module', () => {
        test('page module is automatically created with default state', () => {
          const store = createStore({})
          expect(store.state).toHaveProperty('page.isLoading', true)
        })
        test('initialState can be set for page', () => {
          const store = createStore({ page: { isLoading: false } })
          expect(store.state).toHaveProperty('page.isLoading', false)
        })
      })
      describe('generalErrorMessages module', () => {
        test('generalErrorMessages is automatically created with default state', () => {
          const store = createStore({})
          expect(store.state.generalErrorMessages).toHaveProperty('errors', [])
          expect(store.state.generalErrorMessages).toHaveProperty('isVisible', false)
        })
        test('initialState can be set for errors', () => {
          const store = createStore({
            generalErrorMessages: {
              errors: ['invalid input']
            }
          })
          expect(store.state.generalErrorMessages).toHaveProperty('errors', ['invalid input'])
        })
        describe('getters', () => {
          test('hasErrors returns true when errors are set', () => {
            const store = createStore({
              generalErrorMessages: {
                errors: ['invalid input']
              }
            })
            expect(store).toHaveProperty('getters')
            expect(store.getters).toHaveProperty('generalErrorMessages/hasErrors', true)
          })
        })
      })
    })
  })
})
