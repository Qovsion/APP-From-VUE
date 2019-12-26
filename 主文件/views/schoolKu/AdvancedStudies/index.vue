<template>
  <div class="content">
    <!-- <van-nav-bar title="专业硕士" @click-left="$router.back()" left-arrow></van-nav-bar> -->

    <div :class="scrollTag?'nav1':'nav'">
      <i class="iconfont iconfanhui" @click="$router.back()"></i>
      <span>{{this.$route.query.name}}</span>
    </div>
    <img src="../../../assets/images/gjyx.png" class="datu" @click="pathAcel(3)" />
    <div class="content_con">
      <van-grid clickable :column-num="4" :border="false">
        <van-grid-item link-type="navigateTo" text="学校" @click="school()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconxuexiao2" />
          </svg>
          <span>学校</span>
        </van-grid-item>
        <van-grid-item link-type="navigateTo" text="专业" @click="zyhome()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconzhuanye2" />
          </svg>
          <span>专业</span>
        </van-grid-item>
        <van-grid-item link-type="navigateTo" text="简章" @click="jzsx()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjianzhang2" />
          </svg>
          <span>简章</span>
        </van-grid-item>
        <van-grid-item link-type="reLaunch" text="报名" @click="signUp()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconbaoming" />
          </svg>
          <span>报名</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="hot_major">
      <span class="major left">报考必读</span>
    </div>
    <div class="read">
      <ul>
        <li
          v-for="item in this.catId"
          :key="item"
          :id="item.id"
          :catid="item.catid"
          @click="catid($event)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="hot_major">
      <span class="major left">热门学校</span>
      <span class="gd right" @click="rmxx()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <on-toch :isNzxx="isNzxx"></on-toch>
    <div class="hot_major">
      <span class="major left">热门专业</span>
      <span class="gd right" @click="rmzy()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <hot-major></hot-major>
    <div class="hot_major">
      <span class="major left">热门简章</span>
      <span class="gd right" @click="rmjz()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <hot-rules></hot-rules>
    <!-- 文章 -->
    <MasterArticle />
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import onToch from '@/components/on-toch'
import HotMajor from '@/components/hot-major'
import HotRules from '@/components/hot-rules'
import MasterArticle from '@/components/MasterArticle'
// import Tabber from '@/components/on-tabber'
import Qs from 'qs'
export default {
  components: {
    'on-toch': onToch,
    'hot-major': HotMajor,
    'hot-rules': HotRules,
    // 'on-tabber': Tabber,
    MasterArticle
  },
  data () {
    return {
      isNzxx: 3,
      index: 2,
      childrenName: 1111,
      scrollTag: false,
      scroll: 0,
      catId: []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  activated () {
    if (this.$route.query.lx === 1) {
      this.$store.state.majorMasterId = 392
    } else if (this.$route.query.lx === 2) {
      this.$store.state.majorMasterId = 394
    } else if (this.$route.query.lx === 3) {
      this.$store.state.majorMasterId = 395
    } else if (this.$route.query.lx === 4) {
      this.$store.state.majorMasterId = 396
    } else if (this.$route.query.lx === 5) {
      this.$store.state.majorMasterId = 397
    } else if (this.$route.query.lx === 6) {
      this.$store.state.majorMasterId = 398
    } else if (this.$route.query.lx === 7) {
      this.$store.state.majorMasterId = 399
    }
    this.$store.state.OnlinePhD_lx = this.$route.query.lx
    this.major()
  },
  created () {
    if (this.$route.query.lx === 1) {
      this.$store.state.majorMasterId = 392
    } else if (this.$route.query.lx === 2) {
      this.$store.state.majorMasterId = 394
    } else if (this.$route.query.lx === 3) {
      this.$store.state.majorMasterId = 395
    } else if (this.$route.query.lx === 4) {
      this.$store.state.majorMasterId = 396
    } else if (this.$route.query.lx === 5) {
      this.$store.state.majorMasterId = 397
    } else if (this.$route.query.lx === 6) {
      this.$store.state.majorMasterId = 398
    } else if (this.$route.query.lx === 7) {
      this.$store.state.majorMasterId = 399
    }
    this.$store.state.OnlinePhD_lx = this.$route.query.lx
    this.major()
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    rmxx () {
      console.log(this.$route.query.lx)
      if (this.$route.query.lx === '7' || this.$route.query.lx === 7) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '高级研修' } })
      }
    },
    rmzy () {
      if (this.$route.query.lx === '7' || this.$route.query.lx === 7) {
        this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
      }
    },
    rmjz () {
      if (this.$route.query.lx === '7' || this.$route.query.lx === 7) {
        this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
      }
    },
    major () {
      const dada = Qs.stringify({
        id: this.$store.state.majorMasterId
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/sp',
        data: dada
      }).then(res => {
        console.log(res.data.data)
        this.catId = JSON.parse(res.data.data)
        console.log(this.catId)
      })
    },
    pathAcel (id) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: 92 } })
    },
    catid (e) {
      console.log(e)
      let id = e.path[0].attributes[1].value
      let catid = e.path[0].attributes[2].value
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    handleScroll () {
      this.scroll =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      if (this.scroll > 50) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    },
    zyhome () {
      this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
    },
    jzsx () {
      this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
    },
    school () {
      // lx=7&name=高级研修
      this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: this.$route.query.name } })
    },
    signUp () {
      this.$router.push({ path: '/signUp', query: { lx: this.$route.query.lx } })
    },
    onClickLeft () {
      this.$router.push('/')
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
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
    transform: translateX(-20%);
  }
  i {
    float: left;
    padding: 0px 0px 13px 20px;
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
    transform: translateX(-20%);
  }
  i {
    float: left;
    padding: 0px 0px 13px 20px;
  }
}
.van-nav-bar {
  width: 375px;
  height: 50px;
  position: fixed;
  z-index: 30;
  background-color: rgba(255, 255, 255, 0);
}
.datu {
  display: block;
  width: 375px;
  height: 293px;
}
.content_con {
  width: 335px;
  height: 84px;
  position: absolute;
  top: 189px;
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
.hot_major {
  width: 345px;
  padding: 13px 0px 20px 7px;
  position: relative;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  .major {
    font-family: 'PingFangSC-Medium';
    position: relative;
    font-size: 20px;
    font-weight: 600;
    left: 15px;
    .major_box {
      width: 104px;
      height: 56px;
      border-radius: 4px;
      position: relative;
      float: left;
    }
  }

  .gd {
    width: 60px;
    height: 30px;
    position: absolute;
    top: 35%;
    right: 0px;
    font-size: 12px;
    font-family: 'PingFangSC-Medium';
    color: rgb(153, 153, 153);
    text-align: right;
    i {
      font-size: 10px;
      color: rgb(216, 216, 216);
      position: relative;
      margin-top: -12px;
    }
  }
}
.read {
  width: 335px;
  margin: 0 auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 104px;
      height: 40px;
      line-height: 40px;
      margin: 5px 0px 0px 6px;
      border-radius: 20px;
      overflow: hidden;
      color: rgb(51, 51, 51);
      background: rgb(247, 250, 255);
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
