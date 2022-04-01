<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate mt-5 mt-sm-6 mt-md-3">精選產品</span>
    </h2>
    <div class="row">
      <div
        v-if="!categoryToggle"
        class="
          mb-5
          d-flex
          col-12
          flex-lg-row
          col-lg-12 col-xl-8
          category">
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('全部')"
          :class="{ activeCategoryStatus : category['全部'] }">
          全部
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('蛋糕')"
          :class="{ activeCategoryStatus : category['蛋糕'] }">
          蛋糕
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('布丁')"
          :class="{ activeCategoryStatus : category['布丁'] }">
          布丁
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('泡芙')"
          :class="{ activeCategoryStatus : category['泡芙'] }">
          泡芙
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('舒芙蕾')"
          :class="{ activeCategoryStatus : category['舒芙蕾'] }">
          舒芙蕾
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="getProducts('熱門商品')"
          :class="{ activeCategoryStatus : category['熱門商品'] }">
          熱門商品
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active mt-md-0"
          @click="priceSort"
          :class="{ activeCategoryStatus : category['價格低到高'] }">
          <i class="bi bi-cash-coin"></i> ↓/↑
        </button>
      </div>
      <div class="text-end mb-sm-5 mb-3 search d-flex">
      <button type="button" class="btn btn-outline-primary hideTool" @click="categoryToggle=!categoryToggle">隱藏工具</button>
        <label for="searchText"><i class="bi bi-search me-2" v-if="!categoryToggle"></i></label>
        <input
          type="search"
          id="searchText"
          class="searchText"
          placeholder="輸入產品名稱"
          v-model="searchValue"
          @input="keywords" v-if="!categoryToggle" />
      </div>
    </div>
    <div class="card-group">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div
          class="card text-primary bg-dark col"
          data-aos="fade-up"
          data-aos-once="true"
          v-for="(product, index) in products"
          :key="product.id">
          <router-link
            :to="`/user/one_product/${product.id}`"
            class="
              card-img-top
              animation_hover
              d-block
              text-decoration-none
              product_img
              img-fluid
              mx-auto w-100"
            :style="{ backgroundImage: `url(${product.imageUrl})` }">
            <button
              type="button"
              class="badge text-decoration-none categoryBtn"
              title="篩選類別"
              @click.prevent="getProducts(product.category)">
              {{ product.category }}
            </button>
            <img
              class="product_info img-fluid"
              alt="顯示產品細節"
              src="@/assets/imageUrl/images/product_info.png"/>
            <button
              type="button"
              class="badge animation_hover collect_btn"
              :class="`collect_btn${index}`"
              title="加入收藏"
              @click.prevent="toggleCollect(product.id, index)" >
              <span v-if="collect.includes(product.id)">
                <i class="bi bi-heart-fill" style="color: red"></i>
              </span>
              <i class="bi bi-heart-fill" v-else></i>
            </button>
            <!-- //* 收藏愛心特效 -->
            <i class="bi bi-heart-fill heart" :class="`heart${index}`"></i>
            <i class="bi bi-heartbreak-fill heartbreak" :class="`heartbreak${index}`"></i>
          </router-link>
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title fs-4 border-bottom">{{ product.title }}</h5>
              <span class="badge bg-danger p-1" v-if="product.popular > 2"
                >熱門商品</span>
            </div>
            <p class="card-text">
              {{ product.description }}
            </p>
          </div>
          <div class="card-footer pt-0">
            <div class="d-flex justify-content-between align-items-end mb-2">
              <del style="opacity: 0.8">
                原價 $ {{ product.origin_price }}
              </del>
              <strong class="ms-auto"
                >優惠價<span class="text-danger fs-3 mb-auto">
                  {{ product.price }} </span
                >元</strong>
            </div>
            <div>
              <button type="button" class="btn btn-danger text-white w-100 d-block addCartBtn animation_hover animation_active fs-5 mb-2"
                title="加入到購物車"
                @click="addCart(product.id)">
                <i class="bi bi-cart-check-fill"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
export default {
  inject: ['emitter'],

  data () {
    return {
      products: [],
      tempProduct: [],
      addProductData: {
        product_id: '',
        qty: 1
      },
      collect: JSON.parse(localStorage.getItem('collect')) || [],
      searchValue: '',
      isLoading: false,
      category: {},
      heart_disabled: 0,
      categoryToggle: false
    }
  },

  watch: {
    collect: {
      handler () {
        localStorage.setItem('collect', JSON.stringify(this.collect))
      },
      deep: true
    }
  },

  methods: {
    getProducts (category) {
      this.isLoading = true
      this.activeCategoryStatus(category)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.tempProduct = res.data.products
        this.search_data = res.data.products
        this.isLoading = false
        if (category) {
          if (category === '全部') {
            this.products = this.tempProduct
          } else if (category === '蛋糕') {
            this.products = this.products.filter((product) => {
              return product.category === '蛋糕'
            })
          } else if (category === '布丁') {
            this.products = this.products.filter((product) => {
              return product.category === '布丁'
            })
          } else if (category === '泡芙') {
            this.products = this.products.filter((product) => {
              return product.category === '泡芙'
            })
          } else if (category === '舒芙蕾') {
            this.products = this.products.filter((product) => {
              return product.category === '舒芙蕾'
            })
          } else if (category === '熱門商品') {
            this.products = this.products.filter((product) => {
              return product.popular > 2
            })
          }
        }
      })
    },
    priceSort () {
      this.activeCategoryStatus('價格低到高')
      this.products = this.products.sort((a, b) => {
        return a.price - b.price
      })
    },
    addCart (id) {
      this.isLoading = true
      this.addProductData.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .post(api, { data: this.addProductData })
        .then((res) => {
          this.$httpMessageState(res.data.success, '加入購物車')
          this.isLoading = false
          this.emitter.emit('get_cart') //* 請 Navbar更新數字
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.success, '加入購物車')
        })
    },
    toggleCollect (id, index) {
      this.heart_disabled += 1
      //* 兩秒後才可以再點擊
      if (this.heart_disabled >= 2) {
        return
      }
      const collectBtn = document.querySelector(`.collect_btn${index}`)
      collectBtn.style.cursor = 'no-drop' //* 將滑鼠變為禁用圖示
      const collectIndex = this.collect.findIndex((item) => {
        return id === item
      })
      if (collectIndex === -1) {
        this.collect.push(id)
        this.$httpMessageState(true, '收藏產品')
        this.emitter.emit('get_collect', this.collect) //* navbar 更新收藏資料
        this.$collectAnimation(index) //* 收藏特效
      } else {
        this.$cancelCollectAnimation(index) //* 取消收藏特效
        this.collect.splice(collectIndex, 1)
        this.emitter.emit('get_collect', this.collect) //* navbar 更新收藏資料
      }
      setTimeout(() => {
        collectBtn.style.cursor = 'pointer' //* 將滑鼠變回手指樣式
      }, 2000)
    },
    keywords () {
      if (!this.searchValue) {
        this.products = this.tempProduct
      }
      this.products = this.products.filter((product) => {
        return product.title.match(this.searchValue) //* 判斷有部分相符的就顯示
      })
    },
    //* 點擊的產品會有特效
    activeCategoryStatus (category) {
      if (category !== '價格低到高') { //* 如果點的不是價格低到高，就初始化，如果是價格低到高，就不初始化
        this.category = {} //* 可以篩選一個類別同時再為那個類別排序低到高
      }
      this.category[category] = category
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
@import "@/assets/stylesheets/helpers/front/_pseudo_el_title.scss";
@import "@/assets/stylesheets/helpers/front/product/_User_Products.scss";
</style>
