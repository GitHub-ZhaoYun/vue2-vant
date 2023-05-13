import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'vant/lib/index.css';
import 'lib-flexible';
import store from './store';
import 'lib-flexible/flexible'
import { Picker, Popup } from 'vant';

Vue.use(Picker);
Vue.use(Popup);
Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
