<style lang="less" scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template lang="pug">
  div.page.root
    mu-circular-progress(:strokeWidth="6" :size="72")
</template>

<script>
  export default {
    data () {
      return {
        title: 'Loading'
      }
    },
    created () {
      this.$store.commit('startTitle', {
        title: this.title,
        hideDrawer: true
      })
    },
    mounted () {
      setTimeout(() => this.$router.push({ path: '/' + (this.$route.query.target || 'login') }), 1000)
    }
  }
</script>
