<template>
  <div>
    <h1>Page Index Start</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
    <h1>Page Index</h1>
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
      this.$store.state.titleEditable = false
      this.$store.state.title = this.title
    }
  }
</script>
