<template>
  <div class="container">
      <h3 class="text-center border-bottom pb-2 mb-5">猜你會喜歡...</h3>
    <swiper
      ref="swiper"
      :slides-per-view="3"
      :space-between="25"
      :modules="modules"
      navigation
      :pagination="{ clickable: true }"
      :slidesPerView="slidesPerView"
      :loop="true"
      class="swiper-slide"
      data-swiper-autoplay="2000"
      :autoplay="{
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :free-mode="true"
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
      <swiper-slide v-for="products in products" :key="products.id">
        <div class="overflow-hidden">
          <a
            href="#"
            @click.prevent="view_product(products.id)"
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
      </swiper-slide>
    </swiper>
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
import { Navigation, Autoplay } from 'swiper'
// Import Swiper styles
import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
export default {
  inject: ['emitter'],
  props: ['product', 'cartData'], //* 單一產品 、 購物車列表 做篩選讓輪播不重複
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      productsData: [],
      products: [], //* 所有產品
      carts: [],
      filterProduct_index: [], //* 篩選出單一產品的品項
      filterCart_index: [], //* 篩選購物車
      modules: [Navigation, Autoplay], //* swiper
      slidesPerView: 4,
      isLoading: false,
      add_product_Data: {
        product_id: '',
        qty: 1
      }
    }
  },
  methods: {
    //* 取得產品
    getProducts () {
      //* 只有第一次會抓 API 資料，之後都是用 productsData 這個暫存的資料
      if (this.productsData.length === 0) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        this.$http.get(api).then((res) => {
          this.products = res.data.products
          this.productsData = res.data.products
        })
      }
      setTimeout(() => {
        //* 單一產品頁面 、 購物車頁面 各自篩選的方法
        const path = this.$route.path
        if (path === '/user/cart') {
          this.filter_carts()
        } else {
          this.filter_products()
        }
      }, 1500)
    },
    //* 輪播不重複顯示 單一產品，所以先塞選出來刪掉，有單一產品才篩選
    filter_products () {
      if (this.product) {
        //* 先找出索引位置
        this.filterProduct_index = this.products.findIndex((item) => {
          return item.id === this.product.id
        })
        //* 拿到索引位置後，刪除該品項，就可以用此 data 去渲染 swiper
        this.products.splice(this.filterProduct_index, 1)
      }
    },
    //* 輪播不重複顯示購物車已有產品
    filter_carts () {
      //* 如果購物車東西超過 15 個就初始化輪播顯示的產品
      if (this.cartData.length >= 1 && this.cartData.length <= 15) {
        this.cartData.forEach((cartProduct) => {
          this.products = this.products.filter((product) => {
            return product.id !== cartProduct.product_id
          })
        })
      } else {
        this.products = this.productsData
      }
    },

    //* 點輪播圖片可以看其他單一產品
    view_product (id) {
      this.$router.push('/user/products')
      setTimeout(() => {
        this.$router.push(`/user/one_product/${id}`)
      })
    },
    //* 加入購物車
    addCart (id) {
      this.isLoading = true
      this.add_product_Data.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.add_product_Data }).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '加入購物車')
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$emit('getCartList') //* 購物車刷新
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
@import "@/assets/stylesheets/helpers/_mixin.scss";
@import "@/assets/stylesheets/helpers/loading_css.scss"; //* loading CSS
@import "@/assets/stylesheets/helpers/front/_swiper_mixins.scss";
</style>
