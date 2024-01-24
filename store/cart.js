export default {
	namespaced: true,
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	/* state: {
		// cart: []
		cart: JSON.parse(uni.setStorageSync('cart') || '[]')
	}, */
	mutations: {
		addToCart(state, goods) {
			// 把点击传入的id和state中保存的id遍历是否存在
			const index = state.cart.find((i) => i.goods_id === goods.goods_id)
			if (!index) {
				state.cart.push(goods)
			} else {
				index.goods_count++
			}

			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			// 有对应的商品信息对象
			if (findResult) {
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			// 根据 goods_id 查询购物车中对应商品的信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findResult) {
				// 更新对应商品的数量
				findResult.goods_count = goods.goods_count
				// 持久化存储到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsItem(state, goods_id) {
			// state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
			// this.commit('m_cart/saveToStorage')
			// 调用数组的 filter 方法进行过滤 goods_id
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储到本地
			this.commit('m_cart/saveToStorage')
		}
	},
	getters: {
		getTotal(state) {
			let total = 0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => total += goods.goods_count)
			return total
		}
	},

}