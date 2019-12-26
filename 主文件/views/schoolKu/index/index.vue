<template>
  <div class="content">
    <!-- 搜索组件封装 -->
    <!-- <on-seach v-bind:isShow="show" v-on:listen="showee" @click="push()"></on-seach> -->
    <van-sticky :offset-top="0" style="position:fixed;z-index:10;top:0;">
      <div class="nav">
        <van-row>
          <van-col span="5">
            <div class="content_name">
              <span class="region left" @click="isProps">
                {{diqu}}
                <i class="iconfont icondiqu" style="line-height: inherit;"></i>
              </span>
            </div>
          </van-col>
          <van-col span="19">
            <div slot="action">搜索</div>
            <van-search
              :disabled="true"
              v-model="Seachvalue"
              placeholder="请输入搜索关键词"
              shape="round"
              @click="push()"
            ></van-search>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
    <!-- 轮播 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="(image, index) in Swpierimages"
        :key="index"
        @click="Swpup(image,index)"
      >
        <van-image fit="cover" :src="'https://www.125yan.com/Uploads/' + image.mthumb" />
      </van-swipe-item>
    </van-swipe>
    <!-- 在线/在职 -->
    <div class="con">
      <div class="cont">
        <div v-for="item in Zzss" :key="item.tjxh" @click="turn(item.tjxh)"></div>
      </div>
    </div>
    <div class="cont-tw">
      <div @click="tiaozhuan_on()">
        <ul class="cont_tw_font">
          <li>
            <h2>学校库</h2>
          </li>
          <li>
            <h6>
              共
              <span>{{tj.school_num}}</span>所学校
            </h6>
          </li>
        </ul>
      </div>

      <div @click="zyktz()">
        <ul class="cont_tw_font">
          <li>
            <h2>专业库</h2>
          </li>
          <li>
            <h6>
              共
              <span>{{tj.major_num}}</span>个专业
            </h6>
          </li>
        </ul>
      </div>
      <div>
        <ul class="cont_tw_font" @click="jzktz()">
          <li>
            <h2>简章库</h2>
          </li>
          <li>
            <h6>
              共
              <span>{{tj.jianzhang_num}}</span>篇简章
            </h6>
          </li>
        </ul>
      </div>
    </div>
    <!-- 学校库/专业库  -->
    <!-- 报考条件 / 考试科目  模块 -->
    <div class="condition">
      <div class="condition_on" @click="ArticleDetails(87)">
        <span class="iconfont">&#xe637;</span>
        <p>报考条件</p>
      </div>
      <div class="condition_on" @click="ArticleDetails(76)">
        <span class="iconfont">&#xe638;</span>
        <p>考试科目</p>
      </div>
      <div class="condition_on" @click="ArticleDetails(86)">
        <span class="iconfont">&#xe63a;</span>
        <p>报考流程</p>
      </div>
      <div class="condition_on" @click="ArticleDetails(83)">
        <span class="iconfont">&#xe63b;</span>
        <p>时间学费</p>
      </div>
      <div class="condition_on" @click="ckgdArticle()">
        <span class="iconfont">&#xe639;</span>
        <p>查看更多</p>
      </div>
    </div>
    <!-- 分隔线 -->
    <div class="hr"></div>
    <!-- 热门学校  -->
    <on-mintitle @click.native="tnxxk()">热门学校</on-mintitle>
    <!-- 左右滑动 -->
    <on-toch ref="child"></on-toch>
    <!-- 热门专业 -->
    <on-mintitle @click.native="tnzyk()">热门专业</on-mintitle>
    <hot-major ref="major"></hot-major>
    <!-- 热门简章 -->
    <on-mintitle @click.native="tnjzk()">热门简章</on-mintitle>
    <hot-rules ref="rules"></hot-rules>
    <!-- 文章列表 -->
    <!-- <keep-alive> -->
    <on-tab v-on:scrollTag="scrollTag" ref="tab"></on-tab>
    <!-- </keep-alive> -->

    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <div class="sxnr">
         <i class="iconfont le navLeftfont iconfanhui"  @click="show = false"></i>
        <ul style="padding-top:20px">
          <li class="active" @click="show = false">{{this.diqu}}</li>
        </ul>
        <h2>选择地区</h2>
        <ul>
          <li
            :class="item.id===classIndex1?'active':''"
            v-for="(item,i) in dq"
            :key="item.id"
            @click="jil_2(i,item.id,item.name)"
          >{{item.name}}</li>
        </ul>
      </div>
    </van-popup>
     <on-tabber ></on-tabber>
  </div>
</template>

<script>
import MinTitle from '@/components/on-mintitle'
// import onSeach from '@/components/on-seach'
import Qs from 'qs'
import onTab from '@/components/on-tab'
// import onGrid from '@/components/on-grid'
import onToch from '@/components/on-toch'
import HotMajor from '@/components/hot-major'
import HotRules from '@/components/hot-rules'
import Tabber from '@/components/on-tabber'

export default {
  components: {
    'on-tab': onTab,
    // 'on-grid': onGrid,
    'on-mintitle': MinTitle,
    'on-toch': onToch,
    'hot-major': HotMajor,
    'hot-rules': HotRules,
    'on-tabber': Tabber
    // onSeach
  },
  data () {
    return {
      diqu: '全国',
      value1: '',
      fsValue: '',
      classIndex1: '',
      indexClass1_1: '0',
      Seachvalue: '',
      Swpierimages: [],
      show: false,
      isShow: false,
      // 数据加载
      // 学校库
      tj: [],
      Article: [],
      Zzss: [],
      scrollTag: false,
      dq: [],
      scrollTop: 0
    }
  },
  mounted () {

  },
  activated () {

  },
  created () {
    this.inspectEdition()
    // this.$nextTick(() => {
    //   if (this.scrollTop > 0) {
    //     document.body.scrollTop = this.scrollTop
    //   }
    // console.log('created', this.scrollTop)
    // })

    this.getLJ()
    this.getLunBo()
    this.getZzss()
    this.getRmdq()
  },
  // 监听路由主页 从详情页回跳过来拿到滑动参数 不是回跳回来则不用
  watch: {
  },
  methods: {
    // 进入该页面时，用之前保存的滚动位置赋值

    // 在页面离开时记录滚动位置
    // beforeRouteLeave (to, from, next) {
    //   this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //   console.log(this.$store.state.scrollTop)
    //   next()
    // },
    Swpup (item, a) {
      this.$router.push({ path: '/ArticleDetails', query: { id: item.newsid, catid: item.catid } })
    },
    jil_2 (i, id, name) {
      // 类型
      this.value1 = id
      this.classIndex1 = id
      this.diqu = name
      this.$store.state.indexRefresh = this.value1
      this.$refs.child.getRmxx()
      this.$refs.tab.onLoad()
      this.$refs.rules.getRmzj()
      this.$refs.major.getMajor()
      this.show = false
    },
    ArticleDetails (id) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: 92 } })
    },
    ckgdArticle () {
      this.$router.push('/special')
    },
    getRmdq () {
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/get_rmdq'
      })
        .then((res) => {
          this.dq = res.data.data
          var obj = { id: '', name: '全国', area: '' }
          this.dq.unshift(obj)
        })
    },
    tnjzk () {
      this.$router.push('/jzsx')
    },
    tnzyk () {
      this.$router.push('/zyhome')
    },
    tnxxk () {
      this.$router.push('/xxsx')
    },
    zyktz () {
      this.$router.push('/zyhome')
    },
    jzktz () {
      this.$router.push('/jzsx')
    },
    tiaozhuan_on () {
      this.$router.push('/school')
    },
    isProps () {
      this.show = true
    },
    showee (data) {
      this.show = true
    },

    // 获取学校数量
    getLJ () {
      this.$http({
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/tj'
      })
        .then((res) => {
          this.tj = res.data.data
        })
    },
    // 26
    // 轮播图获取
    getLunBo () {
      const dada = Qs.stringify({
        pos_id: 25
      })
      // https://www.125yan.com/interface.php?s=/Home/Index/25
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/lbt/'
      })
        .then((res) => {
          this.Swpierimages = res.data.data
        })
    },

    // 在职硕士
    getZzss () {
      this.$http.post('https://www.125yan.com/interface.php?s=/Home/Index/zzss')
        .then((res) => {
          this.Zzss = res.data.data.splice(0, 3)
        })
    },

    onSearch () {

    },
    push () {
      this.$router.push(`/seach`)
    },
    turn (id) {
      if (id === 1) {
        this.$router.push('/master')
      }
      if (id === 2) {
        this.$router.push('/doctor')
      }
      if (id === 3) {
        this.$router.push(`/curriculum`)
      }
    }
  }
}
</script>
<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
// van-swipe__indicator van-swipe__indicator--active
/deep/ .van-swipe__indicator{
  width: 15px;
  height: 3px;
  border-radius: 3px;
}
.icondiqu {
  margin-left: 2px;
  vertical-align: middle;
}
/deep/ .van-sidebar {
  width: 667px !important;
}
.left {
  float: left;
}
.right {
  float: right;
}
.sxnr {
  width: 355px;
  margin: 0 auto;
  .iconfanhui{
    margin-left: 5px;
  }
  h2 {
    font-family: 'PingFangSC-Regular';
    font-size: 16px;
    margin-left: 6px;
    color: rgb(51,51,51);
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      font-family: 'PingFangSC-Regular';
      background: rgb(247, 250, 255);
      width: 104px;
      padding: 0px 4px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 5px;
      font-size: 14px;
      color: rgb(51, 51, 51);
      margin-left: 5px;
      margin-top: 5px;
      overflow: hidden;
      .van-icon {
        height: 30px;
        line-height: 33px;
        float: right;
        margin-right: 3px;
      }
    }
    li.active {
      font-weight: 600;
      color: rgb(81, 95, 255);
    }
  }
}
body {
  box-sizing: border-box;
  width: 375px;
  margin: 0 auto;
  overflow: hidden;
}
.swiper-container {
  width: 600px;
  height: 120px;
}
.van-swipe {
  width: 335px;
  height: 120px;
  margin: 0 auto;
  margin-top: 60px;
  .van-image {
    overflow: hidden;
    border-radius: 8px;

    width: 335px;
    height: 100%;
  }
}
.condition_on {
  span {
    font-size: 20px;
    text-align: center;
    margin: 0 center;
    width: 58px;
    padding-top: 10px;
    display: block;
  }
  p {
    font-family: 'PingFangSC-Light';
    font-size: 11;
    color: rgb(51, 51, 51);
  }
}
.con {
  width: 335px;
  margin: 0 auto;
  .cont {
    margin-top: 10px;
    display: flex;
    width: 335px;
    justify-content: space-between;

    div:nth-child(1) {
      background: url('../../../assets/images/min_banner_01.png') no-repeat;
      background-size: 108px 80px;
    }
    div:nth-child(2) {
      background: url('../../../assets/images/min_banner_02.png') no-repeat;
      background-size: 108px 80px;
    }
    div:nth-child(3) {
      background: url('../../../assets/images/min_banner_03.png') no-repeat;
      background-size: 108px 80px;
    }
    div {
      width: 108px;
      height: 80px;
      .cont_font {
        margin: 14px 29px 30px 8px;
        width: 64px;
        height: 36px;
        list-style: none;
        li {
          height: 5px;
          width: 98px;
        }
        h2 {
          font-size: 14px;
          color: #fff;
        }
        span {
          font-size: 11px;
          color: #fff;
        }
      }
    }

    .nth {
      border-right: 0px solid #fff;
    }
  }
}
.cont-tw {
  width: 335px;
  padding-top: 5px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  div {
    background: rgb(237, 243, 255);
    width: 68px;
    height: 36px;
    border-radius: 4px;
    padding: 8px 25px 12px 15px;

    .cont_tw_font {
      width: 64px;
      height: 35px;
      li {
        list-style: none;
        padding: 0;
        margin: 0;
        h2 {
          padding: 0;
          margin: 0;
          font-family: 'PingFangSC-Medium';
          color: rgb(51, 51, 51);
          font-size: 14px;
        }
        h6 {
          font-family: 'PingFangSC-Regular';
          font-size: 11px;
          color: rgb(51, 51, 51);
          width: 90px;
          padding: 0;
          margin-top: 2px;
          font-weight: normal;
          span {
            color: rgb(74, 88, 255);
            font-weight: normal;
          }
        }
      }
    }
  }
  div :last-child {
    width: 68px;
  }
  .nth {
    border-right: 0px solid #fff;
  }
}
.condition {
  width: 335px;
  height: 84px;
  margin: 0 auto;
  display: flex;
  div {
    width: 74px;
    height: 74px;
    padding: 5px;
    img {
      width: 24px;
      height: 24px;
      display: block;
      margin: 10px auto;
    }
    p {
      font-size: 11px;
      text-align: center;
    }
  }
}
.hr {
  width: 375px;
  height: 10px;
  background: rgb(249, 251, 255);
}
.hot_school {
  height: 40px;
  padding: 10px 0px;
  position: relative;
  p {
    margin: 0;
    padding: 0;
    width: 5px;
    height: 16px;
    position: absolute;
    left: 15px;
    overflow: hidden;
    top: 50%;
    margin-top: -20px;
    background: url('https://img.yzcdn.cn/vant/cat.jpeg') no-repeat center /
      12px auto;
  }
  .school {
    position: absolute;
    font-size: 18px;
    margin-left: 14px;
    font-weight: 600;
    left: 25px;
  }

  .gd {
    width: 60px;
    height: 30px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    right: 10px;
    font-size: 14px;
    color: rgb(153, 153, 153);
    vertical-align: middle;
    .van-icon {
      position: absolute;
      top: 50%;
      margin-top: -13px;
    }
  }
}

.my_major {
  width: 335px;
  height: 150px;
  margin: 0 auto;
}

.nav {
  padding-right: 10px;
  padding-top: 5px;
  background: #fff;
}
.content_name {
  width: 180px;
  // height: 20px;
  display: block;
  background: #fff;
  position: relative;

  .region {
    // display: block;
    vertical-align: middle;
    color: rgb(69, 69, 69);
    margin: 0 auto;
    font-size: 14px;
    font-family: 'PingFangSC-Medium';
    background: #fff;
    position: absolute;
    top: 16px;
    left: 21px;
  }
  .icondiqu {
    position: relative;
    top: -1.5px;
    vertical-align: middle;
  }
}
</style>
