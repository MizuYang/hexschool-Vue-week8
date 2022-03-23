<template>
  <div class="sticky-footer">
    <navbar></navbar>
    <router-view></router-view>

    <Footer class="sticky-bottom"></Footer>
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import navbar from '@/components/front/layout/Front_NavBar.vue'
import Footer from '@/components/front/layout/Front_Footer.vue'
export default {
  provide () {
    return {
      emitter
    }
  },
  data () {
    return {
      collect: JSON.parse(localStorage.getItem('collect')) || [] //* 如果 localstorage 沒資料就是空陣列
    }
  },
  components: {
    navbar,
    Footer
  },
  mounted () {
    emitter.emit('get_collect', this.collect) //* 請 navbar 更新收藏產品資料
  }
}
</script>
<style lang="scss" scoped>
//* footer 置底
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sticky-bottom {
  margin-top: auto;
}
</style>
