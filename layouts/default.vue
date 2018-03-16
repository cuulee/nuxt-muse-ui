<style lang="sass">
.mu-appbar
  position: fixed
  top: 0
  transition: transform .2s ease-in-out

.mu-appbar.hide
  transform: Translate3D(0, -100%, 0)

.mu-content-block
  position: fixed
  right: 0
  bottom: 0
  overflow-x: auto
  width: auto
  height: auto
  transition: top .2s ease-in-out

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

[disable]
  disable
</style>

<template>
  <div>
    <media :query="{ maxWidth: 479 }" @media-enter="screenPhone = true" @media-leave="screenPhone = false" />
    <media :query="{ minWidth: 480, maxWidth: 799 }" @media-enter="screenTablet = true" @media-leave="screenTablet = false" />
    <media :query="{ minWidth: 800, maxWidth: 1023 }" @media-enter="screenLaptop = true" @media-leave="screenLaptop = false" />
    <media :query="{ minWidth: 1024 }" @media-enter="screenDesktop = true" @media-leave="screenDesktop = false" />
    <mu-appbar
      :title="$store.state.titleEditable? '' : $store.state.title"
      :class="{ hide: scrollDown }"
      :zDepth="scrollDown ? 0 : 1"
      :style="{left: computeDrawerWidth}">
      <mu-icon-button
        v-if="!screenDesktop"
        icon="menu"
        slot="left"
        @click="drawerOpen = !drawerOpen"/>
      <template v-if="$store.state.titleEditable">
        <div slot="left" class="title-editable" @keypress.enter="titleEdit">
          <mu-text-field
            v-if="$store.state.titleEditable"
            :disabled="!$store.state.titleEdit"
            hintTextClass="title-color"
            inputClass="title-color"
            underlineClass="title-line-color"
            underlineFocusClass="title-line-color"
            v-model="$store.state.titleText"
            :focus="$store.state.titleEdit"
            :hintText="$store.state.titleLabel"/>
        </div>
          <mu-icon-button
            slot="left"
            @click="titleEdit"
            :icon="$store.state.titleEdit ? 'check' : 'edit'"/>
      </template>
    </mu-appbar>
    <mu-drawer :open="(drawerOpen || screenDesktop) && $store.state.drawerExist" :docked="screenDesktop" @close="drawerOpen = false" :zDepth="0" :width="drawerWidth">
      <mu-list>
        <h1>MARCA</h1>
        <template v-for="(item, index) in routes">
          <mu-list-item :title="item.label" :to="item.path" @click="drawerOpen = false">
            <mu-icon slot="left" :value="item.icon"/>
          </mu-list-item>
          <mu-divider v-if="item.divider"/>
        </template>
      </mu-list>
    </mu-drawer>
    <mu-content-block @scroll="eventScroll" :style="{left: computeDrawerWidth, top: computeHideAppbar}">
      <nuxt/>
    </mu-content-block>
  </div>
</template>

<script>
  import Media from 'vue-media'

  export default {
    components: {
      media: Media
    },
    data () {
      return {
        screenPhone: false,
        screenTablet: false,
        screenLaptop: false,
        screenDesktop: false,
        drawerOpen: false,
        drawerWidth: '280px',
        appbarHeight: '64px',
        scrollDown: false,
        lastScrollTop: 0,
        title: '',
        routes: [
          {icon: 'inbox', path: '/', label: 'Home', divider: false},
          {icon: 'inbox', path: '/page', label: 'Page', divider: true},
          {icon: 'inbox', path: '/page1', label: 'Page1', divider: false},
          {icon: 'inbox', path: '/page2', label: 'Page2', divider: false}
        ]
      }
    },
    computed: {
      computeDrawerWidth () {
        return this.screenDesktop ? this.drawerWidth : 0
      },
      computeHideAppbar () {
        return this.scrollDown ? 0 : this.appbarHeight
      }
    },
    watch: {
      screenPhone (val) {
        this.appbarHeight = val ? '56px' : '64px'
      },
      screenDesktop (val) {
        this.$el.style.setProperty('--drawer-width', !val ? 0 : this.drawerWidth)
      },
      scrollDown (val) {
        this.$el.style.setProperty('--app-bar-height', val ? 0 : this.appbarHeight)
      }
    },
    methods: {
      eventScroll (e) {
        let top = this.$el.querySelector('.mu-content-block').scrollTop
        this.scrollDown = top > this.lastScrollTop
        this.lastScrollTop = top
      },
      titleEdit (e) {
        this.$store.commit('toogleEdit')
      }
    },
    created () {
      if (process.browser) {
        this.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
      }
    },
    mounted () {
      if (process.browser) {
        let element = this.$el.querySelector('.mu-content-block')
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
