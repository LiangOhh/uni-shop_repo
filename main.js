import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 导入store实例
// import store from '@/store'
import store from "./store"
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none',
	})
}
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}

}
// #endif