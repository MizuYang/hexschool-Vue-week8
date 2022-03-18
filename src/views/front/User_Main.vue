<template>
  <div class="sticky-footer">
    <navbar></navbar>

    <router-view></router-view>

    <Footer class="sticky-bottom"></Footer>
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'
import navbar from '@/components/layout/front/Front_NavBar.vue'
import Footer from '@/components/layout/front/Front_Footer.vue'
export default {
  provide () {
    return {
      emitter
    }
  },
  components: {
    navbar,
    Footer
  }
}
</script>
<style lang="scss" scoped>
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sticky-bottom {
  margin-top: auto;
}
</style>
