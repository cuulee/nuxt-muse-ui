<template lang="pug">
  div.page
    
</template>

<script>
  export default {
    data () {
      return {
        title: 'Stepper'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
