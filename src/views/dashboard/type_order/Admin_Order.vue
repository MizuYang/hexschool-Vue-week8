<template>
  <table class="table mt-4 text-primary mt-10 container">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ filter(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled text-primary">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button" @click="view_Order(item)"  :disabled="item.id === loading_item.view">
                檢視
                  <div class="spinner-border spinner-border-sm" role="status"
                        v-show="item.id === loading_item.view">
                  </div>
              </button>
              <button class="btn btn-outline-danger btn-sm" type="button" @click="delete_order(item)"  :disabled="item.id === loading_item.delete">
                刪除
                  <div class="spinner-border spinner-border-sm" role="status"
                        v-show="item.id === loading_item.delete">
                  </div>
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderPagination :pagination="pagination" @get_order="get_order"></OrderPagination>
  <deleteModal @get_order="get_order"></deleteModal>
  <orderModal></orderModal>
  <loading></loading>
</template>

<script>
import emitter from '@/utils/emitter.js'
import deleteModal from '@/components/modal/order/Delete_Order.vue'
import orderModal from '@/components/modal/order/Update_Order.vue'
import OrderPagination from '@/components/pagination/dashboard/Order_Pagination.vue'
import loading from '@/components/utils/Loading.vue'
export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    loading,
    OrderPagination,
    orderModal,
    deleteModal
  },
  data () {
    return {
      orders: [],
      pagination: [],
      loading_item: {} //* 用來做 disabled 和 加載效果 判斷
    }
  },
  methods: {
    //* 登入驗證
    checkLogin () {
      const api = `${process.env.VUE_APP_API}/api/user/check`
      this.$http.post(api)
        .catch(() => {
          this.$router.push('/login')
        })
    },
    //* 取得訂單列表
    get_order (page) {
      emitter.emit('load', 500)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.pagination = res.data.pagination
          this.orders = res.data.orders
        })
        .catch(() => {
          this.$router.push('/login')
        })
    },
    //* 查看訂單
    view_Order (order) {
      this.loading('view', order.id)
      emitter.emit('view_order', order)
    },
    //* 刪除訂單
    delete_order (order) {
      this.loading('delete', order.id)
      emitter.emit('deleteOrder', order)
    },
    //* 日期轉換
    filter (time) {
      return new Date(time * 1000).toISOString().substring(0, 10)
    },
    //* 單個物件_加載效果
    loading (control, id) {
      this.loading_item[control] = id
      setTimeout(() => {
        this.loading_item = {}
      }, 1000)
    }
  },
  mounted () {
    //* 將儲存在 cookie 的 token 取出
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)mizuToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    this.get_order()
  }
}
</script>
