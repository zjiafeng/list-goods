<template>
	<div id="isorder">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span>
					<router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>订单确认</slot>
				</span>
			</p>
		</div>
		<div class="main1">
			<h2>收货地址</h2>
			<div class="adddz2" v-for="(v,i) in isaddress" :key=i :class="i==index?'color':''"
			 @click="xaddress(i)">
				<p class="p1"><span>{{v.receiverProvince}}</span><span>{{v.receiverCity}}</span><span>（{{v.receiverName}} 收）</span></p>
				<p>{{v.receiverAddress}}</p>
				<p>{{v.receiverMobile}}</p>
				<span class="bji" @click="emit(i)" :class="i==index?'color':''">编辑</span><span class="schu" @click="isdel(i)" :class="i==index?'color':''">删除</span>
			</div>
			<div class="adddz" @click="add">
				<i class="el-icon-plus"></i>
				<p>新建地址</p>
			</div>
		</div>
		<div class="clear"></div>
		<div class="main2">
			<h2>商品清单</h2>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="商品描述" width="500" prop="productImage">
					<template slot-scope="scope">
						<img :src="imageHost+scope.row.productImage" alt="">
						<p>{{scope.row.productName}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="currentUnitPrice" label="价格" width="180">
					<template slot-scope="scope">
						{{scope.row.currentUnitPrice|price}}
					</template>
				</el-table-column>
				<el-table-column prop="quantity" label="数量">
				</el-table-column>
				<el-table-column prop="totalPrice" label="小计">
					<template slot-scope="scope">
						{{scope.row.totalPrice|tprice}}
					</template>
				</el-table-column>
			</el-table>
			<div class="foot">
				<p>订单总价：<span>{{productTotalPrice|isproductTotalPrice}}</span></p><button @click="tijiao">提交订单</button>
			</div>
		</div>
		<div class="addcard" v-show="isshow">
			<el-card class="box-card">
				<div class="top">
					<p v-show="isadd">新建地址</p>
					<p v-show="isemit">更新地址</p>
					<i class="el-icon-close" @click="close"></i>
				</div>
				<p><span>收件人姓名:</span>
					<el-input size="small" placeholder="请输入收件人姓名" v-model="address.receiverName" clearable>
					</el-input>
				</p>
				<p><span>所在城市:</span>
					<div class="area">
						<area-cascader type='text' v-model="address.selected" :data="pca" size="small"></area-cascader>
					</div>
				</p>
				<p><span>详细地址:</span>
					<el-input size="small" placeholder="请精确到门牌号" v-model="address.receiverAddress" clearable>
					</el-input>
				</p>
				<p><span>收件人手机号:</span>
					<el-input size="small" placeholder="请输入11位手机号" v-model="address.receiverMobile" clearable>
					</el-input>
				</p>
				<p><span>邮政编码:</span>
					<el-input size="small" placeholder="如:1000000" v-model="address.receiverZip" clearable>
					</el-input>
				</p>

				<p><span></span>
					<el-button @click="save">保存收货地址</el-button>
				</p>
			</el-card>
		</div>
	</div>
</template>

<script>
	import {
		pca,
		pcaa
	} from 'area-data'; // 城市数据
	import 'vue-area-linkage/dist/index.css'; // 样式
	export default {
		inject: ['reload'],
		name: 'isorder',
		data() {
			return {
				isadd: '',
				isemit: '',
				index: -1,
				tableData: [],
				imageHost: '',
				productTotalPrice: '',
				pcaa: pcaa,
				pca: pca,
				isshow: false,
				isshow2: false,
				isshow3: false,
				shippingId: '',
				addressid: '',
				isaddress: [],
				id:'',
				address: {
					selected: [],
					receiverName: '',
					receiverAddress: '',
					receiverMobile: '',
					receiverZip: ''
				},
			}
		},
		methods: {
			//提交订单
			tijiao() {
				if (this.addressid == '') {
					this.$message({
						message: '请选择收件人信息',
						type: 'warning'
					});
					return
				} else {
					let postData = this.$qs.stringify({
						shippingId: this.addressid
					})
					this.$axios.post('/order/create.do', postData).then(res => {
						if (res.data.status == 0) {
							this.$message({
								message: '订单创建成功',
								type: 'success'
							});
							this.$router.push({
								path: '/index/orderpay',
								query: {
									order: res.data.data.orderNo
								}
							})
						} else {
							this.$message({
								message: '订单创建失败',
								type: 'warning'
							});
						}
					})
				}
			},
			//选择地址
			xaddress(i) {
				this.index = i;
				// console.log(this.isaddress[i].id);
				this.addressid = this.isaddress[i];
			},
			//打开弹框
			add() {
				this.isadd = true;
				this.isemit = false;
				this.isshow = true;
				this.address = {
					selected: [],
					receiverName: '',
					receiverAddress: '',
					receiverMobile: '',
					receiverZip: ''
				}
			},
			//关闭弹框
			close() {
				this.isshow = false;
				this.reload();
			},
			//编辑收件人信息
			emit(i) {				
				this.isadd = false;
				this.isemit = true;
				this.isshow = true;
				this.id=this.isaddress[i].id;
				let postData = this.$qs.stringify({
					shippingId: this.isaddress[i].id
				})
				this.$axios.post('/shipping/select.do', postData).then((res) => {
					// console.log(res.data.data);
					this.address.receiverName = res.data.data.receiverName
					this.address.receiverMobile = res.data.data.receiverMobile;
					this.address.receiverAddress = res.data.data.receiverAddress;
					this.address.receiverZip = res.data.data.receiverZip;
					this.address.selected.splice(0,1,res.data.data.receiverProvince);
					this.address.selected.splice(1,1,res.data.data.receiverCity)
				})
			},
			//删除收件人信息
			isdel(i) {
				let postData = this.$qs.stringify({
					shippingId: this.isaddress[i].id
				})
				this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.post('/shipping/del.do', postData).then((res) => {
						this.$message({
							type: 'success',
							message: res.data.data
						});
					})
					this.isaddress.splice(i, 1);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//保存收件人信息
			save() {
				if (this.address.receiverName == '' || this.address.receiverMobile == '' || this.address.selected[0] == null ||
					this.address.selected[1] == null ||
					this.address.receiverAddress == '' || this.address.receiverZip == '') {
					this.$message({
						message: '收件人信息不完整',
						type: 'warning'
					});
					return
				}
				let postData = this.$qs.stringify({
					userId: this.$store.state.token.id,
					receiverName: this.address.receiverName,
					receiverMobile: this.address.receiverMobile,
					receiverProvince: this.address.selected[0],
					receiverCity: this.address.selected[1],
					receiverAddress: this.address.receiverAddress,
					receiverZip: this.address.receiverZip
				})
				if (this.isadd == true) {
					this.$axios.post('/shipping/add.do', postData).then((res) => {
						// console.log(res.data);
						if (res.data.status == 0) {
							this.$message({
								message: res.data.msg,
								type: 'success'
							});
							this.isshow = false;
							this.upaddress();
						} else {
							this.$message(res.data.msg);
						}
					})
				}
				if (this.isemit == true) {
					this.$axios.post('/shipping/update.do', postData).then((res) => {
						if (res.data.status == 0) {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							});
							
							this.isshow = false;
							this.upaddress();
						} else {
							this.$message(res.data.msg);
						}
					})
				}
			},
			//获取商品清单
			getlist() {
				
				this.$axios.post('/order/get_order_cart_product.do').then((res) => {
					// console.log(res.data.data)
					if (res.data.status == 0) {
						this.tableData = res.data.data.orderItemVoList;
						this.imageHost = res.data.data.imageHost;
						this.productTotalPrice = res.data.data.productTotalPrice;
					}
				})
			},
			upaddress() {
				this.$axios.post('/shipping/list.do').then((res) => {
					// console.log(res.data.data.list);
					this.isaddress = res.data.data.list
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
			this.upaddress();
			this.getlist()
		}
	}
</script>

<style scoped="scoped" lang="less">
	#isorder{
		background-color: #f6f6f6;;
	}
	.adddz2 {
		position: relative;
		cursor: pointer;
		height: 80px;
		width: 200px;
		border: 3px dashed #909399;
		float: left;
		margin: 5px;

		&.color {
			border: 3px dashed #c60023;
		}

		.bji {
			display: none;
			font-size: 14px;
			color: #606266;
			position: absolute;
			bottom: 0;
			right: 40px;

			&:hover {
				color: #c60023;
			}
		}

		.schu {
			display: none;
			font-size: 14px;
			color: #606266;
			position: absolute;
			bottom: 0;
			right: 5px;

			&:hover {
				color: #c60023;
			}
		}

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
			.schu,.bji{
				display: block;
			}
		}

		.p1 {

			border-bottom: 1px solid #DCDFE6;
		}

		p {
			font-size: 14px;
			color: #909399;
			padding: 5px;

			span {
				margin: 0 3px;
			}
		}
	}

	.addcard {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: rgba(0, 0, 0, 0.5);

		.el-card {
			margin: auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 400px;
			height: 360px;

			.top {
				display: flex;
				justify-content: space-between;
				border-bottom: #909399 1px solid;
				padding-bottom: 5px;

				p {
					font-size: 20px;
					font-weight: 600;
					margin-top: 0px;

				}

				i {
					font-size: 20px;
					font-weight: 600;
					cursor: pointer;
				}
			}

			.area {

				display: flex;
			}

			p {
				margin: 10px 0;
				line-height: 32px;

				span {
					float: left;
					display: inline-block;
					width: 100px;
					height: 30px;
					margin-right: 20px;
					text-align: right;
				}
			}

			.el-input {
				width: 200px;

			}
		}
	}

	.adddz {
		margin: 5px;
		cursor: pointer;
		text-align: center;
		height: 80px;
		width: 200px;
		border: 3px dashed #909399;
		float: left;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}

		i {
			font-weight: 800;
			font-size: 30px;
			margin: 8px;
			color: #909399;
		}

		p {
			font-weight: 600;
			color: #909399;
			font-size: 22px;
		}
	}

	.el-table {
		img {
			width: 60px;
			height: 60px;
			margin-right: 20px;
			float: left;
		}

	}

	.foot {
		height: 50px;
		background-color: #eee;
		margin-top: 20px;
		position: relative;
		line-height: 50px;

		p {
			position: absolute;
			margin-left: 750px;

			span {
				font-size: 18px;
				color: #c60023;
				font-weight: 700;
				vertical-align: middle;
			}
		}

		button {
			outline: none;
			cursor: pointer;
			position: absolute;
			border: 0;
			background-color: #c60023;
			height: 50px;
			right: 0;
			font-size: 18px;
			color: #fff;
			font-weight: 600;
			width: 120px;
		}
	}

	.main1,
	.main2 {
		width: 1080px;
		margin: 0 auto;
	}

	h2 {
		margin: 20px 0;
		font-weight: 600;
		height: 30px;
		line-height: 30px;
		color: #606266;
		border-bottom: 1px solid #DCDFE6;
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
