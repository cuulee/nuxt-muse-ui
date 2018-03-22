<template lang="pug">
  div
    h1 Test Nuxt
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
        title: this.title
      })
    }
  }
</script>
