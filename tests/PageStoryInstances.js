import mockApi from 'vue-cli-plugin-freshinup-ui/utils/mockApi'
import _axios from 'axios'
import Provider from '../src/Provider'
import Vue from 'vue'

const apiMocked = mockApi({ axios: _axios })
const axios = apiMocked.axiosInstance

const providers = [
  Provider()
]

export { apiMocked, axios, Vue, providers }

export default {
  axios,
  apiMocked,
  providers,
  Vue
}
