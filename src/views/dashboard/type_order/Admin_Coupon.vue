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
        <td>{{ changeDate(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="openDelCouponModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
<PaginationCoupon :pagination="pagination" @getCoupon="getCoupon" />
</div>
<UpdateCouponModal @getCoupon="getCoupon" />
<DeleteCouponModal @getCoupon="getCoupon" />
<Loading v-model:active="isLoading" />
</template>

<script>
import emitter from '@/utils/emitter.js'
import UpdateCouponModal from '@/components/dashboard/modal/coupon/UpdateCouponModal.vue'
import DeleteCouponModal from '@/components/dashboard/modal/coupon/DeleteCouponModal.vue'
import PaginationCoupon from '@/components/dashboard/pagination/PaginationCoupon.vue'
export default {
  provide () {
    return {
      emitter
    }
  },

  components: {
    UpdateCouponModal,
    DeleteCouponModal,
    PaginationCoupon
  },

  data () {
    return {
      coupons: [],
      pagination: [],
      isLoading: false
    }
  },

  methods: {
    openCouponModal (status, item) {
      if (status) {
        emitter.emit('openCouponModal')
      } else if (!status) {
        const temp = JSON.parse(JSON.stringify(item))
        emitter.emit('openCouponModal', temp)
      }
    },
    openDelCouponModal (item) {
      emitter.emit('openDelCouponModal', item)
    },
    getCoupon (page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.isLoading = false
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        })
    },
    changeDate (time) {
      return new Date(time * 1000).toISOString().substring(0, 10)
    }
  },

  mounted () {
    this.getCoupon()
    localStorage.setItem('current_page', JSON.stringify('coupon'))
  }
}
</script>
