<template>
  <div class="centent">
    <div :class="scrollTag?'nav1':'nav'">
      <span>个人中心</span>
    </div>
    <div class="btn">
      <van-button type="default" @click="tz()">
        <img src="../../../assets/icon/yonghu.png" class="yonghu" />
        登录/注册
      </van-button>
      <van-button type="default" @click="zanwu()">
        <img src="../../../assets/icon/weixin.png" class="weixin" />
        微信登录
      </van-button>
    </div>
    <img src="../../../assets/images/btt.png" class="datu" />

    <div class="content_con">
      <van-grid clickable :column-num="3" :border="false">
        <van-grid-item link-type="navigateTo" @click="Collection()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconwodeshoucang" />
          </svg>
          <span>我的收藏</span>
        </van-grid-item>
        <van-grid-item link-type="navigateTo" @click="BrowseRecord()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconliulanjilu" />
          </svg>
          <span>浏览记录</span>
        </van-grid-item>
        <!-- <van-grid-item link-type="navigateTo" @click="zanwu()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconyejianmoshi" />
          </svg>
          <span>夜间模式</span>
        </van-grid-item> -->
        <van-grid-item icon="search" link-type="reLaunch" @click="signUp()">
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
      <van-cell title="问题反馈" is-link @click="$router.push('/user/feedback')">
        <i slot="icon" class="iconfont iconwentifankui"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="检查更新" is-link value="版本:1.0.0" @click="inspectEditions()">
        <i slot="icon" class="iconfont iconjianchagengxin"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <!-- <van-cell title="清理缓存" is-link @click="zanwu()">
        <i slot="icon" class="iconfont iconqinglihuancun"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell> -->
      <!-- <van-cell title="分享应用" is-link>
        <i slot="icon" class="iconfont iconfenxiangyingyong"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell> -->
      <van-cell title="关于我们" is-link to="/about">
        <i slot="icon" class="iconfont iconguanyuwomen"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="应用评分" is-link @click="share()">
        <i slot="icon" class="iconfont iconyingyongpingfen"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
    </div>
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import Tabber from '@/components/on-tabber'
export default {
  components: { 'on-tabber': Tabber },
  data () {
    return {
      scrollTag: false,
      phone: 40000521125
    }
  },
  mounted () {
    // let _this=this
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
  methods: {
    // 浏览记录
    BrowseRecord () {
      this.$router.push('/BrowseRecord')
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
    },
    Collection () {
      this.$router.push({ path: '/user/Collection' })
    },
    telPhone () {
      window.location.href = 'tel:' + this.phone
    },
    share () {
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getIncreasedVersionCode'
      }).then(res => {
        window.location.href = res.data.data.link
      })
    },
    zanwu () {
      this.$toast('此功能未上线')
    },
    tz () {
      console.log(1)
      this.$router.push('/yzmlogin')
    },
    signUp () {
      this.$router.push('/signUp')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.yonghu,.weixin{
  vertical-align: middle;
  padding-bottom: 2px;
  height: 16px;
}
.iconfont {
  font-size: 14px;
}
.iconto{
  font-size: 11px;
  color: rgb(204,204,204);
  padding-left: 10px;
}
.rightClass {
  font-size: 14px;
  color: rgb(39, 56, 254);
}
/deep/ .van-cell:not(:last-child)::after{
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
.btn {
  position: absolute;
  width: 200px;
  // display: flex;
  // flex-wrap: wrap;
  left: 50%;
  transform: translateX(-50%);
  top: 84px;
  & .van-button:nth-child(1) {
    background: rgb(251, 188, 5);
    color: #fff;
  }
  .van-button {
    margin-top: 10px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    border: none;
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
  height: 279px;
}
.content_con {
  width: 335px;
  height: 84px;
  position: absolute;
  top: 219px;
  left: 50%;
  margin-left: -167px;
  border-radius: 8px;
  overflow: hidden;
  -moz-box-shadow: 0px 0px 11px 0px rgba(176,183,231,0.2);
  -webkit-box-shadow: 0px 0px 11px 0px rgba(176,183,231,0.2);
  box-shadow: 0px 0px 11px 0px rgba(176,183,231,0.2);
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
