<style lang="less" scoped>
@import "~muse-ui/less/vars.less";
@borderRadius: 2px;

.panel {
  position: relative;
  display: flex;
  flex-flow: column;
  margin-top: 0;
  margin-bottom: 0;
  overflow: hidden;
  padding: 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition:
    margin-top .2s ease-in-out,
    margin-bottom .2s ease-in-out;
}

.panel:not(:first-child) {
  border-top: 1px solid rgba(0, 0, 0, .12);
}

.panel.open {
  height: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  border-top: none;
  border-radius: @borderRadius;
}

.panel.open + .panel {
  border-top: none;
  border-top-left-radius: @borderRadius;
  border-top-right-radius: @borderRadius;
}

.panel:first-child:not(.open) {
  border-top-left-radius: @borderRadius;
  border-top-right-radius: @borderRadius;
}

.panel:last-child:not(.open),
.panel.prev-open {
  border-bottom-left-radius: @borderRadius;
  border-bottom-right-radius: @borderRadius;
}

.panel > * {
  margin: 0;
}

.panel > div:first-child {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  padding-left: 8px;
  padding-right: 8px;
  transition: height .2s ease-in-out;
  outline: none;
}

.panel > div:first-child:focus {
  background-color: @grey200;
}

.panel > div:first-child + div {
  transition: height .2s ease;
  width: 100%;
  overflow: hidden;
}

.panel > div:first-child + div > div {
  border-top: 1px solid rgba(0, 0, 0, .12);
  padding: 16px 24px;
}

.panel > div:first-child > div:first-child {
  width: calc((100% - 64px) / 3);
  padding-left: 16px;
  display: flex;
  flex-flow: column;
}

.panel > div:first-child > div + div {
  width: calc(((100% - 64px) / 3) * 2);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  font-size: 15px;
  line-height: 15px;
  color: rgba(0, 0, 0, .87);
}

.sub-title {
  font-size: 12px;
  line-height: 12px;
  color: rgba(0, 0, 0, .54);
}

.description,
.sec-description {
  width: 50%;
  font-size: 15px;
  color: rgba(0, 0, 0, .54);
}

.sec-description {
  padding-left: 16px;
}

.mu-icon-button {
  color: rgba(0, 0, 0, .38);
}
</style>

<template lang="pug">
  div(
    class="panel"
    :class="{open: open, 'prev-open': prevOpen}")
    div(
      tabindex="1"
      ref="header"
      @click="triggerOpen()"
      @keypress.enter="triggerOpen()"
      @keypress.space="triggerOpen()"
      @keydown.38="triggerArrow('up')"
      @keydown.40="triggerArrow('down')"
      @keydown.37="triggerArrow('up')"
      @keydown.39="triggerArrow('down')"
      @keydown.home="triggerArrow('top')"
      @keydown.end="triggerArrow('bottom')"
      @keydown.page-up="triggerArrow('top')"
      @keydown.page-down="triggerArrow('bottom')"
      :style="{height: open || subTitle ? '64px' : '48px'}")
      div
        span(class="title") {{title}}
        span(class="sub-title") {{subTitle}}
      div
        span(class="description") {{description}}
        span(class="sec-description") {{secondaryDescription}}
      mu-icon-button(:tabindex="-1" :icon="open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'")
    div(:style="{height: open ? calcHeight($refs.content)+'px' : '0'}")
      div(ref="content")
        slot
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String
      },
      description: {
        type: String,
        default: ''
      },
      secondaryDescription: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        open: false,
        prevOpen: false
      }
    },
    watch: {
      open (val) {
        this.$parent.prevAtt(this._uid, val)
        if (val) {
          this.$parent.accordionEvent(this._uid)
        }
      }
    },
    computed: {
      accordion () {
        return this.$parent.accordion
      }
    },
    methods: {
      calcHeight (el) {
        return el.clientHeight || el.offsetHeight || el.scrollHeight
      },
      triggerOpen () {
        this.open = !this.open
      },
      triggerArrow (val) {
        switch (val) {
          case 'up':
            this.$parent.focusPrev(this._uid)
            break
          case 'down':
            this.$parent.focusNext(this._uid)
            break
          case 'top':
            this.$parent.focusTop()
            break
          case 'bottom':
            this.$parent.focusBottom()
            break
        }
      },
      focus () {
        this.$refs.header.focus()
      }
    }
  }
</script>
