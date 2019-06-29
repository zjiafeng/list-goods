<template>
	<div id="banner">
		<div class="left">
			<ul>
				<li><a href="/index/shoplist?keyword=手机">手机</a><a href="/index/shoplist?keyword=数码">数码</a></li>
				<li><a href="/index/shoplist?keyword=电脑">电脑</a><a href="/index/shoplist?keyword=办公配件">办公配件</a></li>
				<li><a href="/index/shoplist?keyword=电视">电视</a><a href="/index/shoplist?keyword=空调">空调</a><a href="/index/shoplist?keyword=冰箱">冰箱</a><a
					 href="/index/shoplist?keyword=洗衣机">洗衣机</a></li>
				<li><a href="/index/shoplist?keyword=厨卫家电">厨卫家电</a><a href="/index/shoplist?keyword=小家电">小家电</a></li>
				<li><a href="/index/shoplist?keyword=家具">家具</a><a href="/index/shoplist?keyword=家居">家居</a><a href="/index/shoplist?keyword=家装">家装</a></li>
				<li><a href="/index/shoplist?keyword=个人化妆">个人化妆</a><a href="/index/shoplist?keyword=清洁">清洁</a><a href="/index/shoplist?keyword=纸品">纸品</a></li>
				<li><a href="/index/shoplist?keyword=母婴">母婴</a><a href="/index/shoplist?keyword=玩具">玩具</a><a href="/index/shoplist?keyword=童装童鞋">童装童鞋</a></li>
				<li><a href="/index/shoplist?keyword=鞋靴">鞋靴</a><a href="/index/shoplist?keyword=箱包">箱包</a><a href="/index/shoplist?keyword=装表">装表</a><a
					 href="/index/shoplist?keyword=珠宝">珠宝</a></li>
				<li><a href="/index/shoplist?keyword=运动户外">运动户外</a><a href="/index/shoplist?keyword=足球">足球</a><a href="/index/shoplist?keyword=汽车生活">汽车生活</a></li>
				<li><a href="/index/shoplist?keyword=图书">图书</a><a href="/index/shoplist?keyword=影音">影音</a><a href="/index/shoplist?keyword=电子书">电子书</a></li>
			</ul>
		</div>
		<div class="right">
			<el-carousel :interval="5000" arrow="always" height="370px">
				<el-carousel-item v-for="item in banners" :key="item">
					<img :src="item" alt="">
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="one">
			<div class="floor-wrap" v-for="(item,index) in list" :key="index">
				<h1 class="floor-title">{{item.tit}}</h1>
				<ul class="floor-con">
					<li class="floor-item" v-for="(v,i) in item.zi" :key="i"><a :href="'/index/shoplist?keyword='+v.pp"><span class="floor-text">{{v.pp}}</span><img
							 class="floor-img" :src="v.imga" alt=""></a></li>
				</ul>
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				banners: [
					require('../assets/banner/banner1.jpg'),
					require('../assets/banner/banner2.jpg'),
					require('../assets/banner/banner3.jpg'),
					require('../assets/banner/banner4.jpg'),
					require('../assets/banner/banner5.jpg'),
				],
				list: [{
						tit: 'F1家用电器',
						zi: [{
								pp: '开双门冰箱',
								imga: require('../assets/floor/floor1-1.jpg')
							},
							{
								pp: '高清电视',
								imga: require('../assets/floor/floor1-2.jpg')
							},
							{
								pp: '洗衣机',
								imga: require('../assets/floor/floor1-3.jpg')
							},
							{
								pp: '空调专场',
								imga: require('../assets/floor/floor1-4.jpg')
							},
							{
								pp: '电热水器',
								imga: require('../assets/floor/floor1-5.jpg')
							},
						]

					},
					{
						tit: 'F2数码3C',
						zi: [{
								pp: '笔记本',
								imga: require('../assets/floor/floor2-1.jpg')
							},
							{
								pp: '手机',
								imga: require('../assets/floor/floor2-2.jpg')
							},
							{
								pp: '平板电脑',
								imga: require('../assets/floor/floor2-3.jpg')
							},
							{
								pp: '数码相机',
								imga: require('../assets/floor/floor2-4.jpg')
							},
							{
								pp: '3C配件',
								imga: require('../assets/floor/floor2-5.jpg')
							},
						]

					},
					{
						tit: 'F3服装箱包',
						zi: [{
								pp: '女装',
								imga: require('../assets/floor/floor3-1.jpg')
							},
							{
								pp: '帽子专区',
								imga: require('../assets/floor/floor3-2.jpg')
							},
							{
								pp: '旅行箱',
								imga: require('../assets/floor/floor3-3.jpg')
							},
							{
								pp: '手提包',
								imga: require('../assets/floor/floor3-4.jpg')
							},
							{
								pp: '保暖内衣',
								imga: require('../assets/floor/floor3-5.jpg')
							},
						]

					},
					{
						tit: 'F4食品生鲜',
						zi: [{
								pp: '最爱零食',
								imga: require('../assets/floor/floor4-1.jpg')
							},
							{
								pp: '生鲜',
								imga: require('../assets/floor/floor4-2.jpg')
							},
							{
								pp: '半成品菜',
								imga: require('../assets/floor/floor4-3.jpg')
							},
							{
								pp: '速冻专区',
								imga: require('../assets/floor/floor4-4.jpg')
							},
							{
								pp: '进口食品',
								imga: require('../assets/floor/floor4-5.jpg')
							},
						]

					},
					{
						tit: 'F5酒水饮料',
						zi: [{
								pp: '白酒',
								imga: require('../assets/floor/floor5-1.jpg')
							},
							{
								pp: '红酒',
								imga: require('../assets/floor/floor5-2.jpg')
							},
							{
								pp: '饮料',
								imga: require('../assets/floor/floor5-3.jpg')
							},
							{
								pp: '调制鸡尾酒',
								imga: require('../assets/floor/floor5-4.jpg')
							},
							{
								pp: '进口洋酒',
								imga: require('../assets/floor/floor5-5.jpg')
							},
						]

					},
				],
			}
		},
	}
</script>

<style scoped="scoped" lang="less">
	.floor-wrap {
		overflow: hidden;

		&:nth-child(2) .floor-title {
			color: #3b838c;
			border-bottom: 1px solid #3b838c;
		}

		&:nth-child(3) .floor-title {
			color: #a93931;
			border-bottom: 1px solid #a93931;
		}

		&:nth-child(4) .floor-title {
			color: #488bad;
			border-bottom: 1px solid #488bad;
		}

		&:nth-child(5) .floor-title {
			color: #642663;
			border-bottom: 1px solid #642663;
		}

		.floor-title {
			height: 50px;
			line-height: 50px;
			color: #d58717;
			font-weight: 400;
			font-size: 20px;
			text-align: left;
			border-bottom: 1px solid #d58717;
		}

		.floor-con {
			margin-right: -20px;

			.floor-item {
				position: relative;
				width: 200px;
				height: 220px;
				margin: 15px 20px 15px 0;
				float: left;
				cursor: pointer;
				background: #fff;
				transition: box-shadow .5s ease;

				.floor-text {
					position: absolute;
					top: 12px;
					left: 20px;
					font-size: 16px;
					color: #5e5e5e;
				}

				.floor-img {
					position: absolute;
					right: 15px;
					bottom: 10px;
					width: 80%;
					height: 75%;
					border: none;
				}

				&:hover {
					box-shadow: 0px 0px 2px 2px #ccc;
				}
			}
		}
	}


	.one {
		width: 1080px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.el-carousel img {
		height: 370px;
		width: 815px;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.left {
		float: left;
		width: 250px;
		padding: 10px 0;
		background-color: rgb(102, 102, 102);
		margin-right: 15px;

		ul {
			li {
				padding-left: 10px;
				width: 240px;
				height: 35px;
				line-height: 35px;

				a {
					font-size: 14px;
					color: #F2F6FC;
					text-decoration: none;
					display: inline-block;
					margin: 0 5px;

					&:hover {
						color: rgb(198, 0, 35)
					}
				}

				&:hover {
					background-color: rgb(153, 153, 153);
				}
			}

		}
	}

	#banner {
		width: 1080px;
		margin: 0 auto;
	}
</style>
