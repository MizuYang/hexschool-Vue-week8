<template>
  <div class="container mt-8 mt-sm-10 mb-5 ">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">確認訂單資料</span>
    </h2>
    <CartTimeLine :is_pay="is_pay" />
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
                    <span class="fs-5">
                        訂單編號
                    </span>
                  </th>
                  <th>
                    <span class="fw-bold border-bottom id"> {{ order.id }} </span>
                    <button type="button" class="btn btn-outline-primary btn-sm ms-2 tag-read" :data-clipboard-text="orderId" @click="copy">
                      複製
                      <span class="copy_point ms-2 text-success badge bg-primary" :class="{ 'd-none': !copy_point }"><i class="bi bi-check-lg"></i></span>
                    </button>
                  </th>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">訂購日期</span>
                  </th>
                  <td>
                      {{ create_at }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">姓名</span>
                  </th>
                  <td>
                      {{ order_user.name }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">Email</span>
                  </th>
                  <td>
                      {{ order_user.email }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">電話</span>
                  </th>
                  <td>
                      {{ order_user.tel }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">地址</span>
                  </th>
                  <td>
                    {{ order_user.address }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">訂購產品</span>
                  </th>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="product in order.products" :key="product">
                        <span class="mb-1"
                          >{{ product.product.title }} x {{ product.qty }}
                        </span>
                      </li>
                    </ul>
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">付款金額</span>
                  </th>
                  <td>
                    {{ $thousandths(order.total) }} 元
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">付款方式</span>
                  </th>
                  <td>
                      {{ order_user.pay_method }}
                  </td>
              </tr>
              <tr>
                  <th>
                    <span class="fs-5">付款狀態</span>
                  </th>
                  <td>
                    <span
                      class="fw-bold text-danger fs-5"
                      v-if="!is_pay"
                    >
                      未付款
                    </span>
                    <span class="badge text-success fs-5" v-else
                      >已付款 <i class="bi bi-check2"></i></span
                    >
                  </td>
              </tr>
            </tbody>
          </table>
      </div>
      <button
        type="button"
        class="
          d-block
          mx-auto
          btn btn-danger
          active_bigger
          fs-4
          animation_hover
        "
        title="結帳"
        @click="openConfirmModal"
        v-if="!is_pay"
      >
        <i class="bi bi-cash-coin"></i>
        確認付款
      </button>
    </div>
  <OrderConfirmModal @payment="payment" />
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
import Clipboard from 'clipboard'
import CartTimeLine from '@/components/front/cart/CartTimeLine.vue'
import OrderConfirmModal from '@/components/front/modal/OrderConfirmModal.vue'
export default {
  inject: ['emitter'],

  components: {
    CartTimeLine,
    OrderConfirmModal
  },

  data () {
    return {
      order_user: [],
      orderId: '',
      order: [],
      create_at: 0,
      is_pay: false,
      isLoading: false,
      copy_point: false
    }
  },

  methods: {
    getOrder () {
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
        })
      }
    },
    openConfirmModal () {
      this.emitter.emit('openConfirmModal', '開啟')
    },
    payment () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '付款')
        this.emitter.emit('openConfirmModal', '關閉')
        this.emitter.emit('get_cart') //* Navbar更新
        setTimeout(() => {
          this.emitter.emit('get_orderId', this.orderId) //* 給完成訂單頁面訂單的ID
        }, 1000)
        this.$router.push('/user/order_completed')
      }).catch((err) => {
        this.isLoading = false
        this.$httpMessageState(err.response.success, '付款')
        this.emitter.emit('openConfirmModal', '關閉')
      })
    },
    copy () {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.copy_point = true
        this.$httpMessageState(true, '複製')
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$httpMessageState(false, '該瀏覽器不支援，複製')
        clipboard.destroy()
      })
    }
  },

  mounted () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/front/cart/_User_Order_Confirm.scss";
</style>
