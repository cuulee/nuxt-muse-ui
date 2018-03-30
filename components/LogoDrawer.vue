<style lang="less" scoped>
.logo-drawer {
  display: flex;
  justify-content: center;
  align-items: stretch;
  text-align: center;
  > * {
    width: calc(100% - 16px);
    transition: height .2s ease-in-out;
    position: relative;
  }
  div > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>

<template lang="pug">
  div.logo-drawer
    h1(
      v-if="$store.state.logo.type === 'text'"
      :style="{'height': mini ? '72px' : '104px'}") {{mini ? $store.state.logo.miniContent : $store.state.logo.content}}
    div(v-if="$store.state.logo.type === 'image'" :style="{'height': mini ? '72px' : '104px'}")
      div(class="hidable" :class="{hide: !mini}" :style="{'background-image': 'url('+$store.state.logo.miniContent+')'}")
      div(class="hidable" :class="{hide: mini}" :style="{'background-image': 'url('+$store.state.logo.content+')'}")
</template>

<script>
  export default {
    props: {
      mini: true
    }
  }
</script>