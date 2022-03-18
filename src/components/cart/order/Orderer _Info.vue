<template>
            <h3 class="border-bottom">訂購人資料</h3>
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
              <label for="category"> 選擇付款方式 </label>
              <Field
                id="category"
                name="付款方式"
                class="form-control"
                :class="{ 'is-invalid': errors['付款方式'] }"
                rules="required"
                as="select"
              >
                <option value="" disabled>請選擇付款方式</option>
                <option value="現金 / 限自取">現金 / 限自取</option>
                <option value="信用卡付款">信用卡付款</option>
                <option value="超商付款">超商付款</option>
                <option value="LINE PAY">LINE PAY</option>
              </Field>
              <ErrorMessage
                name="付款方式"
                class="invalid-feedback"
              ></ErrorMessage>
            </div>
            <div class="mb-1">
              <label for="address"> 地址 </label>
              <Field
                type="address"
                id="address"
                placeholder="請輸入地址"
                class="form-control"
                name="地址"
                rules="required"
                :class="{ 'is-invalid': errors['地址'] }"
              >
              </Field>
              <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
            </div>
</template>
<style lang="scss" scoped>
@import "@/assets/stylesheets/helpers/front/cart/order/_Checkout.scss";
</style>
