<template>
  <div class="container mt-10 mb-5 cart">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">購物車</span>
    </h2>

    <noOrder v-if="cartData.length === 0"></noOrder>

    <div class="table-responsive" v-else>
      <timeLine :time_line="time_line"></timeLine>

      <table class="table table-hover align-middle text-center text-primary">
        <thead class="table-dark text-primary">
          <tr>
            <th class="rwd_hide_table_lg" style="width: 6rem">
              <i class="bi bi-check2-square"></i> 勾選
            </th>
            <th><i class="bi bi-file-earmark-image"></i> 圖片</th>
            <th><i class="bi bi-bag-heart"></i> 產品名稱</th>
            <th><i class="bi bi-plus-slash-minus"></i> 購買數量</th>
            <th><i class="bi bi-coin"></i> 價格</th>
            <th><i class="bi bi-calculator"></i> 小計</th>
            <th><i class="bi bi-trash3"></i> 刪除產品</th>
          </tr>
        </thead>
        <tbody class="text-nowrap">
          <tr v-for="product in cartData" :key="product.id" :class="{ 'table-light': product.checkbox }">
            <td class="rwd_hide_table_lg">
              <input
                type="checkbox"
                v-model="product.checkbox"
                @click="checkbox(product.checkbox, product.id)"
                class="form-check-input bg-dark border"
              />
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
                <input type="button" class="btn product_numBtn btn-outline-primary active_bigger"
                 value="－" :disabled="product.qty <= 1" @click="update_product_num('cut', product)"/>
                <input
                  type="text"
                  class="product_numText mx-1 fs-4"
                  :value="product.qty"
                  readonly
                />
                <input
                  type="button"
                  class="btn product_numBtn btn-outline-primary active_bigger"
                  value="＋"
                  @click="update_product_num('add', product)"
                />
              </div>
            </td>
            <td>
              <del style="opacity: 0.8"
                >原價 {{ product.product.origin_price }} 元</del
              >
              <br />
              <strong
                >優惠價<u class="text-danger fs-5">
                  {{ product.product.price }} </u
                >元</strong
              >
            </td>
            <td>
              價格*數量
              <p class="border-top border">{{ thousandths(product.total) }} 元</p>
            </td>
            <td>
              <input
                type="button"
                class="btn btn-outline-danger active_bigger"
                @click="open_delete_product(product, '刪除單一產品')"
                value="X"
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <button
                v-if="checkbox_productId.length > 0"
                type="button"
                class="btn btn-outline-danger active_bigger animation_hover"
                @click="open_delete_product(product,'勾選刪除')"
              >
                刪除
              </button>
            </td>
            <td class="rwd_hide_table_lg">
              <button
                type="button"
                class="btn btn-outline-danger active_bigger animation_hover"
                @click="open_delete_product"
              >
                全部刪除
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <span class="text-success fw-bold" v-show="coupon_final_total > 0">優惠券使用成功!!</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-success active_bigger animation_hover"
                @click="use_coupon"
              >
                使用優惠券
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <!-- <span class="text-danger">優惠券使用失敗!!</span> -->
              <label for="couponCode">輸入優惠代碼：</label>
            </td>
            <td></td>
            <td v-show="coupon_final_total > 0" class="text-success "> 您折扣了  {{ coupon_final_total /  total * 100  }} %</td>
            <td></td>
            <td><!-- <span class="text-danger">優惠券錯誤或<br />期限已失效</span> --></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <router-link
                to="/user/products"
                class="btn btn-secondary active_bigger fs-4 animation_hover"
                >繼續購物</router-link
              >
            </td>
            <td></td>
            <td>
              <input
                type="text"
                v-model="couponCode"
                class="text-center"
                id="couponCode"
                style="width: 140px"
              />
            </td>
            <td></td>
            <td v-show="coupon_final_total > 0">總價格： <span class="text-success fs-2 fw-bold"> {{ coupon_final_total }} </span> 元</td>
            <td class="fs-4 text-primary fw-bold" v-show="!coupon_final_total"> 總價格： {{ thousandths(total) }} 元 </td>
            <td>
              <router-link
                to="/user/checkout"
                class="btn btn-danger send_order fs-4"
              >
                下一步</router-link
              >
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
   <deleteProductModal @getCartList="getCartList"></deleteProductModal>
     <Loading v-model:active="isLoading" />
</template>
<script>
//* 時間軸、沒訂單時的產品頁面引導
import noOrder from '@/components/front/cart/Cart_No_Order.vue'
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
import deleteProductModal from '@/components/front/modal/Front_Delete_Product.vue'
// import $thousandths from '@/utils/thousandths.js'
export default {
  inject: ['emitter'],
  components: {
    timeLine,
    noOrder,
    deleteProductModal
  },
  data () {
    return {
      time_line: 1,
      cartData: [],
      checkbox_productId: [],
      couponCode: 'my_coupon',
      coupon_final_total: 0,
      total: 0,
      isLoading: false
    }
  },
  methods: {
    //* 取得購物車
    getCartList (checkboxDeleteStatus) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.cartData = res.data.data.carts
        this.price_total()
        if (checkboxDeleteStatus) { //* 如果刪除勾選商品，就讓購物車頁面隱藏刪除勾選按鈕
          this.checkbox_productId = []
        }
      })
    },
    //* 開啟刪除 modal
    open_delete_product (product, status) {
      const data = {}
      if (status === '勾選刪除') {
        data.id = this.checkbox_productId
        data.status = '勾選刪除'
        this.emitter.emit('open_delete_product', data)
      } else if (status === '刪除單一產品') {
        data.product = product
        data.status = '刪除單一產品'
        this.emitter.emit('open_delete_product', data)
      } else {
        this.emitter.emit('open_delete_product')
      }
    },
    //* 勾選時把產品 ID 存起來，如果勾選取消就刪掉 id
    checkbox (status, id) {
      //* 打勾時就把 id 推到資料集
      if (!status) {
        this.checkbox_productId.push(id)
      } else if (status) {
        // *如果取消打勾的話，就用 findIndex 比對取消的 ID 是資料集的第幾筆，再將那一筆刪除
        const deleteId = this.checkbox_productId.findIndex((productId) => {
          return productId === id
        })
        this.checkbox_productId.splice(deleteId, 1)
      }
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
        this.$httpMessageState(res.data.success, '更新數量')
        this.getCartList()
      })
    },
    //* 使用優惠券
    use_coupon () {
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
        })
    },
    //* 算出總價格
    price_total () {
      let num = 0
      this.cartData.forEach((product) => {
        num += product.total
      })
      this.total = num
    },
    //* 千分位
    thousandths (num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c)
        return currency
      })}`
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/front/cart/_Cart.scss";
</style>
