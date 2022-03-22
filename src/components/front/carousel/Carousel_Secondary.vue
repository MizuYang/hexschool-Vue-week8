<template>
    <div id="carouselExampleCaptions" class="carousel slide w-75 container mb-auto" data-bs-ride="carousel">
  <div class="carousel-indicators ">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="1500">
      <img src="@/assets/imageUrl/banner/pexels-photo-5900059.jpeg" class="d-block img-fluid w-100" alt="產品圖片">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="1500">
      <img src="@/assets/imageUrl/product/cELKT4DLtN.png" class="d-block img-fluid w-100" alt="產品圖片">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="1500">
      <img src="@/assets/imageUrl/product/l3VtdrrozG.png" class="d-block img-fluid w-100" alt="產品圖片">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    //* 取得產品
    get_products () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
      })
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>

<style lang="scss" scoped>
</style>
