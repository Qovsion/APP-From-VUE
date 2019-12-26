<template>
  <!-- 学校首页 -->
  <div class="content">
    <div :class="scrollTag?'nav1':'nav'">
      <i slot="left" class="iconfont le navLeftfont iconfanhui" @click="back()"></i>
      <span>学校类型</span>
    </div>
    <div class="con">
      <img src="../../../assets/images/2211.png" alt />
    </div>
    <div class="title">
      <div class="logo">
        <img :src="'https://www.125yan.com/Uploads/'+schoolInfo.thumb" alt />
      </div>
      <div class="min_title">
        <h3>{{schoolInfo.title.slice(0,8)}}</h3>
        <van-tag
          color="#F9B083"
          text-color="#fff"
          v-if="schoolInfo.lxname=='MBA'"
        >{{schoolInfo.lxname}}</van-tag>
        <van-tag
          color="#D9626D"
          text-color="#fff"
          v-if="schoolInfo.lxname=='EMBA'"
        >{{schoolInfo.lxname}}</van-tag>
        <van-tag
          color="#3FBFA8"
          text-color="#fff"
          v-if="schoolInfo.lxname=='MPAcc'"
        >{{schoolInfo.lxname}}</van-tag>
        <van-tag
          color="#6DE6D6"
          text-color="#fff"
          v-if="schoolInfo.lxname=='MPA'"
        >{{schoolInfo.lxname}}</van-tag>
        <van-tag
          color="#43B7F2"
          text-color="#fff"
          v-if="schoolInfo.lxname=='MF'"
        >{{schoolInfo.lxname}}</van-tag>
         <van-tag
          color="#97D479"
          text-color="#fff"
          v-if="schoolInfo.lxname=='MEM'"
        >{{schoolInfo.lxname}}</van-tag>

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
    <div class="bor" v-show="this.$route.query.lx==2"></div>

    <div class="bor"></div>
    <div class="hot_major" style="margin-top:20px">
      <span class="major left">入学须知</span>
    </div>

    <div class="items">
      <div class="itemn">
        <ul>
          <li
            v-for="(item,i) in Rxxz"
            :key="item.id"
            @click="ArticleDetails(item.id,i)"
          >{{item.short_title}}</li>
        </ul>
      </div>
    </div>

    <van-tabs
      @change="changeChannel(activeIndex)"
      color="#FF9153"
      swipeable
      v-model="activeIndex"
      :offset-top="offset"
      sticky
      :lazy-render="true"
    >
      <van-tab v-for="item in dome" :title="item.test" :key="item.id">
        <div class="tab-title" slot="title">{{item.test}}</div>
      </van-tab>

      <!-- <img src="../../assets/images/school_banner.png" class="bt_banner" alt /> -->
     <van-list
          v-model="loading"
          :finished="finished"
          v-if="this.activeIndex===0"
          finished-text="没有更多了"
          :offset-top="offset"
          @load="onLoad"
        >
      <div >
        <!-- 简章 -->
        <van-dropdown-menu :z-index="5" :overlay="isMengceng" @click.native="ooo" v-if="active===0">
          <van-dropdown-item ref="item_one" :title="title_1" v-model="value1">
            <ul class="listn">
              <li
                :class="item.value==classIndex1?'active_on':''"
                v-for="item in option1"
                :key="item.value"
                @click="changeOption(item.value)"
              >{{item.text}}</li>
            </ul>
          </van-dropdown-item>
          <van-dropdown-item :title="title_2" v-model="value2" ref="item_tw">
            <ul class="listn">
              <li
                :class="item.value==classIndex2?'active_on':''"
                v-for="item in option2"
                :key="item.value"
                @click="changeOption_ths(item.value)"
              >{{item.text}}</li>
            </ul>
          </van-dropdown-item>
          <van-dropdown-item ref="item_ths" :title="title_3" v-model="value3">
            <ul class="listn_zy">
              <li
                :class="item.value==classIndex3?'active_on':''"
                v-for="item in option3"
                :key="item.value"
                @click="changeOption_for(item.value)"
              >{{item.text}}</li>
            </ul>
          </van-dropdown-item>
          <van-dropdown-item ref="item_for" :title="title_4" v-model="value4">
            <!-- 地点选择 -->
            <ul class="listn_dd">
              <li
                v-for="item in items"
                :key="item.cc"
                @click.stop="cc(item.cc)"
                class="nn"
                :class="item.cc==classIndex?'active_on':''"
              >{{item.text}}</li>
            </ul>
            <ul class="listn_dd_chr">
              <li
                v-for="item in childrenList"
                :key="item.id"
                @click.stop="rightCc(item.id)"
                :class="item.id==classIndex4?'active_on':''"
              >{{item.name}}</li>
            </ul>
          </van-dropdown-item>
        </van-dropdown-menu>
          <div class="zsjz" v-if="activeIndex===0">
            <div class="jz" v-for="(item,i) in list" :key="item.id" @click="jzsx(item.id,i)">
              <div class="min_title">
                <h3>
                  {{item.short_title}}
                  <!-- <span>{{item.lxname}}</span> -->
                </h3>
                <div class="jt">
                  <i class="iconfont iconto"></i>
                </div>
                <!-- 箭头 -->
                <i class="jz_qian">
                  ¥
                  <span>{{item.money / 10000}}</span>万
                </i>
              </div>
              <p>{{item.zyname}}/{{item.length}}/{{item.areas[0]}}</p>
              <div class="sub_title">
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
            </div>
          </div>
          <div class="zsjz_1" v-if="activeIndex===1">
            <div class="jz" v-for="item in SchoolData" :key="item.id">
              <div class="min_title">
                <h3>{{item.short_title}}</h3>
                <div class="jt">
                  <van-icon name="arrow" />
                </div>
                <!-- 箭头 -->
              </div>
              <p>
                简章：
                <span class="jznum">{{item.jz_num}}</span>&nbsp;&nbsp;&nbsp;学费：
                <span
                  class="yuan"
                >{{item.min_money}}元-{{item.max_money / 10000}}万</span>
              </p>
              <div class="sub_title">
                <div class="jindu">
                  <span>{{item.description}}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
     </van-list>
 <van-list
          v-model="loadings"
          :finished="finisheds"
          :v-if="isShows"
          finished-text="没有更多了"
          @load="onLoads"
          v-if="this.activeIndex!==0"
        >
      <!-- 问答 -->
      <div class="zxwd" v-show="this.activeIndex===4">
        <div class="wd" v-for="(item,i) in ArticleIndex" :key="i">
          <div class="wd_no">
            <span class="wn">问</span>
            <span class="wt">{{item.title}}</span>
          </div>
          <div class="wd_no_1" :id="item.id" ref="daan">
            <span class="da">答</span>
            <span class="wt_da">{{item.description}}</span>
          </div>
          <div>
            <p class="date">{{item.inputtime}}</p>
            <!-- 展开收起 -->
            <van-tag
              class="zk"
              ref="zk"
              color="#F7FAFF"
              text-color="#ACB7FF"
              @click="zhankai(item.id,i)"
            >
              <span>展开</span>
              <i class="iconfont iconxfup"></i>
            </van-tag>
          </div>
        </div>
      </div>
      <div v-if="this.activeIndex !== 4">
        <div
          class="conter"
          v-for="item in ArticleIndex"
          :key="item.id"
          @click="Article(item.id,item.catid,i)"
        >
          <div :class="item.thumb !=''?'list_new_img':'list_new'">
            <div class="new_img" v-if="item.thumb">
              <img :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
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
      </div>
       </van-list>
    </van-tabs>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      page_num: 1,
      nullData: false,
      offset: 48,
      loading: false,
      loadings: false,
      classIndex: '',
      classIndex4: '',
      scrollTag: false,
      hotMajor: [],
      Rules: [],
      schoolInfo: { title: '' },
      schoolzxx: [],
      Rxxz: [],
      idIndex: '',
      ArticleIndex: [],
      newA: [],
      activeIndex: 0,
      dome: [
        { id: '', test: '简章' },
        { id: 5, test: '报考' },
        { id: 7, test: '招生' },
        { id: 6, test: '公告' },
        { id: 54, test: '问答' }

      ],
      htmlID: '',
      // jianzhang
      id: '',
      eIndex: 0,
      title_1: '方式',
      title_2: '学院',
      title_3: '专业',
      title_4: '地点',
      classIndex1: '',
      classIndex2: '',
      classIndex3: this.$route.query.mar,
      value1: '',
      value2: '',
      value3: this.$route.query.mar,
      value4: '',
      // 名称
      name1: '不限',
      name2: '学校地区',
      name3: '不限',
      active: 0,
      isMengceng: true,
      calssIndex: '',
      show: false,
      isShow: false,
      itemsIndex: 0,
      items: [{}], // 地址所需数据
      activeId: 1,
      activeIndex_1: 0,
      finished: false,
      finisheds: false,
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      children: [],
      lx_arr: [],
      zy_arr: [],
      ZyArr: [],
      xy_arr: [],
      dd_arr: [],
      list: { area: '',
        areas: [''],
        catid: '',
        hits_num: '',
        id: '',
        length: '',
        lxname: '',
        major0: '',
        major3: '',
        money: '',
        short_title: '',
        tiao: 0,
        zyname: '' },
      rightArr: [{ 'id': '', 'name': '不限' }],
      SchoolData: [],
      childrenList: [],
      school_id: 0,
      isShows: false,
      page_nums: 1
    }
  },
  mounted () {
    // 监听页面滚动 改变导航栏状态
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  updated () {
    this.moren()
  },
  activated () {
    this.school_id = Number(this.$route.query.id)
    this.htmlID = this.$route.params.id
    this.value3 = this.$route.query.mar
    this.classIndex3 = this.$route.query.mar
    this.getSchoolInfo()
    this.addData = []
    this.page_num = 1
    this.ArticleIndex = []
    this.page_nums = 1
    this.page_num = 1
    this.activeIndex = 0
    this.getRuxue()
    this.onLoad(2)
  },
  created () {
    this.school_id = Number(this.$route.query.id)
    this.htmlID = this.$route.params.id
    this.getMajor()
    this.getRules()
    this.getSchoolInfo()
    this.getSchoolzxx()
    this.getRuxue()
    this.getArticle()
    this.page_num = 1
    this.onLoad(2)
  },

  methods: {
    handleScroll () {
      let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (top > 50) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    },
    Article (id, catid, i) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    jzsx (id, i) {
      this.$router.push({ path: `/rulesDel`, query: { rlid: id, lx: this.$route.query.lx, zy: this.list[i].zyname, xy: this.schoolInfo.title } })
    },
    // 入学须知跳转
    ArticleDetails (id, i) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: 55 } })
    },
    // 热门专业
    getMajor () {
      const dade = Qs.stringify({
        id: this.$route.query.id
      })
      this.$http({
        method: 'post',
        data: dade,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_xyzy'
      })
        .then((res) => {
          this.hotMajor = res.data.data
          console.log(this.hotMajor)
        })
    },
    // 招生简章
    getRules () {
      const ta = Qs.stringify({
        id: this.$route.query.id
      })
      this.$http({
        method: 'post',
        data: ta,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_rmjz'
      })
        .then((res) => {
          this.Rules = res.data.data
          console.log(this.Rules)
        })
    },
    getSchoolInfo () {
      const dada = Qs.stringify({
        id: this.$route.query.id,
        // lx: this.$route.query.lx,
        zlx: this.$route.query.mar
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_info',
        data: dada
      })
        .then((res) => {
          this.schoolInfo = res.data.data
          console.log(this.schoolInfo)
        })
    },
    getSchoolzxx () {
      const dada = Qs.stringify({
        id: this.$route.query.id,
        lx: this.$route.query.lx
        // zlx: this.$route.query.mar
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_zxx',
        data: dada
      })
        .then((res) => {
          // this.schoolInfo = res.data.data
          this.schoolzxx = res.data.data
        })
    },
    getRuxue () {
      const dada = Qs.stringify({
        school_id: this.$route.params.id,
        major3: this.$route.query.mar
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zxx_rxxz',
        data: dada
      })
        .then((res) => {
          console.log(res)
          this.Rxxz = res.data.data
        })
    },
    changeChannel (e) {
      this.idIndex = this.dome[e].id
      this.ArticleIndex = []
      this.loadings = true
      this.finisheds = false
      this.page_nums = 1
      this.onLoads()
    },
    onLoads () {
      if (this.activeIndex !== 0) {
        const dada = Qs.stringify({
          catid: this.idIndex,
          school_id: this.$route.query.id,
          major0: this.$route.query.lx,
          major3: this.$route.query.mar,
          page: this.page_nums,
          num: 10
        })
        this.$http({
          method: 'post',
          url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
          data: dada
        })
          .then((res) => {
            this.loadings = false
            if (res.data.data.length !== 0) {
              this.page_nums = this.page_nums + 1
              this.ArticleIndex.push(...res.data.data)
            } else {
              this.finisheds = true
            }
          })
      }
    },
    getArticle () {
    },
    // 点击[地点]中导航左侧菜单
    cc (cc) {
      this.classIndex = cc
      this.value4 = Number(cc)
      var addClass = document.getElementsByClassName('listn_dd')[0]
      var ac = document.getElementsByClassName('listn_dd_chr')[0]
      addClass.classList.add('listn_dd_1')
      ac.style.display = 'block'
      this.value5 = ''
      this.classIndex4 = ''
      this.addData = []
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.onLoad(2)
    },
    // 点击[地点]中导航右侧菜单
    rightCc (id) {
      this.value5 = id
      this.classIndex4 = id
      // 关闭
      this.$refs.item_for.toggle(false)
      this.addData = []
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.onLoad(2)
    },
    // 切换地点显示隐藏
    ooo (e) {
      if (this.title_4 === e.target.innerText) {
        this.isShow = true
      }
    },
    isClose () { },
    changeOption (index) {
      console.log(index)
      this.value1 = index
      this.classIndex1 = index
      this.$refs.item_one.toggle(false)
      console.log(this.name1)
      this.page_num = 1
      this.onLoad(2)
    },
    changeOption_ths (index) {
      this.value2 = index
      this.classIndex2 = index
      this.$refs.item_tw.toggle(false)
      // var cc = this.$refs.item_tw.$refs.wrapper.lastChild
      // cc.addEventListener('click', e => {
      //   var nr = e.target.innerText
      //   this.name2 = nr
      // })
      console.log(this.name2)
      this.page_num = 1
      this.onLoad(2)
    },
    changeOption_for (index) {
      this.value3 = index
      console.log(index)
      this.classIndex3 = index
      this.$refs.item_ths.toggle(false)
      this.page_num = 1
      this.onLoad(2)
    },
    getMap (e) {
      this.eIndex = e
      this.id = this.dd_arr[e].id
      this.id = Number(this.id)
      this.calssIndex = 0
      console.log(this.$refs.item_for)
      this.page_num = 1
      this.onLoad(2)
    },
    // 获取简章数据
    onLoad (indexs) {
      if (this.activeIndex === 0) {
        const dada = Qs.stringify({
          school_id: this.school_id,
          lx: this.$route.query.lx,
          fs: this.value1,
          xy: this.value2,
          zy: this.value3,
          dd: this.value4,
          cs: this.value5,
          page: this.page_num,
          num: 20
          // 学校ID 类型 学院 专业 地点
        })
        this.$http({
          method: 'post',
          data: dada,
          url: 'https://www.125yan.com/interface.php?s=/Home/Index/zxx_jzsx'
        }).then(res => {
          res = res.data.data
          this.lx_arr = res.fs_arr
          this.xy_arr = res.xy_arr
          this.zy_arr = res.zy_arr
          this.dd_arr = res.dd_arr
          // cs_arr
          let cc = this.rightArr.concat(...res.cs_arr)
          this.childrenList = cc
          console.log(this.childrenList)

          // 重铸dd_arr

          let co = res.fs_arr.map(item => {
            return { value: item.id, text: item.name }
          })
          var obj = [{ text: '不限', value: '' }]
          co.unshift(...obj)
          this.option1 = co

          let cn = this.xy_arr.map(item => {
            return { value: item.id, text: item.name }
          })
          var obj1 = [{ text: '不限', value: '' }]
          cn.unshift(...obj1)
          this.option2 = cn

          let zy = this.zy_arr.map(item => {
            return { value: item.major3, text: item.title }
          })
          var obj2 = [{ text: '不限', value: '' }]
          zy.unshift(...obj2)
          this.option3 = zy

          let dd = this.dd_arr.map(item => {
            return { cc: item.id, text: item.name }
          })
          var obj4 = [{ cc: 0, text: '不限' }]
          dd.unshift(...obj4)
          this.items = dd
          this.loading = false
          if (indexs === 2) {
            this.page_num = this.page_num + 1
            this.list = res.list
          } else if (res.list.length !== 0) {
            this.page_num = this.page_num + 1
            this.list.push(...res.list)
          } else {
            this.finished = true
          }
        })
      }
    },
    getTrain () {
    },
    // 默认展开
    moren () {
      let cc = document.getElementsByClassName('wd_no_1')[0]
      if (cc) {
        cc.style.display = 'block'
        let bt = document.getElementsByClassName('zk')[0]
        cc.style.display === 'block' ? bt.innerHTML = `<span data-v-fc334854="">收起</span><i data-v-fc334854="" class="van-icon van-icon-arrow-up"></i>` : bt.innerHTML = `<span data-v-fc334854="">展开</span><i data-v-fc334854="" class="van-icon van-icon-arrow-down"></i>`
        cc.style.display === 'block' ? this.zhanShow = true : this.zhanShow = false

        if (this.zhanShow) {
          bt.style.setProperty('background', 'rgb(255,250,244)', 'important')
          bt.style.setProperty('color', 'rgb(255,177,122)', 'important')
        } else {
          bt.style.setProperty('background', '#F7FAFF', 'important')
          bt.style.setProperty('color', '#ACB7FF', 'important')
        }
      }
    },
    // 展开收起
    zhankai (id, i) {
      let cc = document.getElementsByClassName('wd_no_1')[i]
      if (this.$refs.daan[i].id === id) {
        let bt = document.getElementsByClassName('zk')[i]
        cc.style.display === 'block' ? this.zhanShow = true : this.zhanShow = false
        if (this.zhanShow === false) {
          bt.style.setProperty('background', 'rgb(255,250,244)', 'important')
          bt.style.setProperty('color', 'rgb(255,177,122)', 'important')
        } else {
          bt.style.setProperty('background', '#F7FAFF', 'important')
          bt.style.setProperty('color', '#ACB7FF', 'important')
        }
        cc.style.display === 'block' ? (cc.style.display = 'none') : (cc.style.display = 'block')
        cc.style.display === 'block' ? bt.innerHTML = `<span data-v-fc334854="">收起</span><i data-v-fc334854="" class="van-icon van-icon-arrow-up"></i>` : bt.innerHTML = `<span data-v-fc334854="">展开</span><i data-v-fc334854="" class="van-icon van-icon-arrow-down"></i>`
      }
    },

    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.null {
  width: 335px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: #333;
  padding-top: 20px;
}
.iconto {
  font-size: 12px;
  color: #ccc;
}
/deep/ .van-ellipsis {
  margin-right: 5px;
}
/deep/ .van-dropdown-menu__title::after {
  color: #ccc;
  margin-right: 6px;
}
/deep/ .van-dropdown-menu {
  height: 32px;
  padding-top: 10px;
  margin: 0 auto;
  /deep/ .van-ellipsis {
    font-size: 12px;
  }
}
/deep/ .van-dropdown-menu__item {
  width: 80px;
  height: 32px;
  background: rgb(248, 248, 248);
  border-radius: 16px;
  margin-left: 15px;
}
/deep/ .van-grid-item__content {
  img {
    width: 21px;
    height: 24px;
  }
}
/deep/ .van-grid-item__text {
  padding-top: 5px;
}
/deep/ .van-tabs__content {
  width: 100%;
  height: 100%;
  position: relative;
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
      float: left;
      padding: 20px 10px 0px 0px;
      font-family: 'PingFangSC-Semibold';
      font-size: 18px;
      font-weight: normal;
      margin: 0;
      height: 55px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-tag {
      float: left;
      margin-top: 23px;
      height: 16px;
      border-radius: 10px;
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
  margin-top: 40px;
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
    right: -0px;
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
  width: 355px;
  //   height: 130px;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;

  .itemn {
    margin-top: 2px;
    display: flex;
    // margin-right: 5px;
    position: relative;

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        line-height: 40px;
        margin: 1px 0px 10px 11px;
        padding: 0px 5px;
        width: 94px;
        text-align: center;
        font-size: 12px;
        color: rgb(51, 51, 51);
        height: 40px;
        border-radius: 20px;
        background: rgb(247, 250, 255);
      }
    }
  }
}
.listn_dd {
  width: 375px;
  // height: 400px;
  margin: 0 auto;
  padding: 10px 0px;
  float: left;
  overflow: scroll;
  .nn {
    text-align: center;
    // width: 375px;
    // margin: 0 auto;
    border: none;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.listn_dd_1 {
      height: 400px;
  width: 90px;
  margin: 0;
  float: left;
  li {
    border-bottom: 1px solid rgb(247, 250, 255) !important;
  }
}
.listn_dd_chr {
  width: 280px;
  margin: 0 auto;
  padding: 10px 0px;
  float: left;
  overflow: scroll;
  display: none;
  li {
    text-align: center;
    width: 80px;
    padding-left: 60px;
    // margin: 0 auto;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.zsjz {
  width: 335px;
  margin: 0 auto;
  .jz {
    width: 335px;
    height: 104px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    margin-top: 10px;
    border-radius: 8px;
    .min_title {
      h3 {
        font-weight: normal;
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #434343;
        padding-left: 15px;
        float: left;
        span {
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .jt {
        width: 22px;
        height: 22px;
        border-radius: 22px;
        background: rgb(247, 250, 255);
        right: 10px;
        top: 17px;
        position: absolute;
        .iconto {
          color: rgb(228, 230, 255);
          line-height: 22px;
          text-align: center;
          display: block;
          margin: 0 auto;
        }
      }

      .jz_qian {
        font-size: 12px;
        color: rgb(255, 156, 86);
        font-style: normal;
        position: absolute;
        right: 15px;
        bottom: 5px;
        span {
          font-size: 16px;
        }
      }
    }
    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      padding-left: 12px;
    }

    .sub_title {
      padding-top: 7px;
      height: 20px;
      .jindu {
        height: 50px;
        span {
          font-size: 11px;
          float: right;
          position: absolute;
          left: 15px;
          bottom: 15px;
        }
        /deep/ .van-progress {
          width: 60px;
          position: absolute;
          left: 70px;
          bottom: 20px;
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
        width: 312px;
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
      display: none;
      overflow: hidden;
      .wt {
        color: #333333;
        font-size: 14px;
        padding-left: 5px;
      }

      .wt_da {
        width: 300px;
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
      display: inline-block;
      font-size: 11px;
      color: rgb(204, 204, 204);
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
  p {
    margin: 0px;
    width: 80px;
    float: left;
    padding: 0;
    position: relative;
    line-height: 0;
    .iconyueduliang {
      color: #eee;
      font-size: 10px;
    }
    span {
      font-family: 'PingFangSC-Regular';
      padding-left: 10px;
      display: inline-block;
      font-size: 11px;
      color: rgb(204, 204, 204);
      position: absolute;
      bottom: 0px;
      left: 12px;
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

.contt {
  padding-left: 10px;
  li {
    height: 50px;
    color: #4f4f4f;
    font-size: 14px;
    line-height: 50px;
  }
  .active {
    font-size: 15px;
    color: #4e5cff;
    font-weight: 700;
  }
}
.content {
}
.van-tree-select {
  height: 750px !important;
  // top: 96px;
  // position: absolute;
  // z-index: 500;
  width: 370px;
}
.van-list {
  margin: 0 auto;
  width: 335px;
  margin-left: 20px;
}
/deep/ [class*='van-hairline']::after {
  position: static;
}
.zsjz {
  width: 335px;
  margin: 0 auto;
  .jz {
    width: 335px;
    height: 104px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    margin-top: 10px;
    border-radius: 8px;
    .min_title {
      padding: 15px 0px 5px 0px;
      height: 20px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #434343;
        padding-left: 15px;
        float: left;
        span {
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .jt {
        // background: rgb(247,250,255);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        top: 15px;
        right: 18px;
        line-height: 25px;
        .van-icon {
          line-height: 20px;
          text-align: right;
          font-size: 18px;
          color: #e4e6ff;
        }
      }
    }

    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      height: 20px;
      padding-left: 12px;
    }
    .sub_title {
      padding-top: 7px;
      height: 20px;

      .jindu {
        height: 50px;

        span {
          font-size: 11px;
          float: right;
          position: absolute;
          left: 15px;
          bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 300px; /*需要配合宽度来使用*/
        }
        /deep/ .van-progress {
          width: 60px;
          position: absolute;
          left: 70px;
          bottom: 15px;
        }
      }
      i {
        display: block;
        font-size: 11px;
        position: absolute;
        right: 18px;
        bottom: 10px;
        color: rgb(255, 156, 86);
        font-style: normal;
        padding-left: 15px;
      }
    }
  }
}
.zsjz_1 {
  width: 335px;
  margin: 0 auto;
  .jz {
    width: 335px;
    height: 104px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    margin-top: 10px;
    border-radius: 8px;
    .min_title {
      height: 30px;
      line-height: 30px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #434343;
        padding-left: 15px;
        float: left;
        span {
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .jt {
        // background: rgb(247,250,255);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        right: 18px;
        line-height: 25px;
        .van-icon {
          line-height: 20px;
          text-align: right;
          font-size: 18px;
          color: #e4e6ff;
        }
      }
    }

    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      height: 20px;
      padding-left: 12px;
      .jznum {
        color: rgba(87, 101, 255);
      }
      .yuan {
        color: rgba(255, 177, 111);
      }
    }
    .sub_title {
      padding-top: 7px;
      height: 20px;

      .jindu {
        height: 50px;

        span {
          color: rgba(105, 105, 105);
          font-size: 11px;
          float: right;
          position: absolute;
          left: 15px;
          bottom: 10px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          width: 300px; /*需要配合宽度来使用*/
        }
      }
    }
  }
}
.listn_zy {
  width: 355px;
  margin: 0 auto;
  height: 290px;
  padding: 10px 0px;

  li {
    float: left;
    width: 40%;
    display: flex;
    padding: 0px 10px;
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    font-size: 14px;
  }
}
.listn {
  width: 375px;
  margin: 0 auto;
  padding: 10px 0px;
  li {
    text-align: center;
    width: 335px;
    margin: 0 auto;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.active_on {
  color: rgb(74, 88, 255);
}
.cont-t {
  margin-top: 40px;
}
.van-cell__value--alone {
  color: #fff;
  background: rgb(74, 88, 255);
}
</style>
