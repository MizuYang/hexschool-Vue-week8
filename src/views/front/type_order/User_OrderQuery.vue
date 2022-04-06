<template>
  <div class="container  mt-8 mt-sm-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">查詢訂單</span>
    </h2>
    <div class="order_container">
      <div class="input-group mb-5 search_content">
        <div class="mx-auto">
              <label class="mx-auto mb-3 order_title" for="orderId"
              >請輸入訂單編號( 20碼 )</label>
              <input
                  type="text"
                  placeholder="請輸入訂單編號"
                  id="orderId"
                  class="input-group-text bg-dark text-primary order_id_text"
                  v-model.trim="order_id"/>
              <button
                  type="button"
                  class="send_btn"
                  :class="{ disabled_btn: order_id.length !== 20 }"
                  @click="getAllOrder"
                  :disabled="order_id.length !== 20">送出</button>
              <p>
              <span
                  class="badge text-danger fw-bold bg-primary d-none error_id_text"
                  >請輸入正確的 20碼 訂單編號！</span>
              </p>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-12 col-xxl-4">
          <ul class="list-unstyled p-5 border  h-100">
            <li><h3 class="border-bottom pb-2 ">訂單資料</h3></li>
            <li class="mx-auto">訂單編號：<p style="width:250px">{{ queryOrder[0]?.id }}</p></li>
            <li>購買日期：{{ create_at }}</li>
            <li>付款方式：{{ order_user.pay_method }}</li>
            <li class="mb-3">
              是否付款：
              <span class="text-success fw-bold bg-primary" v-if="is_pay"
                >已付款</span
              >
              <span
                class="badge fw-bold text-danger bg-primary"
                v-if="is_pay === false"
                >未付款</span
              >
            </li>
            <li>
              <button
                type="button"
                class="btn btn-danger"
                title="前往結帳流程"
                @click="
                  this.$router.push(`/user/order_confirm/${queryOrder[0]?.id}`)
                "
                v-if="is_pay === false"
              >
                前往付款
              </button>
            </li>
          </ul>
        </div>
        <div class="col-12 col-xxl-4">
          <ul class="list-unstyled p-5 border  h-100">
            <li><h3 class="border-bottom pb-2">訂購人資料</h3></li>
            <li>姓名：{{ order_user.name }}</li>
            <li>手機：{{ order_user.tel }}</li>
            <li>信箱：{{ order_user.email }}</li>
            <li>地址：{{ order_user.address }}</li>
          </ul>
        </div>
        <div class="col-12 col-xxl-4">
          <ul class="list-unstyled p-5 border  h-100">
            <li><h3 class="border-bottom pb-2">購買產品</h3></li>
            <li
              v-for="product in order_products"
              :key="product.id"
              class="py-2 lh-1 border-bottom"
            >
              <p>{{ product.product.title }} * {{ product.qty }}</p>
              <p>單價：{{ product.product.price }} 元</p>
              <p v-if="product.total > product.final_total">小計：{{ product.final_total }} 元 <span class="text-success fw-bold">(優惠券)</span></p>
              <p v-else>小計：{{ product.total }} 元</p>
            </li>
            <li class="border-top pt-2" v-if="queryOrder[0]?.total">總金額：{{ $thousandths(queryOrder[0]?.total) }} 元</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="banner"></div>
  </div>
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
export default {
  inject: ['emitter'],

  data () {
    return {
      isLoading: false,
      order_id: '',
      all_order: [],
      queryOrder: [], //* 要查詢的訂單
      order_user: [],
      order_products: [],
      create_at: '',
      is_pay: ''
    }
  },

  watch: {
    order_id () {
      const btn = document.querySelector('.send_btn')
      if (this.order_id.length !== 20) {
        btn.style.cursor = 'no-drop' //* 滑鼠禁用圖示
      } else {
        btn.style.cursor = 'pointer' //* 滑鼠手指圖示
      }
    }
  },

  methods: {
    getAllOrder () {
      if (this.order_id.length !== 20) {
        return
      }
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`
      this.$http.get(api).then((res) => {
        this.isLoading = false
        this.all_order = res.data.orders //* 此為所有訂單
        this.filterOrder() //* 篩選出我們要的那筆訂單
        this.create_at = this.queryOrder[0].create_at
        this.create_at = new Date(this.create_at * 1000)
          .toISOString()
          .substring(0, 10)
        this.order_user = this.queryOrder[0].user
        this.order_products = this.queryOrder[0].products
        this.is_pay = this.queryOrder[0].is_paid
      })
    },
    orderIdCheck () {
      if (this.queryOrder.length === 0) {
        //* 輸入的ID與篩選出來的訂單ID沒有符合的就是他打錯了
        document.querySelector('.error_id_text').classList.remove('d-none') //* 顯示錯誤
        this.order_id = ''
        this.$httpMessageState(false, '訂單編號不存在，查詢')
      } else if (this.queryOrder.length > 0) {
        //* 搜尋正確的話就隱藏錯誤提示
        document.querySelector('.error_id_text').classList.add('d-none')
        this.$httpMessageState(true, '查詢訂單')
      }
    },
    filterOrder () {
      this.queryOrder = this.all_order.filter((order) => order.id === this.order_id)
      this.orderIdCheck()
    }
  },

  mounted () {
    document.querySelector('.order_id_text').focus()
    this.emitter.on('queryOrder', (orderId) => {
      this.order_id = orderId
      this.getAllOrder()
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/front/_pseudo_el_title.scss";
@import "@/assets/stylesheets/helpers/loading_css.scss";
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/user/_User_OrderQuery.scss";
</style>
