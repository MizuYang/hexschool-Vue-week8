import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    //* 前台路由
    path: '/',
    component: () => import('@/views/front/User_Main.vue'),
    children: [
      {
        path: '',
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
        component: () => import('@/views/front/type_products/User_Collect_Products.vue')
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
        component: () => import('@/views/front/type_order/User_Order_Confirm.vue')
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
        path: 'sendMessage',
        component: () => import('@/views/front/type_user/User_sendMessage.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/front/type_user/User_About.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/front/type_user/User_Contact.vue')
      },
      {
        path: 'query_order',
        component: () => import('@/views/front/type_order/User_OrderQuery.vue')
      }
    ]
  },
  {
    //* 後台路由
    path: '/login',
    component: () => import('@/views/dashboard/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/dashboard/Admin_CheckLogin.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
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
  { //* 代表所有主頁面下的頁面，路由錯誤都會被導向
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'products' }
  }
]

const router = createRouter({

  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.fullPath.match('/')) {
      return {
        top: 0 //* 切換頁面時會切換到最上面的位置
      }
    }
    return {}
  }
})

export default router
