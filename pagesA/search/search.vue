<template>
	<view>
		<view class="searchBox">
			<uni-search-bar class="searchBar" :focus="flag" radius="20" placeholder="点击搜索" clearButton="auto"
				cancelButton="none" @input="searchInfo" />
		</view>
		<view class="suggestBox" :style="{height:w_height+'px'}" :v-if="flag">
			<scroll-view scroll-y>
				<view class="item_box" v-for="(item,index) in searchList" :key="index" @click="gotoDetail(item)">
					<view class="item_name">{{item.goods_name}}</view>
					<view class="item_icon">
						<uni-icons type="right" size="16"></uni-icons>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
				w_height: 0,
				searchList: [],
				scroll_top: 0,
				flag: false
			};
		},
		methods: {
			async searchInfo(e) {

				// 获取confirm输入框搜索关键词  e.value    input搜索关键词   e
				try {
					const info = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
						data: {
							query: e
						}
					});
					this.searchList = info.data.message
					this.scroll_top = this.scroll_top === 0 ? 1 : 0
					// 判断是否dom树显示
					if (this.searchList.length) {
						this.flag = true
					} else {
						this.flag = false
					}
				} catch (error) {
					console.log(error)
				}

			},
			gotoDetail(e) {
				console.log(e)
				uni.navigateTo({
					url: `/pagesA/detial/detial?goods_id=${e.goods_id}`,
				})
			}
		},
		onLoad() {
			this.w_height = uni.getSystemInfoSync().windowHeight - 50
		}
	}
</script>

<style lang="scss">
	.searchBox {
		position: sticky;
		z-index: 999;
		top: 0;
		left: 0;


		.uni-searchbar {

			background-color: #f699b4;
			padding: 10px;
		}
	}

	.suggestBox {
		color: red;
		// display: flex;
		padding: 5px;

		.item_box {
			font-size: 15px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item_name {
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 溢出部分替代
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
</style>