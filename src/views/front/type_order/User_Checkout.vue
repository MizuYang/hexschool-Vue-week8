<template>
  <div class="container mt-10 mb-5">
    <h2 class="title text-center mb-5 pt-3">
      <span class="decorate">填寫資料</span>
    </h2>

    <timeLine :time_line="time_line"></timeLine>

    <div>
      <userForm ></userForm>
    </div>
  </div>
</template>
<script>
import timeLine from '@/components/front/cart/Cart_TimeLine.vue'
import userForm from '@/components/front/cart/Checkout.vue/Checkout_form.vue'
export default {
  components: {
    timeLine,
    userForm
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
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/cart/order/_Checkout.scss";
</style>
