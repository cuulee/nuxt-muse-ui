<style lang="sass">
.mu-appbar
  position: fixed
  top: 0
  right: 0
  width: auto
  transition: transform .05s linear, left .2s ease-in-out

.mu-appbar.hide
  transform: Translate3D(0, -100%, 0)

.mu-drawer
  transition: width .2s ease-in-out, transform .2s ease-in-out, visibility .2s ease-in-out

.mu-content-block
  display: flex
  width: auto
  height: auto
  transition: margin-left .2s ease-in-out

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

.mu-item, .mu-list-item
  height: 48px
</style>

<template>
  <div>
    <media :query="{ maxWidth: 479 }" @media-enter="$store.state.screen.phone = true" @media-leave="$store.state.screen.phone = false" />
    <media :query="{ minWidth: 480, maxWidth: 799 }" @media-enter="$store.state.screen.tablet = true" @media-leave="$store.state.screen.tablet = false" />
    <media :query="{ minWidth: 800, maxWidth: 1023 }" @media-enter="$store.state.screen.laptop = true" @media-leave="$store.state.screen.laptop = false" />
    <media :query="{ minWidth: 1024 }" @media-enter="$store.state.screen.desktop = true" @media-leave="$store.state.screen.desktop = false" />
    <mu-appbar
      :title="$store.state.titleData.editable? '' : $store.state.titleData.title"
      :zDepth="scrollDown ? 0 : 1"
      :style="{ left: computeDrawerWidthSpace, transform: 'Translate3D(0, -'+scrollDown+'px, 0)' }">
      <mu-icon-button
        v-if="!computeDrawerShow && $store.state.drawer.exists"
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
      :open="($store.state.drawer.open || computeDrawerShow) && $store.state.drawer.exists"
      :docked="computeDrawerShow" @close="$store.state.drawer.open = false"
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
      :style="{'margin-left': computeDrawerWidthSpace, 'padding-top': appbarHeight+'px'}">
      <nuxt/>
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
        scrollDown: 0,
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
          {icon: '', path: '/page', label: 'MultiPath', divider: true}
        ]
      }
    },
    computed: {
      computeDrawerWidth () {
        let width = this.computeMiniDrawer ? '72px' : '280px'
        return this.$store.state.drawer.exists ? width : 0
      },
      computeDrawerWidthSpace () {
        return this.computeDrawerShow ? this.computeDrawerWidth : 0
      },
      computeDrawerShow () {
        return this.$store.state.screen.desktop || (this.$store.state.screen.laptop && this.$store.state.drawer.mini)
      },
      computeTooltip () {
        return this.$store.state.titleData.edit ? this.$store.state.titleData.checkTooltip : this.$store.state.titleData.editTooltip
      },
      computeMiniDrawer () {
        return this.$store.state.drawer.mini && this.drawerMini && this.computeDrawerShow
      },
      appbarHeight () {
        return this.$store.state.screen.phone ? 56 : 64
      }
    },
    methods: {
      eventScroll (e) {
        let top = window.scrollTop || window.scrollY
        this.scrollDown += (top - this.lastScrollTop)
        this.scrollDown = this.scrollDown > this.appbarHeight ? this.appbarHeight : this.scrollDown < 0 ? 0 : this.scrollDown
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
        if (link.length > 1) {
          let index = link.indexOf('/', 1)
          let r = index >= 0 ? link.slice(0, index) : link
          return r
        } else {
          return link
        }
      }
    },
    mounted () {
      this.waitLoad = false
      if (process.browser) {
        this.lastScrollTop = window.scrollTop || window.scrollY
        window.addEventListener('scroll', this.eventScroll)
      }
    },
    destroyed () {
      if (process.browser) {
        window.removeEventListener('scroll', this.eventScroll)
      }
    }
  }
</script>
