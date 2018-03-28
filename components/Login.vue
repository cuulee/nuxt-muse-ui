<style lang="less" scoped>
.login {
  width: 360px;
  @media screen and (max-width: 392px) {
    min-width: 256px;
    width: 100%;
  }
}

.mu-card-actions {
  display: flex;
  flex-flow: column;
  > *:not(:first-child) {
    margin-top: 8px;
  }
}
</style>

<template lang="pug">
  form(@submit="submitForm" action="#" method="get" ref="formLogin")
    mu-card.login
      mu-card-title(:title="computeTitle")
      mu-card-text
        mu-text-field(
          labelFloat
          fullWidth
          autofocus
          ref="emailInput"
          name="email"
          type="email"
          v-model="email"
          :label="getLabel('inputEmail', 'Email')")
        mu-text-field(
          v-if="!isForget"
          labelFloat
          fullWidth
          name="password"
          type="password"
          v-model="password"
          :label="getLabel('inputPassword', 'Password')")
        mu-text-field(
          v-if="isRegister"
          labelFloat
          fullWidth
          name="cpassword"
          type="password"
          onpaste="return false"
          onDrop="return false"
          v-model="cpassword"
          :label="getLabel('inputCPassword', 'Confirm Password')")
        slot(:extra="sloted" :state="state")
        vue-recaptcha(sitekey="6LejJEIUAAAAAOoYdeiUgJLD1McwQpXOPtboygYu")
      mu-card-actions
        button(type="submit" ref="submitButton" style="display: none")
        mu-raised-button(primary v-if="isLogin" :label="getLabel('loginEnter', 'Sign in')" @click="$refs.submitButton.click()")
        mu-raised-button(primary v-if="isRegister" :label="getLabel('registerEnter', 'Sign up')" @click="$refs.submitButton.click()")
        mu-raised-button(primary v-if="isForget" :label="getLabel('forgetEnter', 'Recover')" @click="$refs.submitButton.click()")
        mu-flat-button(v-if="isLogin" :label="getLabel('loginRegister', 'Create an account')" @click.prevent="setState('register')")
        mu-flat-button(v-if="isLogin" :label="getLabel('loginForget', 'I forget my password')" @click.prevent="setState('forget')")
        mu-flat-button(v-if="isRegister" :label="getLabel('registerReady', 'I already have an account')" @click.prevent="setState('login')")
        mu-flat-button(v-if="isForget" :label="getLabel('forgetReady', 'I remembered my password')" @click.prevent="setState('login')")
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'

  export default {
    components: { VueRecaptcha },
    props: {
      labels: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        state: 'login',
        sloted: {},
        email: '',
        password: '',
        cpassword: ''
      }
    },
    computed: {
      isLogin () {
        return this.state === 'login'
      },
      isRegister () {
        return this.state === 'register'
      },
      isForget () {
        return this.state === 'forget'
      },
      computeTitle () {
        switch (true) {
          case this.isLogin:
            return this.getLabel('loginTitle', 'Login')
          case this.isRegister:
            return this.getLabel('registerTitle', 'Register')
          case this.isForget:
            return this.getLabel('forgetTitle', 'Recover')
          default:
            return 'Error'
        }
      }
    },
    methods: {
      getLabel (val, dval) {
        return this.labels[val] ? this.labels[val] : dval
      },
      submitForm (e) {
        let data = Object
          .assign({
            email: this.email,
            password: this.password,
            cpassword: this.cpassword,
            state: this.state
          }, this.sloted)
        this.$emit('action', data)
        e.preventDefault()
        return false
      },
      setState (s) {
        this.state = s
        this.$refs.emailInput.focus()
      }
    },
    mounted () {
      this.$refs.emailInput.focus()
    }
  }
</script>
