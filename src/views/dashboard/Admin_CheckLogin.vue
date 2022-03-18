<template>
<div  v-if="status">
    <navbar></navbar>
    <router-view></router-view>
</div>
</template>

<script>
import navbar from '@/components/layout/dashboard/Dashboard_NavBar.vue'
export default {
  components: {
    navbar
  },
  data () {
    return {
      status: false
    }
  },
  methods: {
    //* 登入驗證
    checkLogin () {
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
            this.status = true
            //* 確認登入後推送到產品頁
            this.$router.push('/admin/products')
          })
          .catch(() => {
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
