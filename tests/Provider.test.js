import Provider from '../src/Provider'
import { version, name } from '../package.json'
import isFunction from 'lodash/isFunction'

describe('Provider', () => {
  test('has version from package.json', () => {
    expect(Provider()).toHaveProperty('version', version)
  })
  test('has name from package.json', () => {
    expect(Provider()).toHaveProperty('name', name)
  })
  test('has layouts', () => {
    expect(Provider()).toHaveProperty('layouts')
    expect(isFunction(Provider().layouts)).toEqual(true)
  })
  test('does not have pages', () => {
    expect(Provider()).not.toHaveProperty('pages')
  })
  test('has store', () => {
    const result = Provider()
    expect(result).toHaveProperty('store')
    const expectedStoreModules = [
      'currentUser',
      'navigation',
      'navigationAdmin',
      'userNotifications'
    ]
    expectedStoreModules.forEach((value) => {
      expect(result.store).toHaveProperty(value)
      expect(isFunction(result.store[value])).toEqual(true)
    })
  })
})
