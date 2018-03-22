<template lang="pug">
  div
    h1(v-for="(val, i) in 30") Line {{i+1}}
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
