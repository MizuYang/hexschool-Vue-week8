export default function (index) {
  const heartbreak = document.querySelector(`.heartbreak${index}`)
  const heart = document.querySelector(`.heart${index}`)
  heartbreak.style.display = 'block'
  heartbreak.style.transition = 'all 2.5s'
  setTimeout(() => {
    heart.style.display = 'block'
    heartbreak.style.display = 'none'
  }, 100)
  setTimeout(() => {
    heart.style.display = 'none'
    heartbreak.style.display = 'block'
  }, 200)
  setTimeout(() => {
    heart.style.display = 'block'
    heartbreak.style.display = 'none'
  }, 300)
  setTimeout(() => {
    heart.style.display = 'none'
    heartbreak.style.display = 'block'
  }, 400)
  setTimeout(() => {
    heart.style.display = 'block'
    heartbreak.style.display = 'none'
  }, 500)
  setTimeout(() => {
    heart.style.display = 'none'
    heartbreak.style.display = 'block'
  }, 600)
  setTimeout(() => {
    heart.style.display = 'block'
    heartbreak.style.transform = 'scale(1)'
  }, 800)
  setTimeout(() => {
    heartbreak.style.transform = 'scale(.8)'
  }, 900)
  setTimeout(() => {
    heart.style.display = 'none'
    heartbreak.style.display = 'block'
    heartbreak.style.color = '#FF9797'
    heartbreak.style.transform = 'scale(.7)'
  }, 1000)
  setTimeout(() => {
    heartbreak.style.color = '#FFB5B5'
    heartbreak.style.transform = 'scale(.6)'
  }, 1100)
  setTimeout(() => {
    heartbreak.style.opacity = '.8'
    heartbreak.style.transform = 'scale(.5)'
  }, 1200)
  setTimeout(() => {
    heartbreak.style.opacity = '.5'
    heartbreak.style.transform = 'scale(.4)'
  }, 1300)
  setTimeout(() => {
    heartbreak.style.opacity = '.3'
    heartbreak.style.transform = 'scale(.3)'
  }, 1400)
  setTimeout(() => {
    heartbreak.style.opacity = '.2'
    heartbreak.style.transform = 'scale(.1)'
  }, 1400)
  //* 初始化
  setTimeout(() => {
    heartbreak.style.display = 'none'
    heartbreak.style.opacity = '1'
    heartbreak.style.transform = 'scale(1)'
    heartbreak.style.color = 'red'
  }, 2100)
  //* 兩秒後才可以再點擊
  setTimeout(() => {
    this.heart_disabled = 0
  }, 2000)
}
