<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !pagination.has_pre }">
        <a class="page-link bg-dark" href="#" aria-label="Previous"
        @click.prevent="$emit('getOrder', pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: pages === pagination.current_page }"
        v-for="pages in pagination.total_pages"
        :key="pages"
      >
        <a class="page-link bg-dark" href="#" @click.prevent="$emit('getOrder',pages)" >
          {{ pages }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pagination.has_next }">
        <a
          class="page-link bg-dark"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('getOrder', pagination.current_page + 1)"
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
