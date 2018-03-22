<template lang="pug">
  div
    error-404(v-if="error.statusCode === 404")
</template>

<script>
  import error404 from '~/components/404'

  export default {
    components: {
      'error-404': error404
    },
    props: [
      'error'
    ],
    data () {
      return {
        title: 'Home'
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
