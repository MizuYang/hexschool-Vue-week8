export default function (index) {
  //* 收藏愛心特效
  const heart = document.querySelector(`.heart${index}`)
  heart.style.display = 'block'
  heart.style.transition = 'all .5s'
  setTimeout(() => {
    heart.style.opacity = '0.9'
    heart.style.transform = 'scale(0.5)'
  }, 100)
  setTimeout(() => {
    heart.style.opacity = '0.8'
  }, 200)
  setTimeout(() => {
    heart.style.opacity = '0.7'
  }, 300)
  setTimeout(() => {
    heart.style.opacity = '0.6'
  }, 400)
  setTimeout(() => {
    heart.style.opacity = '0.5'
    heart.style.transform = 'scale(0.1)'
  }, 500)
  setTimeout(() => {
    heart.style.opacity = '0.4'
  }, 600)
  setTimeout(() => {
    heart.style.opacity = '0.3'
  }, 700)
  setTimeout(() => {
    heart.style.opacity = '0.2'
  }, 800)
  setTimeout(() => {
    heart.style.opacity = '0.1'
  }, 900)
  setTimeout(() => {
    heart.style.opacity = '0'
  }, 1000)
  //* 初始化
  setTimeout(() => {
    heart.style.transform = 'scale(1)'
    heart.style.display = 'none'
  }, 1000)
  setTimeout(() => {
    heart.style.opacity = '10'
  }, 1000)
  //* 兩秒後才可以再點擊
  setTimeout(() => {
    this.heart_disabled = 0
  }, 2000)
}
