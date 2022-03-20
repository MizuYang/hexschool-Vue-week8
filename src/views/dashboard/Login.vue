<template>
  <navbar></navbar>
  <div class="container border p-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class=" col-md-6">
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
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
  <img
    src="@/assets/imageUrl/images/LOGO_PNG_Big-removebg-preview.png"
    class="img-fluid banner"
    alt="背景LOGO圖"
  />
  <footerLogin></footerLogin>
</template>
<script>
import navbar from '@/components/dashboard/layout/Login.NavBar.vue'
import footerLogin from '@/components/front/layout/Front_Footer.vue' //* 使用前台的 footer
export default {
  components: {
    navbar,
    footerLogin
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    //* 登入帳號
    signIn () {
      const api = `${process.env.VUE_APP_API}/admin/signin`
      this.$http
        .post(api, this.user)
        .then((res) => {
          alert(res.data.message)
          //* token, expired 存入 cookie
          const { token, expired } = res.data
          document.cookie = `mizuToken=${token};expires=${new Date(expired)};`
          this.$router.push('/admin')
        })
        .catch((err) => {
          alert(err.response.data.message)
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 30%;
  height: calc(100vh);
  opacity: 0.2;
  z-index: -1;
    @media (max-width:1400px) {
    &{
      width: 50rem;
      left: 20%;
    }
  }
  @media (max-width:992px) {
    &{
      // width: 50rem;
      left: 10%;
    }
  }
    @media (max-width:768px) {
    &{
      width: 40rem;
      height: 40rem;
      top: 15%;
    }
  }
}
.container {
  margin-top: 10%;
  margin-bottom: 5%;
  @media (max-width: 1400px) {
    & {
      margin-top: 15%;
    }
  }
  @media (max-width: 992px) {
    & {
      margin-top: 25%;
    }
  }
    @media (max-width: 768px) {
    & {
      margin-top: 35%;
    }
  }
}
</style>
