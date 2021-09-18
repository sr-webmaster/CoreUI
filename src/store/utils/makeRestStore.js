import Vapi from 'vuex-rest-api'
import { plural, singular } from 'pluralize'
import moment from 'moment'
import { updateField, getField } from 'vuex-map-fields'
import get from 'lodash/get'
import set from 'lodash/set'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import mapKeys from 'lodash/mapKeys'
import isEmpty from 'lodash/isEmpty'
import throttle from 'lodash/throttle'
import capitalize from 'lodash/capitalize'

/**
 * Returns the pagination for this store as a set of query parameters
 *
 * From the Pagination object (components/mixins/Pagination.js) we only use the page number and # of rows per page
 * @param Pagination pagination
 * @private
 */
export const _getPaginationAsParams = (pagination) => {
  const paginationAsParams = {}
  if (pagination.rowsPerPage) {
    paginationAsParams['page[size]'] = pagination.rowsPerPage
  }
  if (pagination.page) {
    paginationAsParams['page[number]'] = pagination.page
  }
  return paginationAsParams
}

/**
 * Returns the column to sort by when given a column name
 *
 * A compound column has multiple columns separated by commas
 * The sort column for compounds is the first column in the list
 * Otherwise it's just the column name
 * @param columnName
 * @returns {*}
 * @private
 */
export const _getSortStringForColumnName = (columnName) => {
  return columnName.split(',')[0]
}

/**
 * Returns the sorting properties as a set of query parameters
 *
 * Sorting object has two main properties: `sortBy` and `descending`
 * `sortBy` is the column(s) (either a string or an array) which is/are being sorted by
 * `descending` is a boolean value of the sort direction: true is descending, false or undefined is ascending
 * We use the method above to help create the correct sort parameter string
 * @param sorting
 * @returns {{}}
 * @private
 */
export const _getSortingAsParams = (sorting) => {
  if (!sorting.sortBy) {
    return {}
  }
  let sortByValue = sorting.sortBy
  const sortingAsParams = {}
  if (sortByValue.indexOf('[') !== -1) {
    // strip the first & last characters
    let tryMe = sortByValue.substr(1, sortByValue.length - 2)
    // now split by comma
    sortByValue = tryMe.split(',')
    sortByValue.forEach(function (val) {
      return val.trim()
    })
  }
  if (Array.isArray(sortByValue)) {
    let columnNames = []
    for (let columnIndex in sortByValue) {
      columnNames.push(_getSortStringForColumnName(sortByValue[columnIndex]))
    }
    sortingAsParams['sort'] = columnNames.join(',')
  } else {
    sortingAsParams['sort'] = _getSortStringForColumnName(sortByValue)
  }
  if (sorting.descending) {
    sortingAsParams['sort'] = '-' + sortingAsParams['sort']
    if (Array.isArray(sortByValue)) {
      let sortedColumns = sortingAsParams['sort'].split(',')
      for (let j = 1; j < sortedColumns.length; j++) {
        sortedColumns[j] = '-' + sortedColumns[j]
      }
      sortingAsParams['sort'] = sortedColumns.join(',')
    }
  }
  return sortingAsParams
}

/**
 * Quickly build a REST Module with our Fresh Standards
 * @param name
 * @param items Initial State for Items
 * @param item  Initial State for Item (selected item)
 */
export const buildApi = (name, { items, item, filters } = {}, basePaths, options = {}) => {
  const namePluaral = plural(name)
  const nameSingular = singular(name)
  const _basePaths = {
    itemsPath: () => `/${namePluaral.toLowerCase()}`,
    itemPath: ({ id }) => `/${namePluaral.toLowerCase()}/${id}`,
    ...basePaths
  }
  const queryParams = {
    all: typeof options.queryParams === 'boolean' ? options.queryParams : false,
    getItems: true,
    getItem: true,
    createItem: false,
    updateItem: false,
    patchItem: false,
    removeItem: false,
    ...options.queryParams
  }
  return new Vapi(
    {
      baseURL: 'api',
      queryParams: queryParams.all,
      state: {
        items,
        item,
        filters: filters || {},
        sorting: {
          sortBy: '',
          descending: false
        }
      },
      namespaced: true, // false became the new default https://github.com/christianmalek/vuex-rest-api/pull/99
      axios: options.axios
    })
    // Backwards compatible
    .get({
      action: 'get' + capitalize(namePluaral),
      property: 'items',
      path: _basePaths.itemsPath,
      queryParams: queryParams.getItems
    })
    .post({
      action: 'create' + capitalize(nameSingular),
      property: 'items',
      path: _basePaths.itemsPath,
      queryParams: queryParams.createItem
    })
    .get({
      action: 'get' + capitalize(nameSingular),
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.getItem
    })
    .put({
      action: 'update' + capitalize(nameSingular),
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.updateItem
    })
    .delete({
      action: 'remove' + capitalize(nameSingular),
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.removeItem
    })
    // New Syntax
    .get({
      action: 'getItems',
      property: 'items',
      path: _basePaths.itemsPath,
      queryParams: queryParams.getItems
    })
    .put({
      action: 'updateItems',
      property: 'items',
      path: _basePaths.itemsPath,
      queryParams: queryParams.updateItem
    })
    .post({
      action: 'createItem',
      property: 'items',
      path: _basePaths.itemsPath,
      queryParams: queryParams.createItem
    })
    .get({
      action: 'getItem',
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.getItem
    })
    .put({
      action: 'updateItem',
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.updateItem
    })
    .patch({
      action: 'patchItem',
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.patchItem
    })
    .delete({
      action: 'deleteItem',
      property: 'item',
      path: _basePaths.itemPath,
      queryParams: queryParams.removeItem
    })
}

export const makeModule = (store, moduleName = '') => {
  const _actions = {
    ...store.actions
  }
  return {
    namespaced: true,
    ...store,
    getters: {
      itemAlways: state => get(state, 'item.data', {}),
      item: state => get(state, 'item.data', null),
      items: state => get(state, 'items.data', []),
      getField (state) {
        return getField(get(state, 'item.data', {}))
      },
      getDateTimeField (state) {
        return (path) => {
          const isolatedState = get(state, 'item.data', {})
          const fieldValue = getField(isolatedState)(path)
          return isEmpty(fieldValue) || fieldValue === 'Invalid date'
            ? fieldValue
            : moment(fieldValue).local().format('YYYY-MM-DD HH:mm:ss')
        }
      },
      pagination (state) {
        return {
          rowsPerPage: get(state, 'items.meta.per_page', 10),
          totalItems: get(state, 'items.meta.total', 0),
          page: get(state, 'items.meta.current_page', 1)
        }
      },
      sorting (state) {
        return {
          sortBy: get(state, 'sorting.sortBy', ''),
          descending: get(state, 'sorting.descending', false)
        }
      },
      sortBy (state, getters) {
        return getters.sorting.sortBy
      }
    },
    actions: {
      ...store.actions,
      setPagination ({ commit }, payload) {
        commit('UPDATE_PAGINATION', payload)
        commit('UPDATE_SORT', payload)
      },
      setSort ({ commit }, payload) {
        commit('UPDATE_SORT', payload)
      },
      setFilters ({ commit }, payload) {
        commit('setFilters', payload)
      },
      patchFilters ({ commit, state }, payload) {
        commit('setFilters', {
          ...state.filters,
          ...payload
        })
      },
      deleteItem ({ dispatch }, { getItems }) {
        const postGet = (getItems !== undefined) ? getItems : true
        let dispatchables = [_actions.deleteItem.apply(null, arguments)]
        if (postGet) dispatchables.push(dispatch('getItems'))
        return Promise.all(dispatchables)
      },
      getItems (context, payload = { params: {}, data: {} }) {
        const pagination = context.getters.pagination
        const sorting = context.getters.sorting
        // Convert filters into query parameters that is JSON API compliant
        const filters = mapKeys(context.state.filters, function (value, key) {
          // In order to be backwards compatible we need to ignore a few keys
          //    No deprecation plan yet as there is not a design change planned.
          //    Most likely we'll need a setSort() and term may remain
          if (['term', 'q', 'sort'].indexOf(key) > -1) {
            return key
          }
          return key.indexOf('filter[') === 0 ? key : `filter[${key}]`
        })

        // Deprecation Notice
        const deprecatedKeys = Object.keys(pickBy(payload.params, (value, key) => {
          return key.indexOf('filter[') > -1 || key.indexOf('sort') > -1
        }))
        if (deprecatedKeys.length > 0) {
          console.warn(`
FreshBUS: Version 1.15 of FreshBUS is the last support filtering through getList({ params }) on Store Modules made from makeRestStore.
Please switch to using setFilters() before calling getItems(). Keys provided are ${deprecatedKeys} on ${moduleName}
          `)
        }
        payload.params = {
          ..._getPaginationAsParams(pagination),
          ..._getSortingAsParams(sorting),
          ...filters,
          ...payload.params
        }

        return _actions.getItems.apply(null, [context, payload])
      }
    },
    mutations: {
      ...store.mutations,
      updateField: throttle((state, field) => {
        updateField(state.item.data, field)
      }, 1000),
      updateDateTimeField: throttle((state, field) => {
        field.value = moment(field.value).utc().format('YYYY-MM-DD HH:mm:ss')
        updateField(state.item.data, field)
      }, 1000),
      setFilters: (state, payload) => {
        payload = omitBy(payload, (value, key) => {
          return key.indexOf('sort') > -1
        })
        state.filters = mapKeys(payload, (value, key) => {
          return key.replace(/filter\[(.*)]/gi, '$1')
        })
      },
      UPDATE_PAGINATION: (state, value) => {
        set(state, 'items.meta.per_page', value.rowsPerPage)
        set(state, 'items.meta.total', value.totalItems)
        set(state, 'items.meta.current_page', value.page)
      },
      UPDATE_SORT: (state, value) => {
        if (typeof value === 'string') {
          value = {
            sortBy: value.replace(/^-/, ''),
            descending: value.indexOf('-') === 0
          }
        }
        set(state, 'sorting.sortBy', value.sortBy)
        set(state, 'sorting.descending', value.descending)
      }
    }
  }
}

/**
 * Quickly build a REST Module with our Fresh Standards
 * @param name
 * @param items Initial State for Items
 * @param item  Initial State for Item (selected item)
 */
export default (name, { items, item, filters }, basePaths, options = {}) => {
  const api = buildApi(name, { items, item, filters }, basePaths, options)
  return makeModule(api.getStore({
    namespaced: true
  }), name)
}
