<template lang="pug">
  div.page
    h1 Mini Menu Only Desktop
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
