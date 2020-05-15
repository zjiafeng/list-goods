<template>
	<div class="footer">
		<div class="one">
			<div class="links">
				<a class="link" href="#">慕课网实战</a> | <a class="link" href="#">Rosen主页</a> | <a class="link" href="#">Geely主页</a> |
				<a class="link" href="#">Jimin主页</a>
				<p class="copyright"> Copyright © 2018 happymmall.com All Rights Reserved </p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
	.footer {
		width: 100%;
		margin: 0 auto;
		font-size: 12px;
		height: 60px;
		background-color: rgb(246, 246, 246);
		.links {
			padding-top: 15px;
			text-align: center;
			color: #666;
	
			.link {
				padding: 10px;
				color: #666;
	
				&:hover {
					color: #f00;
				}
			}
		}
	
		.copyright {
			margin: 10px 0;
			text-align: center;
			color: #666;
		}
	}
</style>
