import Vue from 'vue'
import vuex from 'vuex'
// 用户工具
import * as auth from '@/utils/auth.js'
Vue.use(vuex)

// 获取数据
export default new vuex.Store({
  // 申明数据
  state: {
    Edition: '1.0.0', // 版本号设置
    user: auth.getUser(), // 获取用户信息
    indexRefresh: '',
    History: [],
    scrollTop: 0,
    // TabScroll: 0,
    majorMaster_lx: 1,
    OnlinePhD_lx: 5,
    AdvancedStudies_lx: 7,
    // 在职硕士判断数据更新
    majorMaster_toch: true,
    majorMaster_major: true,
    majorMaster_rules: true,
    majorMaster_Ace: true,
    // 在职博士
    OnlinePhD_toch: true,
    OnlinePhD_major: true,
    OnlinePhD_rules: true,
    OnlinePhD_Ace: true,
    // 高级研修
    AdvancedStudies_toch: true,
    AdvancedStudies_major: true,
    AdvancedStudies_rules: true,
    AdvancedStudies_Ace: true,
    // 同等学力 - 面试、复试
    majorMasterId: 0,
    MasterTab: [
      { id: 92, test: '必读', bd: 'bdList', page: 1 },
      { id: 5, test: '报考', bd: 'bkList', page: 1 },
      { id: 53, test: '资讯', bd: 'zxList', page: 1 },
      // { id: 49, test: '面试', bd: 'msList', page: 1 },
      { id: 57, test: '考试', bd: 'ksList', page: 1 },
      { id: 51, test: '成绩', bd: 'cjList', page: 1 },
      // { id: 62, test: '复试', bd: 'fsList', page: 1 },
      { id: 54, test: '问答', bd: 'wdList', page: 1 },
      { id: 0, test: '对比', bd: 'dbList', page: 1 }
    ],
    // 在职博士 - 面试
    Master: [
      { id: 92, test: '必读', bd: 'bdList', page: 1 },
      { id: 5, test: '报考', bd: 'bkList', page: 1 },
      { id: 53, test: '资讯', bd: 'zxList', page: 1 },
      // { id: 49, test: '面试', bd: 'msList', page: 1 },
      { id: 57, test: '考试', bd: 'ksList', page: 1 },
      { id: 51, test: '成绩', bd: 'cjList', page: 1 },
      { id: 62, test: '复试', bd: 'fsList', page: 1 },
      { id: 54, test: '问答', bd: 'wdList', page: 1 },
      { id: 0, test: '对比', bd: 'dbList', page: 1 }
    ],
    // 国际硕士 - 面试、考试、成绩、复试
    // 中外合办 - 面试、考试、成绩、复试
    // 国际博士 - 面试、考试、成绩、复试
    // 高级研修 - 面试、考试、成绩、复试
    MasterOpention: [
      { id: 92, test: '必读', bd: 'bdList', page: 1 },
      { id: 5, test: '报考', bd: 'bkList', page: 1 },
      { id: 53, test: '资讯', bd: 'zxList', page: 1 },
      // { id: 49, test: '面试', bd: 'msList', page: 1 },
      // { id: 57, test: '考试', bd: 'ksList', page: 1 },
      // { id: 51, test: '成绩', bd: 'cjList', page: 1 },
      // { id: 62, test: '复试', bd: 'fsList', page: 1 },
      { id: 54, test: '问答', bd: 'wdList', page: 1 },
      { id: 0, test: '对比', bd: 'dbList', page: 1 }
    ]

  },
  // 修改数据
  mutations: {

    setUser (state, user) { // 储存用户信息
      state.user = user
      // 更新本地存储
      auth.setUser(user)
    },
    delUser (state) { // 清除用户信息
      state.user = {}
      // 更新本地存储
      auth.delUser()
    }

  },
  // 获取数据
  actions: {
    // 获取用户数据  context运行上下文(this)
    getUserData (context) {
      // 获取后发送至mutation更改用户数据
      // context.commit('changeUserData', { info: res })
    }

  }
})
