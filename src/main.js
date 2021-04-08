import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/normalize.css'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$EventBus = new Vue()
// 挂载两个全局方法
Vue.prototype.operatesuc = () => {
  this.$message({
    message: '恭喜你，操作成功!',
    type: 'success'
  });
}

Vue.prototype.operatefail = () => {
  this.$message.error('操作失败,请重试!');
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
