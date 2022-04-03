<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary fw-bold">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <label for="couponCodeText" class="text-center d-block mb-1">輸入優惠碼</label>
          <input
            type="text"
            v-model="couponCodeText"
            class="text-center w-100"
            id="couponCodeText"
          />
          <i class="text-danger" v-if="!couponCodeText"
            >*查詢不到您輸入的優惠代碼！</i
          >
          <br />
          <div class="accordion" id="accordionExample">
            <div class="accordion-item mt-5" aria-expanded="true">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button q1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-controls="collapseOne"
                >
                  查看全站優惠券
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <ul class="list-style">
                    <li>小巷弄限定優惠</li>
                    <li>
                      優惠碼：<span class="text-success fw-bold"
                        >my_coupon</span
                      >
                    </li>
                    <li>折扣 <span class="text-success fw-bold">50</span> %</li>
                    <li>
                      到期日：<span class="text-success fw-bold"
                        >2026-10-31</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="$emit('useCoupon', couponCodeText)"
          >
            使用優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import Clipboard from 'clipboard'
export default {
  inject: ['emitter'],

  data () {
    return {
      couponModal: '',
      copy_point: false,
      couponCodeText: 'my_coupon',
      couponCopy: 'my_coupon',
      emits: ['useCoupon'],
      orderId: ''
    }
  },

  methods: {
    copy () {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on('success', (e) => {
        this.$httpMessageState(true, '複製')
        this.copy_point = true
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        this.$httpMessageState(false, '該瀏覽器不支援，複製')
        clipboard.destroy()
      })
    }
  },

  mounted () {
    this.couponModal = new Modal(document.querySelector('.modal'))
    this.emitter.on('openCouponModal', (methods) => {
      if (methods === '開啟') {
        this.couponModal.show()
      } else if (methods === '關閉') {
        this.couponModal.hide()
      } else if (methods === '錯誤') {
        this.couponCodeText = ''
      }
    })
  },

  unmounted () {
    this.emitter.off('openCouponModal')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/cart/_FrontModalStyle.scss";
.accordion-button {
  background: #000;
  color: #f1ebd8;
}
.accordion-button:hover {
  background: #333127;
  color: #f1ebd8;
}
.accordion-body {
  background: #000;
  font-size: 1.2rem;
  @include xs {
    font-size: 1rem;
  }
}
.accordion-header {
  border-bottom: 1px solid #f1ebd8;
}
.accordion-item {
  border-top: 1px solid #f1ebd8;
  margin-bottom: 0.3rem;
}
</style>
