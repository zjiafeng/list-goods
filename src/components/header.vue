<template>
	<div id="header">
		<div class="header1">
			<div class="top">
				<ul v-if="show">
					<li @click="()=>{this.$router.push({path:'/'})}">登录</li>
					<li @click="()=>{this.$router.push({path:'/login/zhuce'})}">注册</li>
				</ul>
				<ul v-if="!show">
					<p>欢迎，{{username}}</p>
					<li @click="tui">退出</li>
				</ul>
				<ul>
					<li>
						<router-link to="/index/mycart">
							<i class="el-icon-shopping-cart-2"></i>购物车({{num}})
						</router-link>
					</li>
					<li @click="ddan">
						<router-link to="/index/myshop/myorder">
							我的订单
						</router-link>
					</li>
					<li @click="shop">
						<router-link to="/index/myshop/myshop2">
							我的myshop
						</router-link>
					</li>
					<li  @click="ismyshop">
						<router-link to="/index/myshop/ismyshop">
							关于myshop
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="header2">
			<h2 @click="myshop">MYSHOP</h2>
			<div class="top1">
				<input type="text" placeholder="请输入商品名称" v-model="shopname" @keyup.enter="ssou">
				<button @click="ssou">搜索</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		inject: ['reload'],
		data() {
			return {
				show: true,
				shopname: this.$route.query.keyword,
				num: 0
			}
		},
		computed: {
			username() {
				return this.$store.state.token.username
			},
		},
		methods: {
			tui() {
				this.show = !this.show
				this.$store.commit('logout')
			},
			shop() {
				this.$store.commit('myshop', '个人中心')
			},
			ddan() {
				this.$store.commit('myshop', '我的订单')
			},
			ismyshop() {
				this.$store.commit('myshop', '关于myshop')
			},
			ssou() {
				this.$router.push({
					path: '/index/shoplist',
					query: {
						keyword: this.shopname
					}
				})
			},
			myshop() {
				this.$router.push({
					path: '/index'
				})
				this.reload()
			}
		},
		mounted() {
			if (this.$store.state.token !== null) {
				this.show = false;
				this.$axios.post('/cart/get_cart_product_count.do').then((res) => {
					// console.log(res)
					if (res.data.status == 0) {
						this.num = res.data.data
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.header1 {
		font-size: 12px;
		color: #606266;
		width: 100%;
		height: 30px;
		line-height: 30px;
		background-color: rgb(238, 238, 238);

		.top {

			width: 1080px;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			ul {
				display: flex;

				li {
					margin: 0 5px;

					.el-icon-shopping-cart-2 {
						font-weight: 600;
						margin: 0 5px;
					}

					a {

						// color: #606266;
						&:hover {
							color: rgb(198, 0, 35)
						}
					}
				}
			}
		}
	}

	.header2 {
		width: 1080px;
		margin: 0 auto;
		height: 114px;
		line-height: 114px;
		display: flex;

		h2 {
			font-size: 36px;
			font-weight: 600;
			color: rgb(198, 0, 35);
			margin: 0 50px;
			cursor: pointer;
		}

		.top1 {
			position: relative;

			input {
				width: 500px;
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				padding: 0;
				padding-left: 10px;
				border: 2px solid rgb(198, 0, 35);

			}

			button {
				position: absolute;
				top: 36px;
				display: inline-block;
				width: 80px;
				height: 44px;
				font-weight: 600;
				font-size: 18px;
				color: #fff;
				background-color: rgb(198, 0, 35);
				text-align: center;
				border: 0;
				outline: none;
				cursor: pointer;
			}
		}

	}
</style>
