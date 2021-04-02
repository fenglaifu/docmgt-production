import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* import element3 from "element3";
import "element3/lib/theme-chalk/index.css";
Vue.use(element3); */


import './assets/styles/index.scss';
/* Vue.config.productionTip = false; */

import {HttpService} from './utils/HttpService';
Vue.prototype.$httpService = new HttpService(null);  // 挂载服务

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
