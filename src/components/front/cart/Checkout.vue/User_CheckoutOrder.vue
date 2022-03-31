<template>
<div class="col-12 border p-5">
    <h3 class="border-bottom text-center pb-2">訂單明細</h3>
    <div class="table-responsive">
      <table
        class="
          table
          align-middle
          text-center text-primary
          table-hover
          w-100
          mx-auto
        "
      >
        <thead>
          <tr>
            <th>圖片</th>
            <th style="width: 150px">名稱</th>
            <th>數量</th>
            <th style="width: 200px">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartData" :key="product.product.id">
            <td>
              <img
                class="img_product mx-auto img-fluid"
                :src="`${product.product.imageUrl}`"
              />
            </td>
            <td>
              <p style="width: 150px">{{ product.product.title }}</p>
            </td>
            <td>
              <p>{{ product.qty }}個</p>
            </td>
            <td>
              <p>{{ $thousandths(product.total) }} 元</p>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>
              <span class="badge bg-primary text-success" v-if="has_coupon"
                >已使用優惠券</span
              >
            </td>
            <td style="width: 200px" class="d-block">
              總價：
              <span class="text-success fw-bold fs-5">{{ $thousandths(total) }}</span> 元
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                to="/user/cart"
                class="btn btn-secondary active_bigger fs-4 animation_hover"
                title="上一步"
                v-if="cartData.length > 0"
                >上一步</router-link
              >
            </td>
            <td></td>
            <td></td>
            <td>
              <button
                type="submit"
                class="
                  btn btn-danger
                  send-btn
                  active_bigger
                  fs-4
                  animation_hover d-none d-lg-block
                "
                title="前往結帳流程"
                v-if="cartData.length > 0"
              >
                下一步
              </button>
              <router-link
                to="/user/cart"
                class="btn btn-secondary active_bigger fs-4 animation_hover"
                title="上一步"
                v-else
                >上一步</router-link
              >
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
</div>
<button
  type="submit"
  class="
    btn btn-danger
    send-btn
    active_bigger
    fs-4
    animation_hover
    mt-3
    w-100 d-lg-none
  "
  title="前往結帳流程"
  v-if="cartData.length > 0"
>
  下一步
</button>
</template>

<script>
export default {
  inject: ['emitter'],

  data () {
    return {
      cartData: [],
      total: 0,
      has_coupon: false,
      coupon_price: 0
    }
  },

  methods: {
    getCartList () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.cartData = res.data.data.carts
        const total = res.data.data.total //* 總價
        const couponPrice = res.data.data.final_total //* 優惠後價格
        if (total === couponPrice) {
          //* 如果總價等於優惠價 = 沒優惠
          this.total = total
        } else if (total > couponPrice) {
          //* 如果總價大於優惠價格 = 有優惠
          this.total = couponPrice
          this.has_coupon = true
          this.coupon_price = (couponPrice / total) * 100 //* 算出折扣
        }
      })
    }
  },

  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
.img_product {
  height: 10rem;
  width: 12rem;
}
.btn{
  width: 10rem;
}
</style>
