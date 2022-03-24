<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">確認訂單資料</span>
    </h2>
    <timeLine :time_line="time_line"></timeLine>

      <h3 class="text-center pb-2 border-bottom mb-5 ">
        <span class=" fs-5 fw-bold" v-if="!is_pay">
          請確認您的資料無誤後付款 <span class=" text-danger">( 未付款 )</span>
        </span>
        <span class="badge text-success fs-5 fw-bold" v-else style="background-color: #D0E838;">已付款 <i class="bi bi-check2"></i></span>
      </h3>
      <div class="table-responsive">
          <table class="table mx-auto align-middle mb-5 text-primary">
            <tbody>
              <tr>
                  <th>
                    <span  class=" fs-5">
                        訂單編號
                    </span>
                  </th>
                  <th>
                    {{ order.id }}
                  </th>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">訂購日期</span>
                  </th>
                  <td>
                      {{ create_at }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">姓名</span>
                  </th>
                  <td>
                      {{ order_user.name }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">Email</span>
                  </th>
                  <td>
                      {{ order_user.email }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">電話</span>
                  </th>
                  <td>
                      {{  order_user.tel  }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">地址</span>
                  </th>
                  <td>
                    {{ order_user.address  }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">訂購產品</span>
                  </th>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in order.products" :key="product">
                        <span class=" mb-1"
                          >{{ product.product.title }} x {{ product.qty }}
                        </span>
                      </li>
                    </ul>
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">付款金額</span>
                  </th>
                  <td>
                    {{ thousandths(order.total) }} 元
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">付款方式</span>
                  </th>
                  <td>
                      {{ order_user.pay_method }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class=" fs-5">付款狀態</span>
                  </th>
                  <td>
                    <span
                      class="fw-bold  text-danger fs-5"
                      v-if="!is_pay"
                    >
                      未付款
                    </span>
                    <span class="badge  text-success fs-5" v-else
                      >已付款 <i class="bi bi-check2"></i> </span
                    >
                  </td>
              </tr>
            </tbody>
          </table>
      </div>
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
        @click="open_confirm_modal"
        v-if="!is_pay"
      >
        <i class="bi bi-cash-coin"></i>
        確認付款
      </button>
    </div>
  <confirmModal @payment="payment"></confirmModal>
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
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
import confirmModal from '@/components/front/modal/Order_Confirm.vue'
// import
export default {
  inject: ['emitter'],
  components: {
    timeLine,
    confirmModal
  },
  data () {
    return {
      time_line: 0,
      order_user: [],
      orderId: '',
      order: [],
      create_at: 0,
      is_pay: false,
      isLoading: false
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
          this.is_pay = res.data.order.is_paid
          if (this.is_pay) { //* 如果使用者按上一頁回來，判斷是已付款，時間軸改為完成訂單
            this.time_line = 4
          }
        })
      }
    },
    //* 開啟、關閉確認 modal
    open_confirm_modal () {
      this.emitter.emit('open_confirmModal', '開啟')
    },
    //* 付款
    payment () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '付款')
        this.emitter.emit('open_confirmModal', '關閉')
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$router.push('/user/order_completed')
      }).catch((err) => {
        this.isLoading = false
        this.$httpMessageState(err.response.success, '付款')
        this.emitter.emit('open_confirmModal', '關閉')
      })
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
    this.time_line = 3
    this.orderId = this.$route.params.orderId
    this.get_order()
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/loading_css.scss"; //* loading CSS
//* hover 放大動畫效果
.animation_hover:hover {
    transform: scale(1.02);
}
//* active 放大
.active_bigger:active {
    transform: scale(1.05);
}
//* 已付款 打勾 icon
.bi-check2{
    color: green;
}
table{
  @include xs {
    width: 30rem;
  }
  @include sm {
    width: 90%;
  }
  @include lg {
    width: 50%;
  }
}
</style>
