// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-security"],
  devServer:{
    port: +(process.env.PORT!)
  },
  tailwindcss: {
    exposeConfig: true,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  }
  // nitro: {
  //   storage: {
  //     redis: {
  //       driver: 'redis',
  //       url: 'redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>'
  //     }
  //   }
  // }
})
