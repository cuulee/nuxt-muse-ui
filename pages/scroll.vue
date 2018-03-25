<template lang="pug">
  div(class="page")
    my-expansion-panels(:accordion="accordion")
      my-expansion-panel(
        v-for="v in 8"
        :description="'sub headasdasdasdasdasd'"
        :secondaryDescription="v % 3 ? 'sub head' : ''"
        :subTitle="v % 2 ? 'sub head' : ''"
        :title="'Line ' + v")
        h1 asdasd
</template>

<script>
  import MyExpansionPanel from '~/components/ExpansionPanel'
  import MyExpansionPanels from '~/components/ExpansionPanels'
  import MyStep from '~/components/Step'
  import MyStepper from '~/components/Stepper'
  import MyStepContent from '~/components/StepContent'
  import MyStepLabel from '~/components/StepLabel'

  export default {
    components: {
      MyExpansionPanel,
      MyExpansionPanels,
      MyStep,
      MyStepper,
      MyStepContent,
      MyStepLabel
    },
    data () {
      return {
        title: 'Page 02',
        accordion: true,
        q: 1
      }
    },
    mounted () {
      this.$store.commit('startTitle', {
        title: this.title
      })
    }
  }
</script>
