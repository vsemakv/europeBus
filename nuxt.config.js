import * as fs from 'fs'
import * as path from 'path'
const env = require('dotenv').config()

export default {
  env: env.parsed,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Europe Bus | Комфортні поїздки на автобусах",
    htmlAttrs: {
      lang: 'uk'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      {
        hid: "og:title",
        property: "og:title",
        content:
          "Europe Bus | Комфортні поїздки на автобусах",
      },
      { hid: 'description', name: 'description', content: "Комфортні поїздки на автобусах за маршрутом Україна-Європа-Україна ➦ Пасажирські перевезення на сайті europebus.com.ua ☎ +38 (096) 101 71 10. Заходьте!" },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Комфортні поїздки на автобусах за маршрутом Україна-Європа-Україна ➦ Пасажирські перевезення на сайті europebus.com.ua ☎ +38 (096) 101 71 10. Заходьте!",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://europebus.com.ua/",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://europebus.com.ua/Share.png",
      },

      { hid: "og:image:width", property: "og:image:width", content: "1280" },
      { hid: "og:image:height", property: "og:image:height", content: "628" },

      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },

      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://europebus.com.ua/Share.png",
      },


      { name: 'format-detection', content: 'telephone=no' },

      {
        hid: "msapplication-TileColor",
        name: "msapplication-TileColor",
        content: "#F5F5F5",
      },

      { hid: "theme-color", name: "theme-color", content: "#F5F5F5" },

      {
        hid: "keywords",
        name: "keywords",
        content:
          "комфортні поїздки, Europe Bus, автобуси, маршрут, Україна, Європа, пасажирські перевезення, комфортные поездки, автобусы, маршрут, Украина, Европа, пассажирские перевозки, сайт, туристичні поїздки, відпочинок в Європі, транспортні послуги, європейські країни, туроператор, візова підтримка, готелі, міста, популярні маршрути, історичні пам'ятки, місця відпочинку, туристические поездки, отдых в Европе, транспортные услуги, европейские страны, туроператор, визовая поддержка, отели, города, популярные маршруты, исторические памятники, места отдыха",
      },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: 'true' },
      { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap", rel: "stylesheet" },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/apple-icon-60x60.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/apple-icon-72x72.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-icon-180x180.png",
      },

      {
        rel: "manifest",
        href: "/manifest.json",
      },
      { rel: "mask-icon", href: "/safari-pinned-tab.png" },
    ]
  },

  hooks: {
    'build:done': (nuxt) => {
      if (process.env.NODE_ENV !== 'development') {
        const buildDir = path.resolve(__dirname, '.nuxt', 'dist', 'client')
        const files = fs.readdirSync(buildDir)
        const wordAppendChild = 'appendChild:'
        const functionChunk = 'function wr(a,b){'
        for (const f of files) {
          if (f.endsWith('.js')) {
            const innerJSPath = path.resolve(buildDir, f)
            let innerJS = fs.readFileSync(innerJSPath, 'utf8')
            if (innerJS.includes(wordAppendChild)) {
              innerJS = innerJS.replace(
                't.appendChild(e)',
                'try{t.appendChild(e)} catch(_error){console.log(t,e)}'
              )
              fs.writeFileSync(innerJSPath, innerJS)
              // break;
            }
            if (innerJS.includes(functionChunk)) {
              const innerJSPath = path.resolve(buildDir, f)
              let innerJS = fs.readFileSync(innerJSPath, 'utf8')
              if (innerJS.includes(functionChunk)) {
                innerJS = innerJS.replace(
                  functionChunk,
                  functionChunk + 'if(!a||!b){console.log(a,b)};'
                )
                fs.writeFileSync(innerJSPath, innerJS)
              }
            }
          }
        }
      }
    },
  },

  // target: 'static',

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!isDev) {
        const enc = 'utf8'
        const git = path.resolve(__dirname, '.git')
        const branchHead = fs.readFileSync(`${git}/HEAD`, enc)
        const branchDir = path.resolve(
          git,
          ...branchHead.split('ref:')[1].trim().split('/')
        )
        const commit = fs.readFileSync(branchDir, enc).substring(0, 7)
        config.output.filename =
          config.output.chunkFilename = `[contenthash:7].js?v=${commit}`
      }
      config.module.rules.push({
        enforce: 'pre',
        test: /\.txt$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      })
    },
    // transpile: ['gsap'],
  },

  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-current', 
    middleware: ['seo', 'trailingSlashRedirect'],
    // middleware: ['stripHash']
    // scrollBehavior: async (to, from, savedPosition) => {
    //   if (savedPosition) {
    //     return savedPosition
    //   }
      
    //   const findEl = async (hash, x) => {
    //     return document.querySelector(hash) ||
    //       new Promise((resolve, reject) => {
    //         if (x > 50) {
    //           return resolve()
    //         }
    //         setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
    //       })
    //   }

    //   if (to.hash) {
    //     let el = await findEl(to.hash)
    //     if ('scrollBehavior' in document.documentElement.style) {
    //       return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    //     } else {
    //       return window.scrollTo(0, el.offsetTop)
    //     }
    //   }

    //   return { x: 0, y: 0 }
    // }
    
  },

  redirect: [
		// {
		// 	from: "^.*/(?<!/)$",
		// 	to: (from, req) => req.urlm
		// }
	
	],


  server: {
    // host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : 'localhost',
    host: process.env.NODE_ENV === 'development' ? '0.0.0.0' : '0.0.0.0',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/static/scss/main.scss'],

  styleResources: {
    scss: [
      '~/static/scss/mix.scss',
    ],
  },



  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@/plugins/marquee.js', mode: 'client'  },
    { src: '~/plugins/vue-swiper.js', ssr: false },
    { src: '~/plugins/vue-mask.js' },
    {src: '~/plugins/vue-scrollto.js', mode: 'client'},
    { src: '~/plugins/intersect.js', ssr: false },
    { src: '~/plugins/aos.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  // i18n: {
  //   locales: [
  //     { code: "ru", iso: "ru" },
  //     { code: "uk", iso: "uk" },
  //   ],
  //   defaultLocale: 'uk',
  //   vueI18n: {
  //     fallbackLocale: 'uk',
  //     messages: {
  //       ru: require("./locales/ru.json"),
  //       uk: require("./locales/uk.json"),
  //     }
  //   }
  // },
  modules: [
    ['@nuxtjs/i18n', {
      detectBrowserLanguage: false,
      lazy: false,
      strategy: 'prefix',
      locales: [
        { code: 'uk', iso: 'uk-UA', name: 'Українська' },
        { code: 'ru', iso: 'ru-RU', name: 'Русский' }
      ],
      defaultLocale: 'uk',
      vueI18n: {
        fallbackLocale: 'uk',
        messages: {
          ru: require("./locales/ru.json"),
          uk: require("./locales/uk.json"),
        }
      }
    }],
    '@nuxtjs/axios',
    [
      '@nuxtjs/device',
      {
        defaultUserAgent:
          'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36',
        refreshOnResize: true,
      },
    ],
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true,
        defaultImage: '/images/preloader.png',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',
        observerConfig: {
          threshold: 0.4,
        },
      },
    ],
    "@nuxtjs/redirect-module"

  ],


  // generate: {
  //   fallback: true
  // }


  // Build Configuration: https://go.nuxtjs.dev/config-build

}
