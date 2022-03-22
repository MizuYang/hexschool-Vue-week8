<template>

<toasts></toasts>

  <router-view/>

</template>

<script>
import toasts from '@/components/utils/Toasts.vue'
export default {
  components: {
    toasts
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/all';
</style>
