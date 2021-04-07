import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/normalize.css'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
