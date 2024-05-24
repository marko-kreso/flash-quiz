// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon"],
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