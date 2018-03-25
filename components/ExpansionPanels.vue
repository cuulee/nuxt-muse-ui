<style lang="less" scoped>
.root {
  display: flex;
  flex-flow: column;
  width: 100%;
}
</style>

<template lang="pug">
  div(class="root")
    slot
</template>

<script>
  export default {
    props: {
      accordion: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      accordionEvent (uid) {
        let d = this.$slots.default
        for (let i = 0; i < d.length; i++) {
          if (uid !== d[i].componentInstance._uid) {
            if (this.accordion) d[i].componentInstance.open = false
          }
        }
      },
      prevAtt (uid, val) {
        let d = this.$slots.default
        for (let i = 0; i < d.length; i++) {
          if (uid === d[i].componentInstance._uid && i > 0) {
            d[i - 1].componentInstance.prevOpen = val
            break
          }
        }
      },
      focusPrev (uid) {
        let d = this.$slots.default
        for (let i = 0; i < d.length; i++) {
          if (uid === d[i].componentInstance._uid && i > 0) {
            d[i - 1].componentInstance.focus()
            break
          }
        }
      },
      focusNext (uid) {
        let d = this.$slots.default
        for (let i = 0; i < d.length; i++) {
          if (uid === d[i].componentInstance._uid && i < d.length - 1) {
            d[i + 1].componentInstance.focus()
            break
          }
        }
      },
      focusTop () {
        let d = this.$slots.default
        if (d.length > 0) d[0].componentInstance.focus()
      },
      focusBottom () {
        let d = this.$slots.default
        if (d.length > 0) d[d.length - 1].componentInstance.focus()
      }
    }
  }
</script>
