import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

const store = { state, mutations }

export default () => {
  return new Vuex.Store(store)
}
