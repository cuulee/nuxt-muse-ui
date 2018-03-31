<style lang="less" scoped>
@import "~assets/style/vars.less";
.step-label,
.step-label > div {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.step-label {
  position: relative;
  height: 72px;
  flex-grow: 1;
}

.step-label > .mu-flat-button {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line {
  background-color: @grey400;
  border-top: 1px solid @grey400;
  border-right: 1px solid @grey400;
  flex-grow: 1;
}

.step-label:first-child:not(.vertical) .line:first-child,
.step-label:last-child:not(.vertical) .line:last-child {
  border: none;
  width: 16px;
  flex-grow: 0;
}

.labels {
  display: flex;
  flex-flow: row nowrap;
}

.icon-content {
  display: flex;
  border-radius: 100%;
  margin: 8px;
  width: 24px;
  height: 24px;
  background-color: @lighterPrimaryColor;
  & > * {
    width: 24px;
    height: 24px;
    text-align: center;
    color: white;
    line-height: 24px;
    font-size: 12px;
  }
  & > i {
    font-size: 16px;
  }
}

.title {
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  align-items: left;
  justify-content: center;
  margin-right: 8px;
  white-space: nowrap;
  & > span:first-child {
    flex-grow: 0;
    overflow: hidden;
    line-height: 14px;
    font-size: 14px;
  }
  & > span:last-child {
    line-height: 12px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
  }
}

.vertical {
  .step-label& > div {
    flex-flow: column nowrap;
    text-align: left;
    align-items: left;
    padding-left: 16px;
  }
  &.first .line:first-child,
  &.last .line:last-child {
    border: none;
  }
  & .line {
    margin-left: 20px;
  }
  & .labels {
    align-items: baseline;
  }
}

.colored {
  & .icon-content {
    background-color: @primaryColor;
  }
}

.active {
  & .title > span:first-child {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 500;
  }
}

.inactive {
  & .title > span:first-child {
    color: @lighterPrimaryColor;
  }
}

.error {
  & * {
    color: @red !important;
  }
  & .icon-content {
    background-color: transparent;
    & i {
      font-size: 24px;
    }
  }
}
</style>

<template lang="pug">
  div.step-label(:class="{vertical, active, colored, inactive, completed, error, first, last}" tab-index="0")
    div
      div.line
      div.labels
        div.icon-content
          i(v-if="error" class="material-icons") warning
          i(v-else-if="icon" class="material-icons") {{icon}}
          span(v-else) {{index}}
        div.title(v-if="!!title")
          span {{title}}
          span {{subTitle}}
      div.line
    mu-flat-button(
      @click="emitClick"
      ref="clickButton")
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: -1
      },
      title: {
        type: String
      },
      subTitle: {
        type: String
      },
      icon: {
        type: String
      },
      vertical: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      colored: {
        type: Boolean,
        default: false
      },
      inactive: {
        type: Boolean,
        default: false
      },
      completed: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      optionalLabel: {
        type: Boolean,
        default: false
      },
      first: {
        type: Boolean,
        default: false
      },
      last: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      emitClick (e) {
        this.$emit('action', e)
      }
    }
  }
</script>
