<style lang="less" scoped>
@import "~assets/style/vars.less";
.step {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  & .content-step {
    display: flex;
    overflow: hidden;
    transition: height .2s ease-in-out;
    & .line {
      display: inline-block;
      width: 0;
      border-right: 1px solid @grey400;
      padding-left: 36px;
      &.transparent {
        border-right-color: transparent;
      }
    }
    & .content {
      margin: 8px 24px;
      flex-grow: 1;
    }
  }
}
</style>

<template lang="pug">
  div.step
    c-label(
      v-if="vertical"
      :vertical="true"
      @action="action"
      :index="index+1"
      :icon="icon"
      :first="index === 0"
      :last="!hasNext"
      :active="stateActive"
      :colored="stateColored"
      :inactive="stateInactive"
      :completed="stateCompleted"
      :error="error"
      :optionalLabel="optionalLabel"
      :title="title"
      :subTitle="subTitle")
    div.content-step(:style="{height: computeHeight}")
      div.line(v-if="vertical" :class="{transparent: !hasNext}")
      div.content(ref="content")
        slot
</template>

<script>
  import Label from './StepLabel'

  export default {
    components: {
      'c-label': Label
    },
    props: {
      title: {
        type: String
      },
      subTitle: {
        type: String
      },
      optionalLabel: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: null
      },
      error: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      stateActive (v) {
        if (v) this.stateInactive = false
      },
      currentIndex (i) {
        this.stateActive = i === this.index
        this.stateColored = i >= this.index
      },
      error (b) {
        this.stateError = b
      }
    },
    data () {
      return {
        stateActive: false,
        stateColored: false,
        stateInactive: true,
        stateEditable: false,
        stateCompleted: false
      }
    },
    computed: {
      vertical () {
        return this.parent.vertical
      },
      currentIndex () {
        return this.parent.activeIndex
      },
      index () {
        let steps = this.parent.$slots.default
        let index = -1
        for (let i = 0; i < steps.length; i++) {
          if (steps[i].componentInstance === this) {
            index = i
            break
          }
        }
        return index
      },
      getPrev () {
        return this.parent.steps[this.index - 1]
      },
      hasPrev () {
        return !!this.getPrev
      },
      getNext () {
        return this.parent.steps[this.index + 1]
      },
      hasNext () {
        return !!this.getNext
      },
      parent () {
        return this.$parent.$parent
      },
      computeHeight () {
        if (this.vertical) {
          let i = 0
          if (this.stateActive) {
            i = this.$refs.content.scrollHeight || this.$refs.content.clientHeight || this.$refs.content.offsetHeight
          }
          return `${i}px`
        } else {
          return '100%'
        }
      }
    },
    methods: {
      action (e) {
        this.$emit('action', e)
      }
    },
    mounted () {
      this.parent.setStep(this.index, this)
    }
  }
</script>
