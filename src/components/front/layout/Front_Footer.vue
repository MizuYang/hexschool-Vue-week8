<template>
  <nav class="navbar border-top footer">
    <div class="container justify-content-evenly">
      <div>
        <ul class="list-unstyled">
          <li class="text-center fs-5 ">個人聲明</li>
          <li> - 此作品僅為練習使用，無商業用途。</li>
          <li> - 所使用圖片皆為免費資源。</li>
          <li> - 如不小心誤觸版權圖片，請聯絡我。</li>
          <li>
             - <i class="bi bi-envelope"> <a href="mailto:psdk55052004@gmail.com">psdk55052004@gmail.com</a>
               </i>
          </li>
        </ul>
      </div>
      <div>
        <router-link class="navbar-brand logo mx-auto" to="/user/home"
          ><img
            src="@/assets/imageUrl/images/LOGO_PNG_Big-removebg-preview.png"
            alt="小巷弄甜點的logo" class="animation_hover "
            width="200"
             title="首頁"
        /></router-link>
      </div>
      <div class="text-center">
         <div class="d-flex flex-sm-wrap menu">
              <router-link to="/user/products" class="nav-link text-center animation_hover" @click="current('productList')">產品列表</router-link>
              <router-link to="/user/questions" class="nav-link text-center animation_hover" @click="current('qa')">常見問題</router-link>
              <router-link to="/user/about" class="nav-link text-center animation_hover" @click="current('about')">關於我們</router-link>
              <router-link to="/user/contact" class="nav-link text-center animation_hover" @click="current('contact')">聯絡我們</router-link>
              <router-link to="/" class="nav-link text-center animation_hover" ><i class="bi bi-key"></i>企業登入</router-link>
          </div>
          <div>
              <a href="https://github.com/MizuYang" target="_blank" class="fs-3 me-2 px-2" title="連到 github">
                  <i class="bi bi-github"></i>
              </a>
              <a href="https://equatorial-alloy-23b.notion.site/Mizu_-dc646b31574641de856dd54ac3f6cc1b" target="_blank"  class="fs-3" title="連到個人部落格">
                  <i class="bi bi-facebook"></i>
              </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import emitter from '@/utils/emitter.js'
export default {
  methods: {
    current (page) {
      emitter.emit('currentPage', page)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/layout/_Footer.scss'
</style>
