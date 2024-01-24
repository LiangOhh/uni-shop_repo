<template>
	<view>
		<MyAddress></MyAddress>
		<!-- 购物车商品列表的标题区域 -->
		<view>


			<view class="title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="22" color="red"></uni-icons>
				<!-- 描述文本 -->
				<text class="text">购物车</text>
			</view>
			<!-- 商品列表结构 -->
			<view class="shopBox">
				<uni-swipe-action>
					<block v-for="(goods, i) in cart" :key="i">
						<!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
						<uni-swipe-action-item :right-options="options" @click="removeItem(goods)">
							<MyGoods :goods="goods" :show="true" @radio-change="radioChangeHandler"
								@num-change="numberChangeHandler"></MyGoods>
						</uni-swipe-action-item>
					</block>
				</uni-swipe-action>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {

						backgroundColor: '#f699b4'
					}
				}]
			};
		},
		methods: {
			/* SHOW() {
				 
				// 在index.js中,store中自身定义的模块modules设置的变量m_cart
				// 用来接收cart.js向外暴露state中的cart对象 
				
				console.log(this.$store.state.m_cart.cart.length)
			} ,  */
			setBadge() {
				uni.setTabBarBadge({
					index: 2,
					text: this.getTotal + ''
				})
			},

			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsItem']),
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			removeItem(e) {
				console.log(e.goods_id)
				this.removeGoodsItem(e.goods_id)
			}
		},
		computed: {
			...mapGetters('m_cart', ['getTotal']),
			...mapState('m_cart', ['cart']),
		},
		onShow() {
			this.setBadge()
		}
	}
</script>

<style lang="scss">
	.title {
		// background-color: red;
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 18px;
		padding-left: 10px;
		border-bottom: 2px solid #efefef;


		.text {
			margin-left: 5px;
		}
	}

	.shopBox {
		margin-top: 5px;
		display: flex;
	}
</style>