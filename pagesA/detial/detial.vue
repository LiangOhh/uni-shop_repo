<template>
	<view>
		<view class="swiper_box">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular>
				<swiper-item v-for="(item, index) in Info.pics" :key="index">
					<image :src="item.pics_big" @click="LookPic(item,index)"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="message_box">
			<view class="price">￥{{Info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="body">
				<!-- 商品名称 -->
				<view class="shop_name">{{Info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="#ff5336"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递：免运费</view>
			<!-- 测试mapState
			<view class="yf">快递：免运费{{cart.length}}</view> 
			 -->
		</view>

		<view class="introduction_box">
			<rich-text :nodes="Info.goods_introduce"></rich-text>
		</view>

		<view class="uni-container">
			<view class="goods-carts">
				<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex"

	export default {
		data() {
			return {
				Info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: this.total
				}],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
						color: '#fff'
					}
				],

			};
		},
		async onLoad(option) {
			// console.log(option.goods_id)
			const id = option.goods_id
			await this.getInfo(id)
			// console.log(this.Info)
			// console.log('点击之前的store', this)

		},
		computed: {
			// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['getTotal'])
		},
		watch: {
			// 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
			/* getTotal(newVal) {
				// 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
				const findResult = this.options.find((x) => x.text === '购物车')

				if (findResult) {
					// 3. 动态为购物车按钮的 info 属性赋值
					findResult.info = newVal
				}
			},
 */
			getTotal: {
				// handler 属性用来定义侦听器的 function 处理函数
				handler(newVal) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newVal
					}
				},
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate: true
			}
		},

		methods: {
			async getInfo(id) {
				try {
					const {
						data: res
					} = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
						data: {
							goods_id: id
						}
					})
					res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
						'<img style="display:block;" ').replace(/webp/g, 'jpg')
					this.Info = res.message
					console.log(res.message)
					// console.log(this.Info)
				} catch (e) {
					console.log('获取失败', e)
				} finally {
					console.log(this.Info)
				}
			},
			LookPic(item, index) {
				uni.previewImage({
					current: index,
					urls: this.Info.pics.map(x => x.pics_big)
				})
			},
			// 导航点击事件
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/Cart/Cart'
					})
				} else {
					uni.showToast({
						title: `点击${e.content.text}`,
						icon: 'none'
					})
				}
			},
			buttonClick(e) {
				console.log(e)
				if (e.content.text === '加入购物车') {
					// 获取页面商品信息
					// console.log(this.Info)
					// const goods = this.Info
					const goods = {
						goods_id: this.Info.goods_id, // 商品的Id
						goods_name: this.Info.goods_name, // 商品的名称
						goods_price: this.Info.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.Info.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					console.log(goods)
					this.addToCart(goods)
					console.log('点击之后的store', this)
				}

				// this.options[1].info++
			},
			...mapMutations('m_cart', ['addToCart']),

		},


	}
</script>

<style lang="scss">
	.swiper_box {
		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.message_box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: red;
			font-size: 20px;
			margin: 10px 0;
		}

		.body {


			display: flex;
			justify-content: space-between;

			.shop_name {
				font-size: 20px;
				padding-right: 10px;
			}

			.favi {
				width: 130px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: grey
			}
		}

		.yf {
			margin: 10px;
			font-size: 13px;
			color: gray;
			text-align: right;
		}
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>