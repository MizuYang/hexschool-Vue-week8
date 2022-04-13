<template>
  <ul class="d-flex justify-content-between align-items-center list-unstyled mb-5 time_line">
    <li class="finish_1 timelineStyle timeLineText">確認商品</li>
    <i class="bi bi-arrow-right fs-2 me-4 arrowLeft arrowMoveLeft"></i>
    <li class=" finish_2 timeLineText"><span>填寫資料</span></li>
    <i class="bi bi-arrow-right fs-2 me-4 arrowLeft arrowMoveLeft"></i>
    <li class=" finish_3 timeLineText"><span>確認付款</span></li>
    <i class="bi bi-arrow-right fs-2 me-4 arrowLeft arrowMoveLeft"></i>
    <li class="finish_4 timeLineText">完成訂單</li>
  </ul>
</template>

<script>
export default {
  props: ['is_pay'],

  data () {
    return {
      timelineRoutePath: ''
    }
  },

  watch: {
    timelineRoutePath () {
      this.change_time_line()
    },
    is_pay () {
      document.querySelector('.finish_2').classList.add('timelineStyle')
      document.querySelector('.finish_3').classList.add('timelineStyle')
      document.querySelector('.finish_4').classList.add('timelineStyle')
    }
  },

  methods: {
    change_time_line () {
      if (this.timelineRoutePath === '/cart') {
        document.querySelector('.finish_2').classList.remove('timelineStyle')
        document.querySelector('.finish_3').classList.remove('timelineStyle')
        document.querySelector('.finish_4').classList.remove('timelineStyle')
      } else if (this.timelineRoutePath === '/checkout') {
        document.querySelector('.finish_2').classList.add('timelineStyle')
        document.querySelector('.finish_3').classList.remove('timelineStyle')
        document.querySelector('.finish_4').classList.remove('timelineStyle')
      } else if (this.$route.params.orderId) {
        document.querySelector('.finish_2').classList.add('timelineStyle')
        document.querySelector('.finish_3').classList.add('timelineStyle')
        document.querySelector('.finish_4').classList.remove('timelineStyle')
      } else if (this.timelineRoutePath === '/order_completed') {
        document.querySelector('.finish_2').classList.add('timelineStyle')
        document.querySelector('.finish_3').classList.add('timelineStyle')
        document.querySelector('.finish_4').classList.add('timelineStyle')
      }
    }
  },

  mounted () {
    this.timelineRoutePath = this.$route.path
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_rwdMixin.scss";
@import "@/assets/stylesheets/helpers/front/cart/_CartTimeLine.scss";
</style>
