<template>
    <div class="text-center mb-5 content">
      <h3 class="mb-5">購物車目前沒東西</h3>
      <small>
        <p>如果您在購物時發生問題，請聯絡我們。</p>
      </small>
      <div class="mt-5">

          <router-link
            to="/user/contact"
            class="btn btn-outline-primary animation_hover active_bigger me-5"
            >聯絡我們</router-link
          >
          <router-link
            to="/user/products"
            class="btn btn-danger animation_hover active_bigger"
            >返回購物</router-link
          >
      </div>
    </div>
    <div class="banner img-fluid"></div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/cart/Cart_No_Order.scss";
</style>
