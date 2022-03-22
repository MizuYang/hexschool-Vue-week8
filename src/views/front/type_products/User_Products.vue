<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">精選產品</span>
    </h2>
    <div class="row">
      <div
        class="
          mb-5
          d-flex
          col-12
          flex-sm-wrap
          justify-content-sm-evenly
          flex-lg-row
          col-lg-12 col-xl-8
          category
        "
      >
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('全部')"
        >
          全部
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('蛋糕')"
        >
          蛋糕
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('布丁')"
        >
          布丁
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('泡芙')"
        >
          泡芙
        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('舒芙蕾')"
        >
          舒芙蕾

        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('熱門商品')"
        >
          熱門商品

        </button>
        <button
          type="button"
          class="btn btn-outline-primary products_category_btn animation_active"
          @click="get_products('價格低到高')"
        >
          價格 / 低到高
        </button>
      </div>
      <!-- <div class="col text-end text-center text-xl-end mb-sm-5">
        <label for="search_products">產品搜尋：</label>
        <input
          type="search"
          id="search_products"
          class="search_products"
          v-model="search_value"
        />
      </div> -->
    </div>
    <div class="card-group">
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div
          class="card text-primary bg-dark col"
          v-for="product in products "
          :key="product.id"
        >
          <router-link
            :to="`/user/one_product/${product.id}`"
            class="
              card-img-top
              animation_hover
              d-block
              text-decoration-none
              product_img
              img-fluid
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          >
            <button
              type="button"
              class="badge text-decoration-none tag"
              title="篩選類別"
              @click.prevent="get_products(product.category)"
            >
              {{ product.category }}
            </button>
            <img class="product_info img-fluid" alt="顯示產品細節" src="@/assets/imageUrl/images/product_info.png">
            <button
              type="button"
              class="badge animation_hover like_btn"
              title="加入收藏"
              @click.prevent="toggle_collect(product.id)"
            >
          <span v-if="collect.includes(product.id)">
              <i class="bi bi-heart-fill" style="color:red"></i>
          </span>
              <i class="bi bi-heart-fill" v-else></i>
            </button>
          </router-link>

          <div class="card-body pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title fs-4 border-bottom">{{ product.title }}</h5>
              <span class="badge bg-danger p-1" v-if="product.popular > 2"
                >熱門商品</span
              >
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
                >元</strong
              >
            </div>
            <div>
              <button
                type="button"
                class="
                  btn btn-danger
                  text-white
                  w-100
                  d-block
                  addCart
                  animation_hover animation_active
                  fs-5
                  mb-2
                "
                title="加入到購物車"
                @click="addCart(product.id)"
              >
                <i class="bi bi-cart-check-fill"></i>
                加入購物車
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading v-model:active="isLoading" />
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/product/_Products.scss";
</style>

<script>
export default {
  inject: ['emitter'],
  data () {
    return {
      products: [],
      add_product_Data: {
        product_id: '',
        qty: 1
      },
      collect: JSON.parse(localStorage.getItem('collect')) || [], //* 如果 localstorage 沒資料就是空陣列
      // search_value: '',
      search_data: [],
      isLoading: false
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
    //* 取得產品
    get_products (category) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.search_data = res.data.products
        this.isLoading = false
        if (category) {
          if (category === '全部') {
            this.get_products()
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
          } else if (category === '價格低到高') {
            this.products = this.products.sort((a, b) => {
              return a.price - b.price
            })
          }
        }
      })
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
          alert(res.data.message)
          this.emitter.emit('get_cart') //* 請 Navbar更新數字
        })
        .catch((err) => {
          alert(err.response.request.responseText)
        })
    },
    //* 增加產品數量
    update_product_num (status, product) {
      this.isLoading = true
      let num = 0
      if (status === 'add') {
        num = product.qty + 1
      } else if (status === 'cut') {
        num = product.qty - 1
      }
      const data = {
        product_id: product.product_id,
        qty: num
      }
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${product.id}`
      this.$http.put(api, { data: data }).then((res) => {
        this.isLoading = false
        alert(res.data.message)
        this.getCartList()
      })
    },
    //* 收藏清單
    toggle_collect (id) {
      const collectIndex = this.collect.findIndex((item) => {
        return id === item
      })
      if (collectIndex === -1) {
        this.collect.push(id)
        alert('加入收藏成功!')
      } else {
        this.collect.splice(collectIndex, 1)
      }
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>
