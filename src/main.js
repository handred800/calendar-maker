import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueKonva from 'vue-konva'
import '@/assets/scss/style.scss'

Vue.use(VueKonva)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
