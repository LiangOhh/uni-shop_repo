<template>
	<view>
		<view class="login-container">
			<!-- 提示登录的图标 -->
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<!-- 登录按钮 -->
			<button type="primary" class="btn-login">一键登录</button>
			<!-- 登录提示 -->
			<view class="tips-text">登录后尽享更多权益</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MyUser",
		data() {
			return {

			};
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
	}
</style>