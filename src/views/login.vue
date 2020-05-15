<template>
	<div id="dlu">
		<div class="top">
			<p>MYSHOP</p>
		</div>
		<router-view></router-view>
		<div class="foot">
			<ul>
				<a target=_blank href="https://coding.imooc.com/">慕课网实战</a> |
				<a target=_blank href="https://www.imooc.com/u/198337">Rosen主页</a> |
				<a target=_blank href="https://www.imooc.com/t/2705746">Geely主页</a> |
				<a target=_blank href="https://www.imooc.com/u/5980627">Jimin主页</a>
			</ul>
			<p>Copyright © 2018 happymmall.com All Rights Reserved</p>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped="scoped" lang="less">
	.foot {
		margin-bottom: 30px;
		text-align: center;
		ul {
			margin: 10px;
			color: #606266;
			a {
				text-decoration: none;
				color: #606266;
				font-size: 12px;
				&:hover{
					text-decoration: underline;
				}
			}

		}
		p{
			color: #606266;
			font-size: 12px;
		}
	}

	

	.top {
		width: 1080px;
		margin: 0 auto;
		line-height: 80px;

		p {
			font-size: 32px;
			font-weight: 600;
			color: rgb(198, 0, 35);
		}
	}
	
</style>
