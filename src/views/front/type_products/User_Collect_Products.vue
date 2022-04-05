<template>
<div class="container collect mt-8 mt-sm-10 ">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">收藏清單</span>
    </h2>
    <template v-if="collectData.length > 0">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5">
        <div class="card text-primary bg-dark col mb-md-4"  v-for="(product, index) in collectData" :key="product.id">
            <router-link  :to="`/user/one_product/${product[0].id}`" class="product_img card-img-top animation_hover d-block text-decoration-none img-fluid" title="查看產品細節"
            :style="{ backgroundImage: `url(${product[0].imageUrl})` }">
            <img class="product_info img-fluid" alt="顯示產品細節" src="@/assets/imageUrl/images/product_info.png">
            <span class="badge bg-danger p-1"  v-if="product[0].popular > 2">熱門商品</span>
            <button type="button" class=" d-block animation_hover collect_btn" :class="`collect_btn${index}`" title="點擊移除收藏" @click.prevent="toggleCollect(product[0].id, index)">
                <i class="bi bi-heart-fill fs-5" v-if="collectIdData.includes(product[0].id)"></i>
                <i class="bi bi-heartbreak-fill fs-5 text-primary" v-if="(!collectIdData.includes(product[0].id))"></i>
                <i class="bi bi-heart-fill heart" :class="`heart${index}`"></i>
                <i class="bi bi-heartbreak-fill heartbreak" :class="`heartbreak${index}`"></i>
            </button>
            </router-link>
            <div class="card-body mb-0">
                <div>
                    <h5 class="card-title fs-4 text-center ">{{ product[0].title }}</h5>
                </div>
                <div class="d-flex justify-content-between align-items-end mb-3">
                    <del style="opacity: .8;">原價 {{ product[0].origin_price }} 元</del>
                    <strong>優惠價<u class="text-danger text-end fs-4"> {{product[0].price}} </u>元</strong>
                </div>
                <button type="button" class="btn btn-danger text-white w-100 d-block addCart animation_hover animation_active fs-5" title="將收藏產品加入購物車"
                    @click="addCart(product[0].id)">
                    <i class="bi bi-cart-check-fill fs-5"></i>
                    加入購物車
                </button>
            </div>
        </div>
    </div>
    </template>
    <template v-else>
      <div class="banner banner img-fluid">
          <div class="text-center">
            <h3 class=" mb-5 subtitle pt-5">您目前沒有收藏的商品</h3>
            <p>如果有喜歡的商品，您可以點擊右上方的愛心，</p>
            <p>您的支持就是我們最大的動力，</p>
            <p>祝您購物愉快！</p>
            <button
                type="button"
                class="
                  btn btn-danger
                  text-white
                  animation_hover animation_active
                  fs-5
                  mb-10
                "
                title="返回購物"
                @click="$router.push('/user/products')"
              >
                <i class="bi bi-cart-check-fill"></i>
                返回購物
        </button>
          </div>
      </div>
    </template>
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
export default {
  inject: ['emitter'],

  data () {
    return {
      collectIdData: [], //* 裝 localStorage 產品ID
      collectData: [], //* 裝收藏產品
      tempCollectId: '',
      products: [], //* 所有產品列表，做篩選用
      tempProducts: [],
      addProductData: {
        product_id: '',
        qty: 1
      },
      isLoading: false,
      heart_disabled: 0
    }
  },

  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.products = res.data.products
        this.tempProducts = res.data.products
        this.getColletProduct()
      })
    },
    getColletProduct () {
      this.collectIdData = JSON.parse(localStorage.getItem('collectIdData')) || []
      this.collectIdData.forEach((item) => this.collectData.push(this.products.filter((product) => product.id === item)))
      this.emitter.emit('get_collect', this.collectIdData) //* Navbar 更新
    },
    addCart (id) {
      this.isLoading = true
      this.addProductData.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .post(api, { data: this.addProductData })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '加入購物車')
          this.emitter.emit('get_cart') //* Navbar更新
        })
    },
    toggleCollect (id, index) {
      this.heart_disabled += 1
      if (this.heart_disabled >= 2) {
        return
      }
      const collectBtn = document.querySelector(`.collect_btn${index}`)
      collectBtn.style.cursor = 'no-drop'
      const collectIndex = this.collectIdData.findIndex((item) => id === item)
      if (collectIndex === -1) {
        this.collectIdData.push(id)
        localStorage.setItem('collectIdData', JSON.stringify(this.collectIdData))
        this.$httpMessageState(true, '加入收藏')
        this.$collectAnimation(index)
        this.emitter.emit('get_collect', this.collectIdData) //* navbar 更新
      } else {
        this.collectIdData.splice(collectIndex, 1)
        localStorage.setItem('collectIdData', JSON.stringify(this.collectIdData))
        this.emitter.emit('get_collect', this.collectIdData) //* navbar 更新
        this.$cancelCollectAnimation(index)
      }
      setTimeout(() => {
        this.collectData = []
        this.products = this.tempProducts
        this.getColletProduct()
        collectBtn.style.cursor = 'pointer'
      }, 2000)
    }
  },

  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import '@/assets/stylesheets/helpers/front/product/_User_Products.scss';
@import '@/assets/stylesheets/helpers/front/product/_User_Collect_Products.scss';
</style>
