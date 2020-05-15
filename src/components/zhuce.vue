<template>
	<div class="main">
		<div class="dlu" v-show="isshow">
			<p>新用户注册</p>
			<div class="input">
				<el-input @blur="user" placeholder="请输入用户名" v-model="username" clearable> <i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
				<el-input placeholder="请输入密码" v-model="password" show-password> <i slot="prefix" class="el-input__icon el-icon-key"></i></el-input>
				<el-input @blur="mima" placeholder="请再次输入密码" v-model="password2" show-password> <i slot="prefix" class="el-input__icon el-icon-key"></i></el-input>
				<el-input @blur="tel" placeholder="请输入电话" v-model="phone"> <i slot="prefix" class="el-input__icon el-icon-phone"></i></el-input>
				<el-input @blur="email" placeholder="请输入邮箱" v-model="message"> <i slot="prefix" class="el-input__icon el-icon-message"></i></el-input>
				<el-input placeholder="请输入密码提示问题" v-model="lock"> <i slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
				<el-input placeholder="请输入密码提示答案" v-model="unlock"> <i slot="prefix" class="el-input__icon el-icon-unlock"></i></el-input>
				<el-button type="primary" @click="zhuce">立即注册</el-button>
			</div>
			<div class="mm">
				<span @click="()=>{this.$router.push({path:'/login'})}">已有账号，去登录>></span>
			</div>
		</div>
		<div class="dlu2" v-show="!isshow">
			<p>恭喜您，注册成功！</p>
			<el-button type="primary" plain @click="()=>{this.$router.push({path:'/login'})}">立即去登录</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				password2: '',
				phone: '',
				message: '',
				lock: '',
				unlock: '',
				isshow: true
			}
		},
		methods: {
			//手机号验证
			tel() {
				let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if (this.phone !== '') {
					if (!reg.test(this.phone)) {
						this.$message({
							message: '手机号格式不正确',
							type: 'warning'
						});
					}
				}
			},
			//邮箱验证
			email() {
				let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				let postData = this.$qs.stringify({
					str: this.message,
					type: 'email'
				})
				if (this.message !== '') {
					if (!regEmail.test(this.email)) {
						this.$message({
							message: '邮箱格式不正确',
							type: 'warning'
						});
					} else {
						this.$axios.post('/user/check_valid.do', postData).then((res) => {
							if (res.data.status == 1) {
								this.$message({
									message: res.data.msg,
									type: 'warning'
								});
							}
						})
					}

				}
			},
			//用户名验证
			user() {
				let postData = this.$qs.stringify({
					str: this.username,
					type: 'username'
				})
				if (this.username !== '') {
					this.$axios.post('/user/check_valid.do', postData).then((res) => {
						if (res.data.status == 1) {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						}
					})
				}
			},
			//再次输入密码验证
			mima(){
				if (this.password !== this.password2) {
					this.$message({
						message: '两次输入密码不一致',
						type: 'warning'
					});
					return
				}
			},
			//触发注册事件验证用户信息是否完整
			zhuce() {
				if (this.username == '' || this.password == '' || this.message == '' || this.phone == '' || this.lock == '' || this
					.unlock == '') {
					this.$message({
						message: '用户个人信息不完整',
						type: 'warning'
					});
					return
				}
				let postData = this.$qs.stringify({
					username: this.username,
					password: this.password,
					email: this.message,
					phone: this.phone,
					question: this.lock,
					answer: this.unlock
				})
				this.$axios.post('/user/register.do', postData).then((res) => {
					// console.log(res)
					if (res.status == 200) {
						if (res.data.status == 1) {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						} else {
							this.isshow = false
						}
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		width: 100%;
		padding: 30px 0;
		background: rgb(231, 41, 85);

		.dlu2 {
			text-align: center;

			p {
				font-size: 26px;
				color: #fff;
				font-weight: 600;

			}

			.el-button {
				width: 150px;
			}
		}

		span {
			font-size: 12px;
			color: #333;
			cursor: pointer;
			margin: 0 5px;

			&:hover {
				text-decoration: underline;
			}
		}

		.el-input {
			width: 350px;
			margin-top: 20px;

		}

		.el-button {
			width: 350px;
			margin-top: 20px;
			margin-bottom: 10px;
		}

		.input {
			text-align: center;
		}

		.dlu {
			position: relative;
			background-color: #fff;
			width: 400px;
			padding-bottom: 30px;
			margin: 0 auto;
			border: 1px solid #ccc;

			.mm {
				position: absolute;
				right: 20px;
			}

			p {
				color: #666;
				text-align: center;
				font-size: 24px;
				font-weight: 600;
				line-height: 60px;
				border-bottom: 1px solid #ccc;
			}
		}
	}
</style>
