<template>
  <div>
    <h1 @click="$route.path = '/'">Go Home</h1>
  </div>
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
      console.log(this.$router)
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
