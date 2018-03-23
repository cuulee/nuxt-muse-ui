<template lang="pug">
  div
    h1 Parameter:
    h3 {{userId}}
    mu-text-field(labelFloat label="Enter your ID" v-model="userId")
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    },
    computed: {
      userId: {
        get () {
          return this.$route.query.id
        },
        set (val) {
          this.$router.push({ query: { id: val } })
        }
      }
    },
    validate ({ query }) {
      // setTimeout(() => redirect('/'), 2000)
      return true
    }
  }
</script>
