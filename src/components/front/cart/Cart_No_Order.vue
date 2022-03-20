<template>
  <div>
        <div class="text-center mt-10">
            <h3 class="mb-3">您的購物車目前沒有東西</h3>
            <router-link to="/user/products" class="btn btn-primary animation_hover active_bigger  mb-5 ">返回購物</router-link>
            <small>
                <p>如果您在購物時發生問題，請聯絡我們。</p>
            </small>
            <router-link to="/user/contact" class="btn btn-outline-primary animation_hover active_bigger" >聯絡我們</router-link>
        </div>
        <div class="banner img-fluid "></div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/cart/_Cart_No_Order.scss'
</style>
