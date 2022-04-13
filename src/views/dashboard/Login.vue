<template>
  <LoginNavBar />
  <div class="container mx-auto border p-5 ">
    <form class="" @submit.prevent="signIn">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">帳號</label>
          <input
            v-model="user.username"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="請輸入您的帳號"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">密碼</label>
          <input
            v-model="user.password"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="請輸入您的密碼"
            required
          />
        </div>
        <div class="mt-4">
          <button class="btn btn-lg btn-outline-primary btn-block w-50" type="submit">
            登入
          </button>
          <button class="btn btn-lg btn-outline-primary btn-block  w-50" type="button" @click="$router.push('/')">
            取消
          </button>
        </div>
    </form>
  </div>
  <div class="img-fluid banner"></div>
  <FrontFooter />
<Loading v-model:active="isLoading">
    <div class="cssload-container">
      <div class="cssload-dot"></div>
      <div class="step" id="cssload-s1"></div>
      <div class="step" id="cssload-s2"></div>
      <div class="step" id="cssload-s3"></div>
    </div>
</Loading>
</template>

<script>
import LoginNavBar from '@/components/dashboard/layout/LoginNavBar.vue'
import FrontFooter from '@/components/front/layout/FrontFooter.vue' //* 使用前台的 footer
export default {
  components: {
    LoginNavBar,
    FrontFooter
  },

  data () {
    return {
      user: {},
      isLoading: false
    }
  },

  methods: {
    signIn () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/admin/signin`
      this.$http
        .post(api, this.user)
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '登入')
          //* token, expired 存入 cookie
          const { token, expired } = res.data
          document.cookie = `mizuToken=${token};expires=${new Date(expired)};`
          this.$router.push('/admin')
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.success, '登入')
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/dashboard/login/_Login.scss";
</style>
