這是我作品的 github pages https://mizuyang.github.io/hexschool-Vue-week8/ 小巷弄甜點電商

## 初期列點

- [x]  最終作業要註冊新的 path
    - [x]  記得把 path 保管好
- [x]  規劃前、後台路由結構
    - [x]  確定前後台會有的頁面，繪圖
- [x]  每個結構分頁命名，定義路由 path
- [x]  確定版型
    - [x]  專案主題色調
- [x]  架 Vue cli 專案
    - [x]  設定環境變數
    - [x]  新增 **`vue.config.js`** 更改路徑
    - [x]  測試上傳 github
- [x]  建立環境
    - [x]  安裝 Bootstrap
        - [x]  匯入
    - [x]  安裝 Bootstrap icons
        - [x]  匯入+測試圖片顯示
    - [x]  安裝 Axios
        - [x]  匯入
    - [x]  安裝 表單驗證
        - [x]  匯入+測試
    - [x]  安裝 mitt
        - [x]  新增 `utils` 資料夾，並加入 `emitter.js`
    - [x]  全站設定
        - [x]  修改 Bootstrap 變數 (修改變數，註解時使用 `//*` ，之後回來找就很容易)
            - [x]  在 `assets` 中建立 `stylesheets` 資料夾，用來存放樣式，並建立 `all.scss` 檔案
                - [x]  匯入 Bootstrap 和自己客製化的 `.scss` 到 `all.scss`
            - [x]  `stylesheets` 中開一個 `helpers` 資料夾用來存放變數
                - [x]  將`node_modules` 裡的 `_variables.scss` 複製到 `helpers` 資料夾
            - [x]  在 **`App.vue`** 匯入`all.scss`
        - [x]  字體設定 'Microsoft JhengHei’ 微軟正黑體
- [x]  建立分頁、檔案，使用資料夾管理
- [x]  建立路由表，測試每個網頁能正常開啟
    - [x]  前台
    - [x]  後台
- [x]  建立 NavBar，並加入對應 `router-link`
- [x]  製作 LOGO

## 中期製作

### 前台設定

- [x]  **製作主頁面**
    - [x]  輪播功能
- [x]  layout
    - [x]  NavBar
        - [x]  額外製作透明效果
    - [x]  Footer
- [x]  **產品頁面**
    - [x]  產品可以點擊愛心，加入收藏，加入購物車按鈕
    - [x]  加上分頁元件
    - [x]  滑鼠 hover 圖片放大效果
    - [x]  創建產品資料夾，規劃每個產品獨立一個資料夾
    - [x]  尋找產品圖片素材 ( 圖片大小、色調、角度)
    - [x]  產品內容發想放在每個產品的獨立資料夾 (名稱、分類、描述、價格、推薦度)
        - [x]  分類：蛋糕、布丁、優格、泡芙、舒芙蕾、聖代
    - [x]  價格低到高、推薦度高到低、預設排序
    - [x]  篩選分類按鈕、商品名稱搜尋欄位  //嘗試做了將近三小時，失敗告終，時間壓力暫時先放著
    - [x]  用 v-if 判斷該產品是否已收藏（實心、空心愛心） ~~//後來做得有點混亂後續要在整理複習~~
    - [ ]  點圖片查看更多時，判斷是從**產品頁面**過去產品單一頁面，v-if 顯示**產品頁面**的麵包屑
        - [ ]  或定義一個值，點圖片時將該值=收藏，並 `props` 傳到單一產品頁面，給他v-if判斷顯示哪個麵包屑
- [x]  **常見問題 頁面**
- [x]  **關於我們 頁面**
- [x]  **聯絡我們 頁面**
- [x]  **訂單查詢頁面(要加分頁)**
- [x]  結帳流程製作，確認購物車>訂購資訊>確認結帳>訂購成功
- [x]  **收藏產品頁面**
    - [ ]  點圖片查看更多時，判斷是從**收藏頁面**過去產品單一頁面，v-if 顯示**收藏頁面**的麵包屑
        - [ ]  或定義一個值，點圖片時將該值=收藏，並props傳到單一產品頁面，給他v-if判斷顯示哪個麵包屑
    - [x]  增加 localStorage 功能
    - [x]  用 v-if 判斷該產品是否已收藏（實心愛心）
    
    ### 
    

- [x]  關鍵字搜尋

### 後台設定

- [x]  新增後台入口 ( `router-link` )
- [x]  後台登入頁面
- [x]  後台主頁面，登入驗證
- [x]  `if(token),check=true`，但沒有登入的話，`check=false`(預設是false)，
    - [x]  後台主頁面 `router-view v-if=”check”`

## 後期優化

- [x]  點擊LOGO會滾動到最畫面上面，搜尋 vue3 router >****滾動設置 scrollBehavior****
- [x]  滾動視差
- [x]  加上吐司邊視窗
- [ ]  加上麵包屑
- [x]  加上 loading 效果，全螢幕、單一物件 //有更換圖示
- [ ]  按鈕增加 disabled 效果，防止多次點擊
- [ ]  HTML 標籤增加 title 屬性，讓使用者體驗更好
- [x]  所有圖片補上 alt 網頁親和力
- [ ]  下拉選單 (Dropdowns) ，點購物車，會有 table
- [x]  千分號
- [ ]  文字截斷
- [x]  為按鈕加上 hover、active 效果
- [x]  404 導向
- [x]  [變更游標 cursor](https://www.google.com/search?q=CSS+%E6%B8%B8%E6%A8%99+%E8%AE%8A%E6%9B%B4&rlz=1C1CHBF_zh-TWTW975TW975&oq=CSS+%E6%B8%B8%E6%A8%99+%E8%AE%8A%E6%9B%B4&aqs=chrome..69i57j0i546l3.7847j0j15&sourceid=chrome&ie=UTF-8)
    - [x]  按鈕 disabled 時，游標過去會是禁止圖案
- [ ]  [[CSS] 製作滑鼠移過去後圖片放大效果|](https://www.google.com/search?q=%E6%8A%8A%E6%BB%91%E9%BC%A0%E8%AE%8A%E5%9C%96%E7%89%87+CSS&rlz=1C1CHBF_zh-TWTW975TW975&sxsrf=APq-WBtJoVnzryRGvt8qbwaXCF0R6cEyyg%3A1646624228721&ei=5H0lYoG4K4_1wAOMrquADg&ved=0ahUKEwiBuuyhibP2AhWPOnAKHQzXCuAQ4dUDCA4&uact=5&oq=%E6%8A%8A%E6%BB%91%E9%BC%A0%E8%AE%8A%E5%9C%96%E7%89%87+CSS&gs_lcp=Cgdnd3Mtd2l6EAM6BQgAEIAEOggILhCABBCxAzoLCC4QgAQQxwEQrwE6CwgAEIAEELEDEIMBOgQIIxAnOg4ILhCABBCxAxCDARDUAjoICAAQgAQQsQM6CAguEIAEENQCOgUILhCABDoECAAQDToFCAAQogQ6BQghEKABSgQIQRgASgQIRhgAUABY_lNg71VoAHABeACAAWCIAbsOkgECMzGYAQCgAQHAAQE&sclient=gws-wiz)
- [ ]  增加一個輸入管理者密碼的欄位，如果密碼對了才可以刪後台產品
    - [ ]  新增 .env.local 檔案，VUE_APP_PASSWORD=密碼
    - [ ]  點擊新增、編輯、刪除時，先判斷
    - [ ]  if (VUE_APP_PASSWORD === 管理者密碼的欄位){ 這裡才跑API流程 }
    
- [ ]  更新 `README.md`

### 下一個專案的發想

---

- 想將LOGO做成橫的，不要太高，每頁都可以做個 Banner
    
    ![chrome_R5dEWDxK2M.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bae3faaf-a88c-46e7-a606-6f9d8041532f/chrome_R5dEWDxK2M.gif)
    
- **WooCommerce 小技巧 – 2 種方式做出懸浮購物車、迅速結帳**
