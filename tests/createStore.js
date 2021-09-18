import { createStoreFromProviders } from '../src/App'
import axios from 'axios'
import Provider from '../src/Provider'
import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

/**
 * DataVisibility really should be a part of Deals API and other similar data visibility need Modules
 *  However, this is currently on User Model via an override in various projects like SmartMotors
 * @constructor
 */
const UserProviderMock = () => {
  return {
    name: 'freshinup/users',
    version: 'x.x.x',
    store: {
      users: () => {
        return makeRestStore('users', {})
      }
    }
  }
}

export default (initialState = {}, options = {}) => {
  return createStoreFromProviders(
    [
      Provider(),
      UserProviderMock()
    ],
    {
      navigationAdmin: {
        headerImage: 'images/header-background.jpg'
      },
      userNotifications: {
        fetchInterval: 0
      },
      ...initialState
    },
    {
      axios,
      ...options
    }
  )
}
