<style lang="less" scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

<template lang="pug">
  div.root
    my-login(@action="actionLogin")
      mu-text-field(
        slot-scope="prop"
        v-if="prop.state === 'register'"
        v-model="prop.extra.name"
        label="Name"
        labelFloat
        fullWidth)
</template>

<script>
  import MyLogin from '~/components/Login'

  export default {
    components: { MyLogin },
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
