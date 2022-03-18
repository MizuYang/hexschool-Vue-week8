<template>
  <div class="container mt-10 ">
    <h2 class="title text-center mb-5 mb-xl-8 mb-xxl-10   pt-3">
      <span class="decorate">連絡我們</span>
    </h2>
<div class="text-center">
    <img src="@/assets/imageUrl/banner/bXMwvjYRKB.png" class=" banner img-fluid" alt="banner">
    <ul class="list-unstyled">
        <li><h3>謝謝您的意見與回饋！</h3></li>
        <li><p>感謝所有支持者們給予我們的意見反應與回饋。</p></li>
        <li><p>您的寶貴建議是讓我們進步的最大動力。</p></li>
        <li><p>您也可以先參考常見問題，看是否能解決您的問題。</p></li>
        <li><button type="button" class="btn btn-outline-primary" @click="this.$router.push('/user/questions')">常見問題</button></li>
    </ul>

</div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/front/user/_Get_Contact.scss";
</style>
