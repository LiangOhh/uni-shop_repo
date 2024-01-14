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



	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
		methods: {
			sendRequest() {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: (res) => {
						// console.log(res.data)
						this.swiperList = res.data.message
						console.log(this.swiperList)
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
			}
		},
		onLoad() {
			this.sendRequest()

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
</style>