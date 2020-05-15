<template>
	<div class="right">
		<h2>我的订单</h2>
		<p class="p1"><span style="width: 53%;">商品信息</span>
			<span style="width: 18%;">单价</span>
			<span style="width: 10%;">数量</span>
			<span style="width: 10%;">合计</span></p>
		<div class="list" v-for="(v,i) in tableAll" :key=i>
			<span class="cxun" @click="chakan(v)">查看详情>></span>
			<el-table :data="v.orderItemVoList" style="width: 100%">

				<el-table-column :label="'订单号：'+v.orderNo+' 时间：'+v.createTime+' 订单状态：'+v.statusDesc" width="500" prop="productImage">
					<template slot-scope="scope">
						<img :src="v.imageHost+scope.row.productImage" alt="">
						<p>{{scope.row.productName}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="currentUnitPrice" :label="'订单总价：'+v.payment" width="180">
					<template slot-scope="scope">
						{{scope.row.currentUnitPrice|price}}
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="">
				</el-table-column>
				<el-table-column prop="totalPrice" label="" @click="chakan">
					<template slot-scope="scope">
						{{scope.row.totalPrice|tprice}}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-col :span="24" class="toolbar pageBar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1"
			 :page-size="pageSize" layout=" prev, pager, next, total,jumper" :total="total" background>
			</el-pagination>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: 'myorder',
		data() {
			return {
				tableAll: [],
				imageHost: '',
				productTotalPrice: '',
				currentPage1:1,
				pageSize: 1,
				pageNum:1,
				total:0
			}
		},
		methods: {
			//查看详情
			chakan(i){
				// console.log(i.orderNo)
				this.$router.push({
					path:'/index/myshop/orderdetail',
					query:{orderNo:i.orderNo}
				})
			},
			//改变时
			handleSizeChange(val) {
			    this.pageSize = val;
			    this.getorder();
			},
			//条目改变时
			handleCurrentChange(val) {
			    this.pageNum = val;
			    this.getorder();
			},
			getorder() {
				let postData=this.$qs.stringify({
					pageSize: this.pageSize,
					pageNum: this.pageNum,
				})
				this.$axios.post('/order/list.do',postData).then(res => {
					this.tableAll = res.data.data.list;
					this.total = res.data.data.total
					// console.log(res.data.data)
				})
			}
		},
		filters: {
			price: function(value) {
				return '￥' + value;
			},
			tprice: function(value) {
				return '￥' + value;
			},
			isproductTotalPrice: function(value) {
				if (value !== '') {
					return '￥' + value;
				}
			},
		},
		mounted() {
			this.getorder();
		}
	}
</script>

<style scoped="scoped" lang="less">
	.list{
		margin: 10px 0;
		position: relative;
		.cxun{
			position: absolute;
			z-index: 9;
			right: 30px;
			top: 15px;
			color: #606266;
			font-size: 14px;
			cursor: pointer;
			&:hover{
				color: #c60023;
			}
		}
	}
	.p1 {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #eee;

		span {
			display: inline-block;
			padding: 0 10px;
			font-size: 16px;
			font-weight: 600;
			color: #606266;
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

	.right {
		padding: 10px;
		// height: 320px;
		width: 85%;
		background-color: #fff;

		h2 {
			font-weight: 600;
			color: #606266;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;
			margin-bottom: 10px;
		}
	}
</style>
