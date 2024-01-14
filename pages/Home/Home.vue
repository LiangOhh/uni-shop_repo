<template>
	<view>
		<!-- <view>
			<button @click="sendRequest" type="primary" size="mini">点我发送网络请求</button>
		</view> -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true"
			class="itembox">
			<swiper-item v-for="(item,index) in swiperList" :key="item.index">
				<!-- 此处用箭头函数兼容微信小程序 -->
				<view class="pic-item" @click="()=>Todetial(item,index)">
					<image :src="item.image_src" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>

		<view class="cate">
			<view v-for="(img,index) in cateList" :key="img.index">
				<image :src="img.image_src" mode="aspectFill" @click="()=>getTo(img)"></image>
			</view>
		</view>

		<view class="floor">
			<view class="content" v-for="(content,index) in floorList" :key="index">
				<image class="title_image" :src="content.floor_title.image_src" mode="aspectFill"></image>
				<view class="content_image_box">
					<view class="content_image_left">
						<image :src="content.product_list[0].image_src" mode="widthFix"></image>
					</view>
					<view class="content_image_right">
						<view v-for="(right_images,index2) in content.product_list" :key="index2" v-if="index2 !== 0">
							<image :src="right_images.image_src" mode="widthFix"
								:style="{width: right_images.image_width + 'rpx'}"></image>
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- <view>
			<button @click="sendRequest3()" type="primary" size="mini">点我发送网络请求</button>
		</view> -->
	</view>


</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				cateList: [],
				floorList: []
			};
		},
		methods: {
			sendRequest() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						// console.log(res.data)
						this.swiperList = res.data.message
						// console.log(this.swiperList)
					}
				})
			},
			Todetial(item, index) {
				// console.log(this.swiperList[index])
				// const obj = this.swiperList[index]
				// console.log(obj)
				uni.navigateTo({
					url: `/pagesA/detial/detial?goods_id=${item.goods_id}`,
				})
			},
			sendRequest2() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
					success: (res) => {
						// console.log(res)
						this.cateList = res.data.message
						// console.log(this.cateList)
					}
				})
			},
			getTo(e) {
				// console.log(e.name)
				if (e.name === '分类') {
					uni.switchTab({
						url: "/pages/Category/Category"
					})
				} else {
					uni.showModal({
						title: '没钱',
						content: `${e.name}待开发`,
						showCancel: false,
						confirmColor: "#61afef"
					})
				}
			},
			sendRequest3() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
					success: (res) => {
						this.floorList = res.data.message
						console.log(this.floorList)

					}
				})
			}
		},
		onLoad() {
			this.sendRequest()
			this.sendRequest2()
			this.sendRequest3()
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 300rpx;

		// 并集选择器
		.pic-item,
		image {
			width: 100%;
			height: 100%;
		}

	}

	.cate {
		display: flex;
		justify-content: space-around;
		margin: 15rpx;

		image {
			height: 140rpx;
			width: 120rpx;
		}
	}



	.floor {

		// display: flex;
		.title_image {
			padding: 10rpx;
			height: 60rpx;
			width: 100%;
			// display: flex;

		}

		.content_image_box {
			margin: 15rpx;
			display: flex;

			.content_image_left {
				image {
					width: 238rpx;
				}

			}

			.content_image_right {
				display: flex;
				flex-wrap: wrap;

				// 对齐
				justify-content: space-around;

				// image {
				// 	width: 230rpx;
				// }
			}


		}
	}
</style>