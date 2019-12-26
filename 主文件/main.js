import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant, { Lazyload, Notify, Toast } from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.js'
import axios from 'axios'
import { Typography } from 'element-ui'
import store from './store/store'
import moment from 'moment'
import '../src/assets/font/iconfont.css'
import '../src/assets/css/font-css.css'
import Mui from 'vue-awesome-mui'
// import touch from 'vue-directive-touch'
Vue.prototype.SlipBack = () => {
  router.go(-1)
}
// Vue.use(touch)
Vue.use(Mui)
Vue.use(Vant)
Vue.use(Notify)
Vue.use(Lazyload)
Vue.use(Toast)
// 创建一个新的axios实例
const instance = axios.create({

})
instance.interceptors.request.use(config => {
  const token = store.state.user
  if (token) {
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  const login = { path: '/yzmlogin', query: { redirect: router.currentRoute.path, id: router.currentRoute.query.id, catid: router.currentRoute.query.catid } }
  if (res.data.status === 1) {
    router.push(login)
    console.log('跳转到login页面并携带回跳地址')
  }
  return res
}, async err => {
  return Promise.reject(err)
})

// 更新检测
Vue.prototype.inspectEdition = function () {
  this.$http({
    method: 'post',
    url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getIncreasedVersionCode'
  }).then(res => {
    if (this.$store.state.Edition !== res.data.data.version) {
      this.$dialog.confirm({
        title: '125APP更新检测',
        message: '检测到新版本软件,为了不影响您的正常使用,请下载最新版本！',
        confirmButtonText: '去下载'
      }).then(() => {
        window.location.href = res.data.data.link
      }).catch(() => {
        //  如果点击取消 等1天后再弹出
        setTimeout(() => {
          this.inspectEdition()
        }, 86400000)
      })
    }
  })
}

Vue.prototype.$moment = moment
Vue.prototype.$http = axios
Vue.prototype.$https = instance
Vue.component(Typography)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
