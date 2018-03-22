<template lang="pug">
  div
    h1 Page not found!
    nuxt-link(to="/") back to Home
</template>

<script>
  export default {
    data () {
      return {
        title: 'Error - 404'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
