<template>
  <div class="content" >
    <div :class="scrollTag?'nav1':'nav'">
      <i class="iconfont iconfanhui" @click="$router.back()"></i>
      <span>{{this.$route.query.name}}</span>
    </div>
    <img v-if="this.$store.state.majorMaster_lx === '1' || this.$store.state.majorMaster_lx === 1" src="../../../assets/images/tdxl.png"  @click="pathAcel(53)" class="datu" />
    <img v-if="this.$store.state.majorMaster_lx === '2' || this.$store.state.majorMaster_lx === 2" src="../../../assets/images/zyss.png"  @click="pathAcel(71)" class="datu" />
    <img v-if="this.$store.state.majorMaster_lx === '3' || this.$store.state.majorMaster_lx === 3" src="../../../assets/images/gjss.png"  @click="pathAcel(7)" class="datu" />
    <img v-if="this.$store.state.majorMaster_lx === '4' || this.$store.state.majorMaster_lx === 4" src="../../../assets/images/zwhb.png"  @click="pathAcel(68)" class="datu" />
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
      <!-- v-html="this.contt" -->
      <!-- <ul ></ul> -->
      <ul>
        <li
           v-for="item in this.catId" :key="item"
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
    <!-- 热门学校滑动 -->
    <on-toch ref="toch" :isNzxx="isNzxx"></on-toch>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">
        <slot>热门专业</slot>
      </span>
      <span class="gd right" @click="rmzy()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <hot-major ref="major"></hot-major>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">
        <slot>热门简章</slot>
      </span>
      <span class="gd right" @click="rmjz()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <hot-rules ref="rules"></hot-rules>
    <!-- 文章 -->
    <MasterArticle />
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import Qs from 'qs'
import HotRules from '@/components/hot-rules'
import HotMajor from '@/components/hot-major'
import onToch from '@/components/on-toch'
import MasterArticle from '@/components/MasterArticle'
// import Tabber from '@/components/on-tabber'

export default {
  components: {
    'on-toch': onToch,
    'hot-rules': HotRules,
    'hot-major': HotMajor,
    // 'on-tabber': Tabber,
    MasterArticle
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      isNzxx: 1,
      Rmxx: [],
      hotMajor: [],
      hotRmjz: [],
      loading_l: false,
      index: 2,
      childrenName: 1111,
      scrollTag: false,
      zhanShow: false,
      activeIndex: 0,
      Article: [],
      newA: [],
      scroll: 0,
      contt: [],
      catId: []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  activated () {
    this.$store.state.majorMaster_lx = this.$route.query.lx
    console.log(this.$store.state.majorMaster_lx)
    this.$store.state.majorMaster_toch = false
    this.$store.state.majorMaster_major = false
    this.$store.state.majorMaster_rules = false
    this.$store.state.majorMaster_Ace = false
    if (this.$store.state.majorMaster_lx === 1 || this.$store.state.majorMaster_lx === '1') {
      this.$store.state.majorMasterId = 392
    } else if (this.$store.state.majorMaster_lx === 2 || this.$store.state.majorMaster_lx === '2') {
      this.$store.state.majorMasterId = 394
    } else if (this.$store.state.majorMaster_lx === 3 || this.$store.state.majorMaster_lx === '3') {
      this.$store.state.majorMasterId = 395
    } else if (this.$store.state.majorMaster_lx === 4 || this.$store.state.majorMaster_lx === '4') {
      this.$store.state.majorMasterId = 396
    } else if (this.$store.state.majorMaster_lx === 5 || this.$store.state.majorMaster_lx === '5') {
      this.$store.state.majorMasterId = 397
    } else if (this.$store.state.majorMaster_lx === 6 || this.$store.state.majorMaster_lx === '6') {
      this.$store.state.majorMasterId = 398
    } else if (this.$store.state.majorMaster_lx === 7 || this.$store.state.majorMaster_lx === '7') {
      this.$store.state.majorMasterId = 399
    }
    this.major()
  },
  created () {
    this.$store.state.majorMaster_lx = this.$route.query.lx
    console.log(this.$store.state.majorMaster_lx)
    this.$store.state.majorMaster_toch = false
    this.$store.state.majorMaster_major = false
    this.$store.state.majorMaster_rules = false
    this.$store.state.majorMaster_Ace = false
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
    this.major()
  },

  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    rmxx () {
      console.log(this.$route.query.lx)
      if (this.$route.query.lx === '1' || this.$route.query.lx === 1) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '同等学力' } })
      }
      if (this.$route.query.lx === '2' || this.$route.query.lx === 2) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '专业硕士' } })
      }
      if (this.$route.query.lx === '3' || this.$route.query.lx === 3) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '国际院校' } })
      }
      if (this.$route.query.lx === '4' || this.$route.query.lx === 4) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '中外合办' } })
      }
    },
    rmzy () {
      if (this.$route.query.lx === '1' || this.$route.query.lx === 1) {
        this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '2' || this.$route.query.lx === 2) {
        this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '3' || this.$route.query.lx === 3) {
        this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '4' || this.$route.query.lx === 4) {
        this.$router.push({ path: '/zyhome', query: { lx: this.$route.query.lx } })
      }
    },
    rmjz () {
      if (this.$route.query.lx === '1' || this.$route.query.lx === 1) {
        this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '2' || this.$route.query.lx === 2) {
        this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '3' || this.$route.query.lx === 3) {
        this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
      }
      if (this.$route.query.lx === '4' || this.$route.query.lx === 4) {
        this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
      }
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
    pathAcel (id) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: 92 } })
    },
    catid (e) {
      console.log(e)
      let id = e.path[0].attributes[1].value
      let catid = e.path[0].attributes[2].value
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
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
    zysx (id) {
      this.$router.push(`/zysx/${id}`)
    },

    rulesDel (id, i) {
      this.$router.push({
        path: '/rulesDel',
        query: {
          rlid: id,
          zy: this.hotRmjz[i].m_title,
          xy: this.hotRmjz[i].s_title
        }
      })
    },
    // 点击加载
    load () {
      this.$router.push({
        path: '/jzsx',
        query: { lx: this.$route.params.id }
      })
    },

    // 跳转学校首页
    tz (id) {
      this.$router.push(`/schoolHome/${id}`)
    },

    // 专业筛选
    zyhome () {
      this.$router.push({
        path: '/zyhome',
        query: { lx: this.$route.query.lx }
      })
    },
    // 简章筛选
    jzsx () {
      this.$router.push({ path: '/jzsx', query: { lx: this.$route.query.lx } })
    },
    // 学校筛选
    school () {
      console.log(this.$route.query.lx)
      if (this.$route.query.lx === '1' || this.$route.query.lx === 1) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '同等学力' } })
      }
      if (this.$route.query.lx === '2' || this.$route.query.lx === 2) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '专业硕士' } })
      }
      if (this.$route.query.lx === '3' || this.$route.query.lx === 3) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '国际院校' } })
      }
      if (this.$route.query.lx === '4' || this.$route.query.lx === 4) {
        this.$router.push({ path: '/xxsx', query: { lx: this.$route.query.lx, name: '中外合办' } })
      }
    },
    // 报名
    signUp () {
      this.$router.push({
        path: '/signUp',
        query: { lx: this.$route.query.lx }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.content{
  width: 100%;
  overflow: hidden;
}
.conter_wu {
}
.left {
  float: left;
}
.hot_major {
  width: 345px;
  padding: 13px 0px 15px 7px;
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
.toch {
  margin: 0 auto;
}
.swiper-container {
  height: 190px;
  .swiper-slide {
    width: 105px !important;
    margin-left: 20px;
    .baner {
      box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
      width: 140px;
      height: 176px;
      position: relative;
      .logo {
        width: 56px;
        height: 56px;
        padding: 20px 42px 5px 42px;
      }
      h2 {
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        overflow: hidden;
        font-weight: normal;
        color: rgb(51, 51, 51);
        text-align: center;
        position: relative;
        margin: 0px;
      }
      p {
        font-family: 'PingFangSC-Semibold';
        font-size: 11px;
        color: #6f6f6f;
        text-align: center;
        padding: 0px;
        height: 25px;
        margin: 5px;
        line-height: 25px;
      }
      .btn {
        height: 10px;
        line-height: 10px;
        text-align: center;
        .van-tag {
          margin-right: 5px;
          text-align: center;
          border: none;
        }
      }
    }
    .cli {
      width: 380px;
      height: 140px;
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
    text-align: center;
    left: 45%;
    transform: translateX(-50%);
  }
  i {
    position: relative;
    z-index: 10;
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
    text-align: center;
    left: 45%;
    transform: translateX(-50%);
  }
  i {
     position: relative;
    z-index: 10;
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

.content_con {
  width: 335px;
  height: 84px;
  position: absolute;
  top: 189px;
  left: 50%;
  margin-left: -167px;
  border-radius: 8px;
  overflow: hidden;
  -moz-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
  -webkit-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
  box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
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
