<template>
  <!-- bg-secondary -->
  <nav class="navbar navbar-expand-lg navbar-secondary fixed-top">
    <div class="container">
      <router-link class="navbar-brand logo" title="首頁" to="/user/home"
        ><img
          src="@/assets/imageUrl/專案圖片/LOGO/橫向LOGO.png"
          alt="小巷弄甜點的logo"
          width="130"
        />
        <h1 class="title">小巷弄甜點_alley_dessert</h1></router-link>
        <router-link class="navbar-brand logo_RWD d-lg-none" title="首頁" to="/user/home"><i class="bi bi-house-door fs-1 ms-2"></i></router-link>
            <router-link
              to="/user/products"
              class="nav-link productList d-block d-lg-none"
              @click="current_page('productList')"
              ><i class="bi bi-shop fs-1"></i></router-link>

            <router-link
              to="/user/cart"
              class="nav-link cart position-relative d-block d-lg-none"
              @click="current_page('cart')"
              title="購物車">
              <span
                class="
                  position-absolute
                  top-75
                  end-0
                  translate-middle
                  badge
                  rounded-pill
                  bg-danger
                  cart_product_num
                ">
                {{ cartData.length }}
              </span>
              <i class="bi bi-cart4 fs-1"></i>
            </router-link>

            <router-link
              to="/user/favorite"
              class="nav-link favorite d-lg-none"
              @click="current_page('favorite')"
              title="收藏商品頁面">
            <span v-if="collect_data.length > 0">
              <i class="bi bi-heart-fill fs-3" style="color:red"></i>
            </span>
              <i class="bi bi-heart fs-3 collect_icon" v-else></i>
            </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="bi bi-justify text-primary fs-1"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="
            navbar-nav
            ms-auto align-items-lg-center text-center
          "
        >

          <li class="nav-item">
            <router-link
              to="/user/home"
              class="nav-link home me-4"
              @click="current_page('home')"
            >
              <i class="bi bi-house-door"></i>
              主頁</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/products"
              class="nav-link productList"
              @click="current_page('productList')"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/questions"
              class="nav-link qa"
              @click="current_page('qa')"
              >常見問題</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/about"
              class="nav-link about"
              @click="current_page('about')"
              >關於我們</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/contact"
              class="nav-link contact"
              @click="current_page('contact')"
              >聯絡我們</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/query_order"
              class="nav-link query_order"
              @click="current_page('query_order')"
              >查詢訂單</router-link
            >
          </li>
          <li class="nav-item me-4">
            <router-link
              to="/user/favorite"
              class="nav-link favorite"
              @click="current_page('favorite')"
              title="收藏商品頁面">
            <span v-if="collect_data.length > 0">
              <i class="bi bi-heart-fill fs-3" style="color:red"></i>
            </span>
              <i class="bi bi-heart fs-3 collect_icon" v-else></i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/user/cart"
              class="nav-link cart position-relative"
              @click="current_page('cart')"
              title="購物車"
            >
              <span
                class="
                  position-absolute
                  top-75
                  start-100
                  translate-middle
                  badge
                  rounded-pill
                  bg-danger
                  cart_product_num
                "
              >
                {{ cartData.length }}
              </span>
              <i class="bi bi-cart4 fs-3"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      page: '',
      cartData: [],
      collect_data: []
    }
  },
  methods: {
    //* 切換頁面會凸顯當前頁面
    current_page (page) {
      if (this.page) {
        document
          .querySelector(`.${this.page}`)
          .classList.remove('current_page')
        this.page = ''
      }
      setTimeout(() => {
        document.querySelector(`.${page}`).classList.add('current_page')
        this.page = page
      }, 500)
    },
    //* 取得購物車
    getCartList () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.cartData = res.data.data.carts
      })
    }
  },
  mounted () {
    this.getCartList()
    //* 新增或刪除產品時會重新更新產品數量 product、cart
    this.emitter.on('get_cart', () => {
      this.getCartList()
    })
    //* 切換頁面會凸顯當前頁面    home
    this.emitter.on('currentPage', (page) => {
      setTimeout(() => {
        this.current_page(page)
      })
    })
    //* 產品頁面 按收藏時，愛心會變化
    this.emitter.on('get_collect', (collectData) => {
      this.collect_data = collectData
    })
  },
  unmounted () {
    this.emitter.off('get_cart')
    this.emitter.off('currentPage')
    this.emitter.off('get_collect')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_mixin.scss";
@import "@/assets/stylesheets/helpers/front/layout/_NavBar.scss";
</style>
