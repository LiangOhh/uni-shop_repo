<template>
	<view>
		<button @click="SHOW">点我</button>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		methods: {
			SHOW() {
				/* 
				在index.js中,store中自身定义的模块modules设置的变量m_cart
				用来接收cart.js向外暴露state中的cart对象 
				*/
				console.log(this.$store.state.m_cart.cart.length)
			},
			setBadge() {
				uni.setTabBarBadge({
					index: 2,
					text: this.getTotal + ''
				})
			}
		},
		computed: {
			...mapGetters('m_cart', ['getTotal'])
		},
		onShow() {
			this.setBadge()
		}
	}
</script>

<style lang="scss">

</style>