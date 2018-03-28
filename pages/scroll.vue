<template lang="pug">
  div.page
    c-expansion-panels(:accordion="accordion")
      c-expansion-panel(
        v-for="(v, i) in 20"
        :key="i"
        :description="'sub headasdasdasdasdasd'"
        :secondaryDescription="i % 3 ? 'sub head' : ''"
        :subTitle="i % 2 ? 'sub head' : ''"
        :title="'Line ' + (i+1)")
        h1 asdasd
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page 02',
        accordion: true,
        q: 1
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
