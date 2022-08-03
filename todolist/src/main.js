import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from 'axios'
import store from './store'
import echarts from 'echarts'


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts //这里echarts就成为全局属性了

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
