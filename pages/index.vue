<template>
  <div>
    <h1>Test Nuxt</h1>
  </div>
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
