import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store'

// 简章库
const jzsx = () => import('@/views/rulesKu/jzsx')
const rulesDel = () => import('@/views/rulesKu/rulesDel')
const gdpRulesxDel = () => import('@/views/rulesKu/gdpRulesxDel')

// 我的
const myIndex = () => import('@/views/my/myIndex')
const about = () => import('@/views/my/about')
const yzmLogin = () => import('@/views/my/yzmLogin')
const login = () => import('@/views/my/login')
const register = () => import('@/views/my/register')
const ArticleDetails = () => import('@/views/my/ArticleDetails')
const ContrastDetails = () => import('@/views/my/ContrastDetails')
const signUp = () => import('@/views/my/signUp')
const signUpSusses = () => import('@/views/my/signUpSusses')
const Collection = () => import('@/views/user/Collection')
const loginIndex = () => import('@/views/user/loginIndex') //
const PhoneRz = () => import('@/views/user/PhoneRz') //
const edit = () => import('@/views/user/edit') //
const PhoneRzYz = () => import('@/views/my/PhoneRzYz') //
const PhoneRzCg = () => import('@/views/user/PhoneRzCg')
//
const changePassword = () => import('@/views/user/changePassword') //
const setPassword = () => import('@/views/my/setPassword') //
const shoujirz = () => import('@/views/user/shoujirz')//
const Retrieve = () => import('@/views/my/Retrieve')
const RetrieveYzm = () => import('@/views/my/RetrieveYzm')
const RetrievePassword = () => import('@/views/my/RetrievePassword')
const feedback = () => import('@/views/user/feedback')
const statement = () => import('@/views/my/statement')
const Agreement = () => import('@/views/my/Agreement')
// import HotSchool from '../views/schoolKu/hotschool'
const Seach = () => import('@/views/schoolKu/seach')
const seachdel = () => import('@/views/schoolKu/seachdel')
const majorMaster = () => import('@/views/schoolKu/majorMaster')
const Master = () => import('@/views/schoolKu/master')
const doctor = () => import('@/views/schoolKu/doctor')
const curriculum = () => import('@/views/schoolKu/curriculum')
const AdvancedStudies = () => import('@/views/schoolKu/AdvancedStudies')
const OnlinePhD = () => import('@/views/schoolKu/OnlinePhD')
const School = () => import('@/views/schoolKu/school') // 学校库页面
const Train = () => import('@/views/schoolKu/Train')
const Xxsx = () => import('@/views/schoolKu/xxsx')
const special = () => import('@/views/schoolKu/special')
const schoolHome = () => import('@/views/schoolKu/schoolHome')
const schoolClass = () => import('@/views/schoolKu/schoolClass')
const schoolPro = () => import('@/views/schoolKu/schoolPro')
const schoolJS = () => import('@/views/schoolKu/schoolJS')
const schoolDes = () => import('@/views/schoolKu/schoolDes')
const zsxx = () => import('@/views/schoolKu/zsxx')
const information = () => import('@/views/schoolKu/information')
const Wenda = () => import('@/views/schoolKu/Wenda')
const Dym = () => import('@/views/majorKu/Dym')
const zysx = () => import('@/views/majorKu/zysx')
const BrowseRecord = () => import('@/views/my/BrowseRecord')
// 专业库
const zyhome = () => import('@/views/majorKu/home')

// 学校库
const Home = () => import('../views/schoolKu/index')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  // { path: '/hot', name: 'school', component: HotSchool },meta: { keepAlive: true // 需要被缓存 }
  { path: '/majorMaster/:id', name: 'majorMaster', component: majorMaster, meta: { keepAlive: true } },
  { path: '/seach', name: 'seach', component: Seach, meta: { keepAlive: true } },
  { path: '/seachdel', name: 'seachdel', component: seachdel, meta: { keepAlive: false } },
  { path: '/master', name: 'master', component: Master, meta: { keepAlive: true } },
  { path: '/doctor', name: 'doctor', component: doctor, meta: { keepAlive: true } },
  { path: '/curriculum', name: 'curriculum', component: curriculum, meta: { keepAlive: true } },
  { path: '/special', name: 'special', component: special, meta: { keepAlive: true } },

  { path: '/OnlinePhD/:id', name: 'OnlinePhD', component: OnlinePhD, meta: { keepAlive: true } },
  { path: '/AdvancedStudies/:id', name: 'AdvancedStudies', component: AdvancedStudies, meta: { keepAlive: true } },
  { path: '/school', name: 'school', component: School, meta: { keepAlive: true } },
  { path: '/train', name: 'train', component: Train, meta: { keepAlive: true } },
  { path: '/xxsx', name: 'xxsx', component: Xxsx, meta: { keepAlive: false } },
  { path: '/schoolClass/:id', name: 'schoolClass', component: schoolClass, meta: { keepAlive: true } },
  {
    path: '/schoolHome/:id',
    name: 'schoolHome',
    component: schoolHome,
    meta: { keepAlive: true }
  },
  { path: '/schoolPro/:id', name: 'schoolPro', component: schoolPro, meta: { keepAlive: true } },
  { path: '/schoolJS/:id', name: 'schoolJS', component: schoolJS, meta: { keepAlive: true } },
  { path: '/schoolDes/:id', name: 'schoolDes', component: schoolDes, meta: { keepAlive: true } },
  { path: '/zsxx/:id', name: 'zsxx', component: zsxx, meta: { keepAlive: false } },
  { path: '/information/:id', name: 'information', component: information, meta: { keepAlive: false } },
  { path: '/Wenda/:id', name: 'Wenda', component: Wenda, meta: { keepAlive: false } },
  // 专业库
  { path: '/zyhome', name: 'zyhome', component: zyhome, meta: { keepAlive: true } },
  { path: '/Dym/:id', name: 'Dym', component: Dym, meta: { keepAlive: false } },
  { path: '/zysx/:id', name: 'zysx', component: zysx, meta: { keepAlive: false } },
  // 简章库
  { path: '/jzsx', name: 'jzsx', component: jzsx, meta: { keepAlive: true } },
  { path: '/rulesDel', name: 'rulesDel', component: rulesDel, meta: { keepAlive: true } },
  { path: '/gdpRulesxDel', name: 'gdpRulesxDel', component: gdpRulesxDel, meta: { keepAlive: true } },
  { path: '/BrowseRecord', name: 'BrowseRecord', component: BrowseRecord, meta: { keepAlive: true } },

  // 我的
  { path: '/myIndex', name: 'myIndex', component: myIndex, meta: { keepAlive: true } }, // 我的界面
  { path: '/login', name: 'login', component: login, meta: { keepAlive: true } }, //
  { path: '/yzmLogin', name: 'yzmLogin', component: yzmLogin, meta: { keepAlive: true } },
  { path: '/about', name: 'about', component: about, meta: { keepAlive: true } },
  { path: '/signUp', name: 'signUp', component: signUp, meta: { keepAlive: true } },
  { path: '/signUpSusses', name: 'signUpSusses', component: signUpSusses, meta: { keepAlive: true } },
  { path: '/register', name: 'register', component: register, meta: { keepAlive: true } },
  { path: '/statement', name: 'statement', component: statement, meta: { keepAlive: true } },
  { path: '/Agreement', name: 'Agreement', component: Agreement, meta: { keepAlive: true } },
  { path: '/ArticleDetails', name: 'ArticleDetails', component: ArticleDetails, meta: { keepAlive: false } },
  { path: '/ContrastDetails', name: 'ContrastDetails', component: ContrastDetails, meta: { keepAlive: true } },
  { path: '/PhoneRzYz', name: 'PhoneRzYz', component: PhoneRzYz, meta: { keepAlive: true } },
  { path: '/Retrieve', name: 'Retrieve', component: Retrieve, meta: { keepAlive: false } },
  { path: '/RetrieveYzm', name: 'RetrieveYzm', component: RetrieveYzm, meta: { keepAlive: true } },
  { path: '/RetrievePassword', name: 'RetrievePassword', component: RetrievePassword, meta: { keepAlive: true } },
  { path: '/setPassword', name: 'setPassword', component: setPassword, meta: { keepAlive: true } },

  // 需要携带token   user
  { path: '/user/loginIndex', name: 'loginIndex', component: loginIndex, meta: { keepAlive: false } },
  { path: '/user/PhoneRz', name: 'PhoneRz', component: PhoneRz, meta: { keepAlive: true } },
  { path: '/user/edit', name: 'edit', component: edit, meta: { keepAlive: false } },
  { path: '/user/PhoneRzCg', name: 'PhoneRzCg', component: PhoneRzCg, meta: { keepAlive: true } },
  { path: '/user/changePassword', name: 'changePassword', component: changePassword, meta: { keepAlive: true } },
  { path: '/user/shoujirz', name: 'shoujirz', component: shoujirz, meta: { keepAlive: true } },
  { path: '/user/feedback', name: 'feedback', component: feedback, meta: { keepAlive: true } },
  { path: '/user/Collection', name: 'Collection', component: Collection, meta: { keepAlive: false } }
]

const router = new VueRouter({
  routes: routes,
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 })
})

// 登录拦截
// 条件一： /user 需要登录
// 条件二： 没有token信息
router.beforeEach((to, from, next) => {
  // 跳转的时候需要 带上当前的路由地址
  const login = { path: '/yzmlogin', query: { redirect: to.path } }
  console.log(to.name, from)
  // if (to.name === 'zyhome' || to.name === 'home' || to.name === 'school' || to.name === 'jzsx') {
  // }
  if (to.name === null) {
    return false
  }
  if (to.path.startsWith('/user') && !store.state.user.token) {
    return next(login)
  } else if (to.path.startsWith('/myIndex')) {
    if (store.state.user.token) {
      // 如果存在token时
      return next('/user/loginIndex')
    } else {
      // 不存在token时
      return next()
    }
  } else {
    next()
  }
})

export default router
