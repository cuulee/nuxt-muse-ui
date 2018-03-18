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
    methods: {
      commitTitle (e) {
        console.log(e, '002')
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        text: this.title
      })
      this.$store.commit('addTitleListener', this.commitTitle)
    },
    destroyed () {
      this.$store.commit('removeTitleListener', this.commitTitle)
    }
  }
</script>
