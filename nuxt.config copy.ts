const appName = process.env.APPLICATION_NAME || 'Recruiting';
const appDisplayName = process.env.APPLICATION_DISPLAY_NAME || 'Recruiting';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  appConfig: {
    applicationName: appName,
    appDisplayName: appDisplayName,
    appLayout: process.env.APP_LAYOUT || 'default',
    apiURL: {
      TTT_internal: (process.env.TTT_API || '').replace(/^\/+|\/+$/g, ''),
      rctg: `${(process.env.TTT_API || '').replace(/^\/+|\/+$/g, '')}/public/rctg`
    }
  },
  app: {
    baseURL: `/recruiting/`,
    // baseURL: `/Careers/Application-Form/`,
    rootId: "__nuxt3-recruiting",
    buildAssetsDir: "/",
    cdnURL: "/DesktopModules/RazorModules/RazorHost/Scripts/TTT-Recruiting/",
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: appDisplayName,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "Access-Control-Allow-Origin", content: "*" },
        { name: "Access-Control-Allow-Methods", content: "GET, POST, OPTIONS" },
        { name: "Access-Control-Allow-Credentials", content: "true" },
        { name: "Access-Control-Allow-Headers", content: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization" },
      ]
    }
  },
  devServer: {
    port: 2024 //localhost:3000
  },
  // Global CSS
  css: [
    '~/assets/scss/bootstrap.scss',
    //Đặt sau vị trí file bootstrap.scss. Vì file nào đặt sau thì sẽ được generate ghi đè file trước nếu trùng css.
    '~/assets/scss/bootstrap-custom.scss',
    '~/assets/scss/bootstrap-icons-custom.scss',
    '~/assets/scss/syncfusion.scss',
    '~/assets/scss/syncfusion-dialog.scss',
    '~/assets/scss/ttt-scroll.scss',
    '~/assets/scss/ttt-menu.scss',
    '~/assets/scss/page-detail.scss',
    '~/assets/scss/style.scss',
  ],
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  imports: {
    dirs: ['stores'],
  },
  experimental: {
    appManifest: false
  }
})
