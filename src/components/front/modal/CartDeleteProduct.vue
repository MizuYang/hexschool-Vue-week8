<template>
<div class="modal " tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title text-danger fw-bold"><i class="bi bi-exclamation-octagon-fill fs-4"></i> 刪除 </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p v-if="delete_status === '刪除單一產品'">您確定要刪除 <span class="text-danger fw-bold"> {{ product_title }} </span> 嗎？(此動作無法恢復)</p>
            <p v-if="delete_status === '刪除多個產品'">您確定要刪除 <span class="text-danger fw-bold"> 勾選商品 </span> 嗎？(此動作無法恢復)</p>
            <p v-if="delete_status === '刪除全部'">您確定要刪除 <span class="text-danger fw-bold"> 所有商品 </span> 嗎？(此動作無法恢復)</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct"  v-if="delete_status === '刪除單一產品'">刪除</button>
            <button type="button" class="btn btn-danger" @click="delete_check_product" v-if="delete_status === '刪除多個產品'">刪除</button>
            <button type="button" class="btn btn-danger" @click="delete_all_cart" v-if="delete_status === '刪除全部'">刪除</button>
        </div>
        </div>
    </div>
</div>
<Loading v-model:active="isLoading">
    <div class="cssload-container">
      <div class="cssload-dot"></div>
      <div class="step" id="cssload-s1"></div>
      <div class="step" id="cssload-s2"></div>
      <div class="step" id="cssload-s3"></div>
    </div>
</Loading>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  inject: ['emitter'],
  data () {
    return {
      delete_modal: '',
      product_title: '',
      product_id: '',
      checkbox_productId: [],
      delete_status: '',
      isLoading: false
    }
  },
  methods: {
    //* 刪除單一產品
    deleteProduct () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${this.product_id}`
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$httpMessageState(res.data.success, '刪除產品')
        this.delete_modal.hide()
        this.$emit('getCartList')
      })
    },
    //* 刪除勾選產品
    delete_check_product () {
      this.isLoading = true
      //* 把勾選的產品 id 跑回圈去刪除
      this.checkbox_productId.forEach((id) => {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        this.$http.delete(api).then(() => {
          this.$httpMessageState(true, '刪除勾選產品')
          this.isLoading = false
          this.emitter.emit('get_cart') //* 請 Navbar更新數字
          this.$emit('getCartList', '已刪除勾選商品') //* 如果刪除勾選商品，就讓購物車頁面隱藏刪除勾選按鈕
          this.delete_modal.hide()
        })
      })
    },
    //* 清空購物車
    delete_all_cart () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(api).then((res) => {
        this.isLoading = false
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
        this.$httpMessageState(res.data.success, '清空購物車')
        this.$emit('getCartList')
        this.delete_modal.hide()
      })
    }
  },
  mounted () {
    this.delete_modal = new Modal(document.querySelector('.modal'))
    //* 開啟刪除 modal
    this.emitter.on('openDeleteModal', (data) => {
      if (data?.status === '勾選刪除') {
        this.delete_status = '刪除多個產品'
        this.checkbox_productId = data.id
        this.delete_modal.show()
      } else if (data?.status === '刪除單一產品') {
        this.delete_status = '刪除單一產品'
        this.product_title = data?.product?.product?.title
        this.product_id = data?.product.id
        this.delete_modal.show()
      } else {
        this.delete_status = '刪除全部'
        this.delete_modal.show()
      }
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('openDeleteModal')
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/cart/_Front_Modal_Style.scss';
@import "@/assets/stylesheets/helpers/loading_css.scss"; //* loading CSS;
</style>
