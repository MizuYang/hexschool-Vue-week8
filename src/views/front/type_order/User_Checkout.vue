<template>
  <div class="container mt-8 mt-sm-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">填寫資料</span>
    </h2>
    <TimeLine :time_line="time_line" />
    <div class="form_container">
      <UserForm />
    </div>
  </div>
</template>

<script>
import TimeLine from '@/components/front/cart/Cart_TimeLine.vue'
import UserForm from '@/components/front/cart/Checkout.vue/User_CheckoutForm.vue'
export default {
  components: {
    TimeLine,
    UserForm
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
@import '@/assets/stylesheets/helpers/_mixin.scss';
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import "@/assets/stylesheets/helpers/front/cart/order/_Checkout.scss";
</style>
