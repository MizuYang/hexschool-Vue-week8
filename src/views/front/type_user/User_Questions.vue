<template>
  <div class="container  mt-8 mt-sm-10 mb-5">
      <h2 class="title text-center mb-5 pt-3">
        <span class="decorate"> 常見問題 </span>
      </h2>
      <ul class="main list-unstyled">
        <div class="accordion" id="accordionExample">
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="500">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button q1 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" @click="currentQa('q1')">
                  <span class="badge bg-dark mx-1">1.</span>
                          如何購買？
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ol class="list-style">
                    <li>將喜歡的甜點加到購物車</li>
                    <li>在購物車頁確認您購買的產品及數量</li>
                    <li>填寫訂購人資料</li>
                    <li>確認資料後，完成付款後即可。</li>
                  </ol>
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="600">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed q2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" @click="currentQa('q2')">
                  <span class="badge bg-dark mx-1">2.</span>
                  購買需要先註冊會員嗎？
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  不必註冊會員即可購買。
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="700">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" @click="currentQa('q3')">
                  <span class="badge bg-dark mx-1">3.</span>
                  有哪些付款方式？
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  目前可以信用卡付款、 LINE PAY 、超商付款。
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="800">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree4" aria-expanded="false" aria-controls="collapseThree4" @click="currentQa('q4')">
                  <span class="badge bg-dark mx-1">4.</span>
                  會有發票嗎？可以開統編發票嗎？
                </button>
              </h2>
              <div id="collapseThree4" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ol>
                    <li>每筆訂單都會成立電子發票 email 給您。</li>
                    <li>也可以開立統編發票，需請在結帳資料頁填寫完整。</li>
                  </ol>
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="900">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q5" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree5" aria-expanded="false" aria-controls="collapseThree5" @click="currentQa('q5')">
                  <span class="badge bg-dark mx-1">5.</span>
                  有哪些配送方式？
                </button>
              </h2>
              <div id="collapseThree5" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  低溫宅配單筆運費160 元，滿 1000 元免運。快遞運費依送達地址計算。自取免運。
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="1000">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree6" aria-expanded="false" aria-controls="collapseThree6" @click="currentQa('q6')">
                  <span class="badge bg-dark mx-1">6.</span>
                  今天下單有辦法明天送達嗎？
                </button>
              </h2>
              <div id="collapseThree6" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  目前所有品項都是訂購後才通知店家備料製作，需要準備時間，所以無法隔日送達。
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="1100">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q7" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree7" aria-expanded="false" aria-controls="collapseThree7" @click="currentQa('q7')">
                  <span class="badge bg-dark mx-1">7.</span>
                  請問可以冷藏或冷凍嗎？可存放多久？退冰後如何食用？
                </button>
              </h2>
              <div id="collapseThree7" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  所有的產品都是建議在五天內吃完唷！而冷凍會影響口感，所以不建議冷凍。
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="1200">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q8 " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree8" aria-expanded="false" aria-controls="collapseThree8" @click="currentQa('q8')">
                  <span class="badge bg-dark mx-1">8.</span>
                  收到的商品有缺少或損壞怎麼辦？
                </button>
              </h2>
              <div id="collapseThree8" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ol>
                    <li>若收到商品嚴重破損或缺品，請於收到 2 小時內拍照，</li>
                    <li>
                      提供到 <a href="https://equatorial-alloy-23b.notion.site/Mizu_-dc646b31574641de856dd54ac3f6cc1b" target="_blank">本店粉絲團</a>
                    或來信客服信箱： <a href="mailto:psdk55052004@gmail.com">psdk55052004@gmail.com</a>   和我們反應。</li>
                  </ol>
                </div>
              </div>
            </li>
            <li class="accordion-item" data-aos="fade-right" data-aos-easing="linear" aos-delay="1000" data-aos-duration="1300">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed q9" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree9" aria-expanded="false" aria-controls="collapseThree9" @click="currentQa('q9')">
                  <span class="badge bg-dark mx-1">9.</span>
                  買太多吃不完可以退貨嗎？和想像的大小不同可以退貨嗎？
                </button>
              </h2>
              <div id="collapseThree9" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <ul>
                    <li>很抱歉，生鮮食品類商品售出後 <span class="text-danger bg-primary fw-bold">不享有鑑賞期及退換貨服務</span> 。</li>
                    <li>（自 105 年 1 月 1 日起，生鮮食品類不適用於消費者保護法第 19 條，不享有 7 天鑑賞期。）</li>
                    <li>請謹慎評估後購買。</li>
                  </ul>
                </div>
              </div>
            </li>
        </div>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      qa: ''
    }
  },

  methods: {
    //* 點擊時凸顯當前 QA
    currentQa (qa) {
      if (this.qa) {
        document.querySelector(`.${this.qa}`).classList.remove('qa_active')
        this.qa = ''
      }
      setTimeout(() => {
        document.querySelector(`.${qa}`).classList.add('qa_active')
        this.qa = qa
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss';
@import '@/assets/stylesheets/helpers/front/user/_User_Questions.scss';
</style>
