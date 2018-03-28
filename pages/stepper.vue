<template lang="pug">
  div.page
    c-stepper()
      c-step(
        v-for="(v, i) in 5"
        :key="i")
        h1 Content {{i+1}}
</template>

<script>
  export default {
    data () {
      return {
        title: 'Stepper',
        q: 3
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
