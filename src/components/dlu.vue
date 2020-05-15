<template>
	<div class="main">
		<div class="dlu">
			<p>用户登录</p>
			<div class="input">
				<el-input placeholder="请输入用户名" v-model="username" clearable> <i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
				<el-input placeholder="请输入密码" autocomplete="new-password" v-model="password" show-password @keyup.enter.native="dlu"> <i slot="prefix" class="el-input__icon el-icon-key"></i></el-input>
				<el-button type="primary" @click="dlu">登录</el-button>
			</div>
			<div class="mm">
				<span  @click="()=>{this.$router.push({path:'/login/reset'})}">忘记密码</span>
				<span @click="()=>{this.$router.push({path:'/login/zhuce'})}">免费注册</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
			}
		},
		methods: {
			//触发登录事件验证信息
			dlu() {
				if(this.username==''){
					 this.$message({
						message: '用户名不能为空',
						type: 'warning'
					});
					return
				}
				if(this.password==''){
					 this.$message({
						message: '用户密码不能为空',
						type: 'warning'
					});
					return
				}
				let postData = this.$qs.stringify({
					username: this.username,
					password: this.password,
				});
				this.$axios({
					method: 'post',
					url: '/user/login.do',
					data: postData
				}).then((res) => {
					// console.log(res.data)
					if (res.data.status == 1) {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
						return;
					}
					if (res.data.status == 0) {
						console.log(res)
						this.$store.commit('login', res.data.data);
						this.$router.push({
							path: '/index'
						});
					}
				});
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	.main {
		width: 100%;
		padding: 50px 0;
		background: rgb(231, 41, 85);
		
		span {
			font-size: 12px;
			color: #333;
			cursor: pointer;
			margin: 0 5px;
			&:hover{
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
			height: 280px;
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
