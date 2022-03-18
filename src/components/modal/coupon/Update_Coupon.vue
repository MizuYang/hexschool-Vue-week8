<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="exampleModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date"
            />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              max="100"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon(tempCoupon.id)"
          >
            {{ isNew ? "新增優惠卷" : "更新優惠券" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  inject: ['emitter'],
  data () {
    return {
      couponModal: '',
      isNew: false,
      tempCoupon: {},
      due_date: ''
    }
  },
  methods: {
    // //* 更新優惠券
    updateCoupon (id) {
      let methods = 'post'
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
      if (this.isNew) {
        //* 處理時間戳 (日期格式轉時間戳)
        this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
      } else if (!this.isNew) {
        methods = 'put'
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
        //* 處理時間戳 (日期格式轉時間戳)
        this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000)
      }
      this.$http[methods](api, { data: this.tempCoupon })
        .then((res) => {
          alert(res.data.message)
          this.couponModal.hide()
          this.$emit('get_coupon')
          this.tempCoupon = {}
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.couponModal = new Modal(document.getElementById('couponModal'))
    //* 開啟新增或編輯 modal
    this.emitter.on('updateCoupon', (item) => {
      this.couponModal.show()
      this.tempCoupon = {}
      this.due_date = ''
      this.isNew = true
      if (item) {
        this.isNew = false
        //* 先將優惠券日期外的欄位賦予上值
        this.tempCoupon = item
        //* 將時間戳轉為日期格式
        const dateAndTime = new Date(item.due_date * 1000)
          .toISOString()
          .split('T')
        //   //* 再將日期賦予上去 (日期的 v-model 是分開寫的)
        this.due_date = dateAndTime[0]
      }
      setTimeout(() => {
        this.couponModal.show()
      }, 1000)
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('updateCoupon')
  }
}
</script>
