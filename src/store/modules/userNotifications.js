import makeRestStore from '../utils/makeRestStore'
import map from 'lodash/map'
import isNumber from 'lodash/isNumber'

export default (initialState = {}) => {
  const { items, item, fetchInterval } = initialState
  let store = makeRestStore('items',
    {
      items,
      item
    },
    {
      itemsPath: ({ userId }) => `/users/${userId}/notifications`,
      itemPath: ({ userId, id }) => `/users/${userId}/notifications/${id}`
    }
  )

  store.state = {
    ...store.state,
    fetchInterval: isNumber(fetchInterval) ? fetchInterval : 12000
  }

  store.mutations = {
    ...store.mutations,
    ACKNOWLEDGE_ITEM (state, id) {
      state.items.data = map(state.items.data, item => {
        if (item.id === id) {
          item.acknowledged = 1
        }
        return item
      })
    }
  }

  store.getters = {
    ...store.getters,
    unacknowledged (state, getters) {
      return getters.items.filter((item) => {
        return !item.acknowledged
      })
    }
  }

  store.actions = {
    ...store.actions,
    acknowledgeItem ({ dispatch, commit }, payload) {
      dispatch('updateItem', { params: payload.params, data: { acknowledged: 1 } })
      commit('ACKNOWLEDGE_ITEM', payload.params.id)
    }
  }

  return {
    namespaced: true,
    ...store
  }
}
