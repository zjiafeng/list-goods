<template>
	<div class="main">
		<div class="dlu" v-show="isshow">
			<p>找回密码</p>
			<span>请输入用户名：</span>

			<div class="input">
				<el-input placeholder="请输入用户名" v-model="username" clearable> <i slot="prefix" class="el-input__icon el-icon-user"></i></el-input>
				<el-button type="primary" @click="next">下一步</el-button>
			</div>
		</div>
		<div class="dlu" v-show="isshow2">
			<p>找回密码</p>
			<span>密码提示问题为：{{msg}}</span>
			<span>请输入密码提示答案：</span>
			<div class="input">
				<el-input placeholder="请输入密码提示答案" v-model="answer" clearable> <i slot="prefix" class="el-input__icon el-icon-key"></i></el-input>
				<el-button type="primary" @click="next2">下一步</el-button>
			</div>
		</div>
		<div class="dlu" v-show="isshow3">
			<p>找回密码</p>
			<span>请输入新密码：</span>
			<div class="input">
				<el-input placeholder="请输入新密码：" v-model="password" show-password> <i slot="prefix" class="el-input__icon el-icon-key"></i></el-input>
				<el-button type="primary" @click="next3">提交</el-button>
			</div>
		</div>
		<div class="dlu2" v-show="isshow4">
			<p>恭喜您，重置密码成功！</p>
			<el-button type="primary" @click="()=>{this.$router.push({path:'/login'})}">立即去登录</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password:'',
				isshow: true,
				isshow2:false,
				isshow3:false,
				isshow4:false,
				msg: '',
				answer:'',
				token:''
			}
		},
		methods: {
			next3(){
				if(this.password!==''){
					if(this.password.length<6){
						this.$message({
							message: '新密码长度不得小于六位',
							type: 'warning'
						});
					}else{
						let postData = this.$qs.stringify({
							username:this.username,
							passwordNew: this.password,
							forgetToken:this.token
						})
						this.$axios.post('/user/forget_reset_password.do',postData).then((res)=>{
							if(res.data.status==0){
								this.isshow3 = false
								this.isshow4=true
							}
						})
					}
				}else{
					this.$message({
						message: '请输入新密码',
						type: 'warning'
					});
				}
			},
			next2(){
				if (this.answer !== '') {
					let postData = this.$qs.stringify({
						username:this.username,
						answer: this.answer,
						question:this.msg
					})
					this.$axios.post('/user/forget_check_answer.do', postData).then((res) => {
						if(res.data.status==0){
							this.isshow2 = false
							this.isshow3 = true
							this.token = res.data.data
						}else {
							this.$message({
								message: '问题的答案错误',
								type: 'warning'
							});
						}
					})
				}else {
					this.$message({
						message: '请输入密码提示答案',
						type: 'warning'
					});
				}
			},
			next() {
				if (this.username !== '') {
					let postData = this.$qs.stringify({
						username: this.username
					})
					this.$axios.post('/user/forget_get_question.do', postData).then((res) => {
						// console.log(res)
						if (res.data.status == 0) {
							this.isshow = false
							this.isshow2 = true
							this.msg = res.data.data
						} else {
							this.$message({
								message: '用户不存在',
								type: 'warning'
							});
						}
					})
				} else {
					this.$message({
						message: '请输入用户名',
						type: 'warning'
					});
				}
			},
		},
	}
</script>

<style scoped="scoped" lang="less">
		.dlu2 {
			margin: 0 auto;
			text-align: center;
			background-color: #fff;
			width: 1080px;
			padding: 30px 0;
			p {
				font-size: 26px;
				font-weight: 600;
				color: #666;
			}
		
			.el-button {
				width: 130px;
				margin-top: 20px;
				
			}
		}
	.main {
		width: 100%;
		padding: 50px 0;
		background: rgb(246, 246, 246);
		
		.el-input {
			width: 350px;
			margin-top: 10px;
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
			.el-button {
				width: 350px;
				margin-top: 20px;
				margin-bottom: 10px;
			}
			span {
				margin-left: 25px;
				display: inline-block;
				color: #666;
				width: 100%;
				line-height: 30px;
			}

			p {
				color: #666;
				text-align: center;
				font-size: 24px;
				font-weight: 600;
				line-height: 60px;
				border-bottom: 1px solid #ccc;
				margin-bottom: 10px;
			}
		}
	}
</style>
