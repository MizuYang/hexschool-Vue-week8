<template>
  <div class="container text-center" v-if="swiperShow">
    <h3 class="badge fs-5 text-primary mb-4 "> <i class="bi bi-suit-heart-fill text-danger"></i> 熱門商品</h3>
    <Swiper
      ref="swiper"
      :slides-per-view="3"
      :space-between="25"
      :modules="modules"
      :pagination="{ clickable: true }"
      :slidesPerView="slidesPerView"
      :loop="true"
      class="swiper-slide"
      data-swiper-autoplay="2000"
      :autoplay="{
        delay: 1000,
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
      <Swiper-slide v-for="products in popular" :key="products.id">
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
              <p class="badge text-primary bg-danger tag">熱門產品</p>
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
  </div>
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
import SwiperMixins from '@/components/front/swiper/SwiperMixins.vue'
export default {
  mixins: [SwiperMixins],

  data () {
    return {
      productsData: [],
      products: [],
      popular: [],
      swiperShow: false
    }
  },

  methods: {
    filterPopular () {
      this.popular = this.products.filter((item) => item.popular >= 3)
      if (this.popular.length > 0) {
        this.swiperShow = true
      }
    }
  },

  mounted () {
    setTimeout(() => {
      this.filterPopular()
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/_swiperMixins.scss";
</style>
