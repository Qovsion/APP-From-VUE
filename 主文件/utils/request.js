import axios from 'axios'

// import store from '@/store/store.js'
// import router from '@/router'
// 默认配置  转换响应数据
axios.defaults.transformResponse = [data => {
  // 对data（后台的原始数据）进行转换
}]
// 默认配置  基准地址
// axios.defaults.baseURL = ''
// 请求拦截器

axios.interceptors.request.use((config) => {
  // 修改配置 携带token
  // const token = store.state.token
  console.log(config)
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
// axios.interceptors.response.use(res => res, err => {
// async await
// token失效处理  刷新token
// if (err.response && err.response.status === 401) {
// const token = store.state.token
// const login = { path: '/myIndex', query: { redirect: router.currentRouter.path } }
// if (!token.token) { // || !clientInformation
// 如果不存在token 拦截到登录页面
// return router.push(login)
// }
// try {
// 已经登录 且 有refresh_token
// 使用原始axios发送请求 并携带refresn_token
// const data = await axios({
//   url:'',
//   method:'',
//   headers:{
//     Authorization:`Bearer ${Bearer ${token}}`
//   }
// })
// 更新vuex 更新本地
// store.commit('setUser',{
//   token:
//   refresn_token:
// })
// 使用instance继续发送之前错误的请求 err.config
// return instance(err.config)
// } catch (e) {
// 刷新token失败
// 清理无效token 跳转到登录
//   store.commit('delUser')
//   return router.push(login)
// }
// }

// return Promise.reject(err)
// })

// 导出请求工具函数
// export default (url, method, data) => {
//   return instance({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: data
//   })
// }
export default axios
