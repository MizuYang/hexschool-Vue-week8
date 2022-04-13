<template>
  <UserHomeBanner />
  <div class="container">
    <div data-aos="fade-right" data-aos-duration="800">
      <h2 class="text-center my-5">這是一群大學生，勇敢追夢的故事 -</h2>
    </div>
    <div class="row row-cols-1 row-cols-lg-2 mb-3">
      <div class="col">
        <div class="banner-vertical-main mb-5 mb-lg-0 img-fluid">
          <ul class="list-unstyled vertical-main-text">
            <div
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              data-aos-duration="700"
            >
              <li><p>一群來自桃園的大學生們</p></li>
              <li><p>離鄉背景來到新北打拼</p></li>
              <li><p>來到這陌生的城市</p></li>
              <li class="mb-2"><p>他們靠著滿腔熱血，征服了夢想...</p></li>
              <li class="text-center">
                <router-link
                  class="
                    btn btn-outline-primary
                    animation_hover
                    fs-5
                    mb-2
                  "
                  to="/about"
                  title="查看品牌故事"
                  @click="currentPage('about')"
                  >想聽他們的故事</router-link
                >
              </li>
            </div>
          </ul>
        </div>
        <div class="text-center img-fluid square-main row" @click="toProductsCategory('蛋糕')">
          <p class="d-flex align-items-end justify-content-center mb-4">
            <span class="badge fs-5"  data-aos="fade-right" data-aos-duration="5500">「招牌」草莓酥</span>
            <span class="badge hoverShowText">前往經典蛋糕</span>
          </p>
        </div>
      </div>
      <div class="col d-flex flex-column flex-lg-column-reverse">
        <div class="banner-vertical-secondary img-fluid">
          <ul class="list-unstyled vertical-secondary-text">
            <div data-aos="flip-right" data-aos-duration="4000">
              <li><p>我相信努力不會白費</p></li>
              <li><p>就算將來的某一天我不得不放棄這個夢想</p></li>
              <li><p>那我也不顧一切的為其努力過了</p></li>
              <li><p>有這些就足夠了</p></li>
              <li><p>心中也不會有遺憾</p></li>
            </div>
          </ul>
        </div>
        <div class="square-secondary img-fluid" @click="toProductsCategory('熱門商品')">
          <p class="mt-5 ms-5"><span class="badge fs-5" data-aos="fade-left" data-aos-duration="5000">烤奶油堅果塔</span></p>
          <span class="badge hoverShowText">前往熱門產品</span>
        </div>
      </div>
    </div>
    <div data-aos="zoom-out">
      <h2 class="text-center mb-5">用甜點，抓住你的胃 -</h2>
    </div>
      <PopularProductsSwiper></PopularProductsSwiper>
      <div class="text-center my-5" >
        <div data-aos="zoom-out">
            <h3 class="mb-5">實在是忍不住了...</h3>
        </div>
       <div class="d-flex align-items-center justify-content-center">
          <i class="bi bi-arrow-right fs-2 me-4 arrowLeft arrowMoveLeft"></i>
          <router-link
          to="/products"
          class="btn btn-outline-primary  animation_hover fs-5 relative animationHightLight"
          @click="currentPage('products')"
          >
            現在，就想吃
          </router-link>
          <i class="bi bi-arrow-left fs-2 ms-4 arrowRight arrowMoveRight"></i>
       </div>
      </div>
    </div>
    <h3 class="text-center border-bottom pb-2 mb-3">產品類別</h3>
  <div class="card_container">
    <div class="cake_container">
      <CakeSwiper />
    </div>
    <div class="pudding_container">
      <PuddingSwiper />
    </div>
    <div class="profiterole_container">
      <ProfiteroleSwiper />
    </div>
  </div>
<div class="container text-center mb-5">
    <router-link
        to="/products"
        class="btn btn-outline-primary animation_hover fs-5"
        @click="currentPage('products')"
      >
        <i class="bi bi-shop"></i> 查看所有產品
    </router-link>
</div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import UserHomeBanner from '@/components/front/carousel/UserHomeBanner.vue'
import PuddingSwiper from '@/components/front/swiper/PuddingSwiper.vue'
import ProfiteroleSwiper from '@/components/front/swiper/ProfiteroleSwiper.vue'
import CakeSwiper from '@/components/front/swiper/CakeSwiper.vue'
import PopularProductsSwiper from '@/components/front/swiper/PopularProductsSwiper.vue'
export default {
  components: {
    UserHomeBanner,
    PuddingSwiper,
    ProfiteroleSwiper,
    CakeSwiper,
    PopularProductsSwiper
  },

  methods: {
    //* Navbar 的 active 效果
    currentPage (page) {
      emitter.emit('currentPage', page)
    },
    toProductsCategory (category) {
      this.$router.push('/products')
      setTimeout(() => {
        emitter.emit('toProductsCategory', category)
        emitter.emit('currentPage', 'products')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/user/_User_Home.scss";
</style>
