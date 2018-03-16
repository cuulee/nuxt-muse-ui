<template>
  <div>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page'
      }
    },
    methods: {
      commitTitle (e) {
        console.log(e, '000')
      }
    },
    mounted () {
      this.$store.state.titleEditable = true
      this.$store.state.titleText = 'Other'
      this.$store.state.titleLabel = 'Your Name'
      this.$store.state.titleCB.push(this.commitTitle)
    },
    destroyed () {
      let index = this.$store.state.titleCB.indexOf(this.commitTitle)
      this.$store.state.titleCB.splice(index, 1)
    }
  }
</script>
