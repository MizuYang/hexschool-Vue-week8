<template>
<div class="toast-container position-fixed pe-3 top-0 end-0 mt-10" style="z-index: 1500">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-for="(msg, key) in messages" :key="key">
        <div class="toast-header bg-dark text-primary">
            <span  class="rounded me-2  p-2" :class="`bg-${msg.style}`"></span>
            <strong class="me-auto">{{ msg.title }}</strong>
            <small class="text-muted text-primary"> <span class="text-primary"> just now </span> </small>
            <button type="button" class="btn-close text-primary" data-bs-dismiss="toast" aria-label="Close">X</button>
        </div>
        <div class="toast-body bg-dark" v-if="msg.content">
        {{ msg.content }}
        </div>
    </div>
</div>

</template>

<script>
import emitter from '@/utils/emitter.js'
export default {
  data () {
    return {
      messages: []
    }
  },

  methods: {
    toastShow () {
      setTimeout(() => {
        this.messages.shift()
      }, 6000)
    },
    clearToast (index) {
      this.messages.splice(index, 1)
    }
  },
  mounted () {
    emitter.on('push-message', (mes) => {
      const style = mes.style || 'success'
      const title = mes.title
      const content = mes.content
      this.messages.push({ style, title, content })
      this.toastShow()
    })
  }
}
</script>
