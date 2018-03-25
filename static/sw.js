importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-muse-ui",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.a96258065da5926f67c6.js",
    "revision": "111b69a5a26bd492b0146af92d6a482f"
  },
  {
    "url": "/_nuxt/app.d9a38260dbc0c6bfb0da690f7272ca11.css",
    "revision": "d9a38260dbc0c6bfb0da690f7272ca11"
  },
  {
    "url": "/_nuxt/layouts_default.11f17c581d82a7c3136b.js",
    "revision": "45c6bacc80ae395c1bd2d1d7a0851f90"
  },
  {
    "url": "/_nuxt/manifest.10e5e591f95d26cb75a5.js",
    "revision": "b4da823b149d10cf60c584804ed3338d"
  },
  {
    "url": "/_nuxt/pages_home.abaa58f4f0624084a2dc.js",
    "revision": "06bdeea65c468335d76387eb2f21533e"
  },
  {
    "url": "/_nuxt/pages_index.ac6ced3bce821eeeeef4.js",
    "revision": "7479234ee3652198c36f68941156343d"
  },
  {
    "url": "/_nuxt/pages_login.070419931643f30f1ce9.js",
    "revision": "ac0332610d5dc904a8367f40c4129246"
  },
  {
    "url": "/_nuxt/pages_mini-menu.04155fd07cf5da60bd02.js",
    "revision": "e9ac5d2cfe29fbc3f2f1402482a0e6f1"
  },
  {
    "url": "/_nuxt/pages_no-menu.540ffbb79441012a6ee1.js",
    "revision": "ebc3c4cc344448f4b7cfa958b4787ad0"
  },
  {
    "url": "/_nuxt/pages_page.4b2f96fc9d85859bcd7f.js",
    "revision": "6efbcd0c84290b517507863c33864df8"
  },
  {
    "url": "/_nuxt/pages_scroll.1cb00396a624e68a51b2.js",
    "revision": "26ee24931a51db43230789542d3c95f9"
  },
  {
    "url": "/_nuxt/vendor.3c9866267a3f71f9acfd.js",
    "revision": "1cc3c7d982226186919d2aaecf04c48e"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

