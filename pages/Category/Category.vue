<template>
	<view>
		<view class="scroll_box">

			<view>
				<scroll-view scroll-y="true" class="left_scroll" :style="{height: w_height + 'px'}">
					<view v-for=" (item,index) in cateList" :key="index" @click="activeChanged(index)"
						:class="['left_scroll_item',index===active?'active':'']">
						{{item.cat_name}}
					</view>
				</scroll-view>
			</view>

			<view>
				<scroll-view scroll-y="true" class="right_scroll" :style="{height:w_height+'px'}">
					<view v-for="item in 20">y</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateList: [],
				w_height: 0,
				active: 0
			};
		},
		methods: {
			async sendCate() {
				try {
					const res = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',

					});
					this.cateList = res.data.message;
				} catch (error) {
					console.log('获取失败', error)
				}

				// 异步获取数据可能会导致列表数据渲染失败
				// uni.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
				// 	success(res) {
				// 		// console.log(res.data.message)
				// 		console.log(res.data)
				// 		this.cateList = res.data.message
				// 		console.log(this.cateList)
				// 	}
				// })
			},
			activeChanged(index) {
				this.active = index
			}
		},
		onLoad() {
			// 获取屏幕高度
			// console.log(uni.getSystemInfoSync().windowHeight)
			this.w_height = uni.getSystemInfoSync().windowHeight
			this.sendCate()
		}
	}
</script>

<style lang="scss">
	.scroll_box {
		display: flex;

		scroll-view {}

		.left_scroll {
			width: 80px;

			.left_scroll_item {

				line-height: 60px;
				background-color: #f7f7f7;
				// 文字居中对齐
				text-align: center;
				font-size: 16px;

				&.active {
					background-color: #a8c7fa;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 100%;
						background-color: red;
						position: absolute;
						// top: 50%;
						// left: 0;
						// transform: translateY(-50%);
					}

				}
			}

		}

		// .right_scroll {
		// 	width: 60px;
		// 	height: 300px;
		// }
	}
</style>