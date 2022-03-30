<template>
  <swiper>
    <swiper-slide> </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js'
import { Autoplay, EffectCards } from 'swiper'

import 'swiper/swiper.scss' // core Swiper
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/pagination/pagination.min.css'
export default {
  inject: ['emitter'],
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      modules: [Autoplay, EffectCards],
      slidesPerView: 4,
      products: [],
      temp_product: [],
      isLoading: false,
      add_product_Data: {
        product_id: '',
        qty: 1
      }
    }
  },
  methods: {
    //* 取得產品
    get_products () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.temp_product = res.data.products
      })
      this.$emit('filter_categories')
    },
    //* 點輪播圖片可以看其他單一產品
    view_product (id) {
      this.$router.push('/user/products')
      setTimeout(() => {
        this.$router.push(`/user/one_product/${id}`)
      })
    },
    //* 加入購物車
    addCart (id) {
      this.isLoading = true
      this.add_product_Data.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.add_product_Data }).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '加入購物車')
        this.emitter.emit('get_cart') //* 請 Navbar更新數字
      })
    }

  },
  mounted () {
    this.get_products()
  }
}
</script>
