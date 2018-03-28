<style lang="less" scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template lang="pug">
  div.page.root
    c-login(@action="actionLogin")
      mu-text-field(
        slot-scope="prop"
        v-if="prop.state === 'register'"
        v-model="prop.extra.name"
        label="Name"
        labelFloat
        fullWidth)
</template>

<script>
  export default {
    data () {
      return {
        title: 'Login'
      }
    },
    created () {
      this.$store.commit('startTitle', {
        title: this.title,
        hideDrawer: true
      })
    },
    mounted () {
    },
    methods: {
      actionLogin (e) {
        this.$router.push({ path: '/' + (this.$route.query.target || 'home') })
      }
    }
  }
</script>
