<template>
  <div class="container mt-8 mt-sm-10 banner">
    <h2 class="title text-center pt-3 mb-4">
      <span class="decorate">完成訂單</span>
    </h2>
    <CartTimeLine />
</div>
  <div>
      <div class="text-center mt-3">
          <h3>感謝您的訂購 <span class="fw-bold">(已付款)</span> </h3>
          <p>請妥善保管您的訂單編號：
          <button type="button" class="btn btn-outline text-primary fw-bold border-bottom id tag-read" :data-clipboard-text="order_Id" @click="copy">{{ order_Id }}</button>
          <button type="button" class="btn btn-outline-primary btn-sm ms-2 tag-read" :data-clipboard-text="order_Id" @click="copy">
            複製
            <span class="copy_point ms-2 text-success badge bg-primary" :class="{ 'd-none': !copy_point }"><i class="bi bi-check-lg"></i></span>
          </button>
          </p>
          <p>您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。</p>
      </div>
      <div class="text-center mb-3">
          <p>如果您對我們的產品有任何想法，歡迎聯絡我們。</p>
          <p>祝您有美好的一天。</p>
          <button
            type="button"
            class="
              me-2
              btn btn-outline-primary
              send-btn
              active_bigger
              fs-4
              animation_hover
            "
            title="聯絡我們"
            @click="$router.push('/contact')"
          >
            <i class="bi bi-envelope-fill"></i>
            聯絡我們
          </button>
          <button
            type="button"
            class="
              me-2
              btn btn-outline-primary
              send-btn
              active_bigger
              fs-4
              animation_hover
            "
            title="返回產品列表"
            @click="$router.push('/products')"
          >
            <i class="bi bi-cart4"></i>
            繼續購物
          </button>
          <button
            type="button"
            class="
              btn btn-outline-primary
              send-btn
              active_bigger
              fs-4
              animation_hover mt-1 mt-sm-0
            "
            title="查詢訂單"
            @click="queryOrder(order_Id)"
          >
            <i class="bi bi-cart4"></i>
            訂單查詢
          </button>
      </div>
      <div class="text-center border-top pt-4">
          <p>如果你喜歡我的作品，也歡迎聯絡我。</p>
          <div>
              <a
                href="https://github.com/MizuYang"
                target="_blank"
                class="fs-3 me-2 px-2"
                title="連到 github"
              >
                <i class="bi bi-github"></i>
              </a>
              <a
                href="https://equatorial-alloy-23b.notion.site/Mizu_-dc646b31574641de856dd54ac3f6cc1b"
                target="_blank"
                class="fs-3"
                title="連到個人部落格"
              >
                <i class="bi bi-facebook"></i>
              </a>
          </div>
          <br />
      </div>
  </div>
</template>

<script>
import CartTimeLine from '@/components/front/cart/CartTimeLine.vue'
import Clipboard from 'clipboard'
export default {
  inject: ['emitter'],

  components: {
    CartTimeLine
  },

  data () {
    return {
      order_Id: JSON.parse(localStorage.getItem('orderId')) || '',
      copy_point: false
    }
  },

  methods: {
    copy () {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$httpMessageState(true, '複製')
        this.copy_point = true
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$httpMessageState(false, '該瀏覽器不支援，複製')
        clipboard.destroy()
      })
    },
    queryOrder (orderId) {
      setTimeout(() => {
        this.emitter.emit('queryOrder', orderId)
      }, 1000)
      this.$router.push('/query_order')
    }
  },

  mounted () {
    this.emitter.on('get_orderId', (orderId) => { //* 接收確認訂單傳來的訂單編號
      this.order_Id = orderId
      localStorage.setItem('orderId', JSON.stringify(orderId))//* 將ID儲存起來，避免使用者案重新整理後會消失
    })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import '@/assets/stylesheets/helpers/front/cart/_User_Order_Completed.scss';
</style>
