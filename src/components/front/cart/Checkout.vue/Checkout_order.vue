<template>

<div class="col-12 border p-5">
    <h3 class="border-bottom text-center">訂單明細</h3>
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
            <th class="d-none d-md-block">圖片</th>
            <th>名稱</th>
            <th>數量</th>
            <th>金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartData" :key="product.product.id">
            <td class="d-none d-md-block">
              <img
                class="img_product mx-auto img-fluid"
                :src="`${product.product.imageUrl}`"
              />
            </td>
            <td>
              <p>{{ product.product.title }}</p>
            </td>
            <td>
              <p>{{ product.qty }}個</p>
            </td>
            <td>
              <p>{{ thousandths(product.total) }} 元</p>
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
            <td v-if="has_coupon">
              使用折扣為：<span class="text-success fw-bold">{{
                thousandths(coupon_price)
              }}</span>
              %
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              總價：
              <span class="text-success fw-bold fs-3">{{ thousandths(total) }}</span> 元
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
            <td>
              <!-- <span class="text-danger fs-3 border p-2">
                        您尚未完成表單！
                      </span> -->
            </td>
            <td>
              <button
                type="submit"
                class="
                  btn btn-danger
                  send-btn
                  active_bigger
                  fs-4
                  animation_hover
                "
                title="前往結帳流程"
                v-if="cartData.length > 0"
                @submit="this.emitter.emit('call_send_order')"
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
      <div></div>
    </div>
</div>

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
    //* 取得購物車
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
    },
    //* 千分位
    thousandths (num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency =
          i && c !== '.' && (a.length - i) % 3 === 0
            ? `, ${c}`.replace(/\s/g, '')
            : c
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
//* 產品圖片
.img_product {
  height: 8rem;
  width: 10rem;
}
</style>
