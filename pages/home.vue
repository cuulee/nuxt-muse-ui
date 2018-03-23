<template lang="pug">
  div
    h1 Home
</template>

<script>
  export default {
    data () {
      return {
        title: 'Home'
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
