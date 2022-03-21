<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="!tempProduct.id">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-dark">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  v-model="tempProduct.imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                  id="imageUrl"
                />
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in tempProduct.imagesUrl"
                  :key="key"
                >
                  <div class="mb-3">
                    <label for="moreImageUrl" class="form-label"
                      >圖片網址</label
                    >
                    <input
                      v-model="tempProduct.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      id="moreImageUrl"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model.number="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label for="popular" >推薦程度</label> <br>
                <input type="number" min="0" max="3" placeholder="請輸入推薦程度 1~3" id="popular"  style="width:15rem " v-model="tempProduct.popular">
                <br>
                <label for="checkbox" >打勾盒子</label> <br>
                <input type="number" min="0" max="1" placeholder="請輸入 check 預設值" id="popular"   style="width:15rem " v-model="tempProduct.checkbox">
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  > <br>
                </div>
                 <label for="checkbox" >客戶產品頁面，input_num 數量</label> <br>
                <input type="number" min="0" max="1" placeholder="請輸入產品數量 預設值" id="popular"   style="width:15rem " v-model="tempProduct.input_num">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer bg-dark">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
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
      productModal: '',
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    //* 新增或編輯 產品
    updateProduct () {
      this.isLoading = true
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      //* 如果不是新的資料，就改用 put 方法編輯資料
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      this.$http[method](api, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false
          alert(res.data.message)
          this.productModal.hide()
          this.$emit('get_products')
        })
        .catch((err) => {
          this.isLoading = false
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.productModal = new Modal(document.getElementById('productModal'))
    this.emitter.on('update_modal', (modal) => {
      if (modal.isNew === true) {
        this.isNew = true
        this.tempProduct = {
          imagesUrl: []
        }
      } else if (modal.isNew === false) {
        this.isNew = false
        this.tempProduct = modal.tempProduct
      }
      this.productModal.show()
    })
  },
  unmounted () { //* 元件銷毀之後將 emitter 註冊的事件移除
    this.emitter.off('update_modal')
  }
}
</script>
