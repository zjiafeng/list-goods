<template>
	<div id="orderpay">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span>
					<router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>订单支付</slot>
				</span>
			</p>
		</div>
		<div class="main">
			<p class="p1">订单提交成功，请您尽快支付！ 订单号：{{this.$route.query.order}}</p>
			<p class="p2">请使用支付宝扫描如下二维码进行支付：</p>
			<img :src="img" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'orderpay',
		data() {
			return {
				img: ''
			}
		},
		methods: {
			getData() {
				let postData = this.$qs.stringify({
					orderNo: this.$route.query.order
				})
				console.log(this.$route.query.order)
				this.$axios.post('/order/pay.do', postData).then(res => {
					console.log(res.data)
					if (res.data.status == 0) {
						this.img = res.data.data.qrUrl
					}
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.main{
		margin:20px auto;
		padding: 10px;
		width: 1080px;
		background-color: #fff;
		text-align: center;
		p{
			font-size: 22px;
			font-weight: 600;
			margin: 20px 0;
			color: #606266;
		}
		.p2{
			color: #c60023;
		}
		img{
			padding: 3px;
			border: #DCDFE6 2px solid;
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
