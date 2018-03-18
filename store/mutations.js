export default {
  toogleEdit (state) {
    if (state.titleData.edit) {
      for (let r in state.titleData.callback) {
        if (state.titleData.callback[r]) state.titleData.callback[r](state.titleData.text)
      }
    }
    state.titleData.edit = !state.titleData.edit
  },
  startTitle (state, data) {
    state.titleData.title = data.title || ''
    state.titleData.text = data.text || ''
    state.titleData.label = data.label || ''
    state.titleData.editTooltip = data.editTooltip || ''
    state.titleData.checkTooltip = data.checkTooltip || ''
    state.titleData.editable = !data.title

    state.drawer.exists = !data.hideDrawer
  },
  addTitleListener (state, data) {
    state.titleData.callback.push(data)
  },
  removeTitleListener (state, data) {
    let index = state.titleData.callback.indexOf(data)
    state.titleData.callback.splice(index, 1)
  }
}
