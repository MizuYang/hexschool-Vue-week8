<template>
  <div class="col-12 border pt-5">
    <h3 class="border-bottom text-center pb-2 mb-3">訂單明細</h3>
    <div
      v-for="product in cartData"
      :key="product.product.id"
      class="
        d-flex
        align-items-center
        justify-content-center
        d-md-none
        border
        mb-3
      "
    >
      <div>
        <img
          class="img_productRWD img-fluid me-2"
          :src="`${product.product.imageUrl}`"
        />
      </div>
      <div class="lh-1 py-3">
        <p>{{ product.product.title }}</p>
        <p>數量：{{ product.qty }} 個</p>
        <p>
          <del class="opacity-50 me-1">${{ product.product.origin_price }}</del>
          ${{ product.product.price }}
        </p>
        小計：<span class="text-danger">{{
          $thousandths(product.final_total)
        }}</span>
      </div>
    </div>
    <table
      class="
        table
        align-middle
        text-center text-primary
        table-hover
        w-100
        mx-auto
        d-none d-md-table
      "
    >
      <thead>
        <tr>
          <th>圖片</th>
          <th>名稱</th>
          <th>數量</th>
          <th>金額</th>
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
            <p>{{ product.product.title }}</p>
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
        <td></td>
        <td></td>
        <td></td>
        <td>
          <p :class="{ 'text-success': has_coupon }" class="fs-5">
            {{ $thousandths(total) }} 元
          </p>
        </td>
      </tfoot>
    </table>
  </div>
  <div
    class="d-flex padding-clear mt-3 d-none d-lg-inline-block"
    v-if="cartData.length > 0"
  >
    <p class="fw-bold fs-5 mt-3 text-end" v-if="has_coupon">
      已使用優惠券
      <span class="copy_point badge"
        ><i class="bi bi-check-lg fs-4"></i
      ></span>
    </p>
    <button
      v-if="!has_coupon"
      type="button"
      class="
        btn btn-success
        send-btn
        active_bigger
        fs-4
        animation_hover
        mb-2
        btn-sm
        d-block
        ms-auto
      "
      title="使用優惠券"
      @click="openCouponModal('開啟')"
    >
      使用優惠券
    </button>
  </div>
  <div
    class="
      d-lg-flex
      justify-content-between
      padding-clear
      finalSteps-bg
      d-none d-lg-inline-block
    "
  >
    <div>
      <router-link
        to="/cart"
        class="
          btn btn-secondary
          active_bigger
          fs-4
          animation_hover
          d-block
          btn-lg
        "
        title="上一步"
        >上一步</router-link
      >
    </div>
    <div class="d-flex justify-content-between">
      <p class="text-center me-5" v-if="has_coupon">
        您省下了 <span class="finalSteps-text-fs-3">{{
          $thousandths(coupon_price)
        }}</span>
        元
      </p>
      <p class="text-center me-5">
        總金額：
        <span
          :class="{ 'text-success': has_coupon }"
          class="finalSteps-text-fs-3 fw-bold"
          >{{ $thousandths(total) }}</span
        >
        元
      </p>
      <button
        type="submit"
        class="btn btn-danger send-btn active_bigger fs-4 animation_hover"
        title="前往結帳流程"
        v-if="cartData.length > 0"
      >
        下一步
      </button>
    </div>
  </div>
  <div class="padding-clear d-lg-none mt-5" v-if="cartData.length > 0">
    <p class="fs-5 mt-3 text-center finalSteps-bg w-100 mb-0" v-if="has_coupon">
      已使用優惠券
      <span class="copy_point badge"
        ><i class="bi bi-check-lg fs-4"></i
      ></span>
    </p>
    <p class="text-center me-5 finalSteps-bg w-100 mb-0" v-if="has_coupon">
      您省下了 <span class="finalSteps-text-fs-3 fw-bold">{{
        $thousandths(coupon_price)
      }}</span>
      元
    </p>
    <p class="text-center me-5 finalSteps-bg w-100 mb-0">
      總金額：
      <span
        :class="{ 'text-success': has_coupon }"
        class="finalSteps-text-fs-3 fw-bold"
        >{{ $thousandths(total) }}</span
      >
      元
    </p>
    <button
      v-if="!has_coupon"
      type="button"
      class="
        btn btn-success
        send-btn
        active_bigger
        fs-4
        animation_hover
        mb-2
        w-100
        d-lg-none
      "
      title="使用優惠券"
      @click="openCouponModal('開啟')"
    >
      使用優惠券
    </button>
    <button
      type="submit"
      class="
        btn btn-danger
        send-btn
        active_bigger
        fs-4
        animation_hover
        w-100
        d-lg-none
      "
      title="前往結帳流程"
    >
      下一步
    </button>
  </div>
  <router-link
    to="/cart"
    class="
      btn btn-secondary
      active_bigger
      fs-4
      animation_hover
      w-100
      mt-5
      d-lg-none
    "
    title="上一步"
    >上一步</router-link
  >
  <Loading v-model:active="isLoading">
    <div class="cssload-container">
      <div class="cssload-dot"></div>
      <div class="step" id="cssload-s1"></div>
      <div class="step" id="cssload-s2"></div>
      <div class="step" id="cssload-s3"></div>
    </div>
  </Loading>
  <UserCheckCouponModal @useCoupon="useCoupon"></UserCheckCouponModal>
</template>

<script>
import UserCheckCouponModal from '@/components/front/modal/UserCheckCouponModal.vue'
export default {
  inject: ['emitter'],

  components: {
    UserCheckCouponModal
  },

  data () {
    return {
      cartData: [],
      total: 0,
      has_coupon: false,
      coupon_discount: 0,
      coupon_price: 0,
      isLoading: false
    }
  },

  methods: {
    getCartList (couponStatus) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.cartData = res.data.data.carts
        const total = res.data.data.total
        this.total = total
        const finalTotal = res.data.data.final_total
        let couponName = ''
        if (total > finalTotal) {
          couponName = res.data.data.carts[0].coupon.code
        }
        if (couponStatus || couponName) {
          this.total = finalTotal
          this.coupon_price = total - finalTotal
          this.has_coupon = true
        }
      })
    },
    useCoupon (couponCodeText) {
      this.isLoading = true
      const data = {
        code: couponCodeText
      }
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      this.$http
        .post(api, { data: data })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '使用優惠券')
          const couponStatus = res.data.data.success
          this.getCartList(couponStatus)
          this.couponCodeText = ''
          this.openCouponModal('關閉')
        })
        .catch((err) => {
          this.isLoading = false
          this.couponCodeText = ''
          this.openCouponModal('錯誤')
          this.$httpMessageState(
            err.response.data.success,
            '找不到優惠券，折扣'
          )
        })
    },
    openCouponModal (methods) {
      this.emitter.emit('openCouponModal', methods)
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
@import "@/assets/stylesheets/helpers/front/cart/_UserCheckoutOrder.scss";
</style>
