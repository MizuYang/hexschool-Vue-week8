<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog  modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-danger">
          是否刪除
          <strong class="text-danger">{{ item.title }}</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="del_coupon(item.id)"
          >
            確認刪除
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
      del_modal: '',
      item: {}
    }
  },
  methods: {
    //* 刪除優惠券
    del_coupon (id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
      this.$http
        .delete(api)
        .then((res) => {
          this.$httpMessageState(res.data.success, '刪除優惠券')
          this.del_modal.hide()
          this.$emit('get_coupon')
        })
        .catch((err) => {
          this.$httpMessageState(err.success, '刪除優惠券')
        })
    }
  },
  mounted () {
    this.del_modal = new Modal(this.$refs.modal)
    this.emitter.on('openDelCoupon_Modal', (item) => {
      this.item = item
      this.del_modal.show()
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('openDelCoupon_Modal')
  }
}
</script>
