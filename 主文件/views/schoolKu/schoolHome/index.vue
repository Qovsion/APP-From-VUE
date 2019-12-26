<template>
  <!-- 学校首页 -->
  <div class="content">
    <div :class="scrollTag?'nav1':'nav'">
      <i class="iconfont le navLeftfont iconfanhui" @click="back()"></i>
      <span>学校首页</span>
    </div>
    <div class="con">
      <img src="../../../assets/images/2211.png" alt />
    </div>
    <div class="title">
      <div class="logo">
        <img v-if="schoolInfo.thumb" :src="'https://www.125yan.com/Uploads/'+schoolInfo.thumb" alt />
      </div>
      <div class="min_title">
        <h3>{{schoolInfo.title.slice(0,11)}}</h3>
        <van-tag color="#F8FAFF" v-if="schoolInfo.biaozhi[1]" text-color="#85A6FF">985</van-tag>
        <van-tag color="#FFF9F2" v-if="schoolInfo.biaozhi[0]" text-color="#FFD1AB">211</van-tag>
      </div>
      <div class="sub_title">
        <i>
          简章:
          <span class="jznum">{{schoolInfo.jz_num}}篇</span>
        </i>
        <i>
          学费:
          <span class="qian">{{schoolInfo.min_money/10000}}万-{{schoolInfo.max_money/10000}}万</span>
        </i>
      </div>
    </div>
    <van-grid :column-num="5" :border="false" class="grid_n">
      <van-grid-item text="学校介绍" @click="xx_js(schoolInfo.id)">
        <i slot="icon" class="iconfont iconxuexiaojieshao"></i>
      </van-grid-item>
      <van-grid-item text="招生信息" @click="xx_zsxx(schoolInfo.id)">
        <i slot="icon" class="iconfont iconzhaoshengxinxi"></i>
      </van-grid-item>
      <van-grid-item text="报考常识" @click="bkcs(schoolInfo.id)">
        <i slot="icon" class="iconfont iconbaokaochangshi"></i>
      </van-grid-item>
      <van-grid-item text="资讯信息" @click="zxxx(schoolInfo.id)">
        <i slot="icon" class="iconfont iconzixunxinxi"></i>
      </van-grid-item>
      <van-grid-item text="立即报名" @click="signUp()">
        <i slot="icon" class="iconfont iconlijibaoming"></i>
      </van-grid-item>
    </van-grid>
    <div class="bor"></div>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">招生项目</span>
    </div>
    <!-- [宫格]同等学力/在职博士... -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item
        v-if="schoolzxx[0]"
        text="同等学力"
        @click="cl_1(schoolzxx[0].major0,schoolzxx[0].major3)"
      >
        <img slot="icon" src="../../../assets/icon/tongdengxueli.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[1]"
        text="专业硕士"
        @click="cl_2(schoolzxx[1].major0,schoolzxx[1].major3)"
      >
        <img slot="icon" src="../../../assets/icon/zhuanyeshuoshi.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[2]"
        text="国际博士"
        @click="cl_3(schoolzxx[2].major0,schoolzxx[2].major3)"
      >
        <img slot="icon" src="../../../assets/icon/guojishuoshi.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[3]"
        text="中外合办"
        @click="cl_4(schoolzxx[3].major0,schoolzxx[3].major3)"
      >
        <img slot="icon" src="../../../assets/icon/zhongwaiheban.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[4]"
        text="在职博士"
        @click="cl_5(schoolzxx[4].major0,schoolzxx[4].major3)"
      >
        <img slot="icon" src="../../../assets/icon/zaizhiboshi.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[5]"
        text="国际博士"
        @click="cl_6(schoolzxx[5].major0,schoolzxx[5].major3)"
      >
        <img slot="icon" src="../../../assets/icon/guojiboshi.png" />
      </van-grid-item>
      <van-grid-item
        icon="photo-o"
        v-if="schoolzxx[6]"
        text="高级研修"
        @click="cl_7(schoolzxx[6].major0,schoolzxx[6].major3)"
      >
        <img slot="icon" src="../../../assets/icon/gaojiyanxiu.png" />
      </van-grid-item>
    </van-grid>
    <div class="bor"></div>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">学院专业</span>
      <span class="gd right" @click="zhuanye_xueyuan(1)">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>

    <div class="items">
      <div class="itemn" v-for="item in hotMajor.xueyuan" :key="item.id" @click="xueyuan(item.id)">
        <ul>
          <li>
            <h3>{{item.short_title.slice(0,5)}}</h3>
          </li>
          <li>
            <h4>
              简章
              <span>{{item.jz_num}}</span>篇
              <img src="../../../assets/images/more_icon.png" alt />
            </h4>
          </li>
        </ul>
      </div>
      <div
        class="itemn"
        v-for="item in hotMajor.zhuanye"
        :key="item.id"
        @click="zhuanye(item.id,item.major3,item.major0)"
      >
        <ul>
          <li>
            <h3>{{item.short_title.slice(0,5)}}</h3>
          </li>
          <li>
            <h4>
              简章
              <span>{{item.jz_num}}</span>篇
              <img src="../../../assets/images/more_icon.png" alt />
            </h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">招生简章</span>
      <span class="gd right" @click="zsjz(1)">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>

    <div class="zsjz">
      <div class="jz" v-for="(item,i) in Rules" :key="item.id" @click="jzsx(item.id,i)">
        <div class="min_title">
          <h3>
            {{item.short_title.slice(0,8)}}
            <!-- <span>{{item.leixing}}</span> -->
            <span class="lx" style="color:#7CC982;" v-if="item.leixing==='同等学力'">{{item.leixing}}</span>
            <span class="lx" style="color:#70A5FF;" v-if="item.leixing=='专业硕士'">{{item.leixing}}</span>
            <span class="lx" style="color:#FF7977;" v-if="item.leixing=='国际硕士'">{{item.leixing}}</span>
            <span class="lx" style="color:#FF9C4D;" v-if="item.leixing=='中外合办'">{{item.leixing}}</span>
            <span class="lx" style="color:#878DC1;" v-if="item.leixing=='在职博士'">{{item.leixing}}</span>
            <span class="lx" style="color:#4C6E99;" v-if="item.leixing=='国际博士'">{{item.leixing}}</span>
            <span class="lx" style="color:#A8BA9A;" v-if="item.leixing=='高级研修'">{{item.leixing}}</span>
          </h3>

          <div class="jindu">
            <span>关注度:</span>
            <van-progress
              :percentage="item.tiao"
              color="#FFC17C"
              :show-pivot="false"
              track-color="#F7FAFF"
            />
          </div>
        </div>
        <p>{{item.c_title}}/{{item.length}}</p>
        <div class="sub_title">
          <i>
            ¥
            <span>{{item.money/10000}}</span>万
          </i>
          <van-button type="default" text-color="rgb(177,187,255)">查看详情</van-button>
        </div>
      </div>
    </div>
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">在线问答</span>
      <span class="gd right" @click="wenda()">
        更多
        <i class="iconfont iconto"></i>
      </span>
    </div>
    <div class="zxwd">
      <div class="wd" v-for="item in Article" :key="item.id">
        <div class="wd_no">
          <span class="wn">问</span>
          <span class="wt">{{item.title}}</span>
        </div>
        <div class="wd_no_1" :id="item.id" ref="daan">
          <span class="da">答</span>
          <span class="wt_da">{{item.description}}</span>
        </div>
      </div>
    </div>

    <van-tabs
      @change="changeChannel(activeIndex)"
      color="#FF9153"
      swipeable
      v-model="activeIndex"
      :offset-top="48"
      sticky
      :lazy-render="true"
    >
      <van-tab v-for="item in dome" :title="item.test" :key="item.id">
        <div class="tab-title" slot="title">{{item.test}}</div>
      </van-tab>
      <!-- <img
        src="../../../assets/images/school_banner.png"
        class="bt_banner"
        alt
        v-show="activeIndex===0"
      />-->
      <div
        class="conter"
        v-for="item in list"
        :key="item.id"
        @click="ArticleDetails(item.id,item.catid)"
      >
        <div :class="item.thumb !=''?'list_new_img':'list_new'">
          <div class="new_img" v-if="item.thumb">
            <van-image
              lazy-load
              fit="cover"
              :src="'https://www.125yan.com/Uploads/'+item.thumb"
              alt
            />
          </div>
          <h2>{{item.title}}</h2>

          <span class="text">{{item.description}}</span>

          <div
            class="bttn"
            :style="item.title.length > 14 && item.thumb !=''?'bottom: 6px;' :'bottom: -14px;'"
          >
            <i class="iconfont iconyanjing"></i>
            <span>{{item.hits_num}}</span>
            <h5>{{item.inputtime}}</h5>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button type="info" class="gengduo" @click="showGd(activeIndex)">查看更多</van-button>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import Qs from 'qs'
// import Tab from '@/components/on-tab'
export default {
  // components: { 'on-tab': Tab },
  data () {
    return {
      loading: false,
      finished: false,
      offset: 10,
      page_num: 1,
      scrollTag: false,
      hotMajor: [],
      Rules: [],
      schoolInfo: {
        biaozhi: [],
        catid: '',
        id: '',
        jz_num: '',
        max_money: '',
        min_money: '',
        thumb: '',
        title: '',
        type: ''
      },
      schoolzxx: [],
      Article: [],
      activeIndex: 0,
      idIndex: 7,
      htmlID: '',
      ArticleIndex: [],
      newA: [],
      dome: [
        { id: 5, test: '问题' },
        { id: 7, test: '招生' },
        { id: 6, test: '公告' },
        { id: 46, test: '考试' }
      ],
      list: []
    }
  },
  mounted () {
    // 解决页面初始化不在最顶部

    // 监听页面滚动 改变导航栏状态
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  activated () {
    // document.body.scrollTop = document.documentElement.scrollTop = 0

    if (this.htmlID !== this.$route.params.id) {
      this.activeIndex = 0
      this.getMajor()
      this.getRules()
      this.getSchoolInfo()
      this.getSchoolzxx()
      this.getWd()
      this.onLoad()
    }
    this.htmlID = this.$route.params.id

    console.log('activated')
  },

  created () {
    // document.body.scrollTop = document.documentElement.scrollTop = 0

    console.log('created')
    this.htmlID = this.$route.params.id
    this.getMajor()
    this.getRules()
    this.getSchoolInfo()
    this.getSchoolzxx()
    this.getWd()
    this.onLoad()
    console.log(this.$route)
  },
  methods: {
    // 文章详情
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    handleScroll () {
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (top > 50) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    },
    showGd (i) {
      if (i === 0) return this.$router.push({ path: `/wenda/${this.htmlID}`, query: { q: i } })
      this.$router.push({ path: `/information/${this.htmlID}`, query: { index: i } })
    },
    onLoad () {
      setTimeout(() => {
        const dada = Qs.stringify({
          catid: this.idIndex,
          school_id: this.$route.params.id,
          num: 5
        })
        this.$http({
          method: 'post',
          url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
          data: dada
        }).then(res => {
          this.loading = false
          this.list = res.data.data
        })
      }, 0)
    },
    jzsx (id, i) {
      this.$router.push({
        path: `/rulesDel`,
        query: {
          rlid: id,
          lx: this.Rules[i].major0,
          zy: this.Rules[i].m_title,
          xy: this.schoolInfo.title
        }
      })
    },
    signUp () {
      this.$router.push({
        path: `/signUp`,
        query: { scid: this.$route.params.id, xy: this.schoolInfo.title }
      })
    },
    bkcs (id) {
      this.$router.push(`/wenda/${this.htmlID}`)
    },
    zxxx (id) {
      this.$router.push(`/information/${this.htmlID}`)
    },
    zsjz () {
      console.log(this.schoolInfo.title)
      this.$router.push({
        path: `/zsxx/${this.htmlID}`,
        query: { xy: this.schoolInfo.title }
      })
    },
    xueyuan (id) {
      this.$router.push({ path: `/schoolDes/${this.htmlID}`, query: { xy: id } })
    },
    zhuanye (id, major3, major0) {
      this.$router.push({ path: `/zsxx/${this.htmlID}`, query: { mar: major3, lx: major0, xy: this.schoolInfo.title } })
    },
    zhuanye_xueyuan (xueyuan) {
      this.$router.push({ path: `/zsxx/${this.htmlID}`, query: { xueyuan: xueyuan } })
    },
    cl_1 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    cl_2 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    cl_3 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    cl_4 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    cl_5 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    cl_6 (lx, mar) {
      this.$router.push({
        path: `/schoolClass/${this.htmlID}`,
        query: { id: this.htmlID, lx: lx, mar: mar }
      })
    },
    // 跳转招生信息
    xx_zsxx (id) {
      this.$router.push({
        path: `/zsxx/${id}`,
        query: { xy: this.schoolInfo.title }
      })
    },
    // 跳转学校介绍
    xx_js (id) {
      this.$router.push(`/schoolJS/${id}`)
    },
    wenda () {
      this.$router.push({ path: `/wenda/${this.htmlID}`, query: { q: 1 } })
    },
    // 热门专业
    getMajor () {
      const dade = Qs.stringify({
        id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        data: dade,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_xyzy'
      }).then(res => {
        this.hotMajor = res.data.data
        console.log(this.hotMajor)
      })
    },
    // 招生简章
    getRules () {
      const ta = Qs.stringify({
        id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        data: ta,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_rmjz'
      }).then(res => {
        this.Rules = res.data.data
        console.log(this.Rules)
      })
    },
    getSchoolInfo () {
      const dada = Qs.stringify({
        id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_info',
        data: dada
      }).then(res => {
        this.schoolInfo = res.data.data
      })
    },
    getSchoolzxx () {
      const dada = Qs.stringify({
        id: this.$route.params.id
        // zlx: this.$route.query.mar
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_zxx',
        data: dada
      }).then(res => {
        console.log(res.data.data)
        this.schoolzxx = res.data.data
      })
    },
    // 问答  接口调用文章列表的问答
    getWd () {
      const dada = Qs.stringify({
        school_id: this.$route.params.id,
        catid: 54
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      }).then(res => {
        console.log(res)
        this.Article = res.data.data.splice(0, 3)
      })
    },
    changeChannel (e) {
      this.idIndex = this.dome[e].id
      this.page_num = 1
      this.list = []
      this.onLoad()
    },

    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ [class*=van-hairline]::after{
  position: static;
}
.van-tabs {
  width: 100%;
  // height: 800px;
  position: relative;
}
.van-tab--active {
  .tab-title {
    font-weight: bold;
    font-family: 'PingFangSC-Medium';
    font-size: 20px;
    color: #000;
  }
}
.tab-title {
  font-family: 'PingFangSC-Regular';
  font-size: 16px;
  color: #000;
}
.btn {
  margin: 0 auto;
  width: 335px;
  height: 40px;
  padding-bottom: 20px;
  .gengduo {
    width: 335px;
    height: 40px;
    border: none;
    text-align: center;
    font-size: 14px;
    color: rgb(133, 166, 255);
    border-radius: 20px;
    background: rgb(247, 250, 255);
  }
}

/deep/ .van-tabs__content {
  height: 700px;
}

.iconfont {
  font-size: 18px;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}

.iconfanhui {
  font-size: 12px;
}
.iconto {
  font-size: 12px;
  color: #ccc;
}
/deep/ .van-grid-item__text {
  padding-top: 5px;
}
/deep/.van-grid-item__content {
  img {
    width: 24px;
    height: 26px;
  }
}
.con {
  width: 375px;
  height: 120px;
  img {
    display: block;
    width: 375px;
    height: 120px;
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
    transform: translateX(-20%);
  }
  .le {
    float: left;
    padding: 0px 0px 13px 20px;
  }
  .ri {
    position: absolute;
    right: 8px;
    top: 15px;
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
  .le {
    float: left;
    padding: 0px 0px 13px 20px;
  }
  .ri {
    position: absolute;
    right: 8px;
    top: 15px;
    padding: 0px 0px 13px 20px;
  }
}
.title {
  width: 335px;
  height: 96px;
  z-index: 1;
  box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
  border-radius: 8px;
  position: absolute;
  background: #fff;
  top: 65px;
  left: 50%;
  transform: translate(-50%);
  .logo {
    width: 56px;
    height: 56px;
    padding: 20px;
    float: left;
    img {
      width: 56px;
      height: 56px;
    }
  }
  .min_title {
    padding-top: 3px;
    width: 230px;
    height: 55px;
    float: left;
    position: relative;
    h3 {
      color: rgb(51, 51, 51);
      padding: 20px 0px 0px 0px;
      font-family: 'PingFangSC-Semibold';
      font-weight: normal;
      font-size: 18px;
      margin: 0;
      float: left;
      height: 55px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      float: left;
      margin-left: 8px;
      margin-top: 23px;
      height: 16px;
      border-radius: 4px;
    }
  }
  .sub_title {
    font-size: 11px;
    color: #373737;
    i {
      font-size: 11px;
      float: left;
      font-style: normal;
      color: rgb(51, 51, 51);
      padding-right: 15px;

      .jznum {
        color: #4a58ff;
      }
      .qian {
        color: #ff9c56;
      }
    }
  }
}
.grid_n {
  width: 335px;
  margin: 0 auto;
  margin-top: 50px;
}
.bor {
  margin-top: 10px;
  background: #f7faff;
  height: 10px;
  width: 375;
}
.left {
  float: left;
}
.hot_major {
  width: 345px;
  height: 30px;
  padding: 10px 0px 10px 5px;
  position: relative;
  overflow: hidden;

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
    top: 48%;
    margin-top: -10px;
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
.items {
  width: 335px;
  margin: 0 auto;
  justify-content: content;
  display: flex;
  padding-bottom: 15px;
  flex-wrap: wrap;
  .itemn {
    width: 104px;
    margin-top: 5px;
    height: 56px;
    display: flex;
    margin-right: 7px;
    position: relative;
    border-radius: 4px;
    -moz-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    &:nth-child(1) {
      background: rgb(247, 250, 255);
    }
    &:nth-child(2) {
      background: rgb(247, 250, 255);
    }
    &:nth-child(3) {
      background: rgb(247, 250, 255);
    }
    ul {
      width: 49px;
      height: 36px;
      margin: 0px 0px 10px 5px;
      li {
        height: 5px;
        line-height: 10px;
        h3 {
          font-family: 'PingFangSC-Medium';
          width: 85px;
          padding: 0px 10px 0px 0px;
          font-size: 14px;
          color: rgb(51, 51, 51);
          height: 14px;
        }
        h4 {
          font-family: 'PingFangSC-Light';
          width: 90px;
          font-weight: normal;
          font-size: 11px;
          color: rgb(153, 153, 153);
          span {
            font-family: 'PingFangSC-Medium';
            color: rgb(74, 88, 255);
          }
          img {
            position: absolute;
            width: 15px;
            height: 15px;
            bottom: 8px;
            right: 10px;
          }
        }
      }
    }
  }
}
.zsjz {
  width: 335px;
  margin: 0 auto;
  padding-bottom: 15px;
  .jz {
    width: 335px;
    height: 104px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    margin-top: 10px;
    border-radius: 8px;
    .min_title {
      height: 50px;
      line-height: 50px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #434343;
        padding-left: 15px;
        float: left;
        font-weight: normal;
        span {
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .jindu {
        height: 50px;
        span {
          font-size: 11px;
          float: right;
          position: absolute;
          right: 80px;
          top: 2px;
        }
        /deep/ .van-progress {
          width: 60px;
          position: absolute;
          right: 10px;
          top: 26px;
        }
      }
    }
    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      padding-left: 12px;
      line-height: 0px;
      height: 11px;
    }
    .sub_title {
      padding-top: 7px;
      height: 20px;
      i {
        font-size: 11px;
        color: rgb(255, 156, 86);
        float: left;
        font-style: normal;
        padding-left: 15px;
        span {
          font-weight: bold;
          font-family: 'PingFangSC-Medium';
          font-size: 16px;
        }
      }
      .van-button {
        width: 90px;
        height: 24px;
        line-height: 24px;
        border-radius: 16px;
        position: absolute;
        bottom: 6px;
        right: 5px;
        color: rgb(177, 187, 255) !important;
        float: right;
      }
    }
  }
}
.zxwd {
  width: 335px;
  // padding: 0px 20px;
  margin: 0 auto;
  position: relative;
  .wd {
    border-bottom: 2px solid #f8f8f8;
    padding: 0px 0px 40px 0px;
    position: relative;
    &:nth-child(1) {
      .wd_no_1 {
        // display: block;
      }
    }
    .wd_no {
      display: flex;
      padding: 10px 0px 0px 0px;
      .wn {
        padding: 2px;
        display: inline-block;
        margin-top: 4px;
        width: 16px;
        height: 16px;
        color: #fff;
        background: rgb(74, 88, 255);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
      .wt {
        width: 305px;
        display: block;
        color: rgb(51, 51, 51);
        font-size: 14px;
        padding-left: 5px;
        line-height: 25px;
      }
    }
    .wd_no_1 {
      line-height: 14px;
      padding: 10px 0px 0px 0px;
      overflow: hidden;
      .wt {
        color: #333333;
        font-size: 14px;
        padding-left: 5px;
      }

      .wt_da {
        width: 295px;
        line-height: 18px;
        display: block;
        float: left;
        font-size: 12px;
        color: #4a4a4a;
        padding-left: 5px;
        line-height: 25px;
      }
      .da {
        padding: 2px;
        color: #fff;
        float: left;
        width: 16px;
        height: 16px;
        line-height: 16px;
        margin-top: 2px;
        background: rgb(255, 193, 124);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
    }
    .date {
      color: rgb(204, 204, 204);
      font-size: 11px;
      position: absolute;
      bottom: 0px;
    }
    .van-tag {
      position: absolute;
      right: 0px;
      bottom: 10px;
    }
  }
}

/deep/ .van-tabs__line {
  width: 10px !important;
  height: 5px;
  box-shadow: 0px 2px 3px -1px rgba(255, 113, 77, 0.49);
  border-radius: 2.5px;
  background: linear-gradient(
    to bottom right,
    rgb(255, 111, 74),
    rgb(255, 191, 95)
  ) !important;
}

.van-tab {
  // position: fixed;
  // position: -webkit-sticky; // 兼容 -webkit 内核的浏览器
  // top: 10px;
  // border: 1px solid;
}

.bt_banner {
  display: block;
  width: 335px;
  margin: 0 auto;
  margin-top: 10px;
}
.list_new {
  margin: 0 auto;
  padding: 9px 0px 35px 0px;
  width: 335px;
  line-height: 12px;
  border-bottom: 2px solid #f8f8f8;
  position: relative;
  h2 {
    font-family: 'PingFangSC-Regular';
    font-weight: normal;
    padding: 0px 0px 10px 0px;
    margin: 0;
    line-height: 25px;
    font-size: 16px;
    color: rgb(51, 51, 51);
  }
  .text {
    font-family: 'PingFangSC-Light';
    line-height: 20px;
    // height: 22px;
    display: inline-block;
    font-size: 12px;
    color: rgb(153, 153, 153);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .bttn {
    margin: 0px;
    padding: 0;
    position: relative;
    bottom: -10px;
    left: 0px;
    .iconyanjing {
       color: #eee;
      font-size: 14px;
      position: absolute;
      left: -7px;
    }
    span {
      color: #eee;
      font-size: 14px;
      left: 18px;
      position: absolute;
    }
  }
  h5 {
    font-family: 'PingFangSC-Regular';
    float: right;
    padding-right: 10px;
    margin: 0;
    font-weight: normal;
    font-size: 11px;
    color: rgb(204, 204, 204);
  }
}

.list_new_img {
  width: 335px;
  padding: 0px 0px 15px 0px;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 2px solid #f8f8f8;

  h2 {
    font-family: 'PingFangSC-Regular';
    padding-top: 3px;
    width: 210px;
    height: 40px;
    font-size: 16px;
    font-weight: normal;
    color: rgb(51, 51, 51);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .text {
    display: inline-block;
    font-size: 12px;
    color: #999999;
    display: none;
  }

  .new_img {
    width: 120px;
    height: 64px;
    margin-top: 15px;
    float: right;
    border-radius: 4px;
    overflow: hidden;
    .van-image {
      width: 120px;
      height: 64px;
    }
  }
  .bttn {
    margin: 0px;
    padding: 0;
    position: relative;
    bottom: 7px;
    left: 0px;
    .iconyanjing {
       color: #eee;
      font-size: 14px;
      position: absolute;
      left: -6px;
    }
    span {
      font-family: 'PingFangSC-Regular';
      padding-left: 10px;
      display: inline-block;
      font-size: 11px;
      color: rgb(204, 204, 204);
      position: absolute;
      left: 9px;
    }
  }
  h5 {
    font-family: 'PingFangSC-Regular';
    float: right;
    padding-right: 10px;
    margin: 0;
    font-weight: normal;
    font-size: 11px;
    color: rgb(204, 204, 204);
  }
}
/deep/ .van-tabs__wrap--scrollable {
  height: 50px;
  padding: 0px 0px 5px;
}
</style>
