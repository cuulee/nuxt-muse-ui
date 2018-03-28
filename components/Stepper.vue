<style lang="less" scoped>
.stepper {
  over-flow: hidden;
}

.labels {
  display: flex;
  justify-content: space-around;
}
</style>

<template lang="pug">
  mu-paper.stepper
    mu-paper.labels(v-if="!vertical")
      c-label(v-for="(step, i) in $slots.default" :step="step" title="title")
    div.steps
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
      }
    },
    data () {
      return {
        index: -1
      }
    }
  }
</script>
