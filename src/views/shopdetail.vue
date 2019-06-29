<template>
	<div id="shopdetail">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span>
					<router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>商品详情</slot>
				</span>
			</p>
		</div>
		<div class="ismain" v-show="isshow">
			<div class="main">
				<div class="left">
					<div class="img">
						<img v-for="(v,i) in imgs" :src="v" alt="" :key="i" v-show="i==index" style="width: 400px;height: 400px;">
						<div class="dian" style="width: 400px;overflow: hidden;height: 90px;">
							<span @mouseover="stop(i)" @mouseout="move()" v-for="(v,i) in imgs" :class="i==index?'cur':''" :key=i style="display: inline-block;margin: 5px;width: 60px;height: 60px;cursor: pointer;">
								<img :src="v" alt="" style="width: 60px;height: 60px;">
								 </span>
						</div>
					</div>
				</div>
				<div class="right">
					<h2>{{list.name}}</h2>
					<p style="color: #e4393c;">{{list.subtitle}}</p>
					<p style="background-color: #eee;">价格：<span style="color: #e4393c;font-weight: 600;">{{list.price|toprice("￥")}}</span></p>
					<p><span>库存</span>：{{list.stock}}</p>
					<p><span>数量</span>：<button @click="sub()" :disabled="num == 1">-</button><input v-model="num" type="text"><button @click="add()" :disabled="num >= list.stock">+</button></p>
					<el-button plain style="color: #fff;margin-top: 20px;" @click="addcart">加入购物车</el-button>
				</div>
			</div>
			<div class="main2">
				<ul>
					<li>详细描述</li>
				</ul>
				<div v-html="list.detail" style="padding: 10px;text-align: center;background-color: #fff;"></div>
			</div>
		</div>
		<div class="ismain2" v-show="!isshow">
			<div class="main">
				<p>您的商品已成功加入购物车</p>
				
			</div>
			<p><el-button @click="()=>{this.$router.push({path:'/index'})}">继续购物</el-button>
			<el-button @click="()=>{this.$router.push({path:'/index/mycart'})}">去购物车查看</el-button></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopdetail',
		data() {
			return {
				list: '',
				imgs: [],
				num: 1,
				index: 0,
				timer: '',
				isshow: true
			}
		},

		methods: {
			addcart() {
				this.isshow = !this.isshow
				let postData=this.$qs.stringify({
					productId:this.list.id,
					count:this.num
				})
				this.$axios.post('/cart/add.do',postData).then((res)=>{
					// console.log(res.data)
				})
			},
			add() {
				this.num++
			},
			sub() {
				this.num--
			},
			autoPlay() {
				this.index++;
				if (this.index === this.imgs.length) {
					this.index = 0
				}
			},
			play() {
				this.timer = setInterval(this.autoPlay, 2500)
			},
			stop(i) {
				this.index = i
				clearInterval(this.timer)
			},
			move() {
				this.timer = setInterval(this.autoPlay, 2500)
			},
			getData() {
				let postData = this.$qs.stringify({
					productId: this.$route.query.productId
				})
				this.$axios.post('/product/detail.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.list = res.data.data;
						// console.log(this.list)
						let img = res.data.data.subImages.split(",")
						img.forEach((v, i) => {
							this.imgs.push(res.data.data.imageHost + v)
						})
					}
				})
			}
		},
		filters: {
			toprice: function(data, str) {
				return str + (data / 1).toFixed(2)
			}
		},
		mounted() {
			this.getData();
			this.play()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.ismain2 {
		text-align: center;
		width: 1080px;
		margin: 0 auto;
		background: #fff;
		height: 200px;
		
		.main{
			p{
				margin-top: 40px;
				margin-bottom: 20px;
				text-align: center;
				width: 1080px;
				font-size: 26px;
				font-weight: 600;
			}
		}
	}

	.cur {
		border: 2px solid #c60023;
	}

	.main2 {
		width: 1080px;
		margin: 0 auto;

		ul {
			background-color: #eeeeee;
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #c60023;
			margin: 10px 0;

			li {
				width: 150px;
				text-align: center;
				color: #fff;
				background-color: #c60023;
			}
		}
	}

	.main {
		width: 1080px;
		margin: 20px auto;
		display: flex;
	}

	.right {
		input {
			width: 50px;
			text-align: center;
		}

		h2 {
			font-size: 26px;
			font-weight: 600;
			margin: 20px 0;
		}

		p {
			padding: 0 10px;
			line-height: 40px;

			span {
				color: #606266;
				font-size: 14px;
			}
		}
	}

	.left {
		width: 400px;
		height: 500px;
		margin-right: 50px;
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

	#shopdetail {
		background-color: rgb(246, 246, 246);
	}
</style>
