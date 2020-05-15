<template>
	<div id="shoplist">
		<div class="top">
			<p class="p1"></p>
			<p class="p2">
				<span>
					<router-link to="/index" active-class="color">MYSHOP</router-link> > <slot>商品列表</slot>
				</span>
			</p>
		</div>
		<div class="main">
			<div class="list" v-if="list.length!==0">
				<ul class="sorter-con">
					<li class="sorter-item" @click="sort(i)" v-for="(v,i) in data" v-html="v" :key="i" :class="i==index?'active':''"></li>
				</ul>
				<div class="islist">
					<dl v-for="(v,idx) in list" :key="idx" @click="shopdetail(v.id)">
						<dt><img :src="v.imageHost+v.mainImage" alt=""></dt>
						<dd><p>{{v.price|toprice("￥")}}</p><p>{{v.name}}</p></dd>
					</dl>
					<div class="clear"></div>
				</div>
			</div>
			<div class="list2" v-else>
				<ul class="sorter-con">
					<li class="sorter-item active"><span>默认排序</span></li>
					<li class="sorter-item"><span>价格</span><i class="el-icon-caret-top"></i><i class="el-icon-caret-bottom"></i></li>
				</ul>
				<div class="islist">
					<p>很抱歉，实在找不到您要的商品。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shoplist',
		data() {
			return {
				list: [],
				isshow: true,
				index:0,
				data:['<span>默认排序</span>',
				'<span>价格</span><i class="el-icon-sort-down">',
				'<span>价格</span><i class="el-icon-sort-up"></i>']
			}
		},
		methods: {
			sort(i){
				this.index = i;
				if(i==0){
					this.getData()
				};
				if(i==1){
					let postData=this.$qs.stringify({
						keyword:this.$route.query.keyword,
						orderBy:'price_desc'
					})
					this.$axios.post('/product/list.do',postData).then((res)=>{
						if(res.data.status==0){
							this.list=res.data.data.list
						}
					})
				};
				if(i==2){
					let postData=this.$qs.stringify({
						keyword:this.$route.query.keyword,
						orderBy:'price_asc'
					})
					this.$axios.post('/product/list.do',postData).then((res)=>{
						if(res.data.status==0){
							this.list=res.data.data.list
						}
					})
				}
			},
			shopdetail(item){
				this.$router.push({
					path:'/index/shopdetail',
					query:{productId:item}
				})
			},
			getData() {
				let postData=this.$qs.stringify({
					keyword:this.$route.query.keyword
				})
				this.$axios.post('/product/list.do',postData).then((res)=>{
					if(res.data.status==0){
						this.list=res.data.data.list
					}
					// console.log(this.list)
				})
			},
		},
		filters: {
			toprice: function(data,str) {
				return str+(data/1).toFixed(2)
			}
		},
		mounted() {
			if (this.list.length == 0) {
				this.isshow = false
			}
			this.getData()
		}
	}
</script>

<style scoped="scoped" lang="less">
	#shoplist{
		background-color: rgb(246, 246, 246);
	}
	.list{
		.islist{
			dl{
				float: left;
				background: #fff;
				width: 180px;
				height: 250px;
				padding: 10px;
				margin: 8px;
				dt{
					img{
						width: 180px;
						height: 200px;
					}
				}
				dd{
					p{
						line-height:25px;
						font-size: 14px;
						color: #606266;
						width: 180px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}
	.list2 {
		.islist {
			background-color: #eeeeee;
			text-align: center;

			p {
				color: #f60;
				font-weight: 600;
				height: 60px;
				line-height: 60px;
			}
		}
	}
	.sorter-con {
		margin: 10px;
		overflow: auto;
		font-size: 12px;
		.sorter-item {
			float: left;
			display: inline-block;
			position: relative;
			padding: 0 8px;
			height: 23px;
			line-height: 23px;
			border: 1px solid #ccc;
			margin-right: -1px;
			background: #fff;
			color: #333;
			i{
				font-weight: 600;
			}
		}
	
		.sorter-item.active {
			background: #c60023;
			border: 1px solid #c60023;
			color: #fff;
		}
	}
	.main {
		background-color: rgb(246, 246, 246);
		width: 1080px;
		margin: 0 auto;
	}

	.top {
		.p1 {
			width: 100%;
			height: 2px;
			background-color: #c60023;
		}

		.p2 {
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #eeeeee;

			span {
				width: 1080px;
				display: block;
				margin: 0 auto;
				color: #606266;
				font-size: 14px;
			}

			.color {
				color: #606266;

				&:hover {
					color: #c60023;
				}
			}
		}
	}
</style>
