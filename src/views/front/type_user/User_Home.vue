<template>

<!-- 輪播 banner-main -->
<carouselMain></carouselMain>

  <div class=" mb-5 ">
    <div class="container">
    </div>
  </div>
  <div class="container">
    <h2 class="text-center mb-5"> 這是一群大學生，勇敢追夢的故事 - </h2>
    <div class="row row-cols-1 row-cols-lg-2 mb-3">
      <div class="col">
        <div class="banner-vertical-main mb-5 mb-lg-0 img-fluid">
          <ul class="list-unstyled vertical-main-text">
            <li>一群來自桃園的大學生們，</li>
            <li>離鄉背景來到新北打拼，</li>
            <li>來到這陌生的城市，</li>
            <li class="mb-2">他們靠著滿腔熱血，征服了夢想..</li>
            <li class="text-center">
                <router-link class="btn btn-outline-primary rounded-pill animation_hover fs-5" to="/user/about" title="查看品牌故事"  @click="current('about')">想聽他們的故事</router-link>
            </li>
          </ul>
        </div>
        <div class="text-center">
          <img src="@/assets/imageUrl/banner/Tv2V32Kjxb.png" alt="巧克力蛋糕" class="square-main">
        </div>
      </div>
      <div class="col d-flex flex-column flex-lg-column-reverse">

        <div class="banner-vertical-secondary img-fluid">
          <ul class="list-unstyled vertical-secondary-text">
            <li>我相信努力不會白費，</li>
            <li>就算將來的某一天我不得不放棄這個夢想，</li>
            <li>那我也不顧一切的為其努力過了，</li>
            <li>有這些就足夠了，</li>
            <li>心中也不會有遺憾。</li>
          </ul>
        </div>
        <div class="text-center ">
            <img src="@/assets/imageUrl/banner/t6vJJ5xCcQ.png" alt="banner 圖片" class="square-secondary img-fluid">
        </div>
      </div>
    </div>
    <h2 class="text-center mb-5">用甜點，抓住你的胃 - </h2>
    <!-- 輪播 -->
    <div class="d-flex mb-5">
        <carouselSecondary></carouselSecondary>
        <div class="my-auto">
            <h3 class="mb-3">實在是忍不住了...</h3>
            <router-link to="/user/products" class="btn btn-outline-primary rounded-pill animation_hover fs-5" @click="current('productList')">
                現在，就想吃。
            </router-link>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/front/user/_Home.scss";
</style>

<script>
import emitter from '@/utils/emitter.js'
import carouselMain from '@/components/front/carousel/Carousel_Main.vue'
import carouselSecondary from '@/components/front/carousel/Carousel_Secondary.vue'
export default {
  components: {
    carouselMain,
    carouselSecondary
  },
  methods: {
    //* Navbar 的 active 效果
    current (page) {
      emitter.emit('currentPage', page)
    }
  }
}
</script>
