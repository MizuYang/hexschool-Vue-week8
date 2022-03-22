<template>
<!-- bg-secondary -->
  <nav class="navbar navbar-expand-lg navbar-secondary bg-dark  fixed-top">
  <div class="container ">
      <router-link class="navbar-brand logo"  title="首頁" to="/user/home"><img src="@/assets/imageUrl/images/LOGO_PNG_Big-removebg-preview.png" alt="小巷弄甜點的logo" width="130"></router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">
        <i class="bi bi-justify text-primary fs-1"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center text-center">
        <li class="nav-item">
          <router-link to="/user/home" class="nav-link home" @click="current_page('home')">
          <i class="bi bi-house-door"></i>
          前台</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link products" @click="current_page('products')">產品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/order" class="nav-link order" @click="current_page('order')">訂單</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon" class="nav-link coupon" @click="current_page('coupon')">優惠券</router-link>
        </li>
        <li class="nav-item">
          <button
              type="button"
              class="nav-link  btn fs-5"
              @click="logOut"
            >
              登出
            </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import emitter from '@/utils/emitter.js'
export default {
  data () {
    return {
      page: ''
    }
  },
  methods: {
    //* 切換頁面會凸顯當前頁面
    current_page (page) {
      if (this.page) {
        document.querySelector(`.${this.page}`).classList.remove('current_page')
        this.page = ''
      }
      setTimeout(() => {
        document.querySelector(`.${page}`).classList.add('current_page')
        this.page = page
      }, 500)
    },
    //* 登出
    logOut () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(api)
        .then((res) => {
          this.$httpMessageState(res.data.success, '登出')
          //* 清除 cookie
          document.cookie = 'mizuToken=;expires=;'
          this.$router.push('/')
        })
        .catch((err) => {
          this.$httpMessageState(err.success, '登出')
        })
    }
  },
  mounted () {
    //* navbar active 效果 => /user/home頁面
    emitter.on('currentPage', (page) => {
      setTimeout(() => {
        this.current_page(page)
      })
    })
  }
}
</script>
