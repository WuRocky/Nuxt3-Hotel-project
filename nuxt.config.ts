// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  "runtimeConfig":{
    "public": {
      // "apiUrl": process.env.BASE_URL,
      "apiUrl": "https://nuxr3.zeabur.app/"
      
    }
  },

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1",
      title: "享樂酒店 | Enjoyment Luxury Hotel",
      charset: "utf-8",
      meta: [
        {
          name: "description",
          content: "六角學院 Nuxt3 專題內容，利用學習到的內容串接製作專題",
        },
      ]
    }
  },




  css: ["@/assets/stylesheets/all.scss"],
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },

  modules: ["@pinia/nuxt"],
})