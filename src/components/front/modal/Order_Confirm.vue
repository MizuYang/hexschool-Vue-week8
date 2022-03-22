<template>
   <div class="modal " tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title text-primary fw-bold"><i class="bi bi-exclamation-octagon-fill fs-4"></i> 注意 </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h4>請確認您的資料是否正確</h4>
            <p>如果資料正確，即可按下確認付款。</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="payment"  >確認結帳</button>
        </div>
        </div>
    </div>
</div>
  <Loading v-model:active="isLoading" />
</template>
<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  inject: ['emitter'],
  data () {
    return {
      confirm_modal: '',
      isLoading: false
    }
  },
  methods: {
    //* 付款
    payment () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '付款')
        this.confirm_modal.hide()
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$router.push('/user/order_completed')
      }).catch((err) => {
        this.isLoading = false
        this.$httpMessageState(err.response.success, '付款')
        this.confirm_modal.hide()
      })
    }
  },
  mounted () {
    this.confirm_modal = new Modal(document.querySelector('.modal'))
    //* confirm 頁面開啟確認 modal
    this.emitter.on('open_confirmModal', () => {
      this.confirm_modal.show()
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('open_confirmModal')
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/cart/_Front_Modal_Style.scss'
</style>
