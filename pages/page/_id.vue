<template>
  <div>
    <h1>Parameter:</h1>
    <h3>{{$route.params.id}}</h3>
  </div>
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
    validate ({ params }) {
      return true
    }
  }
</script>
