<template>
	<view>
		<view class="my-search-container">
			<view class="my-search-box" @click="ToSearch()">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MySearch",
		data() {
			return {

			};
		},
		methods: {
			ToSearch() {
				uni.navigateTo({
					url: '/pagesA/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container {
		position: sticky;
		z-index: 999;
		top: 0;
		left: 0;
		background-color: #f699b4;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		height: 36px;
		background-color: #ffffff;
		border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>