<template>
	<div id="index">
		<my-header></my-header>
		<router-view></router-view>
		<my-footer></my-footer>
	</div>
</template>

<script>
	import myHeader from '../components/header.vue'
	import myFooter from '../components/footer.vue'
	export default {
		name:'index',
		components: {
			myHeader,
			myFooter,
		},
	}
</script>

<style lang="less" scoped="scoped">
	#index{
		background-color: rgb(246, 246, 246);
		height: 100vh;
	}
	
</style>
