import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
       path: '/',
       name: 'Main',
       // 路由懒加载
       component: () => import('../views/Main.vue'),
       //配置嵌套路由
       children: [
        //    {
        //        path: '/home',
        //        name: 'home',
        //        component: () => import('../views/home')
        //    },
        //    {
        //         path: '/user',
        //         name: 'user',
        //         component: () => import('../views/User')
        //     },
        //    {
        //         path: '/mall',
        //         name: 'mall',
        //         component: () => import('../views/mall')
        //     },
        //    {
        //         path: '/page1',
        //         name: 'page1',
        //         component: () => import('../views/other/pageOne.vue')
        //     },
        //    {
        //         path: '/page2',
        //         name: 'page2',
        //         component: () => import('../views/other/pageTwo.vue')
        //     },
       ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login.vue')
    }
    
]

//路由配置
const router = new VueRouter({
    //路由模式
    mode: 'history',
    routes
})

export default router

// //获取原型对象上的push函数
// const originalPush = Router.prototype.push
// //修改原型对象中的push方法
// Router.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
//}