<template>
	<view>
		<view class="scroll_box">

			<view>
				<scroll-view scroll-y class="left_scroll" :style="{height: w_height + 'px'}">
					<view v-for=" (item,index) in cateList" :key="index" @click="activeChanged(index)"
						:class="['left_scroll_item',index===active?'active':'']">
						{{item.cat_name}}
					</view>
				</scroll-view>
			</view>

			<view>
				<scroll-view scroll-y class="right_scroll" :style="{height: w_height + 'px'}" :scroll-top="scroll_top">
					<view class="right_scroll_item" v-for="(item,index) in cateList2" :key="index">
						<view class="right_item_title"> {{item.cat_name}} </view>
						<view class="right_item_content">
							<view class="right_item_content_pic" v-for="(item, index) in item.children" :key="index"
								@click="()=>goTo(item)">
								<image :src="item.cat_icon"></image>
								<text>{{item.cat_name}}</text>
							</view>
						</view>
					</view>
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
				cateList2: [],
				w_height: 0,
				active: 0,
				scroll_top: 0

			};
		},
		methods: {
			async sendCate() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				try {
					const res = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',

					});
					this.cateList = res.data.message;
					// console.log(this.cateList)
					this.cateList2 = this.cateList[0].children
					uni.hideLoading()
					// console.log(this.cateList2)
				} catch (error) {
					uni.showToast({
						title: '获取超时',
						icon: 'error'
					})
					console.log('获取失败', error)
				}

				/* // 异步获取数据可能会导致列表数据渲染失败
				 uni.request({
				 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
				 	success(res) {
				 		// console.log(res.data.message)
				 		console.log(res.data)
				 		this.cateList = res.data.message
				 		console.log(this.cateList)
				 	}
				 }) */
			},
			activeChanged(index) {
				this.active = index
				this.cateList2 = this.cateList[index].children
				// console.log(this.cateList2)
				this.scroll_top = this.scroll_top === 0 ? 1 : 0
			},
			// 商品点击跳转
			goTo(e) {
				// console.log(e.cat_name)
				uni.navigateTo({
					url: `/pagesA/detial/detial?cid=${e.cat_id}`
				})
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

		.right_scroll {

			.right_scroll_item {
				font-size: 20px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;

				.right_item_title {
					margin-bottom: 20px;
				}

				.right_item_content {
					display: flex;
					flex-wrap: wrap;

					.right_item_content_pic {
						width: 33.33%;
						margin-bottom: 10px;
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							width: 70px;
							height: 70px;
						}

						text {
							font-size: 12px;
						}
					}
				}
			}
		}



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


	}
</style>