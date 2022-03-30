<template>
<div class="container">
      <div class="text-end mt-10 ">
    <button
      class="btn btn-primary"
      type="button"
      @click="openCouponModal(true)"
    >
      建立新的優惠券
    </button>
  </div>

  <table class="table mt-4 table-dark">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ filter(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)" :disabled="item.id === loading_item.edit"
            >
              編輯
                <div class="spinner-border spinner-border-sm" role="status"
                      v-show="item.id === loading_item.edit">
                </div>
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="openDelCouponModal(item)" :disabled="item.id === loading_item.delete"
            >
              刪除
                <div class="spinner-border spinner-border-sm" role="status"
                      v-show="item.id === loading_item.delete">
                </div>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination :coupon_pagination="coupon_pagination" @get_coupon="get_coupon"></pagination>
</div>
  <updateCoupon @get_coupon="get_coupon"></updateCoupon>
  <deleteCopon @get_coupon="get_coupon"></deleteCopon>
    <Loading v-model:active="isLoading" />
</template>

<script>
import emitter from '@/utils/emitter.js'
import updateCoupon from '@/components/dashboard/modal/coupon/Update_Coupon.vue'
import deleteCopon from '@/components/dashboard/modal/coupon/Delete_Coupon.vue'
import pagination from '@/components/dashboard/pagination/Coupon_Pagination.vue'
export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    updateCoupon,
    deleteCopon,
    pagination
  },
  data () {
    return {
      coupons: [],
      coupon_pagination: [],
      loading_item: {}, //* 用來做 disabled 和 加載效果 判斷
      isLoading: false
    }
  },
  methods: {
    //* 開啟新增、編輯優惠券 modal
    openCouponModal (status, item) {
      if (status) {
        emitter.emit('updateCoupon')
      } else if (!status) {
        const temp = JSON.parse(JSON.stringify(item)) //* 深拷貝
        emitter.emit('updateCoupon', temp)
      }
    },
    //* 開啟刪除優惠券 modal
    openDelCouponModal (item) {
      emitter.emit('openDelCoupon_Modal', item)
    },
    //     //* 取得優惠券
    get_coupon (page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
          this.coupon_pagination = res.data.pagination
        })
        .catch(() => {
          this.isLoading = false
          this.$router.push('/')
        })
    },
    //     //* 日期轉換
    filter (time) {
      return new Date(time * 1000).toISOString().substring(0, 10)
    }
  },
  mounted () {
    this.get_coupon()
    localStorage.setItem('current_page', JSON.stringify('coupon'))
  }
}
</script>
