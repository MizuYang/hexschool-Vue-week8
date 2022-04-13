<template>
  <div class="container mt-8 mt-sm-10  cart">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">購物車</span>
    </h2>
    <CartNoOrder v-if="cartData.length === 0" />
    <div v-else>
      <CartTimeLine />
      <div class="d-flex mb-2">
        <button
            v-if="checkbox_productId.length > 0"
            type="button"
            class="btn btn-outline-danger active_bigger animation_hover position-relative"
            @click="openDeleteModal(product,'勾選刪除')">
            刪除
            <span class="badge position-absolute bg-danger top-0 start-100 translate-middle rounded-pill">{{ checkbox_productId.length }}</span>
        </button>
        <button
          type="button"
          class="btn btn-outline-danger active_bigger animation_hover d-block ms-auto"
          @click="openDeleteModal">
          全部刪除
        </button>
       </div>
      <table class="table table-hover align-middle text-center text-primary d-none d-lg-table">
        <thead class="table-dark text-primary">
            <tr>
              <th style="width: 50px">
                <span class="bi bi-check2-square"></span>
              </th>
              <th style="width: 100px"><i class="bi bi-file-earmark-image"></i> 圖片</th>
              <th><i class="bi bi-bag-heart"></i> 產品名稱</th>
              <th style="width: 100px"><i class="bi bi-plus-slash-minus"></i> 購買數量</th>
              <th><i class="bi bi-coin"></i> 價格</th>
              <th><i class="bi bi-calculator"></i> 小計</th>
              <th style="width: 50px"><i class="bi bi-trash3"></i> </th>
            </tr>
        </thead>
        <tbody class="text-nowrap">
            <tr v-for="product in cartData" :key="product.id" :class="{ 'table-light': product.checkbox }">
              <td>
                <input
                  type="checkbox"
                  v-model="product.checkbox"
                  @click="checkboxGetProductId(product.checkbox, product.id)"
                  class="form-check-input bg-dark border"/>
              </td>
              <td>
                <router-link
                  :to="`/one_product/${product.product_id}`"
                  class="
                    product_img
                    card-img-top
                    animation_hover
                    d-block
                    text-decoration-none
                    img_hover img-fluid" :style="{ backgroundImage: `url(${product.product.imageUrl})` }">
                  <div class="text-start">
                    <span type="button" class="badge bg-primary text-dark tag" title="篩選類別">
                      {{ product.product.category }}
                    </span>
                  </div>
                  <img class="product_info" alt="顯示產品細節" src="@/assets/imageUrl/images/product_info.png">
                </router-link>
              </td>
              <td>
                <h4>
                  {{ product.product.title }}
                </h4>
                <span class="badge bg-danger p-1" v-if="product.product.popular > 2">熱門商品</span>
              </td>
              <td>
                <div class="d-flex align-items-center">
                  <input type="button" class="btn productsQtyBtn btn-outline-primary active_bigger"
                  value="－" :disabled="product.qty <= 1" @click="updateProductQty('cut', product)"/>
                  <input
                    type="text"
                    class="productsQtyText mx-1 fs-4"
                    :value="product.qty" readonly/>
                  <input
                    type="button"
                    class="btn productsQtyBtn btn-outline-primary active_bigger"
                    value="＋"
                    @click="updateProductQty('add', product)"/>
                </div>
              </td>
              <td>
                <del class="opacity-50"
                  >${{ product.product.origin_price }}</del>
                <br />
                <strong><span class="fs-5">
                  $ {{ product.product.price }} </span></strong>
              </td>
              <td>
                <p>{{ $thousandths(product.total) }} </p>
              </td>
              <td>
                <input
                  type="button"
                  class="btn btn-outline-danger active_bigger"
                  @click="openDeleteModal(product, '刪除單一產品')"
                  value="X"/>
              </td>
            </tr>
        </tbody>
      </table>
      <div class="border p-2 position-relative mb-3 d-lg-none" v-for="(product, index) in cartData" :key="product.id" :class="{ 'finalSteps-bg': product.checkbox }">
          <p class="text-center border-bottom pb-1">{{ index + 1 }}. {{ product.product.title }}</p>
          <div class="d-flex justify-content-center">
            <div class="my-auto">
            <input
              type="checkbox"
              v-model="product.checkbox"
              @click="checkboxGetProductId(product.checkbox, product.id)"
              class="form-check-input bg-dark border me-2"/>
          <input
              type="button"
              class="btn btn-outline-danger active_bigger position-absolute top-0 end-0"
              style="font-size:1.26rem"
              @click="openDeleteModal(product, '刪除單一產品')"
              value="X"/>
          </div>
          <div>
            <router-link
                  :to="`/one_product/${product.product_id}`"
                  class="
                    product_img product_imgRwd
                    card-img-top
                    animation_hover
                    d-block me-2
                    text-decoration-none
                    img_hover img-fluid" :style="{ backgroundImage: `url(${product.product.imageUrl})` }">
                  <div class="text-start">
                    <span type="button" class="badge bg-primary text-dark tag" title="篩選類別">
                      {{ product.product.category }}
                    </span>
                  </div>
                  <img class="product_info" alt="顯示產品細節" src="@/assets/imageUrl/images/product_info.png">
            </router-link>
          </div>
          <div class="d-flex flex-column ">
            <p>類別：{{ product.product.category }}</p>
            <div class="d-flex">
              <del class="opacity-50"
              >${{ product.product.origin_price }}</del>
              <br />
              <strong><span class="fs-5 ms-3">
                $ {{ product.product.price }} </span></strong>
            </div>
                <p>小計：{{ $thousandths(product.total) }} 元</p>
            <div class="d-flex  mt-auto">
                    <input type="button" class="btn productsQtyBtn btn-outline-primary active_bigger"
                    value="－" :disabled="product.qty <= 1" @click="updateProductQty('cut', product)"/>
                    <input
                      type="text"
                      class="productsQtyText mx-1 fs-4"
                      :value="product.qty" readonly/>
                    <input
                      type="button"
                      class="btn productsQtyBtn btn-outline-primary active_bigger"
                      value="＋"
                      @click="updateProductQty('add', product)"/>
            </div>
          </div>
          </div>
      </div>
      <div class="d-lg-flex justify-content-between mb-3 finalSteps-bg d-none d-lg-block">
        <router-link
          to="/products"
          class="btn btn-secondary fs-4 active_bigger animation_hover">上一頁
        </router-link>
        <div class="d-flex">
          <p class="mt-auto me-5">購買了 <span class="fs-4">{{ cartData.length }}</span> 個產品</p>
          <p class="mt-auto me-5">總金額：<span class="fs-4 fw-bold">{{ $thousandths(total) }} </span> 元</p>
          <router-link
            to="/checkout"
            class="btn btn-danger fs-4 sendOrderBtn rwd_hide">下一步
          </router-link>
        </div>
      </div>
    </div>
  </div>
<div class=" d-lg-none text-center mt-5">
  <p class="mt-auto me-5 finalSteps-bg w-100 mb-0">購買了 <span class="fs-4">{{ cartData.length }}</span> 個產品</p>
  <p class="mt-auto me-5 finalSteps-bg w-100 mb-0">總金額：<span class="fs-4 fw-bold">{{ $thousandths(total) }} </span> 元</p>
  <router-link
      v-if="cartData.length > 0"
      to="/checkout"
      class="btn btn-danger sendOrderBtn fs-4 w-100">下一步
  </router-link>
  <router-link
    to="/products"
    class="btn btn-secondary fs-4 active_bigger animation_hover w-100 my-5">上一頁
  </router-link>
</div>
<SwiperCartOneProduct class="mb-5" @getCartList="getCartList" :cartData="cartData" />
<CartDeleteProductModal @getCartList="getCartList" />
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
//* 時間軸、沒訂單時的產品頁面引導
import CartNoOrder from '@/components/front/cart/CartNoOrder.vue'
import CartTimeLine from '@/components/front/cart/CartTimeLine.vue'
import CartDeleteProductModal from '@/components/front/modal/CartDeleteProductModal.vue'
import SwiperCartOneProduct from '@/components/front/swiper/SwiperCartOneProduct.vue'
export default {
  inject: ['emitter'],

  components: {
    CartTimeLine,
    CartNoOrder,
    CartDeleteProductModal,
    SwiperCartOneProduct
  },

  data () {
    return {
      cartData: [],
      checkbox_productId: [],
      total: 0,
      isLoading: false
    }
  },

  methods: {
    getCartList () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.cartData = res.data.data.carts
        this.total = res.data.data.total
        this.checkbox_productId = [] //* 勾選產品初始化
      })
    },
    openDeleteModal (product, status) {
      const data = {}
      if (status === '勾選刪除') {
        data.id = this.checkbox_productId
        data.status = '勾選刪除'
        this.emitter.emit('openDeleteModal', data)
      } else if (status === '刪除單一產品') {
        data.product = product
        data.status = '刪除單一產品'
        this.emitter.emit('openDeleteModal', data)
      } else {
        this.emitter.emit('openDeleteModal')
      }
    },
    //* 勾選時把產品 ID 存起來，如果勾選取消就刪掉 id
    checkboxGetProductId (status, id) {
      if (!status) {
        this.checkbox_productId.push(id)
      } else if (status) {
        // *取消打勾，就用 findIndex 比對取消的 ID 是資料集的第幾筆，再將那筆刪除
        const deleteId = this.checkbox_productId.findIndex((productId) => productId === id)
        this.checkbox_productId.splice(deleteId, 1)
      }
    },
    updateProductQty (status, product) {
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
        this.$httpMessageState(res.data.success, '更新數量')
        this.getCartList()
      })
    }
  },

  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/front/cart/_User_Cart.scss";
</style>
