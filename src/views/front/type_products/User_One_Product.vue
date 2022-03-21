<template>
  <div class="container mt-10 mb-4">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">{{ product.title }}</span>
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
            <div class="d-flex justify-content-between align-items-end">
              <del style="opacity: 0.8">原價 {{ product.origin_price }} 元</del>
              <strong class="ms-auto fs-3"
                >優惠價<span class="text-danger fs-3 mb-auto">
                  {{ product.price }} </span
                >元</strong
              >
            </div>
          </li>
        </ul>
        <div class="card-foot">
          <div class="d-flex justify-content-between align-items-end">
            <button
              type="submit"
              class="
                btn btn-outline-primary
                send-btn
                active_bigger
                fs-4
                animation_hover
              "
              title="返回產品列表"
              @click="$router.push('/user/products')"
            >
              <i class="bi bi-door-open"></i>
              返回購物
            </button>

            <button
              type="submit"
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
   <Loading v-model:active="isLoading" />
</template>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      product: [],
      add_product_Data: {
        product_id: '',
        qty: 1
      },
      isLoading: false
    }
  },
  methods: {
    //* 取得產品
    get_products () {
      this.isLoading = true
      const id = this.$route.params.id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.product = res.data.product
      })
    },
    //* 加入購物車
    addCart (id) {
      this.isLoading = true
      this.add_product_Data.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.add_product_Data }).then((res) => {
        this.isLoading = false
        alert(res.data.message)
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
      })
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/product/_One_Product.scss";
</style>
