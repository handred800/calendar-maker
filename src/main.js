import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueKonva from 'vue-konva'
import '@/assets/scss/style.scss'
import i18n from './plugins/vue-i18n.js'

Vue.use(VueKonva)
Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
