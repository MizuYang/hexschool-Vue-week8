<template>
  <div class="container mt-10 ">
    <h2 class="title text-center pt-sm-3">
      <span class="decorate mb-5">連絡我們</span>
    </h2>
    <div class="text-center d-flex mb-5 flex-wrap ">
        <div class="content">
          <div  class=" banner img-fluid row" alt="banner"></div>
        </div>
        <ul class="list-unstyled col d-flex align-items-center justify-content-center flex-column">
            <li class="mb-4 pt-5"><h3>謝謝您的意見與回饋！</h3></li>
            <li><p>感謝所有支持者們給予我們的意見反應與回饋。</p></li>
            <li><p>您的寶貴建議是讓我們進步的最大動力。</p></li>
            <li><p>您也可以先參考常見問題，看是否能解決您的問題。</p></li>
            <li><button type="button" class="btn btn-outline-primary" @click="$router.push('/user/questions')">常見問題</button></li>
        </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_mixin.scss";
@import "@/assets/stylesheets/helpers/front/user/_Get_Contact.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
</style>
