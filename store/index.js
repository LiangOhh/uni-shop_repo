import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'
const state = {}
const actions = {}
const mutations = {}

Vue.use(Vuex)
// 传入配置对象
export default new Vuex.Store({
	state,
	actions,
	mutations,
	modules: {
		m_cart: moduleCart,
		m_user: moduleUser,
	}
})

// 向外暴露
// export default store