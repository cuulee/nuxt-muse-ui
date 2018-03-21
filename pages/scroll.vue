<template>
  <div>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page 02'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
