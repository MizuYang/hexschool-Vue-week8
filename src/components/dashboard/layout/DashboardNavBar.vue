<template>
  <nav class="navbar navbar-expand-lg navbar-secondary bg-dark  fixed-top">
  <div class="container ">
      <router-link class="navbar-brand logo"  title="首頁" to="/user/home"><img src="https://github.com/MizuYang/hexschool-Vue-week8/blob/main/src/assets/imageUrl/%E5%B0%88%E6%A1%88%E5%9C%96%E7%89%87/LOGO/%E6%A9%AB%E5%90%91LOGO.png?raw=true" alt="小巷弄甜點的logo" width="130"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">
        <i class="bi bi-justify text-primary fs-1"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center text-center">
        <li class="nav-item">
          <router-link to="/user/home" class="nav-link home me-4" @click="currentPage('home')">
          <i class="bi bi-house-door"></i>
          前台</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link products me-4" @click="currentPage('products')">產品</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/order" class="nav-link order me-4" @click="currentPage('order')">訂單</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon" class="nav-link coupon me-4" @click="currentPage('coupon')">優惠券</router-link>
        </li>
        <li class="nav-item me-4">
          <button
              type="button"
              class="nav-link btn btn-lg"
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
export default {
  data () {
    return {
      page: ''
    }
  },

  methods: {
    currentPage (page) {
      if (this.page) {
        document.querySelector(`.${this.page}`).classList.remove('currentPage')
        this.page = ''
      }
      setTimeout(() => {
        document.querySelector(`.${page}`).classList.add('currentPage')
        this.page = page
      }, 500)
    },
    logOut () {
      const api = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(api)
        .then((res) => {
          this.$httpMessageState(res.data.success, '登出')
          //* 清除 cookie
          document.cookie = 'mizuToken=;expires=;'
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$httpMessageState(err.success, '登出')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.currentPage{
  border-bottom: 3px solid #F1EBD8;
}
</style>
