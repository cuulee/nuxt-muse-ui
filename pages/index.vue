<template>
  <div>
    <h1>Page Index</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page 01'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
