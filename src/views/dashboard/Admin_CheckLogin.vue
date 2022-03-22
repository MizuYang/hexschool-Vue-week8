<template>
<div  v-if="status">
    <navbar></navbar>
    <router-view></router-view>
</div>
  <Loading v-model:active="isLoading" />
</template>

<script>
import navbar from '@/components/dashboard/layout/Dashboard_NavBar.vue'
export default {
  components: {
    navbar
  },
  data () {
    return {
      status: false,
      isLoading: false
    }
  },
  methods: {
    //* 登入驗證
    checkLogin () {
      const page = JSON.parse(localStorage.getItem('current_page')) || 'products' //* 跳轉到上一個頁面或產品頁面
      this.isLoading = true
      //* 將儲存在 cookie 的 token 取出
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)mizuToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = token
        const api = `${process.env.VUE_APP_API}/api/user/check`
        this.$http
          .post(api)
          .then(() => {
            this.isLoading = false
            this.status = true
            this.$router.push(`/admin/${page}`)
          })
          .catch(() => {
            this.isLoading = false
            this.$router.push('/')
          })
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
