import Vue from 'vue';
import echarts from 'echarts';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import App from './App.vue';
import router from './router';
import store from './store';


Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(MuseUI);

if(!global.consoleSwitch){
    console.log = ()=>{}
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
