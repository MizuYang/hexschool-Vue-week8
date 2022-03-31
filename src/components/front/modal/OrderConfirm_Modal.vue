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
            <button type="button" class="btn btn-danger" @click="this.$emit('payment')"  >確認結帳</button>
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
      confirmModal: '',
      isLoading: false
    }
  },
  mounted () {
    this.confirmModal = new Modal(document.querySelector('.modal'))
    //* confirm 頁面開啟確認 modal
    this.emitter.on('openConfirmModal', (status) => {
      if (status === '開啟') {
        this.confirmModal.show()
      } else {
        this.confirmModal.hide()
      }
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('openConfirmModal')
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/cart/_Front_Modal_Style.scss';
</style>
