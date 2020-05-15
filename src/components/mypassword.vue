<template>

	<div class="right">
		<h2>修改密码</h2>
		<p><span>原始密码：</span>
			<el-input placeholder="请输入原始密码" v-model="passwordOld" show-password>
			</el-input>
		</p>
		<p><span>新 密 码：</span>
			<el-input placeholder="请输入新密码" v-model="passwordNew" show-password>
			</el-input>
		</p>
		<p><span>确认密码：</span>
			<el-input placeholder="请再次输入新密码" v-model="passwordNew2" show-password @blur="input">
			</el-input>
		</p>

		<el-button type="primary" size="mini" @click="submit">提交修改</el-button>
	</div>

</template>

<script>
	export default {
		name: 'mypassword',
		data() {
			return {
				passwordOld: '',
				passwordNew: '',
				passwordNew2: ''
			}
		},
		methods: {
			input() {
				if (this.passwordNew2 !== this.passwordNew) {
					this.$message.error('二次输入密码错误');
				}
			},
			submit() {
				let postData = this.$qs.stringify({
					passwordOld: this.passwordOld,
					passwordNew: this.passwordNew
				})
				this.$axios.post('/user/reset_password.do', postData).then((res) => {
					if (res.data.status == 0) {
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
					}
					if (res.data.status == 1) {
						this.$message.error(res.data.msg);
					}
				})
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	.right {
		padding: 10px;
		height: 240px;
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
