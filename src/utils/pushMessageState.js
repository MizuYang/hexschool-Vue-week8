import emitter from '@/utils/emitter.js'

export default function (res, title = '更新') {
  if (res) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`
    })
  }
}
