import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      title: '',
      titleText: '',
      titleLabel: '',
      titleEditable: false,
      titleEdit: false,
      titleCB: [],
      drawerExist: true
    },
    mutations: {
      toogleEdit (state) {
        if (state.titleEdit) {
          for (let r in state.titleCB) {
            if (state.titleCB[r]) state.titleCB[r](state.titleText)
          }
        }
        state.titleEdit = !state.titleEdit
      }
    }
  })
}
