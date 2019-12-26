<template>
  <div class="content">
    <van-nav-bar title="专业首页" left-arrow fixed @click-left="$router.back()">
      <i slot="left" class="iconfont navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="xq">
      <h2>
        {{content.short_title}}
        <van-tag
          round
          color="#7CC982"
          text-color="#fff"
          v-if="content.lxname=='同等学力'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#70A5FF"
          text-color="#fff"
          v-if="content.lxname=='专业硕士'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#FF7977"
          text-color="#fff"
          v-if="content.lxname=='国际硕士'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#FF9C4D"
          text-color="#fff"
          v-if="content.lxname=='中外合办'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#878DC1"
          text-color="#fff"
          v-if="content.lxname=='在职博士'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#4C6E99"
          text-color="#fff"
          v-if="content.lxname=='国际博士'"
        >{{content.lxname}}</van-tag>
        <van-tag
          round
          color="#A8BA9A"
          text-color="#fff"
          v-if="content.lxname=='高级研修'"
        >{{content.lxname}}</van-tag>
      </h2>
      <!-- <van-tag round type="success">{{content.lxname}}</van-tag> -->

      <p>
        <i>
          简章:
          <span class="jznum">{{content.jz_num}}篇</span>
        </i>
        <i>
          学费:
          <span class="qian">{{content.min_money/10000}}万-{{content.max_money/10000}}万</span>
        </i>
        <i>
          院校:
          <span class="nian">{{content.xx_num}}所</span>
        </i>
      </p>
    </div>
    <!-- 筛选 -->
    <van-tabs
      @change="changeChannel(activeIndex)"
      color="#FF9153"
      swipeable
      v-model="activeIndex"
      :offset-top="44"
      sticky
      :lazy-render="true"
    >
      <van-tab v-for="(item,i) in dome" :title="item.test" :key="i+10000">
        <div class="tab-title" slot="title">{{item.test}}</div>
      </van-tab>

      <!-- <img src="../../assets/images/school_banner.png" class="bt_banner" alt /> -->

      <div v-if="this.activeIndex==0">
        <!-- 简章 -->
        <van-dropdown-menu :z-index="5" :overlay="isMengceng" @click.native="ooo" v-if="active===0">
          <van-dropdown-item ref="item_one" :title="title_1" v-model="value1">
            <ul class="listn">
              <li
                :class="item.value==classIndex1?'active_on':''"
                v-for="(item,i) in option1"
                :key="i"
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
          <van-dropdown-item ref="item_ths" :title="title_3" v-model="value3">
            <ul class="listn">
              <li
                :class="item.value==classIndex3?'active_on':''"
                v-for="item in option3"
                :key="item.value"
                @click="changeOption_for(item.value)"
              >{{item.text}}</li>
            </ul>
          </van-dropdown-item>
        </van-dropdown-menu>

        <van-list
          v-model="loading"
          :finished="finished"
          :v-if="isShow"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 简章筛选 -->
          <div class="list_rules">
            <div class="list_s" v-for="(item,i) in list" :key="i" @click="rulesDel(item.id,i)">
              <div class="logo left">
                <img :src="'https://www.125yan.com/Uploads/' + item.s_thumb" alt />
              </div>
              <div class="font">
                <div class="font-w">
                  <h3>{{item.short_title}}</h3>
                  <span>{{item.leixing}}</span>
                </div>
                <span>{{item.s_title}}/{{item.c_title}}</span>
              </div>
              <div class="right icon_xf">
                <van-tag type="warning">{{item.money | Upper}}万</van-tag>
              </div>
              <span class="hang">{{item.title}}</span>
              <div class="tag">
                <!-- <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.m_title}}</van-tag> -->
                <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.length}}</van-tag>
                <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.fangshis[0]}}</van-tag>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <div class="zxwd" v-show="activeIndex===5">
        <div class="wd" v-for="(item,i) in ArticleIndex" :key="item.id + 100">
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
            <van-tag class="zk" color="#F7FAFF" text-color="#ACB7FF" @click="zhankai(item.id,i)">
              <span>展开</span>
              <i class="iconfont iconxfup"></i>
            </van-tag>
          </div>
        </div>
      </div>
      <div class="introduce" v-show="activeIndex===1">
        <div class="js" v-html="this.contentHTML"></div>
      </div>
      <div class="Colleges" v-show="activeIndex===2">
        <van-list>
          <van-cell
            class="conter"
            v-for="item in xueyuan"
            :key="item.id"
            @click="schoolHome(item.id)"
          >
            <div class="list">
              <div class="logo">
                <img :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
              </div>
              <div class="titles">
                <div class="min_title">
                  <h2>{{item.title.slice(0,9)}}</h2>
                  <van-tag color="#F8FAFF" text-color="#85A6FF">985</van-tag>
                  <van-tag color="#FFF9F2" text-color="#FFD1AB">211</van-tag>
                </div>
                <div class="num_jzxf">
                  <i>
                    简章:
                    <span class="jznum">{{item.jz_num}}篇</span>
                  </i>
                </div>
              </div>
            </div>
          </van-cell>
        </van-list>
      </div>
      <div
        class="conter"
        v-for="(item,i) in ArticleIndex"
        :key="i"
        v-show="activeIndex!==5 && activeIndex!==1 && activeIndex!==2"
        @click="ArticleDetails(item.id,item.catid)"
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
      <p class="nullmore" v-show="activeIndex!==0 && activeIndex!==1">没有更多了</p>
    </van-tabs>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      // 简章 介绍、院校、报考（月热门）、资讯、问答、报名
      dome: [
        { id: '', test: '简章' },
        { id: 5, test: '介绍' },
        { id: 56, test: '院校' },
        { id: 5, test: '报考' },
        { id: 53, test: '资讯' },
        { id: 54, test: '问答' }
      ],
      zhanShow: false,
      idIndex: '',
      ArticleIndex: [],
      activeIndex: 0,
      isMengceng: true,
      title_1: '方式',
      title_2: '院校',
      title_3: '学费',
      title_4: '地点',
      eIndex: 0,
      classIndex: 0,
      classIndex1: '',
      classIndex2: '',
      classIndex3: '',
      classIndex4: 0,
      value1: '',
      value2: '',
      value3: 0,
      value4: '',
      value5: 0,
      // 名称
      name1: '不限',
      name2: '学校地区',
      name3: '不限',
      active: 0,
      show: false,
      isShow: false,
      itemsIndex: 0,
      items: [{}], // 地址所需数据
      activeId: 1,
      activeIndex_1: 0,
      finished: false,
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      children: [],
      lx_arr: [],
      xf_arr: [],
      ZyArr: [],
      xy_arr: [],
      dd_arr: [],
      list: [],
      loading: false,
      rightArr: [{ id: '', name: '不限' }],
      SchoolData: [],
      childrenList: [],
      school_id: 0,
      content: [],
      contentHTML: [],
      id: 0,
      xueyuan: [],
      page_num: 1
    }
  },
  filters: {
    Upper: function (value) {
      value = Number(value / 10000)
      return value.toFixed(2)
    }
  },
  activated () {
    this.page_num = 1
    this.getXyInfo()
    this.getArticle()
    this.getIntroduce()
    this.getcollege()
    this.onLoad()
  },
  created () {
    this.page_num = 1
    this.getXyInfo()
    this.getArticle()
    this.getIntroduce()
    this.getcollege()
    this.onLoad()
  },

  updated () {
    this.moren()
  },
  methods: {
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },

    rulesDel (id, i) {
      this.$router.push({ path: '/rulesDel', query: { rlid: id, lx: this.content.major0, zy: this.list[i].short_title, xy: this.list[i].s_title } })
    },
    getMap (e) {
      this.eIndex = e
      this.id = this.dd_arr[e].id
      this.id = Number(this.id)
      this.calssIndex = 0
      // this.onLoad(2)
    },
    isClose () { },
    changeOption (index) {
      this.value1 = index
      this.classIndex1 = index
      this.$refs.item_one.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.list = []
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
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.list = []
      this.onLoad(2)
    },
    changeOption_for (index) {
      this.value3 = index
      this.classIndex3 = index
      this.$refs.item_ths.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.list = []
      // this.onLoad(2)
    },
    // 切换地点显示隐藏
    ooo (e) {
      if (this.title_4 === e.target.innerText) {
        this.isShow = true
      }
    },
    changeChannel (e) {
      console.log(e)
      this.idIndex = this.dome[e].id
      this.getArticle()
    },
    // 获取文章内容
    getArticle () {
      const dada = Qs.stringify({
        catid: this.idIndex,
        major3: this.$route.query.major3
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      }).then(res => {
        this.ArticleIndex = res.data.data
      })
    },
    // 点击[地点]中导航菜单
    cc (cc) {
      this.classIndex = cc
      this.value4 = Number(cc)
      var addClass = document.getElementsByClassName('listn_dd')[0]
      var ac = document.getElementsByClassName('listn_dd_chr')[0]
      addClass.classList.add('listn_dd_1')
      ac.style.display = 'block'
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.list = []
      this.onLoad(2)
    },
    rightCc (id) {
      this.value5 = id
      this.classIndex4 = id
      // 关闭
      this.$refs.item_for.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.list = []
      this.onLoad(2)
    },
    //   获取学院详情
    getXyInfo () {
      const dada = Qs.stringify({
        id: this.$route.params.id
        // 学校ID 类型 学院 专业 地点
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_info'
      }).then(res => {
        this.content = res.data.data.data
      })
    },
    //   获取学院介绍
    getIntroduce () {
      const dada = Qs.stringify({
        id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_js'
      }).then(res => {
        this.contentHTML = res.data.data.content
      })
    },
    //   获取学院模块
    getcollege () {
      const dada = Qs.stringify({
        id: this.$route.query.major3
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_xx'
      }).then(res => {
        this.xueyuan = res.data.data.list
      })
    },
    // 获取简章数据
    onLoad (indexs) {
      const dada = Qs.stringify({
        fs: this.value1,
        xx: this.value2,
        xf: this.value3,
        dd: this.value4,
        zy: this.$route.query.major3,
        // lx: this.$route.query.lx,
        page: this.page_num,
        num: 10
        // cs: this.value4
        // 学校ID 方式 学院 地点 学费
      })
      console.log(this.activeIndex)
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_jzsx'
      }).then(res => {
        res = res.data.data
        this.fs_arr = res.fs_arr
        this.xy_arr = res.xx_arr
        this.xf_arr = res.xf_arr
        this.dd_arr = res.dd_arr
        // this.childrenList = res.cs_arr
        // this.option1 = this.fs_arr
        // 重铸dd_arr
        // if (this.id) {
        let cc = this.rightArr.concat(...res.cs_arr)
        this.childrenList = cc
        // } else {
        //   this.dd_arr = res.dd_arr
        // }
        let co = this.fs_arr.map(item => {
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

        let zy = this.xf_arr.map(item => {
          return { value: item.id, text: item.name }
        })
        var obj3 = [{ text: '不限', value: 0 }]

        zy.unshift(...obj3)
        this.option3 = zy

        let dd = this.dd_arr.map(item => {
          return { cc: item.id, text: item.name }
        })
        var obj4 = [{ cc: 0, text: '不限' }]
        dd.unshift(...obj4)
        this.items = dd
        this.loading = false
        if (indexs === 2) {
          this.page_num++
          this.list = res.list
        } else if (res.list.length !== 0) {
          this.page_num++
          this.list.push(...res.list)
        } else {
          this.finished = true
        }
      })
    },
    getTrain () {

    },
    schoolHome (id) {
      this.$router.push(`/schoolHome/${id}`)
    },
    // 默认展开
    moren () {
      let cc = document.getElementsByClassName('wd_no_1')[0]
      if (cc) {
        cc.style.display = 'block'
        let bt = document.getElementsByClassName('zk')[0]
        console.log(bt)
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
    }

  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ .van-tabs__content{
  height:800px;
  position: relative;
}
.van-hairline--top-bottom::after {
  border-width: 0px;
}
.nullmore{
      color: #969799;
    font-size: 0.37333rem;
    line-height: 1.33333rem;
    text-align: center;
}
.introduce {
  width: 335px;
  margin: 0 auto;
  font-size: 14px;
}
/deep/ .van-tabs__line {
  width: 16px !important;
  height: 5px;
  bottom: 20px;
  box-shadow: 0px 2px 3px -1px rgba(255, 113, 77, 0.49);
  border-radius: 2.5px;
  background: linear-gradient(
    to bottom right,
    rgb(255, 111, 74),
    rgb(255, 191, 95)
  ) !important;
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
.content {
  margin: 0 auto;
  margin-top: 10px;
  /deep/ .van-tab {
    flex-basis: 18% !important;
  }

  .bt_banner {
    display: block;
    width: 335px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
.iconxfup {
  font-size: 12px !important;
}
.iconfxdown {
  font-size: 12px !important;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}
.iconfont {
  font-size: 16px;
}
.list {
  display: flex;
  padding: 0px 15px;
  .van-cell__value {
    display: flex;
  }
  .van-cell__title {
    flex: 0.63;
  }
  .logo {
    width: 42px;
    height: 48px;
    padding: 0px 10px 0px 0px;
    float: left;
    img {
      width: 42px;
      height: 42px;
    }
  }
  .titles {
    width: 240px;
    float: left;
    position: relative;
    h2 {
      font-weight: normal;
      color: rgb(51, 51, 51);
      line-height: 20px;
      height: 18px;
      padding: 0px 0px 0px 0px;
      font-family: 'PingFangSC-Semibold';
      font-size: 15px;
      margin: 0;
      float: left;
    }
    .num_jzxf {
      font-family: 'PingFangSC-Light';
      padding: 0;
      margin: 0;
      text-align: left;
      font-size: 11px;
      color: rgb(153, 153, 153);
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
}
.min_title {
  padding-top: 2px;
  width: 230px;
  float: left;
  position: relative;

  h2 {
    color: rgb(51, 51, 51);
    padding: 20px 0px 0px 0px;
    font-family: 'PingFangSC-Semibold';
    font-size: 18px;
    margin: 0;
    float: left;
  }
  .van-tag {
    float: left;
    margin-left: 8px;
    margin-top: 1px;
    height: 16px;
    border-radius: 4px;
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
  bottom: 15px;
}
.nian {
  color: rgb(74, 88, 255);
}
.active_on {
  color: rgb(74, 88, 255);
}
.xq {
  width: 295px;
  height: 50px;
  margin: 70px auto 20px auto;
  padding: 20px;
  position: relative;
  box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
  border-radius: 8px;
  h2 {
    padding: 0;
    margin: 0;
    position: relative;
    font-size: 20px;
    font-weight: bold;
    font-family: 'PingFangSC-Medium';
    /deep/ .van-tag {
      position: absolute;
      width: 52px;
      top: 4px;
      text-align: center;
      font-size: 12px;
      display: inline-block;
      margin-left: 10px !important;
    }
  }

  p {
    i {
      font-style: normal;
      padding-right: 15px;
    }
    font-size: 12px;
    color: rgb(102, 102, 102);
    .jznum {
      color: rgb(74, 88, 255);
    }
    .qian {
      color: rgb(255, 156, 86);
    }
  }
  .text_hide {
    text-indent: 30px;
    height: 295px;
    font-size: 16px;
    color: rgb(51, 51, 51);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 13;
    overflow: hidden;
  }
  .text_show {
    text-indent: 30px;
    font-size: 16px;
    color: rgb(51, 51, 51);
  }
  .mengceng_show {
    display: block;
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 50px;
    left: 0px;
  }
  .mengceng_hide {
    overflow: hidden;
  }
  .down {
    text-align: center;
    font-size: 14px;
    color: rgb(95, 115, 255);
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

.listn_dd {
  width: 375px;
  height: 200px;
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
  height: 500px;
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
/deep/ .van-hairline--top-bottom::after {
  border-width: 0;
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
      font-size: 10px;
      color: rgb(204, 204, 204);
      position: absolute;
      left: -5px;
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
      left: -6px;
      position: absolute;
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
// 简章列表
.left {
  float: left;
}
.list_rules {
  width: 335px;
  margin: 0 auto;
  .list_s {
    margin: 0 auto;
    // padding: 0px 10px;
    border-radius: 8px;
    width: 335px;
    height: 144px;
    position: relative;
    margin-top: 5px;
    -moz-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    .logo {
      width: 56px;
      height: 56px;
      margin: 15px 0px 0px 15px;
      img {
        width: 56px;
        height: 100%;
      }
    }
    .font {
      .font-w {
        width: 335px;
        height: 40px;
        line-height: 35px;
        h3 {
          font-weight: bold;
          font-family: 'PingFangSC-Medium';
          display: inline-block;
          font-size: 16px;
          color: rgb(51, 51, 51);
          padding-left: 8px;
        }
        span {
          font-family: 'PingFangSC-Light';
          padding-left: 8px;
          display: inline-block;
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
      }
      span {
        width: 180px;
        overflow: hidden;
        height: 12px;
        line-height: 12px;
        font-family: 'PingFangSC-Light';
        padding-left: 8px;
        display: inline-block;
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
      .min_title {
        font-family: 'PingFangSC-Light';
        padding-left: 8px;
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
    .hang {
      color: rgb(51, 51, 51);
      font-family: 'PingFangSC-Light';
      width: 310px;
      font-size: 12px;
      float: left;
      margin-left: 20px;
      margin-top: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .icon_xf {
    position: absolute;
    // border: 1px solid;
    right: 2px;
    top: 33px;
    color: #434343;
    .van-tag {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
      background: linear-gradient(
        to right,
        rgb(255, 186, 94),
        rgb(255, 126, 78)
      ) !important;
    }
  }
  .tag {
    position: absolute;
    bottom: 10px;
    border: none;
    margin-left: 15px;
    .van-tag {
      margin-right: 5px;
    }
  }
  .log {
    margin: 10px auto;
    width: 335px;

    .more {
      width: 100%;
      border: none;
      height: 40px;
      background: #f7faff;
      color: #85a6ff;
      border-radius: 20px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
  }
}
.zxwd {
  // width: 335px;
  padding: 0px 20px;
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

.tiwen {
  width: 375px;
  height: 40px;
  padding: 10px 0px;
  -moz-box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.03);
  box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.05);
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  .van-button {
    position: absolute;
    color: #fff;
    border-radius: 20px;
    left: 50%;
    width: 335px;
    height: 40px;
    margin-left: -167px;
    background: linear-gradient(to right, rgb(255, 186, 94), rgb(255, 126, 78));
  }
}
.van-popup {
  width: 335px;
  height: 300px;
  border-radius: 10px;
  .van-cell-group {
    width: 325px;
    height: 230px;
    margin: 0 auto;
    position: relative;

    .van-icon {
      width: 20px;
      height: 20px;
      font-size: 15px;
      color: rgb(216, 216, 216);
      position: absolute;
      z-index: 5;
      top: 5px;
      right: 0px;
    }
    .van-field {
      margin-top: 5px;
      height: 230px;
      font-size: 15px;
    }

    /deep/ .van-field__word-limit {
      text-align: center;
    }
  }
  .tijiao {
    width: 325px;
    margin: 0 auto;
    position: relative;
    .van-button {
      position: absolute;
      color: #fff;
      border-radius: 20px;
      width: 300px;
      height: 40px;
      line-height: 30px;
      left: 50%;
      margin-left: -150px;
      background: linear-gradient(
        to right,
        rgb(255, 186, 94),
        rgb(255, 126, 78)
      );
    }
  }
}
</style>
