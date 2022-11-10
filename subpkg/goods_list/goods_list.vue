<template>
	<view class="goods-list-view">
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="goToDetail(goods.goods_id)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			console.log("this.queryObj.query=>", this.queryObj.query);
			console.log("this.queryObj.cid=>", this.queryObj.cid);
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				console.log("正在获取数据");
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false
				cb && cb()
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}

				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
				console.log("this.goodsList=>", this.goodsList);
				console.log("this.total=>", this.total);
			},
			goToDetail(id) {
				// console.log(id);
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
		},

		onReachBottom() {
			// 上拉加载数据请求完
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return uni.$showMsg("没有更多了！")
			}
			// 上拉加载更多
			if (this.isLoading) {
				return
			}
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []

			this.getGoodsList(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="scss">

</style>
