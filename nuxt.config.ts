// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  "runtimeConfig":{
    "public": {
      "apiUrl": "https://nuxr3.zeabur.app/"
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