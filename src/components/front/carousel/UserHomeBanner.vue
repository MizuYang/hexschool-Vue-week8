<template>
  <div
    id="carouselExampleControls"
    class="carousel slide banner-carousel-main"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active banner-main-1 img-fluid" data-bs-interval="2500">
        <div class="banner-text">
          <h2>❝ 最意想不到的...</h2>
          <h2 class="ms-9 mb-4">永遠最甜蜜 ❞</h2>
          <div>
            <router-link
              to="/user/products"
              class="btn btn-outline-primary fs-4 animation_hover animation_active fingerRelative btnActive"
              @click="(this.emitter.emit('currentPage', 'productList'))"
              >前往商品<i class="bi bi-hand-index finger fingerActiveAnimation"></i></router-link
            >
          </div>
        </div>
      </div>
      <div class="carousel-item banner-main-2 img-fluid" data-bs-interval="2500">
        <div class="banner-text">
          <h2>❝ 最意想不到的...</h2>
          <h2 class="ms-9 mb-4">永遠最甜蜜 ❞</h2>
          <div>
            <router-link
              to="/user/products"
              class="btn btn-outline-primary fs-4 animation_hover animation_active fingerRelative btnActive"
              @click="(this.emitter.emit('currentPage', 'productList'))"
              >前往商品<i class="bi bi-hand-index finger fingerActiveAnimation"></i></router-link
            >
          </div>
        </div>
      </div>
      <div class="carousel-item banner-main-3 img-fluid" data-bs-interval="2500">
        <div class="banner-text">
          <h2>❝ 最意想不到的...</h2>
          <h2 class="ms-9 mb-4">永遠最甜蜜 ❞</h2>
          <div>
            <router-link
              to="/user/products"
              class="btn btn-outline-primary fs-4 animation_hover animation_active fingerRelative btnActive"
              @click="(this.emitter.emit('currentPage', 'productList'))"
              >前往商品<i class="bi bi-hand-index finger fingerActiveAnimation"></i></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  inject: ['emitter']
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import '@/assets/stylesheets/helpers/front/user/_UserHomeBanner.scss';
</style>
