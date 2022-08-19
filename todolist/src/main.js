import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from 'axios'
import store from './store'
import Charts from './views/lib/charts'
Vue.use(Charts)


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
