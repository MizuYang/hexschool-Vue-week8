<template>
  <div class="container mt-9 mt-md-10 mb-5">
    <h2 class="title text-center mb-5 ">
      <span class="decorate"> <span class="">{{ product.title }}</span> </span>
    </h2>
    <div class="row">
      <div class="col-12 col-lg-7 d-flex">
        <img
          :src="product.imageUrl"
          alt="產品圖片"
          class="img-fluid product_img"
        />
      </div>
      <div class="col-lg-5 card bg-dark">
        <ul class="list-unstyled mt-3 card-body">
          <li>
            <h3 class="fs-3 fw-bold border-bottom">{{ product.title }}</h3>
          </li>
          <li class="mb-2">
            <span class="fw-bold"> 類別： </span>
            <span class="badge bg-primary text-dark p-1 me-2">{{
              product.category
            }}</span>
            <span class="badge bg-danger p-1" v-if="product.popular > 2"
              >熱門商品</span
            >
          </li>
          <li class="mb-2">
            <span class="fw-bold">
              推薦程度：
              <template v-if="product.popular == 1">
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
                <i class="bi bi-heart-fill ms-2"></i>
                <i class="bi bi-heart-fill ms-2"></i>
              </template>
              <template v-if="product.popular == 2">
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
                <i class="bi bi-heart-fill ms-2"></i>
              </template>
              <template v-if="product.popular == 3">
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
                <i class="bi bi-heart-fill ms-2 text-danger"></i>
              </template>
            </span>
          </li>
          <li>
            <span class="fw-bold"> 產品描述： </span>
            <p>{{ product.description }}</p>
          </li>
          <li>
            <div class="d-flex justify-content-between align-items-center">
              <del style="opacity: 0.8" class="rwdHide me-3">原價 {{ product.origin_price }} 元</del>
              <strong class="me-auto fs-3"
                ><span class="text-danger fs-3 mb-auto">
                  {{ product.price }} </span
                >元</strong>
                <input type="button" class="btn productsQtyBtn btn-outline-primary"
                  value="－" :disabled="addProductData.qty <= 1" @click="addProductData.qty -= 1"/>
                <input type="number" class="productQtyText text-center" readonly  v-model="addProductData.qty">
                <input
                    type="button"
                    class="btn productsQtyBtn btn-outline-primary"
                    value="＋" @click="addProductData.qty += 1"
                    />
            </div>
          </li>
        </ul>
        <div class="card-foot">
          <div class="d-flex justify-content-between align-items-end">
            <button
              type="button"
              class="
                btn btn-outline-primary
                send-btn
                active_bigger
                fs-4
                animation_hover
              "
              title="返回產品列表"
              @click="$router.go(-1)"
            >
              <i class="bi bi-door-open"></i>
              返回
            </button>

            <button
              type="button"
              class="ms-auto btn btn-danger active_bigger fs-4 animation_hover"
              title="結帳"
              @click="addCart(product.id)"
            >
              <i class="bi bi-cart4"></i>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SwiperCartOneProduct :product="product" class="mb-5" />
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
import SwiperCartOneProduct from '@/components/front/swiper/SwiperCartOneProduct.vue'
export default {
  components: {
    SwiperCartOneProduct
  },

  inject: ['emitter'],

  data () {
    return {
      product: [],
      addProductData: {
        product_id: '',
        qty: 1
      },
      isLoading: false
    }
  },

  methods: {
    getProducts () {
      this.isLoading = true
      const id = this.$route.params.id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.product = res.data.product
      })
    },
    addCart (id) {
      this.isLoading = true
      this.addProductData.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.addProductData }).then((res) => {
        this.isLoading = false
        this.addProductData.qty = 1
        this.$httpMessageState(res.data.success, '加入購物車')
        this.emitter.emit('get_cart') //*  Navbar更新
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
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/front/product/_User_One_Product.scss";
</style>
