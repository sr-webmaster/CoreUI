import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import get from 'lodash/get'
import Vuex from 'vuex'
import axios from 'axios'
import makeRestStore, { _getSortStringForColumnName, _getSortingAsParams } from '@freshinup/core-ui/src/store/utils/makeRestStore'

const FIXTURE_USERS = [
  { id: 1, name: 'John Smith', last_name: 'Smith', first_name: 'John' },
  { id: 2, name: 'George Bluth', last_name: 'Bluth', first_name: 'George' }
]

describe('makeRestStore', () => {
  describe('Helpers', () => {
    describe('getSortStringForColumnName()', () => {
      it('does not split name if there is no comma', async () => {
        expect(_getSortStringForColumnName('split_column:not-splitting')).toEqual('split_column:not-splitting')
      })
      it('does split name if there is a comma', async () => {
        expect(_getSortStringForColumnName('split_column,willbesplit')).toEqual('split_column')
      })
    })
    describe('getSortingAsParams()', () => {
      it('returns empty object if sortBy object value is not set', async () => {
        expect(_getSortingAsParams('')).toEqual({})
      })
      it('returns object with sort value set to sortBy value if sortBy object value is simple string', async () => {
        expect(_getSortingAsParams({ sortBy: 'simple' })).toEqual({ sort: 'simple' })
      })
      it('returns object with sort value set to sortBy array values joined by commas if sortBy object value is an array of strings', async () => {
        expect(_getSortingAsParams({ sortBy: ['simple', 'value'] })).toEqual({ sort: 'simple,value' })
      })
      it('returns object with sort value set to first of compound sortBy value if sortBy object value is simple string', async () => {
        expect(_getSortingAsParams({ sortBy: 'simple,value' })).toEqual({ sort: 'simple' })
      })
      it('returns object with sort value set to first of compound sortBy array values joined by commas if sortBy object value is' +
        'an array of strings', async () => {
        expect(_getSortingAsParams({ sortBy: ['simple,value', 'complex,value'] })).toEqual({ sort: 'simple,complex' })
      })
      it('returns object with sort value set to negative sortBy value if sortBy object value is simple string and descending is true', async () => {
        expect(_getSortingAsParams({ sortBy: 'simple', descending: true })).toEqual({ sort: '-simple' })
      })
      it('returns object with sort value set to negative sortBy array values joined by commas if sortBy object value is' +
        'an array of strings and descending is true', async () => {
        expect(_getSortingAsParams({ sortBy: ['simple', 'value'], descending: true })).toEqual({ sort: '-simple,-value' })
      })
      it('returns object with sort value set to negative first of compound sortBy value if sortBy object value is simple string' +
        'and descending is true', async () => {
        expect(_getSortingAsParams({ sortBy: 'simple,value', descending: true })).toEqual({ sort: '-simple' })
      })
      it('returns object with sort value set to negative first of compound sortBy array values joined by commas if sortBy object value' +
        'is an array of strings and descending is true', async () => {
        expect(_getSortingAsParams({ sortBy: ['simple,value', 'complex,value'], descending: true })).toEqual({ sort: '-simple,-complex' })
      })
    })
  })

  describe('Action', () => {
    let mock
    beforeEach(() => {
      mock = createLocalVue().mock
      mock.onGet('api/users').reply(200, {
        data: FIXTURE_USERS
      })
      mock.onDelete('api/users/2').reply(204)
      mock.onAny().reply(config => {
        console.warn('No mock match for ' + config.url, config)
        // Unexpected request, error out
        return [404, {}]
      })
    })
    afterEach(() => {
      mock.resetHistory()
    })
    it('removeUser() dispatches getItems', async () => {
      const commit = jest.fn()
      const dispatch = jest.fn()
      const { actions } = makeRestStore('users', {})
      await actions.deleteItem({ commit, dispatch }, { params: { id: 2 } })
      expect(commit).toHaveBeenCalledWith('DELETE_ITEM', { 'data': {}, 'params': { 'id': 2 } })
      expect(dispatch).toHaveBeenCalledWith('getItems')
    })

    describe('setPagination()', () => {
      it('changes pagination getter and state of items and sends with getItems', async () => {
        const commit = jest.fn()
        const dispatch = jest.fn()
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setPagination({ commit, dispatch, getters }, { rowsPerPage: 13, page: 2 })
        expect(commit).toHaveBeenCalledWith('UPDATE_PAGINATION', { rowsPerPage: 13, page: 2 })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', { items: { meta: {} } })
          }
        })
        store.dispatch('users/setPagination', { rowsPerPage: 13, page: 2 })
        expect(store.getters['users/pagination'].rowsPerPage).toEqual(13)
        expect(store.getters['users/pagination'].page).toEqual(2)
        expect(get(store.state, 'users.items.meta.current_page', null)).toEqual(2)
        expect(get(store.state, 'users.items.meta.per_page', null)).toEqual(13)

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['page[size]']).toEqual(13)
        expect(mock.history.get[0].params['page[number]']).toEqual(2)
      })

      it('changes sorting and sends with getItems', async () => {
        const commit = jest.fn()
        const dispatch = jest.fn()
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setPagination({ commit, dispatch, getters }, { rowsPerPage: 13, page: 2, sortBy: 'first_name' })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { rowsPerPage: 13, page: 2, sortBy: 'first_name' })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', { items: { meta: {} } })
          }
        })
        store.dispatch('users/setPagination', { rowsPerPage: 13, page: 2, sortBy: 'first_name' })
        expect(store.getters['users/sorting'].sortBy).toEqual('first_name')
        expect(get(store.state, 'users.sorting.sortBy')).toEqual('first_name')

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('first_name')
      })
    })

    describe('setSort()', () => {
      let commit, dispatch
      beforeEach(() => {
        commit = jest.fn()
        dispatch = jest.fn()
      })
      it('accepts and transforms string version of sort object', () => {
        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {})
          }
        })
        store.dispatch('users/setSort', '-first_name')
        expect(store.state).toHaveProperty('users.sorting.sortBy', 'first_name')
        expect(store.state).toHaveProperty('users.sorting.descending', true)
      })
      it('change sorting by one value and sends with getItems (ascending sort)', async () => {
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setSort({ commit, dispatch, getters }, { descending: false, sortBy: 'name' })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { descending: false, sortBy: 'name' })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: {
                meta: {},
                data: FIXTURE_USERS
              }
            })
          }
        })
        store.dispatch('users/setSort', { descending: false, sortBy: 'name' })
        expect(store.getters['users/sorting'].descending).toEqual(false)
        expect(store.getters['users/sorting'].sortBy).toEqual('name')
        expect(get(store.state, 'users.sorting.descending', null)).toEqual(false)
        expect(get(store.state, 'users.sorting.sortBy', null)).toEqual('name')

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('name')
      })

      it('change sorting sorting by one value and sends with getItems (descending sort)', async () => {
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setSort({ commit, dispatch, getters }, { descending: true, sortBy: 'name' })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { descending: true, sortBy: 'name' })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: {
                meta: {},
                data: FIXTURE_USERS
              }
            })
          }
        })
        store.dispatch('users/setSort', { descending: false, sortBy: 'name' })
        expect(store.getters['users/sorting'].descending).toEqual(false)
        expect(store.getters['users/sorting'].sortBy).toEqual('name')
        expect(get(store.state, 'users.sorting.descending', null)).toEqual(false)
        expect(get(store.state, 'users.sorting.sortBy', null)).toEqual('name')

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('name')
      })

      it('change sorting by multiple values and sends with getItems (ascending sort)', async () => {
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setSort({ commit, dispatch, getters }, { descending: false, sortBy: ['last_name', 'first_name'] })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { descending: false, sortBy: ['last_name', 'first_name'] })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: {
                meta: {},
                data: FIXTURE_USERS
              }
            })
          }
        })
        store.dispatch('users/setSort', { descending: false, sortBy: ['last_name', 'first_name'] })
        expect(store.getters['users/sorting'].descending).toEqual(false)
        expect(store.getters['users/sorting'].sortBy).toEqual(['last_name', 'first_name'])
        expect(get(store.state, 'users.sorting.descending', null)).toEqual(false)
        expect(get(store.state, 'users.sorting.sortBy', null)).toEqual(['last_name', 'first_name'])

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('last_name,first_name')
      })

      it('change sorting by multiple values and sends with getItems (descending sort)', async () => {
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setSort({ commit, dispatch, getters }, { descending: true, sortBy: ['last_name', 'first_name'] })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { descending: true, sortBy: ['last_name', 'first_name'] })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: {
                meta: {},
                data: FIXTURE_USERS
              }
            })
          }
        })
        store.dispatch('users/setSort', { descending: true, sortBy: ['last_name', 'first_name'] })
        expect(store.getters['users/sorting'].descending).toEqual(true)
        expect(store.getters['users/sorting'].sortBy).toEqual(['last_name', 'first_name'])
        expect(get(store.state, 'users.sorting.descending', null)).toEqual(true)
        expect(get(store.state, 'users.sorting.sortBy', null)).toEqual(['last_name', 'first_name'])

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('-last_name,-first_name')
      })

      it('sorts based off the first column of a composite column name', async () => {
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setSort({ commit, dispatch, getters }, { descending: false, sortBy: 'first_name,last_name' })
        expect(commit).toHaveBeenCalledWith('UPDATE_SORT', { descending: false, sortBy: 'first_name,last_name' })

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: {
                meta: {},
                data: FIXTURE_USERS
              }
            })
          }
        })
        store.dispatch('users/setSort', { descending: false, sortBy: 'first_name,last_name' })
        expect(store.getters['users/sorting'].descending).toEqual(false)
        expect(store.getters['users/sorting'].sortBy).toEqual('first_name,last_name')
        expect(get(store.state, 'users.sorting.descending', null)).toEqual(false)
        expect(get(store.state, 'users.sorting.sortBy', null)).toEqual('first_name,last_name')

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params['sort']).toEqual('first_name')
      })
    })

    describe('setFilters()', () => {
      it('does not mutate state with "sort" parameter and does not place "filter" prefix', async () => {
        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              items: { meta: {} },
              filters: null
            })
          }
        })
        store.dispatch('users/setFilters', {
          'filter[name]': 'Bill',
          'filter[status]': 1,
          sort: 'level'
        })
        expect(store.state).toHaveProperty('users.filters.name', 'Bill')
        expect(store.state).toHaveProperty('users.filters.status', 1)
        expect(store.state).not.toHaveProperty('users.filters.sort', 'level')
      })
      it('sets state and sends with getItems', async () => {
        const commit = jest.fn()
        const dispatch = jest.fn()
        const { actions, getters } = makeRestStore('users', { items: { meta: {} } })
        actions.setFilters({ commit, dispatch, getters }, { first_name: 'job', last_name: 'bluth' })
        expect(commit).toHaveBeenCalledWith('setFilters', { first_name: 'job', last_name: 'bluth' })
        mock.resetHistory()

        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', { items: { meta: {} }, filters: { company: 'Bluth Co.' } })
          }
        })
        store.dispatch('users/setFilters', { first_name: 'job', last_name: 'bluth' })
        expect(get(store.state, 'users.filters.first_name')).toEqual('job')
        expect(get(store.state, 'users.filters.last_name')).toEqual('bluth')

        // Sends with getItems
        await store.dispatch('users/getItems')
        expect(mock.history.get[0].params).toEqual({
          'filter[last_name]': 'bluth',
          'filter[first_name]': 'job',
          'page[number]': 1,
          'page[size]': 10
        })
        // Original Filter is not present since it was replaced by the setFilters call
        expect(Object.keys(mock.history.get[0].params)).not.toContain('filter[company]')
      })
    })

    describe('patchFilters', () => {
      test('merges existing state for filters without removing keys or changing values that are not supplied', () => {
        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              filters: { name: 'Bill', status: 1 }
            })
          }
        })
        store.dispatch('users/patchFilters', {
          status: 2
        })
        expect(store.state).toHaveProperty('users.filters.name', 'Bill')
        expect(store.state).toHaveProperty('users.filters.status', 2)
      })
      test('can add new key-value pair', () => {
        const store = new Vuex.Store({
          modules: {
            users: makeRestStore('users', {
              filters: { name: 'Bill' }
            })
          }
        })
        store.dispatch('users/patchFilters', {
          status: 567
        })
        expect(store.state).toHaveProperty('users.filters.name', 'Bill')
        expect(store.state).toHaveProperty('users.filters.status', 567)
      })
    })

    it('getItems({params: {}, data: {}}) respects and blends state with overrides [For Backwards Compatibility]', async () => {
      const commit = jest.fn()
      const { actions, getters, state } = makeRestStore('users', {
        items: {
          meta: {}
        },
        filters: { 'first_name': 'Lee Jung' }
      })

      await actions.getItems(
        { commit, getters, state },
        {
          params: { 'filter[tags]': 'Best,Show', direct: 'param with no conversion' },
          data: { nothing: 0 }
        }
      )
      expect(commit.mock.calls).toHaveLength(2)
      expect(commit.mock.calls[0][0]).toEqual('GET_ITEMS')
      expect(commit.mock.calls[0][1]).toEqual({
        data: { nothing: 0 },
        params: {
          'filter[tags]': 'Best,Show',
          'filter[first_name]': 'Lee Jung',
          direct: 'param with no conversion'
        }
      })
      expect(commit.mock.calls[1][0]).toEqual('GET_ITEMS_SUCCEEDED')
      expect(commit.mock.calls[1][1].actionParams).toEqual({
        data: { nothing: 0 },
        params: {
          'filter[tags]': 'Best,Show',
          'filter[first_name]': 'Lee Jung',
          direct: 'param with no conversion'
        }
      })
      expect(commit.mock.calls[1][1].payload.config.params).toEqual({
        'filter[tags]': 'Best,Show',
        'filter[first_name]': 'Lee Jung',
        direct: 'param with no conversion'
      })
      mock.resetHistory()

      const store = new Vuex.Store({
        modules: {
          users: makeRestStore('users', {
            items: { meta: {} },
            filters: { 'first_name': 'Lee Jung' }
          })
        }
      })
      store.dispatch('users/setFilters', { last_name: 'Bluth' })
      expect(get(store.state, 'users.filters.last_name')).toEqual('Bluth')

      // Sends with getItems
      await store.dispatch('users/getItems', { params: { 'filter[tags]': 'Best,Show' } })
      expect(mock.history.get[0].params).toEqual({
        'filter[last_name]': 'Bluth',
        'filter[tags]': 'Best,Show',
        'page[number]': 1,
        'page[size]': 10
      })
      // Original Filter is not present since it was replaced by the setFilters call
      expect(Object.keys(mock.history.get[0].params)).not.toContain('filter[first_name]')
    })
  })

  describe('Getter', () => {
    it('pagination returns default expected properties', () => {
      const { getters } = makeRestStore('users', {})
      expect(getters.pagination({}).totalItems).toEqual(0)
      expect(getters.pagination({}).rowsPerPage).toEqual(10)
      expect(getters.pagination({}).page).toEqual(1)
    })
    it('pagination extracts per_page, current_page, and total from state meta and appropriately names them', () => {
      const { getters } = makeRestStore('users', {})
      const result = getters.pagination({
        items: {
          meta: {
            per_page: 5,
            current_page: 1,
            total: 16
          }
        }
      })
      expect(result.totalItems).toEqual(16)
      expect(result.rowsPerPage).toEqual(5)
      expect(result.page).toEqual(1)
    })
    describe('itemAlways', () => {
      test('returns empty object even if item.data is not available on that state', () => {
        const { getters } = makeRestStore('users', {})
        let result = getters.itemAlways()
        expect(typeof result).toEqual('object')
        result = getters.itemAlways({})
        expect(typeof result).toEqual('object')
        result = getters.itemAlways({ item: null })
        expect(typeof result).toEqual('object')
        result = getters.itemAlways({ item: { data: null } })
        expect(typeof result).toEqual('object')
      })
    })
  })

  describe('Configuration', () => {
    describe('axios', () => {
      let mock
      beforeEach(() => {
        mock = createLocalVue().mock
        mock.onGet('api/items').reply(200, {
          data: FIXTURE_USERS
        })
        mock.onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          // Unexpected request, error out
          return [404, {}]
        })
      })
      afterEach(() => {
        mock.resetHistory()
      })
      it('is set during invocation', async () => {
        const axios1 = axios.create({
          baseURL: 'api'
        })
        const requestInterceptor1 = jest.fn()
        axios1.interceptors.request.use((config) => {
          requestInterceptor1()
          return config
        })
        const axios2 = axios.create({
          baseURL: 'api'
        })
        const requestInterceptor2 = jest.fn()
        axios2.interceptors.request.use((config) => {
          requestInterceptor2()
          return config
        })
        const store = new Vuex.Store({
          modules: {
            items1: makeRestStore(
              'items',
              {
                items: { meta: {} }
              },
              null,
              {
                axios: axios1
              }
            ),
            items2: makeRestStore(
              'items',
              {
                items: { meta: {} }
              },
              null,
              {
                axios: axios2
              }
            )
          }
        })
        await store.dispatch('items1/getItems')
        expect(requestInterceptor1).toHaveBeenCalled()
        expect(requestInterceptor1).toHaveBeenCalledTimes(1)
        expect(requestInterceptor2).not.toHaveBeenCalled()

        await store.dispatch('items2/getItems')
        expect(requestInterceptor1).not.toHaveBeenCalledTimes(2)
        expect(requestInterceptor2).toHaveBeenCalled()
      })
    })
  })
})
