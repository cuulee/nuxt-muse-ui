<style lang="less" scoped>
.step {

}
</style>

<template lang="pug">
  div.step
    slot
</template>

<script>
  import Label from './StepLabel'

  export default {
    components: {
      'c-label': Label
    },
    data () {
      return {
        state: []
      }
    },
    computed: {
      vertical () {
        return this.$parent.$parent.vertical
      },
      currentIndex () {
        return this.$parent.$parent.index
      },
      index () {
        let steps = this.$parent.$parent.$slots.default
        let index = -1
        for (let i = 0; i < steps.length; i++) {
          if (steps[i].componentInstance === this) {
            index = i
            break
          }
        }
        return index
      }
    },
    methods: {
      addState (s) {
        if (this.state.indexOf(s) < 0) this.state.push(s)
      },
      removeState (s) {
        let i = this.state.indexOf(s)
        if (i >= 0) this.state.splite(i, 1)
      },
      hasState (s) {
        return this.state.indexOf(s) >= 0
      }
    }
  }
</script>
