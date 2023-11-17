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
        component: () => import('../views/DayView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
