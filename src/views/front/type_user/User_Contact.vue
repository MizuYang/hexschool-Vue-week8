<template>
  <div class="banner_main container img-fluid"></div>
  <div class="contact container mt-10">
    <h2 class="title text-center mb-10 pt-3">
      <span class="decorate">連絡我們</span>
    </h2>

    <div class="row justify-content-center">
      <Form action="/" v-slot="{ errors }" class="col-md-6" ref="form" @submit="send_question">
        <div class="mb-1">
          <label for="name"> 姓名 </label>
          <Field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          >
          </Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-1">
          <label for="email"> E-mail </label>
          <Field
            type="email"
            id="email"
            placeholder="請輸入E-mail"
            class="form-control"
            name="信箱"
            rules="email|required"
            :class="{ 'is-invalid': errors['信箱'] }"
          >
          </Field>
          <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-1">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            :rules="isPhone"
            placeholder="請輸入電話 / 例：09xxxxxxxx"
            maxlength="10"
          ></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-1">
          <label for="category"> 聯絡類別 </label>
          <Field
            id="category"
            name="類別"
            class="form-control"
            :class="{ 'is-invalid': errors['類別'] }"
            rules="required"
            as="select"
          >
            <option value="" disabled>請選擇聯絡類別</option>
            <option value="退 / 換貨問題、我收到的東西有破損">
              退 / 換貨問題、我收到的東西有破損
            </option>
            <option value="重複付款或其他付款問題">
              重複付款或其他付款問題
            </option>
            <option value="我收到的產品有發霉、其它品質問題">
              我收到的產品有發霉、其它品質問題
            </option>
            <option value="優惠券相關問題">優惠券相關問題</option>
            <option value="我沒收到訂購的產品">我沒收到訂購的產品</option>
            <option value="我要加盟">我要加盟</option>
            <option value="其它問題 / 請詳細描述">其它問題 / 請詳細描述</option>
          </Field>
          <ErrorMessage name="類別" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message"> 留言 </label>
          <Field
            name="留言"
            id="message"
            class="form-control "
            type="text"
            rules="required"
            :class="{ 'is-invalid': errors['留言'] }"
            placeholder="輸入您想說的內容"
          ></Field>
          <ErrorMessage name="留言" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger send-btn" title="發送內容">送出內容</button>
        </div>
      </Form>
        <div class="text-center">
            <p>
                <small>
                    送出內容後，我們將在 3~5 個工作天內回覆您。
                </small>
            </p>
        </div>

  </div>

        </div>
</template>
<script>
export default {
  methods: {
    //* 電話驗證
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入 09 開頭的正確電話號碼'
    },
    send_question () {
      this.$httpMessageState(true, '送出內容')
      this.$router.push('get_Contact')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/stylesheets/helpers/front/_pseudo_el_title.scss'; //* 偽元素標題 CSS
@import "@/assets/stylesheets/helpers/front/user/_Contact.scss";
</style>
