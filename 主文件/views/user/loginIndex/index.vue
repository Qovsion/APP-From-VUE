<template>
  <div class="centent">
    <div :class="scrollTag?'nav1':'nav'">
      <span>个人中心</span>
    </div>
    <div class="info">
      <van-image
        v-if="user.faceimg"
        round
        fit="cover"
        width="1.3rem"
        height="1.3rem"
        :src="'https://www.125yan.com/'+user.faceimg"
      />
      <div class="xx">
        <h4>{{user.nickname}}</h4>
        <span class="user">用户名：{{user.name}}</span>
        <span class="bjzl" @click="edit()">编辑资料</span>
      </div>
    </div>
    <img src="../../../assets/images/btt.png" class="datu" />

    <div class="content_con" >
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item link-type="navigateTo" @click="Collection()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwodeshoucang" />
          </svg>
          <span>我的收藏</span>
        </van-grid-item>
        <van-grid-item ic link-type="navigateTo" @click="$router.push('/BrowseRecord')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconliulanjilu" />
          </svg>
          <span>浏览记录</span>
        </van-grid-item>
        <!-- <van-grid-item ic link-type="navigateTo" @click="zanwu()" text="夜间模式">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyejianmoshi" />
          </svg>
          <span>夜间模式</span>
        </van-grid-item> -->
        <van-grid-item link-type="reLaunch" @click="$router.push('/signUp')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzaixianbaoming" />
          </svg>
          <span>在线报名</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="nr">
      <van-cell
        title="客服电话"
        value-class="rightClass"
        is-link
        value="40000-52125"
        @click="telPhone()"
      >
        <i slot="icon" class="iconfont iconkefudianhua"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="问题反馈" is-link icon="location-o" @click="$router.push('/user/feedback')">
        <i slot="icon" class="iconfont iconwentifankui"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="检查更新" is-link icon="location-o" value="版本:1.0.0" @click="inspectEditions()">
        <i slot="icon" class="iconfont iconjianchagengxin"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <!-- <van-cell title="清理缓存" is-link icon="location-o" value="50M">
        <i slot="icon" class="iconfont iconqinglihuancun"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell> -->
      <!-- <van-cell title="分享应用" is-link icon="location-o" @click="zanwu()">
        <i slot="icon" class="iconfont iconfenxiangyingyong"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell> -->
      <van-cell title="关于我们" is-link icon="location-o" to="/about">
        <i slot="icon" class="iconfont iconguanyuwomen"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="应用评分" is-link icon="location-o" @click="share()">
        <i slot="icon" class="iconfont iconyingyongpingfen"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="退出登录" is-link icon="location-o" @click="outlogin()">
        <i slot="icon" class="iconfont icontuichudenglu"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
    </div>
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Tabber from '@/components/on-tabber'
// import Qs from 'qs'
import { Toast } from 'vant'
import Vue from 'vue'
// import auth from '@/utils/auth.js'
Vue.use(Toast)
export default {
  components: { 'on-tabber': Tabber, ...mapState(['src', 'username', 'Nickname']) },
  data () {
    return {
      scrollTag: false,
      phone: 40000521125,
      user: {}
    }
  },
  mounted () {
    // let _this = this
    window.addEventListener('scroll', () => {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      if (top > 50) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    })
  },
  created () {
    if (this.$route.query.m === 1) {
      this.getInfos()
    } else {
      this.getInfo()
    }
    console.log(this.$route.query[0])
    // 3. 跳转  （如果有来源地址，回跳来源地址，如果没有：默认进入 我的  个人中心首页）
    const url = this.$route.query.redirect || '/user/loginIndex'
    this.$router.push(url)
  },
  methods: {
    Collection () {
      this.$router.push({ path: '/user/Collection' })
    },
    telPhone () {
      window.location.href = 'tel:' + this.phone
    },
    edit () {
      this.$router.push('/user/edit')
    },
    tz () {
      console.log(1)
      this.$router.push('/login')
    },
    getInfo () {
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getInfo'
      }).then(res => {
        this.users = res.data.data
        console.log(res)

        // 回退回来 不执行
        if (this.$route.query[0]) {

        }
        // 从新登录首页 / 从新渲染数据
        if (this.$route.query[0] !== 'e') {
          this.$store.commit('setUser', this.users)
        }

        // 从新进入页面 首先users=res 发至vuex本地储存 user从本地储存获取
        this.user = this.$store.state.user
      })
    },
    getInfos () {
      this.$https({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getInfo'
      }).then(res => {
        this.users = res.data.data
        console.log(res)

        // 回退回来 不执行
        if (this.$route.query[0]) {

        }
        // 从新登录首页 / 从新渲染数据
        if (this.$route.query[0] !== 'e') {
          this.$store.commit('setUser', this.users)
        }

        // 从新进入页面 首先users=res 发至vuex本地储存 user从本地储存获取
        this.user = this.$store.state.user
      })
    },
    outlogin () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '您确定要退出登录吗'
      }).then(() => {
        this.$store.commit('delUser')
        this.$router.push('/')
        // on confirm
      }).catch(() => {
        // on cancel
      })
    },
    zanwu () {
      this.$toast('此功能未上线')
    },
    // 应用评分
    share () {
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getIncreasedVersionCode'
      }).then(res => {
        window.location.href = res.data.data.link
      })
    },
    // 更新检查/跳出最新版
    inspectEditions () {
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

          })
        } else {
          this.$toast('当前为最新版')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.icon {
  font-size: 14px;
}
.iconto {
  font-size: 11px;
  color: rgb(204, 204, 204);
  padding-left: 10px;
}
.rightClass {
  font-size: 14px;
  color: rgb(39, 56, 254);
}
/deep/ .van-cell:not(:last-child)::after {
  left: 0px;
}
.nr {
  margin: 40px auto;
  padding-bottom: 20px;
  .van-cell {
    padding:0px 20px;
    height: 57px;
    line-height: 57px;
    color: rgb(51, 51, 51);
  }
  /deep/ .van-cell__title {
    padding-left: 10px;
  }
  /deep/ .van-icon {
    display: block;
    line-height: 40px;
  }
}
.info {
  position: absolute;
  width: 335px;
  top: 84px;
  left: 30px;
  .van-image {
    display: block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
  }
  .xx {
    padding-left: 10px;
    height: 60px;
    width: 220px;
    display: flex;
    flex-wrap: wrap;
    h4 {
      font-family: 'PingFangSC-Medium';
      color: #fff;
      font-size: 20px;
      height: 20px;
      width: 150px;
      padding-top: 5px;
      line-height: 20px;
      margin: 0;
    }
    .user {
      margin: 0;
      padding: 0;
      height: 20px;
      font-family: 'PingFangSC-Regular';
      color: #fff;
      font-size: 12px;
    }
    .bjzl {
      color: #fff;
      font-size: 12px;
      float: right;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
}
.nav {
  width: 375px;
  height: 50px;
  position: fixed;
  z-index: 30;
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  span {
    width: 375px;
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-10%);
  }
  .van-icon {
    float: left;
    padding: 15px 0px 13px 20px;
  }
}
.nav1 {
  width: 375px;
  height: 50px;
  position: fixed;
  z-index: 30;
  transition: 1.2s;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  span {
    width: 375px;
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-10%);
  }
  .van-icon {
    float: left;
    padding: 15px 0px 13px 20px;
  }
}
.datu {
  display: block;
  width: 100%;
  height: 232px;
}
.content_con {
  width: 335px;
  height: 84px;
  position: absolute;
  top: 170px;
  left: 50%;
  margin-left: -167px;
  border-radius: 8px;
  overflow: hidden;
  -moz-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.2);
  -webkit-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.2);
  box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.2);
  .van-grid {
    border-radius: 8px;
  }
  span {
    color: #7d7e80;
    font-size: 0.32rem;
    word-wrap: break-word;
    padding-top: 10px;
  }
  .icon {
    font-size: 24px;
  }
}
</style>
