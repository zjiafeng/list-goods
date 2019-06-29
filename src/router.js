import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import dlu from './components/dlu.vue'
import {Message} from 'element-ui';

Vue.use(Router)

var router=new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass:'cur',
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'login',
			component: login,
			redirect: '/login/dlu',
			children: [{
				path: '/login/dlu',
				name: 'dlu',
				component: dlu
			},
			{
				path: '/login/zhuce',
				name: 'zhuce',
				component: () => import('./components/zhuce.vue')
			},{
				path: '/login/reset',
				name: 'reset',
				component: () => import('./components/reset.vue')
			}]
		},
		{
			path: '/index',
			name: 'index',
			component: () => import('./views/index.vue'),
			redirect: '/index/shop',
			children:[
				{
					path: '/index/shop',
					name: 'indexshop',
					component: () => import('./components/banner.vue'),
				},
				{
					path: '/index/shoplist/',
					name: 'shoplist',
					component: () => import('./views/shoplist.vue'),
				},
				{
					path: '/index/shopdetail/',
					name: 'shopdetail',
					component: () => import('./views/shopdetail.vue'),
				},
				{
					path: '/index/mycart/',
					name: 'mycart',
					component: () => import('./views/mycart.vue'),
				},
				{
					path: '/index/isorder/',
					name: 'isorder',
					component: () => import('./views/isorder.vue'),
				},
				{
					path: '/index/orderpay',
					name: 'orderpay',
					component: () => import('./views/orderpay.vue'),
				},
				{
					path: '/index/myshop',
					name: 'myshop',
					component: () => import('./components/myshop.vue'),
					redirect: '/index/myshop/myshop2',
					children:[
						{
							path: '/index/myshop/ismyshop',
							name: 'ismyshop',
							component: () => import('./components/ismyshop.vue'),
						},
						{
							path: '/index/myshop/myshop2',
							name: 'myshop2',
							component: () => import('./components/myshop2.vue'),
						},
						{
							path: '/index/myshop/myshop3',
							name: 'myshop3',
							component: () => import('./components/myshop3.vue'),
						},
						{
							path: '/index/myshop/myorder',
							name: 'myorder',
							component: () => import('./components/myorder.vue'),
						},
						{
							path: '/index/myshop/orderdetail',
							name: 'orderdetail',
							component: () => import('./components/orderdetail.vue'),
						},
						{
							path: '/index/myshop/mypassword',
							name: 'mypassword',
							component: () => import('./components/mypassword.vue'),
						}
					]
				}
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.name == 'dlu'||to.name == 'indexshop'||to.name == 'zhuce'||to.name == 'shoplist'||to.name == 'ismyshop') {
		next()
	} else {
		//查看本地存储中有没有用户登录的信息
		var userlogin = sessionStorage.getItem('userinfo');
		if (userlogin && JSON.parse(userlogin).username) {
			next();
		} else {
			Message({
				message: '请先登录！',
				type: 'warning'
			});
		}
	}
})
export default router