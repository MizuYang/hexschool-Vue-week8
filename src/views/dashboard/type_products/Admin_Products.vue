<template>
  <div class="container mt-10">
    <div class="text-center my-3">
      <h2>產品列表</h2>
    </div>
    <div class="text-end my-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="openModal('new', product)"
      >
        新增產品
      </button>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div class="col border p-3" v-for="product in products" :key="product.id">
        <div class="card h-100 bg-dark" style="width: 19rem">
          <img
            :src="product.imageUrl"
            class="card-img-top img-fluid img-thumbnail mx-auto img_product"
            alt="產品圖片"
          />
          <div class="card-body bg-dark">
            <div class="mb-3">
              <h5 class="card-title">{{ product.title }}  {{ product.popular }} </h5>
              <p class="card-text">
                {{ product.description }}
              </p>
            </div>
          </div>
          <div class="card-footer justify-content-between d-flex">
            <strong v-if="product.is_enabled === 1" class="text-success fs-5"
              >已啟用</strong
            >
            <del v-else class="text-muted">未啟用</del>
            <div class="ms-auto me-1">
              <button
                class="btn btn-secondary"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-danger"
                @click="openDeleteProductModal(product)"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading v-model:active="isLoading" />
  <UpdateProductModal @getProducts="getProducts" />
  <DeleteProductModal @getProducts="getProducts" />
</template>

<script>
import emitter from '@/utils/emitter.js'
import DeleteProductModal from '@/components/dashboard/modal/product/DeleteProductModal.vue'
import UpdateProductModal from '@/components/dashboard/modal/product/UpdateProductModal.vue'
export default {
  components: {
    UpdateProductModal,
    DeleteProductModal
  },

  provide () {
    return {
      emitter
    }
  },

  data () {
    return {
      products: [],
      modal_status: {
        isNew: false,
        tempProduct: {
          imagesUrl: []
        }
      },
      isLoading: false
    }
  },

  methods: {
    getProducts () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/all`
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
        })
    },
    openModal (control, product) {
      if (control === 'new') {
        this.modal_status.isNew = true
        emitter.emit('openModal', this.modal_status)
      } else if (control === 'edit') {
        this.modal_status.isNew = false
        //* this.loading('edit', product.id)
        this.modal_status.tempProduct = JSON.parse(JSON.stringify(product))
        //* 因為在新增時多圖不是必填的選項，所以在編輯時會遇到沒有多圖 imagesUrl 陣列，無法新增多圖的情況 ，
        //* 若要新增多圖可以在 openModal 先判斷有沒有 imagesUrl 陣列，如果不存在就新增一個空的 imagesUrl 陣列
        emitter.emit('openModal', this.modal_status)
      }
      if (!this.modal_status.tempProduct.imagesUrl) {
        this.modal_status.tempProduct.imagesUrl = []
      }
    },
    openDeleteProductModal (product) {
      emitter.emit('openDeleteProductModal', product)
    }
  },

  mounted () {
    this.getProducts()
    localStorage.setItem('current_page', JSON.stringify('products'))
  }
}
</script>

<style lang="scss" scoped>
.img_product {
  object-fit: cover;
  object-position: 50% 50%;
  width: 250px;
  height: 250px;
}
</style>
