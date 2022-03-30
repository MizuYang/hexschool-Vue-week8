<template>
  <ul class="d-flex justify-content-between list-unstyled mb-5 time_line">
    <li class="finish_1 dynamic_timeline">1. 確認商品</li>
    <li class="time_title finish_2"><span>2. 填寫資料</span></li>
    <li class="time_subtitle finish_3"><span>3. 確認訂單</span></li>
    <li class="finish_4">4. 完成訂單</li>
  </ul>
</template>
<script>
export default {
  props: ['time_line'],
  data () {
    return {
      timeLine: 0
    }
  },
  watch: {
    time_line () {
      this.change_time_line()
    }
  },
  methods: {
    change_time_line () {
      //* 判斷 結帳流程到哪
      document.querySelector('.finish_1').classList.add('class', 'dynamic_timeline')
      if (this.time_line === 2) {
        document.querySelector('.finish_2').classList.add('class', 'dynamic_timeline')
      } else if (this.time_line === 3) {
        document.querySelector('.finish_2').classList.add('class', 'dynamic_timeline')
        document.querySelector('.finish_3').classList.add('class', 'dynamic_timeline')
      } else if (this.time_line === 4) {
        document.querySelector('.finish_2').classList.add('class', 'dynamic_timeline')
        document.querySelector('.finish_3').classList.add('class', 'dynamic_timeline')
        document.querySelector('.finish_4').classList.add('class', 'dynamic_timeline')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/_mixin.scss";
@import "@/assets/stylesheets/helpers/front/cart/_Cart_TimeLine.scss";
</style>
