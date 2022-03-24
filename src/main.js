import { createApp } from 'vue'

//* 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
//* 匯入 vee-validate 相關規則
import { required, email, min, max, numeric } from '@vee-validate/rules'
//* 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n'
//* 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

//* loading
import 'vue-loading-overlay/dist/vue-loading.css'
import VueLoading from 'vue-loading-overlay'

//* AOS 滾動視差
import AOS from 'aos'
import 'aos/dist/aos.css'
import $httpMessageState from '@/utils/pushMessageState.js' //* 吐司
// import thousandths from '@/utils/thousandths.js' //*千分位
import $collectAnimation from '@/utils/collect_animation.js' //* 加入收藏
import $cancelCollectAnimation from '@/utils/cancel_collect_animation.js' //* 取消收藏

import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

//* 滾動視差初始化
AOS.init({ })

//* 定義驗證規則
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('numeric', numeric)

//* 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), //* 載入繁體中文語系
  validateOnInput: true //* 當輸入任何內容直接進行驗證
})
//* 設定預設語系
setLocale('zh_TW')

const app = createApp(App)
//* 吐司提示窗
app.config.globalProperties.$httpMessageState = $httpMessageState //* 吐司
app.config.globalProperties.$collectAnimation = $collectAnimation //* 加入收藏
app.config.globalProperties.$cancelCollectAnimation = $cancelCollectAnimation //* 取消收藏

//* 表單驗證
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

// app.config.globalProperties.$thousandths = thousandths //* 千分位
app.component('Loading', VueLoading)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
