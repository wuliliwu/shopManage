import Vue from 'vue'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';

// 路由懒加载

const index = () => import('views/layout/index')
const Home = () => import('views/home/Home')
const GoodsList = () => import('views/goods/GoodsList')
const AddGoods = () => import('views/goods/AddGoods')
const goodsCate = () => import('views/goods/goodsCate')
const goodsAttr =() => import('views/goods/goodsAttr')
const goodsBrand =() => import('views/goods/goodsBrand')
const orderList =() => import('views/orders/orderList')
const orderSetting =() => import('views/orders/orderSetting')
const orderTui =() => import('views/orders/orderTui')

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/index/home',
  },
  {
    path: '/index',
    name:'index',
    component:index,
    children:[
      {
        path:'/index/home',
        component:Home
      }
    ]
  },
  // 商品路由的跳转信息
  {
    path: '/goods',
    name:'index',
    component:index,
    redirect: '/goods/goodslist',

    children: [
      {
        path: '/goods/goodslist',
        component:GoodsList
      },
      {
        path: '/goods/addgoods',
        component:AddGoods
      },
      {
        path: '/goods/goodscate',
        component:goodsCate
      },{
        path: '/goods/goodsattr',
        component:goodsAttr
      },{
        path: '/goods/goodsbrand',
        component:goodsBrand
      }
    ]

  },
  // 订单路由的商品信息
  {
    path: '/order',
    name: "index",
    component:index,
    redirect: '/order/orderlist',
    children: [
      {
        path: '/order/orderlist',
        component:orderList
      },{
        path: '/order/ordersetting',
        component:orderSetting
      }
      ,{
        path: '/order/ordertui',
        component:orderTui
      }

    ]
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "views/404.vue"),
  },

]

const router = new VueRouter({

  base: process.env.BASE_URL,
  routes
})


// router.$addRoutes = (params) => {
//   router.matcher = new Router({ mode: 'history' }).matcher
//   router.addRoutes(params)
// }
// router.beforeEach((to, from, next) => {
//   //没有添加过才添加
//   if (router.options.routes[0].children.length < 10) {
//     router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
//     router.$addRoutes(router.options.routes)
//   }
// })

export default router
