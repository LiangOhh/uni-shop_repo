<template>
	<view>
		<view class="address-info-box" @click="createAddress">
			<view class="button-box" v-if="JSON.stringify(address)==='{}'">
				<button type="primary" size="mini" class="btnChooseAddress" @click="createAddress">添加收货地址</button>
			</view>
			<view class="info-box" v-else>
				<view class="row1">
					<view class="row1-left">
						<view class="username">收货人：<text>{{address.userName}}</text></view>
					</view>
					<view class="row1-right">
						<view class="phone">电话：<text>{{address.telNumber}}</text></view>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
				<view class="row2">
					<view class="row2-left">收货地址：</view>
					<view class="row2-right">{{addstr}} </view>
				</view>
			</view>

			<view class="border-box">
				<image src="../../static/cart_border@2x.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "MyAddress",
		data() {
			return {
				/* address: {
					// test: 'one'
				} */
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			async createAddress() {
				// 调用uni原生方法  https://uniapp.dcloud.net.cn/api/other/choose-address.html
				const res = await uni.chooseAddress()
				if (res.errMsg === 'chooseAddress:ok') {
					// this.address = res
					this.updateAddress(res)
				}
				if (res.errMsg != 'chooseAddress:ok') {
					uni.$showMsg('您取消了地址授权！')
				}



			}
		},
		computed: {
			...mapState('m_user', ['address']),
			// ...mapGetters('m_user', ['addstr'])
			...mapGetters('m_user', ['addstr']),
			/* 	addstr() {
					if (!this.address.provinceName)
						return ''
					else
						return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
							.detailInfo
				}, */

		},
	}
</script>

<style lang="scss">
	.button-box {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.border-box {
		image {
			display: block;
			width: 100%;
			height: 5px;
		}
	}

	.info-box {
		font-size: 15px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;

		// 第一行
		.row1 {
			display: flex;
			// 左右贴边对齐justify-content: space-between
			justify-content: space-between;

			.row1-right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		// 第二行
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.row2-left {
				white-space: nowrap;
			}
		}
	}
</style>