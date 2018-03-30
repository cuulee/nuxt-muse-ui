<template lang="pug">
  div.page
    c-stepper(:vertical="vertical" auto-start)
      c-step(
        title="Um Titulo"
        subTitle="sub")
        h1(style="background-color: blue;") Content
      c-step(
        title="Um Titulo"
        subTitle="sub"
        optional)
        h1(style="background-color: blue;") Content
      c-step(
        title="Um Titulo"
        subTitle="sub")
        h1(style="background-color: blue;") Content
      c-step(
        title="Um Titulo"
        subTitle="sub")
        h1(style="background-color: blue;") Content
</template>

<script>
  export default {
    data () {
      return {
        title: 'Stepper',
        q: 3,
        vertical: true
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
