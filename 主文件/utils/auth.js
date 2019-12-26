// auth 认证信息(token) 操作本地储存模块

// 定义key
const USER_KEY = '125_YANAPP_user'

// 获取
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY) || '{}')
}
// 设置
export const setUser = (user) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}
// 清除
export const delUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
