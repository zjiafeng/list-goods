import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './plugins/element.js'
import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
import VueAreaLinkage from 'vue-area-linkage'
Vue.use(VueAreaLinkage)

let baseUrl = '';
switch (process.env.NODE_ENV) {
	case 'development':
		baseUrl = ''
		break;
	case 'production':
		baseUrl = 'http://admintest.happymmall.com'
		break;
}
console.log(process.env.NODE_ENV);
axios.defaults.baseURL = baseUrl;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

//请求之前的操作
axios.interceptors.request.use(function (config) {
	// console.log(config)
	store.commit("addloading", true) //控制loading的显示
	return config
})
//返回数据的操作
axios.interceptors.response.use(function (config) {
	setTimeout(() => {
		store.commit("addloading", false) //控制loading的隐藏
	}, 200);
	return config
})
