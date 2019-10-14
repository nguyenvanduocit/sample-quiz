import Vue from 'vue'
import App from './App.vue'
import '@/registerServiceWorker'
import webfontloader from 'webfontloader'
import 'modern-normalize'
import '@/styles/app.styl'

webfontloader.load({
  google: {
    families: ['IBM Plex Mono:400,400i,500,600,700']
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
