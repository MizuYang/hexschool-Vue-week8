<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">確認訂單資料</span>
    </h2>
    <timeLine :time_line="time_line"></timeLine>
    <div>
      <div>
        <img
          src="@/assets/imageUrl/banner/bXMwvjYRKB.png"
          class="banner img-fluid"
          alt="感謝購買的圖片"
        />
      </div>
      <h3 class="text-center border-bottom mb-3 fw-bold">
        請確認您的資料無誤後付款
        <span span class="bg-primary text-danger fs-5" v-if="!order.is_paid">
          (尚未付款)
        </span>
        <span class="bg-primary text-success fs-5" v-else>(已付款)</span>
      </h3>
      <table class="table w-50 mx-auto align-middle mb-5 text-primary">
        <tbody>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">訂單建立日期</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5">
                {{ create_at }}</span
              >
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">姓名</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5">
                {{ order_user.name }}</span
              >
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">Email</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5">
                {{ order_user.email }}</span
              >
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">電話</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5">{{
                order_user.tel
              }}</span>
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">地址</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5">{{
                order_user.address
              }}</span>
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">訂購產品</span>
            </th>
            <td>
              <ul class="list-unstyled">
                <li v-for="product in order.products" :key="product">
                  <span class="badge bg-primary text-success mb-1 fs-5"
                    >{{ product.product.title }} x {{ product.qty }}
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">付款金額</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5"
                >{{ order.total }} 元</span
              >
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">付款方式</span>
            </th>
            <td>
              <span class="badge bg-primary text-success fs-5"
                >{{ order_user.pay_method }}
              </span>
            </td>
          </tr>
          <tr>
            <th>
              <span class="badge bg-primary text-dark fs-5">付款狀態</span>
            </th>
            <td>
              <span
                class="badge bg-primary text-danger fs-5"
                v-if="!order.is_paid"
              >
                未付款
              </span>
              <span class="badge bg-primary text-success fs-5" v-else
                >已付款</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="submit"
        class="
          d-block
          mx-auto
          btn btn-danger
          active_bigger
          fs-4
          animation_hover
        "
        title="結帳"
        @click="payment"
        v-if="!order.is_paid"
      >
        <i class="bi bi-cash-coin"></i>
        確認付款
      </button>
    </div>
  </div>
</template>
<script>
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
export default {
  inject: ['emitter'],
  components: {
    timeLine
  },
  data () {
    return {
      time_line: 3,
      order_user: [],
      orderId: '',
      order: [],
      create_at: 0
    }
  },
  methods: {
    //* 取得訂單
    get_order () {
      if (this.orderId) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
        this.$http.get(api).then((res) => {
          this.order_user = res.data.order.user
          this.order = res.data.order
          const date = new Date(this.order.create_at * 1000)
            .toISOString()
            .substring(0, 10)
          this.create_at = date
        })
      }
    },
    // //* 付款
    payment () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        alert(res.data.message)
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$router.push('/user/order_completed')
      })
    }
  },
  mounted () {
    this.orderId = this.$route.params.orderId
    this.get_order()
  }
}
</script>
 <style lang="scss" scoped>
 @import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/cart/order/_OrderInfo_Confirm.scss";
</style>
