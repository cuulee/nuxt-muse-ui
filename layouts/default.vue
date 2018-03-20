<style lang="sass">
.mu-appbar
  position: fixed
  top: 0
  transition: transform .2s ease-in-out, left .2s ease-in-out

.mu-appbar.hide
  transform: Translate3D(0, -100%, 0)

.mu-drawer
  transition: width .2s ease-in-out, transform .45s ease-in-out, visibility .45s ease-in-out

.mu-content-block
  display: flex
  position: fixed
  right: 0
  bottom: 0
  overflow-x: auto
  width: auto
  height: auto
  transition: top .2s ease-in-out, left .2s ease-in-out

.title-editable
  padding-top: 16px
  padding-left: 8px

.title-color
  color: #FFF
  font-size: 24px

.title-line-color
  color: #FFF
  background-color: #FFF
  border-color: #FFF

.color-active
  color: blue
</style>

<template>
  <div>
    <media :query="{ maxWidth: 479 }" @media-enter="$store.state.screen.phone = true" @media-leave="$store.state.screen.phone = false" />
    <media :query="{ minWidth: 480, maxWidth: 799 }" @media-enter="$store.state.screen.tablet = true" @media-leave="$store.state.screen.tablet = false" />
    <media :query="{ minWidth: 800, maxWidth: 1023 }" @media-enter="$store.state.screen.laptop = true" @media-leave="$store.state.screen.laptop = false" />
    <media :query="{ minWidth: 1024 }" @media-enter="$store.state.screen.desktop = true" @media-leave="$store.state.screen.desktop = false" />
    <mu-appbar
      :title="$store.state.titleData.editable? '' : $store.state.titleData.title"
      :class="{ hide: scrollDown }"
      :zDepth="scrollDown ? 0 : 1"
      :style="{ left: computeDrawerWidthSpace }">
      <mu-icon-button
        v-if="!$store.state.screen.desktop && $store.state.drawer.exists"
        icon="menu"
        slot="left"
        @click="$store.state.drawer.open = !$store.state.drawer.open"/>
      <template v-if="$store.state.titleData.editable">
        <div
          slot="left"
          class="title-editable"
          @keypress.enter="$store.commit('toogleEdit')">
          <mu-text-field
            v-if="$store.state.titleData.editable"
            :disabled="!$store.state.titleData.edit"
            hintTextClass="title-color"
            inputClass="title-color"
            underlineClass="title-line-color"
            underlineFocusClass="title-line-color"
            v-model="$store.state.titleData.text"
            :focus="$store.state.titleData.edit"
            :hintText="$store.state.titleData.label"/>
        </div>
        <div
          style="position: relative"
          slot="left"
          ref="titleButton"
          @mouseenter="triggerTitleTooltip(true)"
          @mouseleave="triggerTitleTooltip(false)">
          <mu-icon-button
            @click="$store.commit('toogleEdit')"
            :icon="$store.state.titleData.edit ? 'check' : 'edit'"/>
          <mu-tooltip
            :label="computeTooltip"
            :trigger="$refs.titleButton"
            :show="hoverTitleEdit"
            verticalPosition="bottom"
            horizontalPosition="center"/>
        </div>
      </template>
    </mu-appbar>
    <mu-drawer
      :open="($store.state.drawer.open || $store.state.screen.desktop) && $store.state.drawer.exists"
      :docked="$store.state.screen.desktop" @close="$store.state.drawer.open = false"
      :zDepth="0"
      :width="computeDrawerWidth">
      <div
        @mouseenter="triggerOpenMini()"
        @mouseleave="triggerCloseMini()">
        <mu-list :value="extractLinkValue($route.path)">
          <logo-drawer :mini="computeMiniDrawer"/>
          <template v-for="(item, index) in routes">
            <mu-divider v-if="item.divider"/>
            <mu-list-item
              :style="{color: 'red'}"
              :title="item.label"
              :value="item.path"
              :to="item.path" @click="$store.state.drawer.open = false">
              <mu-icon
                slot="left"
                :value="item.icon"
                :style="{ 'margin-left': computeMiniDrawer ? '8px' : '0', transition: 'margin-left .2s ease-in-out' }"/>
              <mu-tooltip
                slot="right"
                :label="item.label"
                :trigger="$refs.titleButton"
                :show="false"
                verticalPosition="bottom"
                horizontalPosition="right"/>
            </mu-list-item>
          </template>
        </mu-list>
      </div>
    </mu-drawer>
    <mu-content-block
      @scroll="eventScroll"
      :style="{left: computeDrawerWidthSpace, top: computeHideAppbar}">
      <nuxt v-show="!waitLoad"/>
      <mu-circular-progress
        v-if="waitLoad"
        :size="104"
        :strokeWidth="6"
        style="position: absolute; top:50%; left: 50%; transform: translate3D(-50%, -50%, 0)"/>
    </mu-content-block>
  </div>
</template>

<script>
  import Media from 'vue-media'
  import LogoDrawer from '~/components/LogoDrawer'
  // <mu-circular-progress v-show="waitLoad" :size="104" :strokeWidth="6"/>
  export default {
    components: {
      media: Media,
      'logo-drawer': LogoDrawer
    },
    data () {
      return {
        scrollDown: true,
        hoverTitleEdit: false,
        lastScrollTop: 0,
        drawerMini: true,
        waitLoad: true,
        waitSize: 104,
        routes: [
          {icon: 'home', path: '/', label: 'Home'},
          {icon: 'assessment', path: '/no-menu', label: 'No Menu'},
          {icon: 'assignment', path: '/mini-menu', label: 'Mini Menu'},
          {icon: 'person', path: '/scroll', label: 'Scroll'},
          {icon: '', path: '/acc/page', label: 'MultiPath', divider: true}
        ]
      }
    },
    computed: {
      computeDrawerWidth () {
        let width = this.computeMiniDrawer ? '72px' : '280px'
        return this.$store.state.drawer.exists ? width : 0
      },
      computeDrawerWidthSpace () {
        return this.$store.state.screen.desktop ? this.computeDrawerWidth : 0
      },
      computeHideAppbar () {
        return this.scrollDown ? 0 : this.appbarHeight
      },
      computeTooltip () {
        return this.$store.state.titleData.edit ? this.$store.state.titleData.checkTooltip : this.$store.state.titleData.editTooltip
      },
      computeMiniDrawer () {
        return this.$store.state.drawer.mini && this.drawerMini && this.$store.state.screen.desktop
      },
      appbarHeight () {
        return this.$store.state.screen.phone ? '56px' : '64px'
      }
    },
    methods: {
      eventScroll (e) {
        let top = this.$el.querySelector('.mu-content-block').scrollTop
        this.scrollDown = top > this.lastScrollTop
        this.lastScrollTop = top
      },
      triggerTitleTooltip (val) {
        this.hoverTitleEdit = val
      },
      triggerOpenMini () {
        this.drawerMini = false
      },
      triggerCloseMini () {
        this.drawerMini = true
      },
      extractLinkValue (link) {
        if (link.length > 1 && link.slice(-1) === '/') {
          return link.slice(0, -1)
        } else {
          return link
        }
      }
    },
    mounted () {
      this.scrollDown = false
      this.waitLoad = false
      if (process.browser) {
        let element = this.$el.querySelector('.mu-content-block')
        this.lastScrollTop = element.scrollTop
        if (element) element.addEventListener('scroll', this.eventScroll)
      }
    },
    destroyed () {
      if (process.browser) {
        let element = this.$el.querySelector('.mu-content-block')
        if (element) element.removeEventListener('scroll', this.eventScroll)
      }
    }
  }
</script>
