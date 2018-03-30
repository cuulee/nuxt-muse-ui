import Vue from 'vue'
import MuseUI from 'muse-ui'
import Media from 'vue-media'

import LogoDrawer from '~/components/LogoDrawer'
import Login from '~/components/Login'
import ExpansionPanel from '~/components/ExpansionPanel'
import ExpansionPanels from '~/components/ExpansionPanels'
import SlidePage from '~/components/SlidePage'
import Step from '~/components/Step'
import Stepper from '~/components/Stepper'

Vue.use(MuseUI)

Vue.component('media', Media)
Vue.component('c-logo-drawer', LogoDrawer)
Vue.component('c-login', Login)
Vue.component('c-expansion-panel', ExpansionPanel)
Vue.component('c-expansion-panels', ExpansionPanels)
Vue.component('c-slide-page', SlidePage)
Vue.component('c-step', Step)
Vue.component('c-stepper', Stepper)
