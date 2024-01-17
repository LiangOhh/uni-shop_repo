<template>
	<view>
		<view class="shops-list">
			<view v-for="(goods, index) in shopList" :key="index" @click="()=>gotoDetail(goods)">
				<MyGoods :goods="goods"></MyGoods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopInfo_obj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				shopList: [],
				total: 0,
				// 节流阀
				isloading: false

			};
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			console.log(options)
			this.shopInfo_obj.query = options.query || ''
			this.shopInfo_obj.cid = options.cid || ''
			console.log(options.query)
			// console.log(this.shopInfo_obj)
			this.getShopList(options.query)
		},
		onReachBottom() {
			this.shopInfo_obj.pagenum += 1
			this.getShopList()
			if (this.isloading) {
				// console.log('正在获取中')
				uni.showLoading({
					title: 'ing'
				})
				return
			}
		},
		onPullDownRefresh(cb) {
			this.shopInfo_obj.pagenum = 1
			this.shopInfo_obj.total = 0
			this.isloading = false
			this.shopList = []
			this.getShopList(() => uni.stopPullDownRefresh())
		},
		methods: {
			async getShopList(stop_refresh) {

				try {
					this.isloading = true

					const {
						data: res
					} = await uni.request({
						url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
						data: {
							query: this.shopInfo_obj.query
						}
					})

					// console.log(res)
					// this.shopList = res.message.goods
					this.shopList = [...this.shopList, ...res.message.goods]
					this.total = res.message.total
					console.log(this.shopList, this.total)

				} catch (err) {
					console.log(err)
				} finally {
					this.isloading = false
					// stop_refresh && stop_refresh()
					uni.hideLoading()

				}
			},
			gotoDetail(shop) {
				console.log(shop)
				uni.navigateTo({
					url: `/pagesA/detial/detial?goods_id=${shop.goods_id}`,
				})
			}
		}
	}
</script>

<style lang="scss">

</style>