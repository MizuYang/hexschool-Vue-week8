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
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 ( {{ order.id }} ) </span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"> {{ order?.user?.email }} / {{ order?.user?.name }} </strong>
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
            @click="deleteOrder(order.id)"
          >
            確認刪除
          </button>
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
      delModal: '',
      order: [],
      isLoading: false
    }
  },

  methods: {
    deleteOrder (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`
      this.$http
        .delete(api, { data: this.tempOrder })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res.data.success, '刪除訂單')
          this.delModal.hide()
          this.$emit('getOrder')
        })
        .catch((err) => {
          this.isLoading = false
          this.$httpMessageState(err.success, '刪除訂單')
        })
    }
  },

  mounted () {
    this.delModal = new Modal(document.getElementById('delModal'))
    this.emitter.on('openDeleteOrderModal', (order) => {
      this.order = order
      this.delModal.show()
    })
  },

  unmounted () {
    this.emitter.off('openDeleteOrderModal')
  }
}
</script>
