<template>
	<div class="right">
		<div class="orderdetail">
			<h2>订单信息</h2>
			<p><span>订单号：{{list.orderNo}}</span><span>创建时间：{{list.createTime}}</span></p>
			<p><span>收件人：{{list.receiverName}}</span></p>
			<p><span>联系方式：{{list2.receiverMobile}}</span></p>
			<p><span>收件人地址：{{list2.receiverProvince}} {{list2.receiverCity}} {{list2.receiverAddress}}</span></p>
			<p><span>订单状态：{{list.statusDesc}}</span></p>
			<p><span>支付方式：{{list.paymentTypeDesc}}</span></p>
			<p v-if="isshow"><button @click="pay">去支付</button><button @click="noorderNo">取消订单</button></p>
		</div>
		<div class="shopdetail">
			<h2>商品清单</h2>

			<el-table :data="tableData" style="width: 100%">

				<el-table-column label="商品信息" width="500" prop="productImage">
					<template slot-scope="scope">
						<img :src="list.imageHost+scope.row.productImage" alt="">
						<p>{{scope.row.productName}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="currentUnitPrice" label="单价" width="180">
					<template slot-scope="scope">
						{{scope.row.currentUnitPrice|price}}
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="数量">
				</el-table-column>
				<el-table-column prop="totalPrice" label="合计">
					<template slot-scope="scope">
						{{scope.row.totalPrice|tprice}}
					</template>
				</el-table-column>
			</el-table>
			<div class="total">
				<p>订单总价：<span>￥{{list.payment}}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderdetail',
		data() {
			return {
				list: '',
				list2: '',
				tableData: [],
				isshow: ''
			}
		},
		methods: {
			//跳转支付
			pay() {
				this.$router.push({
					path: '/index/orderpay',
					query: {
						order: this.list.orderNo
					}
				})
			},
			//取消订单
			noorderNo() {
				let postData = this.$qs.stringify({
					orderNo: this.list.orderNo
				})
				this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.post('/order/cancel.do', postData).then(res => {
						if (res.data.status == 0) {
							this.$message({
								type: 'success',
								message: '取消订单成功!'
							});
							this.list.statusDesc = '已取消'
						} else {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						}
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消该操作'
					});
				});
			},
			//获取商品详情
			getData() {
				let postData = this.$qs.stringify({
					orderNo: this.$route.query.orderNo
				})
				this.$axios.post('/order/detail.do', postData).then(res => {
					if (res.data.status == 0) {
						this.list = res.data.data;
						if(res.data.data.shippingVo!==null){
							this.list2 = res.data.data.shippingVo;
						}
						this.tableData = res.data.data.orderItemVoList;
						if (res.data.data.statusDesc == '未支付') {
							this.isshow = true
						} else {
							this.isshow = false
						}
						// console.log(this.list)
					}
				})
			}
		},
		filters: {
			price: function(value) {
				return '￥' + value;
			},
			tprice: function(value) {
				return '￥' + value;
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.total {
		background-color: #409EFF;
		height: 40px;
		line-height: 40px;

		p {
			margin-left: 710px;
			color: #fff;

			span {
				color: #c60023;
				font-weight: 600;

			}
		}
	}

	.right {
		width: 85%;

		h2 {
			font-weight: 600;
			color: #606266;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;
			margin-bottom: 10px;
		}

		.orderdetail {
			background: #fff;
			padding: 20px;
			margin-bottom: 10px;

			p {
				font-size: 14px;
				line-height: 30px;
				color: #606266;

				span {
					margin: 0 10px;
				}
			}

			button {
				background-color: #c60023;
				border: 0;
				cursor: pointer;
				border-radius: 5px;
				color: #fff;
				height: 30px;
				line-height: 30px;
				outline: none;
				margin: 0 10px;
			}
		}

		.shopdetail {
			background: #fff;
			padding: 20px;

		}
	}

	.el-table {
		img {
			width: 80px;
			height: 80px;
			float: left;
			margin-right: 10px;
		}
	}
</style>
