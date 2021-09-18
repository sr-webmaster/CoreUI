import StoreModule from '@/store/modules/generalMessage'

describe('generalErrorMessages Vuex Module', () => {
  describe('getters', () => {
    test('message', () => {
      const store = StoreModule()
      expect(store.getters).toHaveProperty('message')
      expect(store.getters.message({
        message: 'test'
      })).toEqual('test')
    })
  })
  describe('actions', () => {
    describe('setErrors', () => {
      test('setMessage', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setMessage({ commit }, 'test')
        expect(commit).toHaveBeenNthCalledWith(1, 'message', 'test')
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', true)
      })
      test('setVisibility', () => {
        const commit = jest.fn()
        const actions = StoreModule().actions
        actions.setVisibility({ commit }, true)
        actions.setVisibility({ commit }, false)
        expect(commit).toHaveBeenNthCalledWith(1, 'isVisible', true)
        expect(commit).toHaveBeenNthCalledWith(2, 'isVisible', false)
      })
    })
  })
})
