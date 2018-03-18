<template>
  <div>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
    <h1>Page Start</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Page Awe'
      }
    },
    methods: {
      commitTitle (e) {
        console.log(e, '000')
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        text: '',
        label: 'LABEL',
        editTooltip: 'edit',
        checkTooltip: 'check'
      })
      this.$store.commit('addTitleListener', this.commitTitle)
    },
    destroyed () {
      this.$store.commit('removeTitleListener', this.commitTitle)
    }
  }
</script>
