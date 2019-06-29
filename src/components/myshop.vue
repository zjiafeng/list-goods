<template>
	<div id="myshop">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span><router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>{{msg}}</slot></span>
			</p>
		</div>
		<div class="main">
			<ul class="left">
				<li @click="shop"><router-link to="/index/myshop/myshop2">个人中心</router-link></li>
				<li @click="ddan"><router-link to="/index/myshop/myorder">我的订单</router-link></li>
				<li @click="password"><router-link to="/index/myshop/mypassword">修改密码</router-link></li>
				<li @click="ismyshop"><router-link to="/index/myshop/ismyshop">关于MYSHOP</router-link></li>
			</ul>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		name:'myshop',
		computed: {
			...mapState(['msg']),
		},
		methods: {
			shop(){
				this.$store.commit('myshop','个人中心')
			},
			ddan(){
				this.$store.commit('myshop','我的订单')
			},
			password(){
				this.$store.commit('myshop','修改密码')
			},
			ismyshop(){
				this.$store.commit('myshop','myshop')
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	#myshop{
		background-color: #f6f6f6;
	}
	.main{
		width: 1080px;
		margin: 20px auto;
		display: flex;
		.left{
			width: 15%;
			li{
				line-height: 30px;
				font-size: 14px;
				color: #606266;
				a{
					display: inline-block;
					width: 100%;
				}
			}
		}
	}
	.top{
		.p1{
			width: 100%;
			height: 2px;
			background-color: #c60023;
		}
		.p2{
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #eeeeee;
			span{
				width: 1080px;
				display: block;
				margin: 0 auto;
				color:#606266;
				font-size: 14px;
			}
			.color{
				color:#606266;
				&:hover{
					color:#c60023;
				}
			}
		}
	}
</style>
