<template>
  <div class="container mt-10">
    <h2 class="title text-center pt-3 mb-4">
      <span class="decorate">完成訂單</span>
    </h2>

    <timeLine :time_line="time_line"></timeLine>

    <div class="text-center">
      <h3>感謝您的訂購</h3>
      <p>您訂購的商品將在近期安排出貨，請留意簡訊通知或配送人員的電話。</p>
    </div>
    <div class="text-center mb-3">
      <p>如果您對我們的產品有任何想法，歡迎聯絡我們。</p>
      <p>祝您有美好的一天。</p>
      <button
        type="submit"
        class="
          me-2
          btn btn-outline-primary
          send-btn
          active_bigger
          fs-4
          animation_hover
        "
        title="聯絡我們"
        @click="$router.push('/user/contact')"
      >
        <i class="bi bi-envelope-fill"></i>
        聯絡我們
      </button>

      <button
        type="submit"
        class="
          btn btn-outline-primary
          send-btn
          active_bigger
          fs-4
          animation_hover
        "
        title="返回產品列表"
        @click="$router.push('/user/products')"
      >
        <i class="bi bi-cart4"></i>
        繼續購物
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
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
export default {
  components: {
    timeLine
  },
  data () {
    return {
      time_line: 0
    }
  },
  mounted () {
    this.time_line = 4
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
//* hover 放大動畫效果
.animation_hover:hover {
    transform: scale(1.02);
}
//* active 放大
.active_bigger:active {
    transform: scale(1.05);
}
</style>
