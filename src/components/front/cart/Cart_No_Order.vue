<template>
    <div>
        <div class="text-center   mb-5">
            <h3 class="mb-5">您的購物車目前沒有東西</h3>
            <small>
                <p>如果您在購物時發生問題，請聯絡我們。</p>
            </small>
            <router-link to="/user/products" class="btn btn-danger animation_hover active_bigger">返回購物</router-link>
            <router-link to="/user/contact" class="btn btn-outline-primary animation_hover active_bigger ms-5" >聯絡我們</router-link>
        </div>
        <div class="text-center">
            <img src="https://github.com/MizuYang/hexschool-Vue-week8/blob/main/src/assets/imageUrl/product/l3VtdrrozG.png?raw=true" class="banner img-fluid " width="400">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_mixin.scss";
//* hover 放大動畫效果
.animation_hover:hover {
    transform: scale(1.02);
}
//* active 放大
.active_bigger:active {
    transform: scale(1.05);
}
.banner{
    opacity: .8;
    @include xs {
        width: 20rem;
    }
    @include sm {
        width: 30rem;
    }
    @include md {
        width: 40rem;
    }
}
</style>
