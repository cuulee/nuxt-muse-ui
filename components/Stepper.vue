<style lang="less" scoped>
.stepper {
  overflow: hidden;
  .labels {
    display: flex;
    justify-content: space-around;
  }
  .collapse {
    transition: height .2s ease-in-out;
  }
  .steps {
    display: flex;
    flex-flow: row nowrap;
    transition: transform .2s ease-in-out;
    &.vertical {
      flex-flow: column nowrap;
    }
  }
}

</style>

<template lang="pug">
  mu-paper.stepper
    mu-paper.labels(v-if="!vertical")
      c-label(
        v-for="(step, i) in steps"
        :key="i"
        @action="step.action"
        :index="step.index+1"
        :active="step.stateActive"
        :inactive="step.stateInactive"
        :editable="step.stateEditable"
        :completed="step.stateCompleted"
        :error="step.stateError"
        :optionalLabel="step.optionalLabel"
        :title="step.title"
        :subTitle="step.subTitle")
    div.collapse(:style="{height: computeHeight}")
      div.steps(ref="steps" :class="{vertical}" :style="{width: computeWidth, transform: computeTransform}")
        slot
</template>

<script>
  import Label from './StepLabel'

  export default {
    components: {
      'c-label': Label
    },
    props: {
      vertical: {
        type: Boolean,
        default: false
      },
      'auto-start': {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        index: -1,
        active: false,
        steps: []
      }
    },
    computed: {
      computeHeight () {
        if (!this.vertical) {
          let i = 1
          i = this.active && this.$refs.steps ? this.$refs.steps.scrollHeight || this.$refs.steps.clientHeight || this.$refs.steps.offsetHeight : 0
          return `${i}px`
        } else {
          return '100%'
        }
      },
      computeWidth () {
        let i = 1
        if (!this.vertical) i = this.steps.length
        return `${i * 100}%`
      },
      computeTransform () {
        let i = 0
        if (!this.vertical) {
          let m = this.index >= this.steps.length ? this.steps.length - 1 : this.index
          i = m * 100 / this.steps.length
        }
        return `Translate3D(-${i}%, 0, 0)`
      }
    },
    methods: {
      setStep (i, s) {
        this.$set(this.steps, i, s)
      },
      setActive (index) {
        this.index = index
        for (let i = 0; i < this.steps.length; i++) {
          if (i === index) {
            this.steps[i].stateActive = true
            continue
          }
          this.steps[i].stateActive = false
        }
        this.active = index >= 0 && index < this.steps.length
      }
    },
    mounted () {
      if (this.autoStart) setTimeout(() => this.setActive(0), 200)
    }
  }
</script>
