const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  modules: [
    '@nuxtjs/component-cache',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Template - nuxt-muse-ui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Muse-ui' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }
    ],
    script: [
      { src: 'https://www.google.com/recaptcha/api.js', async: true, defer: true }
    ]
  },
  plugins: [
    { src: '~/plugins/plugin-ui.js', ssr: false}, 
    { src: '~/plugins/plugin-db.js', ssr: false}
  ],
  axios: {
    // proxyHeaders: false
  },
  css: [
    '~/assets/style/app.less'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FF1122' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^muse-ui/]
          })
        ]
      }
    }
  }
}
