<template>
  <div class="container">
      <h3 class="text-center border-bottom pb-2 mb-5">猜你會喜歡...</h3>
    <Swiper
      ref="swiper"
      :slides-per-view="3"
      :space-between="25"
      :modules="modules"
      :slidesPerView="slidesPerView"
      :loop="true"
      class="swiper-slide"
      data-swiper-autoplay="2000"
      :free-mode="true"
      :speed="3000"
      :autoplay="{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :breakpoints="{
        '0': {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        '576': {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        '768': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '992': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '1200': {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        '1400': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }"
    >
      <Swiper-slide v-for="products in products" :key="products.id">
        <div class="overflow-hidden">
          <a
            href="#"
            @click.prevent="viewProduct(products.id)"
            class="text-decoration-none"
          >
            <div
              class="img-fluid products_img"
              :style="{ backgroundImage: `url(${products.imageUrl})` }"
            >
              <p class="badge text-primary bg-danger tag">精選產品</p>
              <img
                class="product_info img-fluid"
                alt="顯示產品細節"
                src="@/assets/imageUrl/images/product_info.png"
              />
              <div class="d-flex justify-content-center align-items-end h-100">
                <p
                  class="badge"
                  style="background-color: rgba(168, 90, 0, 0.562)"
                >
                  {{ products.title }}
                </p>
              </div>
            </div>
          </a>
        </div>
        <button
          type="button"
          class="btn btn-danger w-100 fs-5 animation_hover animation_active"
          @click="addCart(`${products.id}`)"
        >
          <i class="bi bi-cart4 me-2"></i>加入購物車
        </button>
      </Swiper-slide>
    </Swiper>
    <Loading v-model:active="isLoading">
      <div class="cssload-container">
        <div class="cssload-dot"></div>
        <div class="step" id="cssload-s1"></div>
        <div class="step" id="cssload-s2"></div>
        <div class="step" id="cssload-s3"></div>
      </div>
    </Loading>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js'
import { Autoplay, FreeMode } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.min.css'
export default {
  inject: ['emitter'],

  props: ['product', 'cartData'], //* 單一產品 、 購物車列表 做篩選讓輪播不重複

  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      tempProducts: [],
      products: [], //* 所有產品
      carts: [],
      filterProduct_index: [], //* 篩選出單一產品的品項
      filterCart_index: [], //* 篩選購物車
      modules: [Autoplay, FreeMode],
      slidesPerView: 4,
      isLoading: false,
      add_product_Data: {
        product_id: '',
        qty: 1
      }
    }
  },

  methods: {
    getProducts () {
      //* 只有第一次會抓 API 資料，之後都是用 tempProducts 這個暫存的資料
      if (this.tempProducts.length === 0) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        this.$http.get(api).then((res) => {
          this.products = res.data.products
          this.tempProducts = res.data.products
        })
      }
      setTimeout(() => {
        //* 單一產品頁面 、 購物車頁面 各自篩選的方法
        const path = this.$route.path
        if (path === '/user/cart') {
          this.filterCarts()
        } else {
          this.filterOneProduct()
        }
      }, 1500)
    },
    filterOneProduct () {
      if (this.product) {
        this.filterProduct_index = this.products.findIndex((item) => {
          return item.id === this.product.id
        })
        this.products.splice(this.filterProduct_index, 1)
      }
    },
    filterCarts () {
      if (this.cartData.length >= 1 && this.cartData.length <= 15) {
        this.cartData.forEach((cartProduct) => {
          this.products = this.products.filter((product) => {
            return product.id !== cartProduct.product_id
          })
        })
      } else {
        this.products = this.tempProducts
      }
    },
    viewProduct (id) {
      this.$router.push('/user/products')
      setTimeout(() => {
        this.$router.push(`/user/one_product/${id}`)
      })
    },
    addCart (id) {
      this.isLoading = true
      this.add_product_Data.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.add_product_Data }).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '加入購物車')
        this.emitter.emit('get_cart') //*  Navbar更新
        this.$emit('getCartList')
        this.getProducts()
      })
    }
  },

  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/front/_swiperMixins.scss";
</style>
