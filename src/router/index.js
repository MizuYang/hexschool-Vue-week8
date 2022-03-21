import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  {
    //* 前台路由
    path: '/user',
    component: () => import('@/views/front/User_Main.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/front/type_user/User_Home.vue')
      },
      {
        path: 'products',
        component: () => import('@/views/front/type_products/User_Products.vue')
      },
      {
        path: 'one_product/:id',
        component: () => import('@/views/front/type_products/User_One_Product.vue')
      },
      {
        path: 'favorite',
        component: () => import('@/views/front/type_products/User_Collect_Product.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/front/type_order/User_Cart.vue')
      },
      {
        path: 'checkout',
        component: () => import('@/views/front/type_order/User_Checkout.vue')
      },
      {
        path: 'order_confirm/:orderId',
        component: () => import('@/views/front/type_order/User_OrderInfo_Confirm.vue')
      },
      {
        path: 'order_completed',
        component: () => import('@/views/front/type_order/User_Order_Completed.vue')
      },
      {
        path: 'questions',
        component: () => import('@/views/front/type_user/User_Questions.vue')
      },
      {
        path: 'get_Contact',
        component: () => import('@/views/front/type_user/User_Get_Contact.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/front/type_user/User_About.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/front/type_user/User_Contact.vue')
      }
    ]

  },
  {
    //* 後台路由
    path: '/',
    component: () => import('@/views/dashboard/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/dashboard/Admin_CheckLogin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/dashboard/type_products/Admin_Products.vue')
      },
      {
        path: 'coupon',
        component: () => import('@/views/dashboard/type_order/Admin_Coupon.vue')
      },
      {
        path: 'order',
        component: () => import('@/views/dashboard/type_order/Admin_Order.vue')
      }
    ]
  },
  { //* 代表所有 user 下的頁面，路由錯誤都會被導向
    path: '/user/:pathMatch(.*)*',
    redirect: '/user/home'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({

  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.fullPath.match('/user')) {
      return {
        top: 0 //* 切換頁面時會切換到最上面的位置
      }
    }
    return {}
  }
})

export default router
