<template>
<div  v-if="status">
    <DashboardNavBar />
    <router-view />
</div>
  <Loading v-model:active="isLoading" />
</template>

<script>
import DashboardNavBar from '@/components/dashboard/layout/DashboardNavBar.vue'
export default {
  components: {
    DashboardNavBar
  },

  data () {
    return {
      status: false,
      isLoading: false
    }
  },

  methods: {
    checkLogin () {
      const page = JSON.parse(localStorage.getItem('current_page')) || 'products'
      this.isLoading = true
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
            this.$router.push('/login')
          })
      }
    }
  },

  mounted () {
    this.checkLogin()
  }
}
</script>
