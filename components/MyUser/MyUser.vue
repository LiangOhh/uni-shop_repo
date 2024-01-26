<template>
	<view>
		<view class="login-container">
			<!-- 提示登录的图标 -->
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<!-- 登录按钮 -->
			<!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
			<button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
			<!-- 登录提示 -->
			<view class="tips-text">登录后尽享更多权益</view>
		</view>
		<button @click="a">1</button>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "MyUser",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo']),
			async getUserInfo(e) {
				// 判断是否获取用户信息成功
				try {
					const res = await uni.getUserProfile({

						desc: '登录授权'
					})
					console.log(res)
					console.log(res.userInfo)
					this.updateUserInfo(res.userInfo)
					this.getToken(res)
				} catch (err) {
					console.log(err)
					return uni.$showMsg('您取消了登录授权！')
				}
				/* const res = await uni.getUserProfile({

					desc: '登录授权'

				}).catch(err => err) */

				// this.updateUserInfo(res.detail.userInfo)
				// this.getToken(res.detail)

				// console.log(res.userInfo)

				/* if (res.errMsg == 'getUserProfile:fail auth deny') {

					return uni.$showMsg('您取消了登录授权！')

				} */
			},
			async getToken(info) {
				try {
					const res = await uni.login({

					})
					uni.$showMsg('登录成功')
					console.log(res)
					// 保存code
					const query = {
						code: res.code,
						encryptedData: info.encryptedData,
						iv: info.iv,
						rawData: info.rawData,
						signature: info.signature
					}
					console.log(query.code)

					// token
					const res2 = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
						method: 'POST',
						data: query,
					})
					console.log('接口响应', res2)
				} catch (err) {
					console.log(err)
				}
			}


		}

	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		// 沿整个盒子居中
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		.tips-text {
			margin-top: 14px;
		}
	}
</style>