<template>
<div class="container mt-10">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">收藏清單</span>
    </h2>
<!-- 有收藏資料才顯示 -->
    <template v-if="collectData.length > 0">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5 ">
        <div class="card text-primary bg-dark col mb-md-4"  v-for="(product, index) in collectData" :key="product.id">
            <router-link  :to="`/user/one_product/${product[0].id}`" class="product_img card-img-top animation_hover d-block text-decoration-none img-fluid" title="查看產品細節"
            :style="{backgroundImage: `url(${product[0].imageUrl}) `}">
         <img class="product_info img-fluid" alt="顯示產品細節" src="@/assets/imageUrl/images/product_info.png">
            <span class="badge bg-danger p-1"  v-if="product[0].popular > 2">熱門商品</span>
            </router-link>
            <button type="button" class=" d-block animation_hover like_btn fs-3" title="點擊移除收藏" @click="delete_collect(product[0].id, index)">
                <i class="bi bi-heart-fill" v-if="collect.includes(product[0].id)"></i>
                <i class="bi bi-heartbreak-fill" v-if="(!collect.includes(product[0].id))"></i>
            </button>
            <div class="card-body">
                <div class="">
                    <h5 class="card-title fs-4 text-center border-bottom ">{{  product[0].title }}</h5>
                </div>
                <div class="d-flex justify-content-between align-items-end mb-3">
                    <del style="opacity: .8;">原價 {{ product[0].origin_price }} 元</del>
                    <strong>優惠價<u class="text-danger text-end fs-4"> {{product[0].price}} </u>元</strong>
                </div>
                <button type="button" class="btn btn-danger text-white w-100  d-block addCart animation_hover animation_active  fs-5" title="將收藏產品加入購物車"
                 @click="addCart(product[0].id)">
                    <i class="bi bi-cart-check-fill fs-5"></i>
                         加入購物車
                </button>
            </div>
        </div>
    </div>
    </template>
    <template v-else>
      <img src="@/assets/imageUrl/banner/NkpH1t32cK.png" alt="您目前沒有收藏產品，此為 banner 圖片" class="banner img-fluid">
      <div class="text-center">
        <h3 class=" mb-5 subtitle">您目前沒有收藏的商品</h3>
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
            @click="this.$router.push('/user/products')"
          >
            <i class="bi bi-cart-check-fill"></i>
            返回購物
    </button>
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
      collect: [], //* 裝 localstorage 產品ID
      collectData: [], //* 裝收藏產品
      products: [], //* 所有產品列表，做篩選用
      add_product_Data: { //* 先定義加入購物車資料
        product_id: '',
        qty: 1
      },
      isLoading: false
    }
  },
  methods: {
    //* 取得產品
    get_products (status) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.products = res.data.products
        if (status === 'delete_collect') {
          return
        }
        this.get_collet_product() //* 取得產品的同時，也取得收藏產品
      })
    },
    //* 取得收藏商品
    get_collet_product () {
      this.collect = JSON.parse(localStorage.getItem('collect')) || [] //* 如果 localstorage 沒資料就是空陣列
      this.collect.forEach((item) => {
        this.collectData.push(this.products.filter((product) => {
          return product.id === item
        }))
      })
      this.emitter.emit('get_collect', this.collect) //* 請 navbar 更新收藏產品資料
    },
    //* 加入購物車
    addCart (id) {
      this.isLoading = true
      this.add_product_Data.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .post(api, { data: this.add_product_Data })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '加入購物車')
          this.emitter.emit('get_cart') //* 請 Navbar更新數字
        })
    },
    //* 收藏清單
    delete_collect (id, index) {
      const collectIndex = this.collect.findIndex((item) => {
        return id === item
      })
      if (collectIndex === -1) {
        this.collect.push(id)
        localStorage.setItem('collect', JSON.stringify(this.collect))
        this.$httpMessageState(true, '加入收藏')
        this.emitter.emit('get_collect', this.collect) //* 請 navbar 更新收藏產品資料
      } else {
        this.collect.splice(collectIndex, 1)
        localStorage.setItem('collect', JSON.stringify(this.collect))
        this.emitter.emit('get_collect', this.collect) //* 請 navbar 更新收藏產品資料
      }
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_mixin.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import '@/assets/stylesheets/helpers/front/product/_Products.scss';
@import '@/assets/stylesheets/helpers/front/product/_Collect_Products.scss';
@import "@/assets/stylesheets/helpers/loading_css.scss"; //* loading CSS
.card-body{
    border-bottom: 0.1rem solid rgba(170, 1, 1, 0.678);
}
</style>
