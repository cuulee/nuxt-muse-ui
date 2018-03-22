const state = {
  titleData: {
    title: '',
    text: '',
    label: '',
    editTooltip: '',
    checkTooltip: '',
    editable: false,
    edit: false,
    callback: []
  },
  screen: {
    phone: false,
    tablet: false,
    laptop: false,
    desktop: false
  },
  drawer: {
    exists: true,
    open: false,
    mini: false
  },
  logo: {
    type: 'image',
    miniContent: '/favicon.ico',
    content: '/icon.png'
  }
}

if (process.browser) {
  state.screen.phone = window.matchMedia('(max-width: 479px)').matches
  state.screen.tablet = window.matchMedia('(min-width: 480px, max-width: 799px)').matches
  state.screen.laptop = window.matchMedia('(min-width: 800px, max-width: 1023px)').matches
  state.screen.desktop = window.matchMedia('(min-width: 1024px)').matches
}

export default state
