<template>
  <navbar></navbar>
  <div class="container  mx-auto  border p-5 ">
    <form class="" @submit.prevent="signIn">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            v-model="user.username"
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="mt-4">
          <button class="btn btn-lg btn-outline-primary btn-block w-50" type="submit">
            登入
          </button>
          <button class="btn btn-lg btn-outline-primary btn-block  w-50" type="submit">
            取消
          </button>
        </div>
    </form>
  </div>
  <div
    class="img-fluid banner"

  ></div>
  <footerLogin></footerLogin>
   <Loading v-model:active="isLoading" />
</template>
<script>
import navbar from '@/components/dashboard/layout/Login.NavBar.vue'
import footerLogin from '@/components/front/layout/FrontFooter.vue' //* 使用前台的 footer
export default {
  components: {
    navbar,
    footerLogin
  },
  data () {
    return {
      user: {},
      isLoading: false
    }
  },
  methods: {
    //* 登入帳號
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
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
.banner::before {
  background-image: url(https://github.com/MizuYang/hexschool-Vue-week8/blob/main/src/assets/imageUrl/%E5%B0%88%E6%A1%88%E5%9C%96%E7%89%87/LOGO/LOGO_PNG_Big-removebg-preview.png?raw=true);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: calc(100%);
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: -1;
}
.container {
  @include xs{
    margin-top: 50%;
    margin-bottom: 10%;
    width: 90%;
  }
  @include sm{
    margin-top: 40%;
    margin-bottom: 10%;
    width: 100%;
  }
  @include md{
    width: 75%;
  }
  @include lg{
    width: 60%;
    margin-top: 30%;
  }
  @include xl{
    margin-top: 20%;
  }
  @media (min-width: 1401px) {
    margin-top: 10%;
    width: 30%;
    margin-bottom: 5%;
  }
}
</style>
