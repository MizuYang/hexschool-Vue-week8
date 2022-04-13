<template>
  <Swiper />
  <Swiper-slide />
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js'
import { Autoplay, EffectCards } from 'swiper'
import 'swiper/swiper.scss'
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
      addProductData: {
        product_id: '',
        qty: 1
      }
    }
  },

  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.temp_product = res.data.products
      })
    },
    viewProduct (id) {
      this.$router.push('/products')
      setTimeout(() => {
        this.$router.push(`/one_product/${id}`)
      })
    },
    addCart (id) {
      this.isLoading = true
      this.addProductData.product_id = id
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: this.addProductData }).then((res) => {
        this.isLoading = false
        this.$httpMessageState(res.data.success, '加入購物車')
        this.emitter.emit('get_cart') //* Navbar更新
      })
    }

  },
  mounted () {
    this.getProducts()
  }
}
</script>
