<template>
  <div class="container mt-8 mt-sm-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">填寫資料</span>
    </h2>
    <CartTimeLine :time_line="time_line" />
    <div class="form_container">
      <UserCheckoutForm />
    </div>
  </div>
</template>

<script>
import CartTimeLine from '@/components/front/cart/CartTimeLine.vue'
import UserCheckoutForm from '@/components/front/cart/UserCheckoutForm.vue'
export default {
  components: {
    CartTimeLine,
    UserCheckoutForm
  },

  data () {
    return {
      time_line: 0
    }
  },

  mounted () {
    this.time_line = 2
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/front/cart/_User_Checkout.scss";
</style>
