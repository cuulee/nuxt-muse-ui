import Vue from 'vue'
import Dexie from 'dexie'
import dbData from '~/static/db'

Vue.use({
  install (vue, opt) {
    vue.prototype.$db = new Dexie(dbData.name)
      .version(dbData.version)
      .stores(dbData.stores)
  }
})
