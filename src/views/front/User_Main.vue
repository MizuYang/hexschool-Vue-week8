<template>
  <div class="sticky-footer">
    <FrontNavBar />
    <router-view />
    <FrontFooter class="sticky-bottom" />
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import FrontNavBar from '@/components/front/layout/FrontNavBar.vue'
import FrontFooter from '@/components/front/layout/FrontFooter.vue'
export default {
  provide () {
    return {
      emitter
    }
  },

  components: {
    FrontNavBar,
    FrontFooter
  },

  data () {
    return {
      collect: JSON.parse(localStorage.getItem('collect')) || []
    }
  },

  mounted () {
    emitter.emit('get_collect', this.collect) //* navbar 更新
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
