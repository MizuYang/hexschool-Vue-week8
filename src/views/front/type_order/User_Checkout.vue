<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">填寫資料</span>
    </h2>

    <timeLine :time_line="time_line"></timeLine>

    <div class="">
      <Form action="/" v-slot="{ errors }" class="" ref="form" @submit="send_order">
        <div class="row g-5">
          <div class="col-12 col-lg-6 border p-5 pb-0">
            <h3 class="border-bottom">訂購人資料</h3>
            <div class="mb-1">
              <label for="name"> 姓名 </label>
              <Field
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              >
              </Field>
              <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-1">
              <label for="email"> E-mail </label>
              <Field
                type="email"
                id="email"
                placeholder="請輸入E-mail"
                class="form-control"
                name="信箱"
                rules="email|required"
                :class="{ 'is-invalid': errors['信箱'] }"
                v-model="form.user.email"
              >
              </Field>
              <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-1">
              <label for="tel" class="form-label">收件人電話</label>
              <Field
                id="tel"
                name="電話"
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors['電話'] }"
                :rules="isPhone"
                placeholder="請輸入電話 / 例：09xxxxxxxx"
                maxlength="10"
                v-model="form.user.tel"
              ></Field>
              <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
            </div>
            <div class="mb-1">
              <label for="category"> 選擇付款方式 </label>
              <Field
                id="category"
                name="付款方式"
                class="form-control"
                :class="{ 'is-invalid': errors['付款方式'] }"
                rules="required"
                as="select"
                v-model="form.user.pay_method"
              >
                <option value="" disabled>請選擇付款方式</option>
                <option value="現金 / 限自取">現金 / 限自取</option>
                <option value="信用卡付款">信用卡付款</option>
                <option value="超商付款">超商付款</option>
                <option value="LINE PAY">LINE PAY</option>
              </Field>
              <ErrorMessage
                name="付款方式"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mb-1">
              <label for="address"> 地址 </label>
              <Field
                type="address"
                id="address"
                placeholder="請輸入地址"
                class="form-control"
                name="地址"
                rules="required"
                :class="{ 'is-invalid': errors['地址'] }"
                v-model="form.user.address"
              >
              </Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
          </div>
          <div class="col-12 col-lg-6 text-center justify-content-center border p-5">
            <h3 class="border-bottom mb-4">
              <i class="bi bi-credit-card-2-front-fill"></i> 信用卡資料
            </h3>
            <div class="row">
              <div class="mb-1 d-flex justify-content-center">
                <Field
                  id=""
                  name="卡號"
                  type="text"
                  class="form-control mb-3"
                  :class="{ 'is-invalid': errors['卡號'] }"
                  placeholder="0000"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="4"
                  v-model="form.user.card1"
                >
                </Field>
                <ErrorMessage
                  name="卡號"
                  class="invalid-feedback"
                ></ErrorMessage>
                -
                <Field
                  id=""
                  name="卡號2"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['卡號2'] }"
                  placeholder="0000"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="4"
                  v-model="form.user.card2"
                >
                </Field>
                <ErrorMessage
                  name="卡號2"
                  class="invalid-feedback"
                ></ErrorMessage>
                -
                <Field
                  id=""
                  name="卡號3"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['卡號3'] }"
                  placeholder="0000"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="4"
                  v-model="form.user.card3"
                >
                </Field>
                <ErrorMessage
                  name="卡號3"
                  class="invalid-feedback"
                ></ErrorMessage>
                -
                <Field
                  id=""
                  name="卡號4"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['卡號4'] }"
                  placeholder="0000"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="4"
                  v-model="form.user.card4"
                >
                </Field>
                <ErrorMessage
                  name="卡號4"
                  class="invalid-feedback"
                ></ErrorMessage>
                <div></div>
              </div>
              <div class="d-flex col-12 justify-content-center">
                <Field
                  id=""
                  name="卡號5"
                  type="text"
                  class="form-control mb-2"
                  :class="{ 'is-invalid': errors['卡號5'] }"
                  placeholder="1/1"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="3"
                  v-model="form.user.card5"
                >
                </Field>
                <ErrorMessage
                  name="卡號5"
                  class="invalid-feedback"
                ></ErrorMessage>
                /
                <Field
                  id=""
                  name="卡號6"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['卡號6'] }"
                  placeholder="123"
                  rules="required"
                  style="width: 70px; height: 30px"
                  maxlength="3"
                  v-model="form.user.card6"
                >
                </Field>
                <ErrorMessage
                  name="卡號6"
                  class="invalid-feedback"
                ></ErrorMessage>
                /
                <Field
                  id=""
                  name="持卡者名稱"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['持卡者名稱'] }"
                  placeholder="英文名稱"
                  rules="required"
                  style="width: 150px; height: 30px"
                  maxlength="3"
                  v-model="form.user.card_username"
                >
                </Field>
                <ErrorMessage
                  name="持卡者名稱"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>
            </div>
            <label for="textarea">留言</label> <br />
            <textarea name="留言" id="textarea" cols="30" rows="8" model="form.message"></textarea>
          </div>
          <div class="col-12 border p-5">
            <h3 class="border-bottom text-center">訂單明細</h3>
            <div class="d-flex align-items-start table-responsive">
              <table
                class="table align-middle text-center text-primary table-hover w-75 mx-auto"
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
                    <td><img class="img_product mx-auto img-fluid" :src="`${product.product.imageUrl}`"></td>
                    <td><p>{{ product.product.title }}</p></td>
                    <td><p>{{ product.qty }}個</p></td>
                    <td><p> {{ product.total }} 元</p></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span class="badge  bg-primary text-success" v-if="has_coupon">已使用優惠券</span>
                    </td>
                    <td v-if="has_coupon">使用折扣為：<span class="text-success fw-bold">{{ coupon_price }}</span> %</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>總價： <span class="text-success fw-bold fs-3">{{total}}</span> 元</td>
                  </tr>
                  <tr>
                    <td>
                      <router-link
                        to="/user/cart"
                        class="
                          btn btn-secondary
                          active_bigger
                          fs-4
                          animation_hover
                        "
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
                      >
                        下一步
                      </button>
                      <router-link
                        to="/user/cart"
                        class="
                          btn btn-secondary
                          active_bigger
                          fs-4
                          animation_hover
                        "
                        title="上一步"
                        v-else
                        >上一步</router-link>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div></div>
            </div>
          </div>
        </div>
        <div></div>
        <div class="text-end"></div>
      </Form>
    </div>
  </div>
</template>
<script>
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
// import ordererInfo from '@/components/cart/order/Orderer _Info.vue'
export default {
  components: {
    timeLine
    // ,ordererInfo
  },
  data () {
    return {
      time_line: 2,
      cartData: [],
      total: 0,
      has_coupon: false,
      coupon_price: 0,
      form: {
        user: {
          name: '王先生',
          email: '123456@gmail.com',
          tel: '0999999123',
          address: '台北',
          pay_method: '超商',
          card1: '123',
          card2: '312',
          card3: '312',
          card4: '312',
          card5: '312',
          card6: '312',
          card_username: '王先生的卡片'
        }
      }
    }
  },
  methods: {
    //* 取得購物車
    getCartList () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.cartData = res.data.data.carts
        const total = res.data.data.total //* 總價
        const couponPrice = res.data.data.final_total//* 優惠後價格
        if (total === couponPrice) { //* 如果總價等於優惠價 = 沒優惠
          this.total = total
        } else if (total > couponPrice) { //* 如果總價大於優惠價格 = 有優惠
          this.total = couponPrice
          this.has_coupon = true
          this.coupon_price = couponPrice / total * 100 //* 算出折扣
        }
      })
    },
    //* 發送訂單
    send_order () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      this.$http.post(api, { data: this.form }).then((res) => {
        const orderId = res.data.orderId
        this.$router.push(`/user/order_confirm/${orderId}`)
      }).catch((err) => {
        alert(err.response.data.message)
        this.$router.push('/user/products')
      })
    },
    //* 電話驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入 09 開頭的正確電話號碼'
    }
  },
  mounted () {
    this.getCartList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/cart/order/_Checkout.scss";
</style>
