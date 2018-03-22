<template lang="pug">
  div
    h1
      nuxt-link(to="/") Go Home
</template>

<script>
  export default {
    data () {
      return {
        title: 'No Menu'
      }
    },
    methods: {
      commitTitle (e) {
        console.log(e)
        alert(e)
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        text: '',
        label: 'LABEL',
        editTooltip: 'edit',
        checkTooltip: 'check',
        hideDrawer: true
      })
      this.$store.commit('addTitleListener', this.commitTitle)
    },
    destroyed () {
      this.$store.commit('removeTitleListener', this.commitTitle)
    }
  }
</script>
