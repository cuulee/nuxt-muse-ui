<template lang="pug">
  div.page
    h1 
      mu-checkbox(v-model="vertical" label="Vertical")
      mu-text-field(v-model="parseIndex" type="Number")
    c-stepper(:vertical="vertical" :active-index="index" auto-start)
      c-step(
        v-for="(v, i) in 5"
        :key="i"
        @action="setIndex(i)"
        title="Um Titulo"
        :icon="i % 2 ? 'check' : 'edit'"
        :error="i === 3"
        subTitle="sub")
        h1(style="background-color: blue;") Content {{i}}
</template>

<script>
  export default {
    data () {
      return {
        title: 'Stepper',
        q: 3,
        vertical: false,
        index: -1
      }
    },
    computed: {
      parseIndex: {
        set (i) {
          i = i || 0
          this.index = parseInt(i)
        },
        get () {
          return this.index
        }
      }
    },
    methods: {
      setIndex (i) {
        this.index = i
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
