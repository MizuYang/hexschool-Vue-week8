<template>
<Toasts />
  <router-view/>
</template>

<script>
import Toasts from '@/components/utils/Toasts.vue'
export default {
  components: {
    Toasts
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/all';
</style>
