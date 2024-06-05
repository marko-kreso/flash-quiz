// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-security"],
  tailwindcss: {
    exposeConfig: true,
  },
  // runtimeConfig:{
  //   redis: 'redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>',
  //   postgres: 'postgresurl'
  // },
  // nitro: {
  //   esbuild: {
  //     options: {
  //       target: 'es2022'
  //     }
  //   }
  // }
  // nitro: {
  //   storage: {
  //     redis: {
  //       driver: 'redis',
  //       url: 'redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>'
  //     }
  //   }
  // }
})
