import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
	{
		//主路由
		path: '/',
		name: 'Main',
		redirect: '/home', // 重定向
		component: MainView,
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('../views/HomeView.vue')
			},
			{
				path: '/timeline',
				name: 'TimeLine',
				component: () => import('../views/TimeLineView.vue')
			},
			{
				path: '/calendar',
				name: 'Calendar',
				component: () => import('../views/CalendarView.vue')
			},
			{
				path: '/statistic',
				name: 'Statist',
				component: () => import('../views/StatisticView.vue')
			},
			{
				path: '/setting',
				name: 'Setting',
				component: () => import('../views/SettingView.vue')
			},
			{
				path: '/user',
				name: 'User',
				component: () => import('../views/UserView.vue')
			},
			{
				path: '/about',
				name: 'About',
				component: () => import('../views/AboutView.vue')
			},
			{
				//测试用
				path: '/test',
				name: 'Test',
				component: () => import('../views/TestView.vue')
			}
		]
	},
	{
		//登录路由
		path: '/login',
		name: 'Login',
		component: () => import('../views/LoginView.vue'),
	},
	{
		// 注册路由
		path: '/register',
		name: 'Register',
		component: () => import('../views/RegisterView.vue'),
	}
]



const router = new VueRouter({
	routes,
	mode: 'history',
})


// 路由守卫:全局前置导航守卫
router.beforeEach((to, from, next) => {
	// 获取token
	const token = localStorage.getItem('token')

	// 若token不存在则 应当跳转至登录页面
	if (!token && (to.name !== 'Login' && to.name !== 'Register')) {
		next({ name: 'Login' })
	}
	// 若token存在则 不允许跳转至登录页面
	else if (token && (to.name === 'Login' || to.name === 'Register')) {
		//alert(localStorage.getItem('token'))
		next({ name: 'Home' })
	} else {
		next()
	}
})

export default router
