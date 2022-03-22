<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
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
          <strong class="text-danger">{{ product.title }}</strong>
          商品(刪除後將無法恢復)。
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
            @click="removeProduct(product.id)"
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
      delProductModal: '',
      product: [],
      isLoading: false
    }
  },
  methods: {
    removeProduct (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${id}`
      this.$http
        .delete(api)
        .then((res) => {
          this.$httpMessageState(res.data.success, '刪除產品')
          this.isLoading = false
          this.$emit('get_products')
          this.delProductModal.hide()
        })
        .catch((err) => {
          this.$httpMessageState(err.success, '刪除產品')
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.delProductModal = new Modal(document.getElementById('delProductModal'))
    this.emitter.on('delete_product', (product) => {
      this.product = product
      this.delProductModal.show()
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('delete_product')
  }
}
</script>
