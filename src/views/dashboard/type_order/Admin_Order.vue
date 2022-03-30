<template>
<div class="container">
  <div class="text-end mt-10  mb-3">
      <button type="button" class="btn btn-danger" value="全部刪除" @click="delete_order_all">全部刪除</button>
  </div>
  <table class="table  text-primary  ">
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
          <td>{{ date(item.create_at) }}</td>
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
              <button class="btn btn-outline-primary btn-sm" type="button" @click="view_Order(item)"  >
                檢視

              </button>
              <button class="btn btn-danger btn-sm" type="button" @click="delete_order(item)"  >
                刪除

              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</div>

  <OrderPagination :pagination="pagination" @get_order="get_order"></OrderPagination>
  <deleteModal @get_order="get_order"></deleteModal>
  <orderModal @get_order="get_order"></orderModal>
    <Loading v-model:active="isLoading" />
</template>

<script>
import emitter from '@/utils/emitter.js'
import deleteModal from '@/components/dashboard/modal/order/Delete_Order.vue'
import orderModal from '@/components/dashboard/modal/order/Update_Order.vue'
import OrderPagination from '@/components/dashboard/pagination/Order_Pagination.vue'
export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    OrderPagination,
    orderModal,
    deleteModal
  },
  data () {
    return {
      orders: [],
      pagination: [],

      isLoading: false
    }
  },
  methods: {
    //* 取得訂單列表
    get_order (page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false
          this.pagination = res.data.pagination
          this.orders = res.data.orders
        })
    },
    //* 查看訂單
    view_Order (order) {
      emitter.emit('view_order', order)
    },
    //* 刪除訂單
    delete_order (order) {
      emitter.emit('deleteOrder', order)
    },
    //* 日期轉換
    date (time) {
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
      // return new Date(time * 1000).toISOString().substring(0, 10)
    },
    //* 全部刪除
    delete_order_all () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/all`
      this.$http
        .delete(api)
        .then((res) => {
          this.isLoading = false
          this.get_order()
        })
    }
  },
  mounted () {
    this.get_order()
    localStorage.setItem('current_page', JSON.stringify('order'))
  }
}
</script>
