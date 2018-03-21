<template>
  <div>
    <h1>Mini Menu Only Desktop</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Mini Menu'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title,
        miniDrawer: true
      })
    }
  }
</script>
