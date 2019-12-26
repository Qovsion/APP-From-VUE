<template>
  <div class="content">
    <van-sticky :offset-top="0">

    <div class="search">
      <van-search shape="round" placeholder="请输入搜索内容" readonly @click="$router.push('/seach')"></van-search>
    </div>
      <div class="sx">
        <span type="default" @click="qh_n()" :class="this.px===''?'span_px':''">热门简章</span>
        <span type="default" @click="qh(1)" :class="this.px===1?'span_px':''">
          学费高
          <i slot="icon" class="iconfont iconxfup"></i>
        </span>
        <span type="default" @click="qh_1(2)" :class="this.px===2?'span_px':''">
          学费低
          <i slot="icon" class="iconfont iconfxdown"></i>
        </span>
        <span type="default" @click="sxtz()">
          筛选
          <i slot="icon" class="iconfont iconshaixuan"></i>
        </span>
      </div>
      <!-- 类型下拉 -->

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
        <!-- 学校下拉 -->
        <van-dropdown-item
          class="xx_drop"
          :title="title_2"
          v-model="value2"
          ref="item_tw"
          @open="schoolOpen()"
          style="z-index:5;"
        >
          <div class="indexList">
            <van-index-bar highlight-color="#fff" :index-list="pinyin" ref="indexBar" :sticky-offset-top='0'>
              <div v-for="(item,i) in school" :key="i">

                <van-index-anchor
                  :index="item[0].pinyin"
                  ref="indexPinyin"
                  v-show="pinyinIs"
                />
                <div class="list_yx" v-for="cc in item" :key="cc.id" @click="path_jz(cc)">
                  <div>
                    <h2 class="title" :class="cc.id==classIndex2?'active_on':''">{{cc.name}}</h2>
                  </div>
                </div>
              </div>
            </van-index-bar>
          </div>
        </van-dropdown-item>
        <!-- 专业下拉 -->
        <van-dropdown-item ref="item_ths" :title="title_3" v-model="value3" style="height:290px;">
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
    </van-sticky>

    <van-list
      v-model="loading"
      :finished="finished"
      :v-if="isShow"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 简章筛选 -->
      <div class="list_rules">
        <div class="list_s" v-for="(item,i) in addData" :key="i" @click="rulesDel(item.id,i)">
          <div class="logo left">
            <img :src="'https://www.125yan.com/Uploads/' + item.s_thumb" alt />
          </div>
          <div class="font">
            <div class="font-w">

              <h3>{{item.short_title.length>13?item.short_title.slice(0,12) + '...':item.short_title}}</h3>
              <span class="lx" style="color:#7CC982;" v-if="item.lxname==='同等学力'">{{item.lxname}}</span>
              <span class="lx" style="color:#70A5FF;" v-if="item.lxname=='专业硕士'">{{item.lxname}}</span>
              <span class="lx" style="color:#FF7977;" v-if="item.lxname=='国际硕士'">{{item.lxname}}</span>
              <span class="lx" style="color:#FF9C4D;" v-if="item.lxname=='中外合办'">{{item.lxname}}</span>
              <span class="lx" style="color:#878DC1;" v-if="item.lxname=='在职博士'">{{item.lxname}}</span>
              <span class="lx" style="color:#4C6E99;" v-if="item.lxname=='国际博士'">{{item.lxname}}</span>
              <span class="lx" style="color:#A8BA9A;" v-if="item.lxname=='高级研修'">{{item.lxname}}</span>
            </div>
            <span class="min_title">{{item.s_title}}/{{item.c_title}}</span>
          </div>
          <div class="to">
            <i class="iconfont iconto"></i>
          </div>
          <div class="right icon_xf">
            ¥
            <span>{{item.money / 10000}}</span>万
          </div>
          <span class="hang">{{item.title}}</span>
          <div class="tag">
            <van-tag color="#F6F8FF" text-color="#93B1FF" v-if="item.zyname">{{item.zyname.slice(0,12)}}</van-tag>
            <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.length}}</van-tag>
            <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.fangshis[0]}}</van-tag>
          </div>
        </div>
      </div>
    </van-list>

    <van-popup
      class="zIndex"
      v-model="show"
      position="right"
      :style="{width:'100%', height: '100%' }"
      :overlay="false"
    >
      <div :class="scrollTag?'nav1':'nav'">
        <i class="iconfont le iconguanbi" @click="back()"></i>
        <span>筛选</span>
      </div>
      <div class="sxnr">
        <h2>授课方式：</h2>
        <ul>
          <li
            :class="item.id===indexClass1_1?'active':''"
            v-for="(item,i) in fs_arr_sx"
            :key="item.id"
            v-bind="ji"
            @click="jil_1(i,item.id)"
          >{{item.name}}</li>
        </ul>
        <h2>类型：</h2>
        <ul>
          <li
            :class="item.id===classIndex1?'active':''"
            v-for="(item,i) in lx_arr_sx"
            :key="item.id"
            v-bind="ji"
            @click="jil_2(i,item.id)"
          >{{item.name}}</li>
        </ul>
        <h2>院校：</h2>
        <ul>
          <li
            :class="item.id===classIndex2?'active':''"
            v-for="(item,i) in xy_arr_sx"
            :key="item.id"
            v-bind="ji"
            @click="jil_3(i,item.id)"
          >{{item.name}}</li>
          <li
            :class="gdIndex3===classIndex2?'active':''"
            @click="jil_3_3()"
            v-show="xy_arr_sx.length>=7"
          >
            <span class="csgd"  @click="schoolOpen()" >{{xygd.slice(0,4)}}</span>
            <i class="iconfont iconxfup"></i>
          </li>
        </ul>
        <h2>专业：</h2>
        <ul>
          <li
            :class="item.major3===classIndex3?'active':''"
            v-for="(item,i) in zy_arr_sx"
            :key="item.major3"
            v-bind="ji"
            @click="jil_4(i,item.major3)"
          >{{item.title}}</li>
          <li
            :class="zyCls===classIndex3?'active':''"
            @click="jil_4_gd()"
            v-show="zy_arr_sx.length>=7"
          >
            {{zyText.slice(0,4)}}
            <i class="iconfont iconxfup"></i>
          </li>
        </ul>
        <h2 v-show="ddyc">地点：</h2>
        <ul v-show="ddyc">
          <li
            :class="item.id===classIndex?'active':''"
            v-for="(item,i) in dd_arr_sx"
            :key="item.id"
            v-bind="ji"
            @click="jil_5(i,item.id)"
          >{{item.name}}</li>
          <li
            :class="ddCls===classIndex?'active':''"
            @click="jil_5_gd()"
            v-show="dd_arr_sx.length>=7"
          >
            {{ddText.slice(0,4)}}
            <i class="iconfont iconxfup"></i>
          </li>
        </ul>
        <h2 v-show="yincang">城市：</h2>
        <ul>
          <li
            v-show="yincang"
            :class="item.id===classIndex4?'active':''"
            v-for="(item) in childrenList"
            :key="item.id"
            @click="jil_5_1(item.id)"
          >{{item.name}}</li>
        </ul>
        <h2>学费：</h2>
        <ul>
          <li
            :class="item.id===indexClass6_6?'active':''"
            v-for="(item,i) in xf_arr_sx"
            :key="item.id"
            v-bind="ji"
            @click="jil_6(i,item.id)"
          >{{item.name}}</li>
        </ul>
      </div>
    </van-popup>
    <!-- 确认重置 -->
    <div class="btn" v-show="btn_scr">
      <van-button type="default" class="col" @click="back_res()">重置</van-button>
      <van-button type="info" class="sub" @click="sub()">确认</van-button>
    </div>
    <!-- 索引栏 -->
    <van-popup v-model="showChr" position="right" :style="{width:'90%', height: '100%' }">
      <div class="yxlist">
        <div class="indexList">
          <van-nav-bar title="院校" @click-left="back_1()" left-arrow>
            <i slot="left" class="iconfont iconfanhui"></i>
          </van-nav-bar>
          <van-index-bar highlight-color="#fff" :index-list="pinyin">
            <div v-for="item in school" :key="item.id">
              <van-index-anchor :index="item[0].pinyin" />
              <div class="list" v-for="cc in item" :key="cc.id" @click="path_jz(cc)">
                <div class="title">
                  <h2 v-if="flag === true">{{cc.title}}</h2>
                  <h2 v-else-if="flag === false">{{cc.name}}</h2>
                </div>
              </div>
            </div>
          </van-index-bar>
        </div>
      </div>
    </van-popup>
    <!-- 专业索引栏 -->
    <van-popup v-model="showChr_zy" position="right" :style="{width:'90%', height: '100%' }">
      <div class="yxlist">
        <div class="indexList">
          <van-nav-bar title="专业" @click-left="back_1()" left-arrow>
            <i slot="left" class="iconfont iconfanhui"></i>
          </van-nav-bar>
          <van-index-bar highlight-color="#fff" :index-list="pinyin_zy">
            <div v-for="item in school_zy" :key="item.id">
              <van-index-anchor :index="item[0].pinyin" />
              <div class="list" v-for="cc in item" :key="cc.id" @click="path_jz_zy(cc)">
                <div class="title">
                  <h2 v-if="flag === true">{{cc.title}}</h2>
                  <h2 v-else-if="flag === false">{{cc.name}}</h2>
                </div>
              </div>
            </div>
          </van-index-bar>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showChr_dd" position="right" :style="{width:'90%', height: '100%' }">
      <van-nav-bar title="地点" @click-left="back_1()" left-arrow></van-nav-bar>
      <div class="list_dd" v-for="cc in dd_arr" :key="cc.id" @click="path_jz_dd(cc.id,cc.name)">
        <div class="title">
          <h2>{{cc.name}}</h2>
        </div>
      </div>
    </van-popup>
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import Qs from 'qs'

import Tabber from '@/components/on-tabber'
export default {
  components: { 'on-tabber': Tabber },
  data () {
    return {
      pinyinIs: true,
      FlagIndexBar: true, // indexBar选中开关
      FlagIndexBar_gd: true, // indexBar选中开关
      showChr_zy: false,
      addData: [],
      ji: '',
      ddyc: true,
      btn_scr: false,
      scrollTag: false,
      sxtc: false,
      page_num: 1,
      id: 2,
      major3: '',
      title_1: '类型',
      title_2: '院校',
      title_3: '专业',
      title_4: '地点',
      eIndex: 0,
      classIndex: '',
      classIndex1: '',
      classIndex2: '',
      classIndex3: '',
      classIndex4: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      // 名称
      active: 0,
      isMengceng: true,
      calssIndex: '',
      loading: false,
      finished: false,
      show: false,
      isShow: false,
      itemsIndex: 0,
      items: [{}], // 地址所需数据
      activeId: 1,
      activeIndex: 0,
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
      list: [],
      rightArr: [{ id: '', name: '不限' }],
      SchoolData: [],
      childrenList: [],
      px: '',
      // 筛选页面数据
      indexClass1_1: '0',
      indexClass6_6: '0',
      xfValue: '',
      fsValue: '',
      xf_arr_sx: [],
      lx_arr_sx: [],
      zy_arr_sx: [],
      ZyArr_sx: [],
      xy_arr_sx: [],
      dd_arr_sx: [],
      childrenList_sx: [],
      fs_arr_sx: [],
      // 更多页面数据
      showChr: false,
      pinyin: [],
      school: [],
      gdIndex3: null,
      xygd: '更多',
      ddText: '更多',
      zyText: '更多',
      ddCls: null,
      zyCls: null,
      flag: false,
      yincang: false,
      showChr_dd: false,
      arr_cs: [],
      ddgdyc: true,
      yxgdyc: true,
      scroll: 0,
      pinyin_zy: [],
      school_zy: []
    }
  },
  activated () {
    if (this.$route.query.lx) {
      this.value1 = this.$route.query.lx
      this.classIndex1 = this.$route.query.lx
      this.addData = []
      this.page_num = 0
    }
    this.major3 = this.$route.query.mar
    this.mar()
    this.ac()
    this.onLoad()
  },
  created () {
    // this.getMap()
    if (this.$route.query.lx) {
      this.value1 = this.$route.query.lx
      this.classIndex1 = this.$route.query.lx
    }
    this.major3 = this.$route.query.mar
    this.mar()
    this.ac()
    this.onLoad()
  },
  mounted () {
  },
  methods: {
    schoolOpen () {
      var hide = document.getElementsByClassName('van-index-anchor--sticky')
      hide[0].style.setProperty('display', 'none', 'important')
      console.log(hide[0].style)
      var tab = document.getElementsByClassName('van-tabbar')[0]
      tab.style.setProperty('z-index', '2002', 'important')
      setTimeout(() => {
        var height = document.getElementsByClassName('van-dropdown-item__content')
        if (height.length > 2) {
          height[1].style.maxHeight = '100%'
        } else {
          height[0].style.maxHeight = '100%'
        }
        // var cc = document.getElementsByClassName('van-index-anchor--sticky')[0]
        // cc.style.display = 'none'
        // console.log(cc)
      }, 100)
      // 延时10毫秒使索引栏第一个加上选中效果
      // if (this.FlagIndexBar || this.FlagIndexBar_gd) {
      //   setTimeout(() => {
      //     var cc = document.getElementsByClassName('van-index-bar__index')[0]
      //     cc.classList.add('van-index-bar__index--active')
      //   }, 10)
      //   this.FlagIndexBar = false
      //   this.FlagIndexBar_gd = false
      // }
      // 隐藏indexBar
      console.log(this.pinyin.length)
      if (this.pinyin.length < 10) {
        this.pinyinIs = false
        setTimeout(() => {
          // van-index-anchor van-index-anchor--sticky van-hairline--bottom

          // for (var x = 0; x < hide.length; x++) {
          //   hide[x].style.display = 'none'
          // }

          var cc = document.getElementsByClassName('van-index-bar__sidebar')[0]
          cc.style.display = 'none'
        }, 10)
      }
    },
    rulesDel (id, i) {
      this.$router.push({
        path: '/rulesDel',
        query: { rlid: id, lx: this.value1, xy: this.addData[i].s_title }
      })
    },
    jil_5_gd () {
      this.showChr_dd = true
    },
    path_jz_dd (id, name) {
      console.log(id, name)
      this.value4 = id
      this.ddCls = id
      this.classIndex = id
      this.ddText = name
      this.showChr_dd = false
      this.yincang = true
      for (var z = 0; z < this.dd_arr_sx.length; z++) {
        let con = this.dd_arr_sx[z]
        console.log(this.dd_arr_sx.length)

        for (let cc in con) {
          if (con[cc] === id) {
            console.log('true')
            this.ddText = '更多'
            this.ddCls = null
          }
        }
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    // 点击确定 发送请求 跳转页面 完成筛选
    sub () {
      this.show = false
      this.btn_scr = false
      this.addData = []
      this.page_num = 1
      this.onLoad(2)
    },
    jil_1 (i, id) {
      this.indexClass1_1 = id
      this.fsValue = id
      if (id === '3') {
        this.ddyc = false
      } else {
        this.ddyc = true
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_2 (i, id) {
      // 类型
      console.log(id)
      this.value1 = id
      this.classIndex1 = id
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_3 (i, id) {
      // 院校
      console.log(id)
      this.xygd = '更多'
      console.log(this.xygd)
      this.classIndex2 = id
      this.value2 = id
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    // 更多按钮处理
    path_jz (item) {
      // 关闭弹出层  “更多更改为院校名称”  并高亮
      this.showChr = false
      console.log(this.showChr)
      console.log(this.flag)
      // 院校更多按钮处理
      if (this.flag === false) {
        this.xygd = item.name
        this.value2 = item.id
        this.gdIndex3 = item.id
        this.classIndex2 = item.id
        this.$refs.item_tw.toggle(false)
        console.log(item.id, this.classIndex2)
        for (var x = 0; x < this.xy_arr_sx.length; x++) {
          let con = this.xy_arr_sx[x]
          for (let cc in con) {
            if (con[cc] === item.id) {
              console.log('true')
              this.xygd = '更多'
              this.gdIndex3 = null
            }
          }
        }
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    path_jz_zy (item) {
      // 专业按钮处理
      this.showChr_zy = false
      this.value3 = item.major3
      this.zyText = item.title
      this.zyCls = item.major3
      this.classIndex3 = item.major3
      console.log(item.major3, item.title)
      for (var y = 0; y < this.zy_arr_sx.length; y++) {
        let con = this.zy_arr_sx[y]
        for (let cc in con) {
          if (con[cc] === item.major3) {
            console.log('true')
            this.zyText = '更多'
            this.zyCls = null
          }
        }
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    // 点击学院更多时
    jil_3_3 () {
      this.showChr = true
      this.flag = false
      // this.btn_scr = false
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_4 (i, id) {
      // 专业
      this.zyText = '更多'
      this.value3 = id
      this.classIndex3 = id
      console.log(id)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_4_gd () {
      this.showChr_zy = true
      this.flag = true
      console.log(this.flag)
      console.log(this.school)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_5 (i, id) {
      // 地点
      this.ddText = '更多'
      console.log(id)
      this.value4 = id
      this.classIndex = id
      if (id !== '') {
        this.yincang = true
      } else {
        this.yincang = false
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_5_1 (id) {
      this.value5 = id
      this.classIndex4 = id
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    jil_6 (i, id) {
      // 学费
      console.log(id)
      this.indexClass6_6 = id
      this.xfValue = id
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    // 学费低高切换
    qh (i) {
      this.loading = true
      this.finished = false
      this.px = i
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    qh_1 (i) {
      this.px = i
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    qh_n () {
      this.px = ''
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    sxtz () {
      this.indexClass2_2 = this.value1 // 类型
      this.indexClass3_3 = this.value2 // 院校
      this.indexClass4_4 = this.value3 // 专业
      this.indexClass5_5 = this.value4 // 地点
      this.show = true
      this.btn_scr = true

      // this.$router.push('/sxym')
    },
    changeChannel (index) {
      // 滑动  index 滑动索引
      if (index === 0) {
      }
      if (index === 1) {
        this.getSchoolData()
      }
    },
    // 跳转页面
    trun (id) {
      this.$router.push(`/schoolHome/${id}`)
    },
    // 点击[地点]中导航左侧菜单
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
      this.addData = []
      this.onLoad(2)
    },
    // 点击[地点]中导航右侧菜单
    rightCc (id) {
      this.value5 = id
      this.classIndex4 = id
      // 关闭
      this.$refs.item_for.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },

    // 切换地点显示隐藏
    ooo (e) {
      if (this.title_4 === e.target.innerText) {
        // var cc = this.$refs.item_for[0].$refs.wrapper.lastChild
        // cc.style.paddingBottom = '30px'
        this.isShow = true
      } else {
        // this.$refs.item_for[0].toggle(false)
      }
    },
    isClose () { },
    changeOption (index) {
      this.value1 = index
      this.classIndex1 = index
      this.$refs.item_one.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    changeOption_ths (index, name) {
      // console.log(index, name)
      this.xygd = name
      this.gdIndex3 = index
      this.indexClass3_3 = index
      this.value2 = index
      this.classIndex2 = index
      this.$refs.item_tw.toggle(false)
      var cc = this.$refs.item_tw.$refs.wrapper.lastChild
      cc.addEventListener('click', e => {
        var nr = e.target.innerText
        this.name2 = nr
      })
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    changeOption_for (index) {
      this.value3 = index
      this.classIndex3 = index
      this.$refs.item_ths.toggle(false)
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    ac () {
      if (this.$route.query.index) {
        this.active = this.$route.query.index
        this.getSchoolData()
      }
    },
    mar () {
      if (this.major3) {
        this.value3 = this.major3
        this.classIndex3 = this.major3
      }
    },
    onLoad (indexs) {
      const dada = Qs.stringify({
        lx: this.value1,
        xx: this.value2,
        zy: this.value3,
        dd: this.value4,
        cs: this.value5,
        fs: this.fsValue,
        xf: this.xfValue,
        px: this.px,
        num: 20,
        page: this.page_num
        // 学校ID 类型 学院 专业 地点
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/jzk'
      }).then(res => {
        res = res.data.data
        this.lx_arr = res.lx_arr
        this.xy_arr = res.xx_arr
        this.zy_arr = res.zy_arr
        this.dd_arr = res.dd_arr

        // 筛选页面数据
        this.fs_arr_sx = res.fs_arr
        this.lx_arr_sx = res.lx_arr

        this.xy_arr_sx = res.xx_arr.slice(0, 6)
        this.zy_arr_sx = res.zy_arr.slice(0, 6)
        this.dd_arr_sx = res.dd_arr.slice(0, 6)
        this.xf_arr_sx = res.xf_arr
        var objsx = [{ name: '不限', id: '' }]
        var objsxnum = [{ name: '不限', id: '0' }]
        var zysx = [{ title: '不限', major3: '' }]
        this.fs_arr_sx.unshift(...objsxnum)
        this.lx_arr_sx.unshift(...objsx) //
        this.xy_arr_sx.unshift(...objsx) //
        this.zy_arr_sx.unshift(...zysx) //
        this.dd_arr_sx.unshift(...objsx) //
        this.xf_arr_sx.unshift(...objsxnum)

        // 更多页面
        this.pinyin = res.xx_zm_arr
        this.school = res.xx_pinyin_arr
        this.school[0] = [{ id: '', name: '不限' }]
        // console.log(1)
        console.log(this.school)
        this.pinyin_zy = res.zy_zm_arr
        this.school_zy = res.zy_pinyin_arr
        this.dd_arr_n = res.dd_arr

        // 重铸dd_arr
        let cc = this.rightArr.concat(...res.cs_arr)
        this.childrenList = cc
        let co = this.lx_arr.map(item => {
          return { value: item.id, text: item.name }
        })
        // var obj = [{ text: '不限', value: '' }]
        // co.unshift(...obj)
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
          this.page_num = this.page_num + 1
          this.addData = res.list
        } else if (res.list.length !== 0) {
          this.page_num = this.page_num + 1
          this.addData.push(...res.list)
        } else {
          this.finished = true
        }
      })
    },
    // 获取简章数据
    getTrain () { },
    back () {
      console.log(1)
      this.show = false
      this.btn_scr = false
    },
    back_res () {
      this.yincang = false
      this.classIndex = ''
      this.classIndex1 = ''
      this.classIndex2 = ''
      this.classIndex3 = ''
      this.classIndex4 = ''
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.value5 = ''
      this.indexClass1_1 = '0'
      this.indexClass6_6 = '0'
      this.fsValue = ''
      this.xfValue = ''
      this.gdIndex3 = null
      this.list = []
      this.page_num = 1
      this.onLoad()
    },
    back_1 () {
      this.showChr = false
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  box-sizing: border-box;
}
/deep/ .van-loading__spinner{
  display: none;
}
/deep/ .van-dropdown-item {
  z-index: 2035 !important;
}
/deep/.van-list__finished-text {
  display: inherit;
  padding-top: 10px;
  width: 355px;
}

/deep/ .van-hairline--top-bottom {
}
/deep/ [class*='van-hairline']::after {
  position: static !important;
}

.iconfont {
  color: rgb(204, 204, 204);
  font-size: 12px;
}
.content {
  padding-bottom: 60px;
}
.zIndex {
  z-index: 2002 !important;
}
/deep/ .van-dropdown-menu__title::after {
  color: rgb(204, 204, 204);
}
/deep/ .van-ellipsis {
  font-family: 'PingFangSC-Light';
  font-size: 12px;
}
/deep/ .van-dropdown-menu {
  padding-top: 5px;
  width: 350px;
  margin-left: 14px;
  /deep/ .van-dropdown-menu__item {
    margin-right: 5px;
    width: 80px;
    height: 32px;
    background: rgb(255, 255, 255);
    text-align: center;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
  }
}

.csgd {
  display: inline-block;
  width: 50px;
  overflow: hidden;
}
.sx {
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding: 0px 8px;
  margin: 0 auto;
  width: 355px;
  display: flex;
  justify-content: space-between;
  span {
    font-family: 'PingFangSC-Medium';
    display: block;
    border-radius: 20px;
    border: none;
    align-items: center;
    font-size: 14px;
  }
  .sxsx {
    color: rgb(221, 224, 255);
  }
}
.van-button--info {
  background: rgb(74, 88, 255);
}
.span_px {
  color: rgb(74, 88, 255);
}
.search {
  padding: 16px 0px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(74, 88, 255, 0.05);
  /deep/ .van-search {
    width: 355px;
    height: 32px;
    margin: 0 auto;
    border-radius: 16px !important;
    overflow: hidden;
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
.listn_zy {
  width: 355px;
  margin: 0 auto;
  height: 290px;
  padding: 10px 0px;
  li {
    float: left;
    width: 50%;
    padding: 0px 10px;
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    font-size: 14px;
  }
}
/deep/ .van-dropdown-menu__title--active {
  color: rgb(74, 88, 255) !important;
}
.active_on {
  color: rgb(74, 88, 255) !important;
}
.cont-t {
  margin-top: 40px;
}
.van-cell__value--alone {
  color: #fff;
  background: rgb(74, 88, 255);
}

.left {
  float: left;
}
.listn_dd {
  width: 375px;
  height: 500px;
  margin: 0 auto;
  padding: 10px 0px;
  float: left;
  overflow: scroll;
  .nn {
    text-align: center;
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

// 筛选样式

.btn {
  position: fixed;
  bottom: -1px;
  z-index: 2003;
  width: 375px;
  padding: 6px 0px;
  background: #fff;
  margin: 0px auto;
  margin-bottom: 0px;

  .col {
    width: 125px;
    height: 40px;
    background: rgb(247, 250, 255);
    border: none;
    border-radius: 30px;
    margin-left: 15px;
  }
  .sub {
    width: 200px;
    height: 40px;
    margin-left: 15px;
    border-radius: 30px;
    border: none;
  }
}
.sxnr {
  width: 335px;
  margin: 0 auto;
  padding: 50px 0px 80px 0px;
  h2 {
    font-size: 18px;
    margin-left: 6px;
    color: rgb(51, 51, 51);
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      background: rgb(247, 250, 255);
      width: 78px;
      padding: 0px 4px;
      height: 35px;
      text-align: center;
      line-height: 32px;
      border-radius: 5px;
      font-size: 12px;
      color: rgb(136, 138, 141);
      margin-left: 5px;
      margin-top: 5px;
      overflow: hidden;
      .iconxfup {
        height: 30px;
        line-height: 33px;
        float: right;
        margin-right: 3px;
      }
    }
    li.active {
      color: rgb(81, 95, 255);
    }
  }
}
.nav {
  width: 375px;
  height: 50px;
  position: fixed;
  z-index: 30;
  background-color: rgba(255, 255, 255, 1);
  //   color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  span {
    width: 200px;
    display: block;
    position: relative;
    text-align: center;
    left: 50%;
    transform: translateX(-55%);
  }
  .le {
    float: left;
    padding: 0px 0px 13px 30px;
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
    transform: translateX(-15%);
  }
  .le {
    float: left;
    padding: 15px 0px 13px 20px;
  }
  .ri {
    position: absolute;
    right: 8px;
    top: 15px;
    padding: 0px 0px 13px 20px;
  }
}

// 筛选样式
/deep/ .van-ellipsis {
  font-size: 12px;
}
/deep/ .van-dropdown-menu__item {
  width: 80px;
  height: 32px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(176, 183, 231, 0.009);
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
.list_rules {
  margin: -14px auto;
  .list_s {
    margin-left: 15px;
    border-radius: 8px;
    width: 335px;
    height: 90px;
    position: relative;
    border-bottom: 1px solid rgb(247, 250, 255);
    padding-bottom: 100px;
    .logo {
      padding: 20px 20px 20px 0px;
      width: 56px;
      height: 78px;
      img {
        width: 48px;
        height: 48px;
      }
    }
    .font {
      position: relative;
      .font-w {
        width: 355px;
        height: 25px;
        // line-height: 25px;
        h3 {
          font-family: 'PingFangSC-Medium';
          display: inline-block;
          font-size: 15px;
          font-weight: normal;
          color: rgb(51, 51, 51);
          padding-left: 8px;
        }
        .lx {
          padding-left: 5px;
          display: inline-block;
          font-size: 12px;
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .min_title {
        position: absolute;
        padding-left: 8px;
        font-size: 12px;
        top: 42px;
        color: rgb(102, 102, 102);
        width: 200px; /*要显示文字的宽度*/
        overflow: hidden; /*超出的部分隐藏起来。*/
        white-space: nowrap; /*不显示的地方用省略号...代替*/
        text-overflow: ellipsis; /* 支持 IE */
      }
    }
    .hang {
      width: 315px;
      font-size: 12px;
      float: left;
      margin-left: 15px;
      margin-top: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .to {
    width: 22px;
    height: 22px;
    border-radius: 22px;
    background: rgb(247, 250, 255);
    right: 0px;
    top: 17px;
    position: absolute;
    .iconto {
      line-height: 22px;
      text-align: center;
      display: block;
      margin: 0 auto;
    }
  }
  .icon_xf {
    position: absolute;
    // border: 1px solid
    right: 2px;
    top: 66px;
    font-size: 11px;
    color: rgb(255, 156, 86);

    .van-tag {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
      background: linear-gradient(to rgb(255, 126, 78), rgb(255, 186, 94));
    }
    span {
      font-family: 'PingFangSC-Medium';
      font-weight: bold;
      font-size: 14px;
    }
  }
  .tag {
    position: absolute;
    bottom: 10px;
    border: none;
    margin-left: 63px;
    .van-tag {
      margin-right: 5px;
      padding: 1px 1px;
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
.left {
  float: left;
}
.listn_dd {
  width: 375px;
  height: 500px;
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
    text-align: left;
    width: 180px;
    padding-left: 60px;
    // margin: 0 auto;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
// 更多页面数据
.yxlist {
  height: 850px;
  overflow-x: hidden;
}
/deep/ .van-index-anchor--sticky {
  color: #323233 !important;
  // transform: translate3d(0px, 40px, 0px) !important;
}
// 索引栏不能选中首个问题
.indexList {
  // height: 3500px;
  // padding-bottom: 60px;
  // margin-top: 50px;
}
/deep/ .van-index-bar__sidebar {
  z-index: 10;
}
/deep/ .van-index-anchor {
  width: 335px;
  // height: 25px;
  background: rgb(250, 252, 255);
  margin: 0 auto;
}
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ .van-index-bar__index {
  width: 18px;
  height: 18px;
  line-height: 20px;
  text-align: center;
  color: rgb(142, 142, 142);
  padding: 0;
  margin-right: 4px;
}

/deep/ .van-index-bar__index--active {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background: rgb(74, 88, 255);
}
/deep/ .van-grid-item__text {
  height: 20px;
  overflow: hidden;
}
.con_t {
  width: 355px;
  margin: 0 auto;
  .btn {
    display: flex;
    overflow: hidden;
    .van-button {
      width: 59px;
      margin-left: 10px;
      height: 32px;
      line-height: 32px;
      font-size: 12px;
      border: none;
      background: #fafaff;
    }
  }
}
.list_dd {
  display: flex;
  h2 {
    font-family: 'PingFangSC-Regular';
    height: 28px;
    line-height: 20px;
    font-size: 16px;
    padding-left: 15px;
    color: rgb(51, 51, 51);
    width: 280px;
    border-bottom: 2px solid rgb(250, 252, 255);
    font-weight: normal;
  }
}
.list_yx {
  display: flex;
  h2 {
    font-family: 'PingFangSC-Regular';
    height: 28px;
    line-height: 20px;
    font-size: 16px;
    padding-left: 15px;
    color: rgb(51, 51, 51);
    width: 335px;
    font-weight: normal;
  }
  .sxzt {
    color: rgb(74, 88, 255);
  }
}
.list {
  display: flex;
  .title {
    h2 {
      font-family: 'PingFangSC-Regular';
      height: 28px;
      line-height: 20px;
      font-size: 16px;
      font-weight: normal;
      line-height: 15px;
      padding-left: 15px;
      color: rgb(51, 51, 51);
      width: 335px;
    }
  }
}
</style>
