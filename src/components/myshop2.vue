<template>
	<div class="right" v-if="show">
		<h2>我的信息</h2>
		<p><span>用户名：</span><span>{{data.username}}</span></p>
		<p><span>电 话：</span><span>{{data.phone}}</span></p>
		<p><span>邮 箱：</span><span>{{data.email}}</span></p>
		<p><span>问 题：</span><span>{{data.question}}</span></p>
		<p><span>答 案：</span><span>{{data.answer}}</span></p>
		<el-button type="primary" size="mini" @click="()=>{this.$router.push({path:'/index/myshop/myshop3'})}">编辑</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {},
				show: true
			}
		},
		methods: {
			getData() {
				let postData = this.$qs.stringify({
					username: this.$store.state.token.username
				})
				this.$axios.post('/user/get_user_info.do', postData).then((res) => {
					if (res.status == 200) {
						this.data = res.data.data
						// console.log(this.data)
					}

				})
			}
		},
		mounted() {
			if (this.$store.state.token) {
				this.getData()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.right {
		padding: 10px;
		height: 250px;
		width: 85%;
		background-color: #fff;

		.el-button {
			margin-left: 80px;
			margin-top: 10px;
		}

		h2 {
			font-weight: 600;
			color: #606266;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;
			margin-bottom: 10px;
		}

		p {
			line-height: 30px;
			font-size: 14px;
			color: #606266;

			span:first-child {
				display: inline-block;
				width: 80px;
			}
		}
	}
</style>
