<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 沒有前一頁 按鈕就disabled -->
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a class="page-link bg-dark" href="#" aria-label="Previous"
        @click.prevent="$emit('get_order', pagination.current_page - 1)">
          <!-- ↑↑↑ 點擊＜按鈕 等於當前頁數-1  ↑↑↑ -->
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- active 判斷 頁數是否等於當前頁數 -->
      <li
        class="page-item"
        :class="{ active: pages === pagination.current_page }"
        v-for="pages in pagination.total_pages"
        :key="pages"
      >
        <a class="page-link bg-dark" href="#"  @click.prevent="$emit('get_order',pages)" >
          {{ pages }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link bg-dark"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('get_order', pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['pagination']
}
</script>
