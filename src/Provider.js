import currentUser from './store/modules/currentUser'
import navigation from './store/modules/navigation'
import navigationAdmin from './store/modules/navigationAdmin'
import userNotifications from './store/modules/userNotifications'
import { version, name } from '../package.json'

export default () => {
  return {
    name,
    layouts: require.context('./layouts', false, /\.vue$/),
    store: {
      currentUser,
      navigation,
      navigationAdmin,
      userNotifications
    },
    version
  }
}
