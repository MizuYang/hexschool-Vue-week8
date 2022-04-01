<template>
  <div class="container mt-8 mt-sm-10  cart">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">購物車</span>
    </h2>
    <CartNoOrder v-if="cartData.length === 0" />
    <div class="table-responsive" v-else>
      <CartTimeLine />
      <table class="table table-hover align-middle text-center text-primary">
        <thead class="table-dark text-primary">
            <tr>
              <th style="width: 100px">
                <span class="bi bi-check2-square"></span>
              </th>
              <th><i class="bi bi-file-earmark-image"></i> 圖片</th>
              <th><i class="bi bi-bag-heart"></i> 產品名稱</th>
              <th><i class="bi bi-plus-slash-minus"></i> 購買數量</th>
              <th><i class="bi bi-coin"></i> 價格</th>
              <th><i class="bi bi-calculator"></i> 小計</th>
              <th><i class="bi bi-trash3"></i> </th>
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
                  :to="`/user/one_product/${product.product_id}`"
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
                <del style="opacity: 0.8"
                  >原價 {{ product.product.origin_price }} 元</del>
                <br />
                <strong>優惠價<span class="text-danger fs-5">
                    {{ product.product.price }} </span>元</strong>
              </td>
              <td >
                <p class="border-bottom mx-auto" style="width:100px">價格*數量</p>
                <p>{{ $thousandths(product.total) }} 元</p>
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
        <tfoot>
          <tr>
            <td>
              <button
                v-if="checkbox_productId.length > 0"
                style="width: 60px"
                type="button"
                class="btn btn-outline-danger active_bigger animation_hover"
                @click="openDeleteModal(product,'勾選刪除')">
                刪除
              </button>
            </td>
            <td class="rwd_hide_table_lg">
              <button
                type="button"
                class="btn btn-outline-danger active_bigger animation_hover"
                @click="openDeleteModal">
                全部刪除
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><label for="couponCode">輸入優惠碼</label></td>
            <td></td>
            <td v-show="coupon_final_total > 0" class="text-success">
                <span class="badge bg-primary text-success"
                >折扣  {{ coupon_discount }} %
                </span>
            </td>
            <td v-if="coupon_final_total > 0">總價：<span class="text-success fs-5 fw-bold">{{ $thousandths(coupon_final_total) }} </span> 元</td>
            <td></td>
            <td class="fs-5 text-primary " v-if="!coupon_final_total"> 總價：{{ $thousandths(total) }} 元 </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <router-link
                to="/user/products"
                class="btn btn-secondary active_bigger fs-5 animation_hover"
                >繼續購物</router-link>
            </td>
            <td><input
                type="text"
                v-model="couponCode"
                class="text-center"
                id="couponCode"
                style="width: 140px"
              /></td>
            <td></td>
            <td>
                <button
                type="button"
                class="btn btn-success active_bigger animation_hover"
                @click="useCoupon">
                使用優惠券
              </button>
            </td>
            <td>
              <router-link
                to="/user/checkout"
                class="btn btn-danger sendOrderBtn fs-5 rwd_hide">
                下一步</router-link>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <router-link
      v-if="cartData.length > 0"
      to="/user/checkout"
      class="btn btn-danger sendOrderBtn fs-5 w-100 d-lg-none my-3">
  下一步</router-link>
<SwiperCartOneProduct class="mb-5" @getCartList="getCartList" :cartData="cartData" />
<CartDeleteProduct @getCartList="getCartList" />
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
import CartDeleteProduct from '@/components/front/modal/CartDeleteProduct.vue'
import SwiperCartOneProduct from '@/components/front/swiper/SwiperCartOneProduct.vue'
export default {
  inject: ['emitter'],

  components: {
    CartTimeLine,
    CartNoOrder,
    CartDeleteProduct,
    SwiperCartOneProduct
  },

  data () {
    return {
      cartData: [],
      checkbox_productId: [],
      couponCode: 'my_coupon',
      coupon_final_total: 0,
      total: 0,
      isLoading: false,
      coupon_discount: 0 //* 折扣百分比
    }
  },

  methods: {
    getCartList (checkboxDeleteStatus) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.cartData = res.data.data.carts
        this.computeTotal()
        if (checkboxDeleteStatus) { //* 刪除勾選商品，隱藏刪除勾選按鈕
          this.checkbox_productId = []
        }
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
        const deleteId = this.checkbox_productId.findIndex((productId) => {
          return productId === id
        })
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
    },
    useCoupon () {
      this.isLoading = true
      const data = {
        code: this.couponCode
      }
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      this.$http
        .post(api, { data: data })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '使用優惠券')
          this.coupon_final_total = res.data.data.final_total
          this.coupon_discount = this.coupon_final_total / this.total * 100
        })
    },
    computeTotal () {
      let num = 0
      this.cartData.forEach((product) => {
        num += product.total
      })
      this.total = num
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
