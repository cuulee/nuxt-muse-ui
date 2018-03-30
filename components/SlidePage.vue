<style lang="less" scoped>
.slide-page {
  width: 100%;
  overflow: hidden;
  & > .content {
    display: flex;
    flex-flow: row nowrap;
    transition: transform .2s ease-in-out;
    & > * {
      width: 100%;
    }
  }
}
</style>

<template lang="pug">
  div.slide-page
    div.content(:style="{width: ($slots.default.length * 100) + '%', transform: 'Translate3D(-'+(index*100/$slots.default.length)+'%, 0, 0)'}")
      slot
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: 0
      }
    }
  }
</script>
