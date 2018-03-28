<style lang="less" scoped>
.step-label {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  & > * {
    flex-grow: 1;
    background-color: blue;
  }
}

.line {
  height: 1px;
  background-color: red;
}

.step-label:first-child > .line:first-child,
.step-label:last-child > .line:last-child {
  background-color: transparent;
}
</style>

<template lang="pug">
  div.step-label
    div.line
    div
      span {{index}}
    div
      span {{title}}
      span
    div.line
</template>

<script>
  export default {
    props: {
      step: {
        type: Object
      },
      title: {
        type: String
      }
    },
    computed: {
      index () {
        return this.step && this.step.componentInstance ? this.step.componentInstance.index : -1
      }
    },
    mounted () {
      console.log(this.step)
    }
  }
</script>
