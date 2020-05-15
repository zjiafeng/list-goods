<template>
	<div id="app">
		<loadings v-show="this.$store.state.isshows"></loadings>
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>
	import loadings from './components/loadings.vue'
	export default {
	    name:'App',
		components:{loadings},
		data() {
			return {
				isRouterAlive: true
			}
		},
		provide(){
			return{
				reload:this.reload
			}
		},
		methods: {
			reload() {
				this.isRouterAlive=false;
				this.$nextTick(function(){
					this.isRouterAlive=true;
				})
			}
		},
	}
</script>

<style lang="less">
	.clear{
		clear: both;
	}
	a{
		text-decoration: none;
		color: #606266;
	}
	.cur{
		color:#c60023;
	}
	li {
		cursor: pointer;
	}
	.el-button{
		background-color: #e4393c!important;
		border: 0!important;
		color:#fff!important;
	}
</style>
