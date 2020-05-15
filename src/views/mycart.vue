<template>
	<div id="mycart">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span>
					<router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>我的购物车</slot>
				</span>
			</p>
		</div>
		<div class="cart-wrap one" v-if="list.length!==0">
			<div class="cart-header">
				<table class="cart-table">
					<tbody>
						<tr>
							<th class="cart-cell cell-check">
								<label @click="checkAll">
									<input type="checkbox" class="cart-select-all" checked="checked" v-model="ischeckall"><span>全选</span>
								</label>
							</th>
							<th class="cart-cell cell-info">商品信息</th>
							<th class="cart-cell cell-price">单价</th>
							<th class="cart-cell cell-count">数量</th>
							<th class="cart-cell cell-total">合计</th>
							<th class="cart-cell cell-opera">操作</th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cart-list">
				<table class="cart-table">
					<tbody>
						<tr v-for="(v,i) in list" :key=i>
							<td class="cart-cell2 cell-check"><input type="checkbox" class="cart-select" checked="checked" @click="ischeck(i)"
								 v-model="v.productChecked"></td>
							<td class="cart-cell2 cell-img"><img :src="imageHost+v.productMainImage" alt=""></td>
							<td class="cart-cell2 cell-info">
								<p>{{v.productName}}</p>
							</td>
							<td class="cart-cell2 cell-price">￥{{v.productPrice}}</td>
							<td class="cart-cell2 cell-count">
								<button :disabled="v.quantity == 1" @click="sub(i)">-</button>
								<input type="text" v-model="v.quantity">
								<button @click="add(i)">+</button>
							</td>
							<td class="cart-cell2 cell-total">￥{{v.productTotalPrice}}</td>
							<td class="cart-cell2 cell-opera">
								<a class="link cart-delete" @click="del(i)">删除</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cart-footer">
				<div class="select-con">
					<label @click="checkAll">
						<input type="checkbox" class="cart-select-all" checked="checked" v-model="ischeckall"><span>全选</span>
					</label>
				</div>
				<div class="delete-con">
					<a class="cart-delete-seleced link">
						<i class="el-icon-delete-solid"></i><span>删除选中</span>
					</a>
				</div>
				<div class="submit-con">
					<span>总价：</span>
					<span class="submit-total">￥{{cartTotalPrice}}</span>
					<span class="btn submit-btn" @click="jiesuan">去结算</span>
				</div>
			</div>
		</div>
		<p class="kong" v-else>
			您的购物车空空如也，<span @click="()=>{this.$router.push({path:'/index'})}">立即去购物</span>
		</p>
	</div>
</template>

<script>
	export default {
		name: 'mycart',
		data() {
			return {
				list: [],
				cartTotalPrice: '',
				imageHost: '',
				ischeckall: '',
				ischeckall2: true,
				num: ''
			}
		},

		methods: {
			//全选和取消全选
			checkAll() {
				if (this.ischeckall == false) {
					this.$axios.post('/cart/select_all.do').then((res) => {
						this.list = res.data.data.cartProductVoList;
						this.cartTotalPrice = res.data.data.cartTotalPrice;
						this.imageHost = res.data.data.imageHost;
					})
				}
				if (this.ischeckall == true) {
					this.$axios.post('/cart/un_select_all.do').then((res) => {
						this.list = res.data.data.cartProductVoList;
						this.cartTotalPrice = res.data.data.cartTotalPrice;
						this.imageHost = res.data.data.imageHost;
					})
				}
			},
			// 选中和反选
			ischeck(i) {
				if (this.list[i].productChecked == 1) {
					let postData = this.$qs.stringify({
						productId: this.list[i].productId
					})
					this.$axios.post('/cart/un_select.do', postData).then((res) => {
						this.list = res.data.data.cartProductVoList;
						this.cartTotalPrice = res.data.data.cartTotalPrice;
						this.imageHost = res.data.data.imageHost;
						this.ischeckall = res.data.data.allChecked;
					})
				}
				if (this.list[i].productChecked == 0) {
					let postData = this.$qs.stringify({
						productId: this.list[i].productId
					})
					this.$axios.post('/cart/select.do', postData).then((res) => {
						this.list = res.data.data.cartProductVoList;
						this.cartTotalPrice = res.data.data.cartTotalPrice;
						this.imageHost = res.data.data.imageHost;
						this.ischeckall = res.data.data.allChecked;
					})
				}
			},
			//删除商品
			del(i) {
				let postData = this.$qs.stringify({
					productIds: this.list[i].productId
				})
				this.$axios.post('/cart/delete_product.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.$confirm('确认移除当前商品, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!',
							});
							this.list = res.data.data.cartProductVoList;
							this.cartTotalPrice = res.data.data.cartTotalPrice;
							this.imageHost = res.data.data.imageHost;
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				})
			},
			//减少商品数量
			sub: function(index) {
				if (this.list[index].quantity) {
					this.list[index].quantity--
				};
				let postData = this.$qs.stringify({
					productId: this.list[index].productId,
					count: this.list[index].quantity
				})
				this.$axios.post('/cart/update.do', postData).then((res) => {
					this.list = res.data.data.cartProductVoList;
					this.cartTotalPrice = res.data.data.cartTotalPrice;
					this.imageHost = res.data.data.imageHost
				})
			},
			//添加商品数量
			add: function(index) {
				this.list[index].quantity++;
				let postData = this.$qs.stringify({
					productId: this.list[index].productId,
					count: this.list[index].quantity
				})
				this.$axios.post('/cart/update.do', postData).then((res) => {
					this.list = res.data.data.cartProductVoList;
					this.cartTotalPrice = res.data.data.cartTotalPrice;
					this.imageHost = res.data.data.imageHost
				})
			},
			//购物车结算
			jiesuan() {
				if (this.cartTotalPrice > 0) {
					this.$router.push({
						path: '/index/isorder/'
					})
				} else {
					this.$message({
						message: '请选择购物车商品后再提交',
						type: 'warning'
					});
				}
			},
			//获取购物车数据
			getData() {
				this.$axios.post('/cart/list.do').then((res) => {
					// console.log(res.data)
					this.list = res.data.data.cartProductVoList;
					this.cartTotalPrice = res.data.data.cartTotalPrice;
					this.imageHost = res.data.data.imageHost;
					this.ischeckall = res.data.data.allChecked
				})
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style scoped="scoped" lang="less">
	.kong {
		text-align: center;
		width: 1080px;
		height: 80px;
		line-height: 80px;
		margin: 20px auto;
		background-color: #eeeeee;
		color: #f60;
		font-size: 18px;
		font-weight: 600;

		span {
			cursor: pointer;
			color: #409EFF;
		}
	}

	.one {
		width: 1080px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.list {
		border-top: 2px solid #c60023;
		height: 50px;
		background: #eee;
		line-height: 50px;
		color: #888;
		text-align: left;
		margin-bottom: 15px;
	}

	.cart-wrap {
		margin-top: 20px !important;
		text-align: left;

		.cart-header {
			background: #eee;

			.cell-check {
				width: 130px;
			}
		}

		.cart-list {
			.cell-check {
				width: 30px;
			}
		}

		.cart-table {
			width: 100%;
			border-collapse: collapse;
			border: 1px solid #ebebeb;
			margin-bottom: 10px;
		}

		.cart-footer {
			position: relative;
			height: 50px;
			line-height: 50px;
			background: #eee;
		}

		.cart-cell {
			height: 40px;
			line-height: 40px;
		}

		.cart-cell2 {
			height: 100px;
			line-height: 100px;
		}

		.cell-check {
			padding-left: 20px;
			text-align: left;

		}

		.cell-info {
			width: 400px;
			padding: 0 10px;
			font-size: 12px;

			color: #606266;

			p {
				width: 400px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.cell-price {
			width: 100px;
			text-align: center;
		}

		.cell-count {
			width: 200px;
			text-align: center;

			input {
				margin: 0 2px;
				width: 50px;
				text-align: center;
			}
		}

		.cell-total {
			width: 100px;
			text-align: center;
		}

		.cell-opera {
			width: 110px;
			text-align: center;
		}

		.link {
			color: #999;
			text-decoration: none;
			cursor: pointer;
		}

		.cell-img {
			width: 80px;

			img {
				position: absolute;
				margin-top: 9px;
				width: 80px;
				height: 80px;
				border: 1px solid #606266;
			}
		}

		.select-con {
			float: left;
			padding-left: 20px;
		}

		.delete-con {
			float: left;
			margin-left: 20px;

			.link {
				color: #999;
				text-decoration: none;
				cursor: pointer;
			}

			.cart-delete-seleced {
				font-size: 14px;
			}
		}

		.submit-con {
			float: right;

			.submit-total {
				font-size: 18px;
				color: #c60023;
				font-weight: 700;
				margin-right: 30px;
				vertical-align: middle;
			}

			.submit-btn {
				height: 50px;
				line-height: 50px;
			}

			.btn {
				display: inline-block;
				padding: 0 20px;
				vertical-align: middle;
				border: none;
				background-color: #c60023;
				font-size: 17px;
				font-weight: 700;
				color: #fff;
				outline: none;
				cursor: pointer;
				text-decoration: none;
				margin-top: -4px;
			}
		}
	}

	.top {
		.p1 {
			width: 100%;
			height: 2px;
			background-color: #c60023;
		}

		.p2 {
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #eeeeee;

			span {
				width: 1080px;
				display: block;
				margin: 0 auto;
				color: #606266;
				font-size: 14px;
			}

			.color {
				color: #606266;

				&:hover {
					color: #c60023;
				}
			}
		}
	}
</style>
