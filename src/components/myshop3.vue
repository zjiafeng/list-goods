<template>
	<div class="right">
		<h2>修改个人信息</h2>
		<p><span>用户名：</span>
			<span>{{data.username}}</span>
		</p>
		<p><span>电 话：</span>
			<el-input placeholder="请输入内容" v-model="data.phone" clearable>
			</el-input>
		</p>
		<p><span>邮 箱：</span>
			<el-input placeholder="请输入内容" v-model="data.email" clearable>
			</el-input>
		</p>
		<p><span>问 题：</span>
			<el-input placeholder="请输入内容" v-model="data.question" clearable>
			</el-input>
		</p>
		<p><span>答 案：</span>
			<el-input placeholder="请输入内容" v-model="data.answer" clearable>
			</el-input>
		</p>
		<el-button type="primary" size="mini" @click="tijiao">提交修改</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		methods: {
			tijiao() {
				let postData = this.$qs.stringify({
					email: this.data.email,
					phone: this.data.phone,
					question: this.data.question,
					answer: this.data.answer
				})
				// console.log(postData)
				this.$axios.post('/user/update_information.do', postData).then((res) => {
					if (res.status == 200) {
						// console.log(res)
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
						this.$router.push({path:'/index/myshop/myshop2'})
					}else{
						this.$message.error('更新个人信息失败');
					}

				})
			},
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
			if(this.$store.state.token){
				this.getData()
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.right {
		padding: 10px;
		height: 320px;
		width: 85%;
		background-color: #fff;

		.el-input {
			width: 200px;

		}

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
			line-height: 45px;
			font-size: 14px;
			color: #606266;

			span:first-child {
				display: inline-block;
				width: 80px;
			}
		}
	}
</style>
