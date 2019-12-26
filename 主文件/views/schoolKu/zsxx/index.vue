<template>
  <div class="content">
    <div class="nav">
      <i class="iconfont le navLeftfont iconfanhui" @click="back()"></i>
    </div>
    <!-- 调换位置 -->
    <div class="tab">
      <van-tabs v-model="active" swipeable @change="changeChannel(active)">
        <van-tab v-for="item in dome" :title="item.title" :key="item.id"></van-tab>
        <van-sticky :offset-top="45">
          <van-dropdown-menu
            :z-index="5"
            :overlay="isMengceng"
            @click.native="ooo"
            v-if="active===0"
          >
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
              <ul class="listn_zy">
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
        </van-sticky>

        <van-list
          v-model="loading"
          :finished="finished"
          :v-if="isShow"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="zsjz" v-if="active===0">
            <div class="jz" v-for="(item,i) in addData" :key="i" @click="rulesDel(item.id,i)">
              <div class="min_title">
                <h3>
                  {{item.short_title}}
                  <!-- <span>{{item.lxname}}</span> -->
                  <span
                    class="lx"
                    style="color:#7CC982;"
                    v-if="item.lxname==='同等学力'"
                  >{{item.lxname}}</span>
                  <span class="lx" style="color:#70A5FF;" v-if="item.lxname=='专业硕士'">{{item.lxname}}</span>
                  <span class="lx" style="color:#FF7977;" v-if="item.lxname=='国际硕士'">{{item.lxname}}</span>
                  <span class="lx" style="color:#FF9C4D;" v-if="item.lxname=='中外合办'">{{item.lxname}}</span>
                  <span class="lx" style="color:#878DC1;" v-if="item.lxname=='在职博士'">{{item.lxname}}</span>
                  <span class="lx" style="color:#4C6E99;" v-if="item.lxname=='国际博士'">{{item.lxname}}</span>
                  <span class="lx" style="color:#A8BA9A;" v-if="item.lxname=='高级研修'">{{item.lxname}}</span>
                </h3>
                <div class="jt">
                  <i class="iconfont iconto"></i>
                </div>
                <!-- 箭头 -->
              </div>
              <p>{{item.zyname}}/{{item.length}}</p>
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
                <i>
                  ¥
                  <span>{{item.money / 10000}}</span>万
                </i>
              </div>
            </div>
          </div>
          <div class="zsjz_1" v-if="active===1">
            <div
              class="jz"
              v-for="item in SchoolData"
              :key="item.id"
              @click="schoolDes(item.id,item.catid)"
            >
              <div class="min_title">
                <h3>{{item.short_title}}</h3>
                <div class="jt"></div>
                <!-- 箭头 -->
              </div>
              <p>
                简章：
                <span class="jznum">{{item.jz_num}}</span>&nbsp;&nbsp;学费：
                <span
                  class="yuan"
                >{{item.min_money /10000}}元-{{item.max_money / 10000}}万</span>
              </p>
              <div class="sub_title">
                <div class="jindu">
                  <span>{{item.description}}</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      addData: [],
      offset: 50,
      page_num: 1,
      dome: [{ id: 1, title: '简章' }, { id: 2, title: '学院' }],
      id: 2,
      major3: '',
      title_1: '类型',
      title_2: '学院',
      title_3: '专业',
      title_4: '地点',
      classIndex: '',
      classIndex1: '',
      classIndex2: '',
      classIndex3: '',
      classIndex4: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      // 名称
      name1: '不限',
      name2: '学校地区',
      name3: '不限',
      scrollTag: false,
      active: 0,
      isMengceng: true,
      calssIndex: '',
      show: false,
      isShow: false,
      itemsIndex: 0,
      items: [{}], // 地址所需数据
      activeId: 1,
      activeIndex: 0,
      eIndex: 0,
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
      childrenList: []
    }
  },
  mounted () {
    this.major3 = this.$route.query.mar
    if (this.$route.query.xueyuan) {
      this.active = this.$route.query.xueyuan
      this.addData = []
      this.page_num = 1
      this.getSchoolData()
    }
    this.mar()
    this.onLoad()
  },
  created () {
    // this.getMap()
    this.ac()
  },
  methods: {
    rulesDel (id, i) {
      this.$router.push({
        path: '/rulesDel',
        query: {
          rlid: id,
          lx: this.addData[i].major0,
          zy: this.addData[i].zyname,
          xy: this.$route.query.xy
        }
      })
    },
    schoolDes (id, catid) {
      this.$router.push({ path: `/schoolDes/${this.$route.params.id}`, query: { xy: id } })
    },
    changeChannel (index) {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      // 滑动  index 滑动索引
      if (index === 0) {
        this.loading = true
        this.finished = false
        this.addData = []
        this.page_num = 1
        this.onLoad()
      }
      if (index === 1) {
        this.loading = false
        this.finished = true
        this.addData = []
        this.page_num = 1
        this.getSchoolData()
      }
    },
    // 跳转页面
    trun (id) {
      this.$router.push(`/schoolHome/${id}`)
    },
    // 点击[地点]中导航菜单
    cc (cc) {
      this.classIndex = cc
      this.value4 = Number(cc)
      console.log(this.value4)
      var addClass = document.getElementsByClassName('listn_dd')[0]
      var ac = document.getElementsByClassName('listn_dd_chr')[0]
      addClass.classList.add('listn_dd_1')
      ac.style.display = 'block'
      this.page_num = 1
      this.onLoad(2)
    },
    // 点击[地点]中导航右侧菜单
    rightCc (id) {
      this.value5 = id
      this.classIndex4 = id
      console.log(this.value5)
      // 关闭
      this.$refs.item_for.toggle(false)
      this.page_num = 1
      this.onLoad(2)
    },

    // 切换地点显示隐藏
    ooo (e) {
      if (this.title_4 === e.target.innerText) {
        this.isShow = true
      } else {
      }
    },
    isClose () { },
    changeOption (index) {
      this.loading = true
      this.finished = false
      this.addData = []
      this.page_num = 1
      console.log(index)
      this.value1 = index
      this.classIndex1 = index
      this.$refs.item_one.toggle(false)
      console.log(this.name1)
      this.onLoad(2)
      window.scrollTo(0, 0)
    },
    changeOption_ths (index) {
      console.log(111111)
      this.loading = true
      this.finished = false
      this.addData = []
      this.value2 = index
      this.classIndex2 = index
      this.$refs.item_tw.toggle(false)

      // var cc = this.$refs.item_tw.$refs.wrapper.lastChild
      // cc.addEventListener('click', e => {
      //   var nr = e.target.innerText
      //   this.name2 = nr
      // })
      // console.log(this.name2)
      this.page_num = 1
      this.onLoad(2)
    },
    changeOption_for (index) {
      console.log(22222222)
      this.loading = true
      this.finished = false
      this.addData = []
      this.page_num = 1
      this.value3 = index
      console.log(index)
      this.classIndex3 = index
      this.$refs.item_ths.toggle(false)
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
    getMap (e) {
      this.eIndex = e
      this.id = this.dd_arr[e].id
      this.id = Number(this.id)
      this.page_num = 1
      this.onLoad(2)
    },
    // 获取简章数据
    // 获取学院数据
    getSchoolData () {
      const dede = Qs.stringify({
        school_id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        data: dede,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_xy'
      }).then(res => {
        console.log(res)
        this.SchoolData = res.data.data
      })
    },
    onLoad (indexs) {
      // setTimeout(() => {
      const dada = Qs.stringify({
        school_id: this.$route.params.id,
        lx: this.value1,
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
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_jzsx'
      }).then(res => {
        res = res.data.data
        this.lx_arr = res.lx_arr
        this.xy_arr = res.xy_arr
        this.zy_arr = res.zy_arr
        this.list = res.list
        this.dd_arr = res.dd_arr
        // 重铸dd_arr
        let co = this.lx_arr.map(item => {
          return { value: item.id, text: item.name }
        })
        let cc = this.rightArr.concat(...res.cs_arr)
        this.childrenList = cc
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
        zy.unshift(...obj1)
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
      // }, 500)
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
.listn_zy {
  width: 335px;
  margin: 0 auto;
  padding: 10px 0px;
  li {
    float: left;
    width: 50%;
    height: 35px;
    line-height: 35px;
    overflow: hidden;
    font-size: 14px;
  }
}
/deep/ .van-hairline--top-bottom {
  position: static;
}
/deep/ .van-tabs {
  position: static;
}
.iconfanhui {
  top: -10px;
  left: 3px;
  position: absolute;
  z-index: 800;
}
.tab {
  background: #fff;
  // padding-top: 10px;
  position: relative;
  z-index: 10;
  top: -50px;
  border: none;
  /deep/ .van-tabs--line .van-tabs__wrap {
    padding-top: 5px;
    position: fixed;
    z-index: 9999;
    background: #fff;
    // box-shadow: 0px 0px 11px 0px rgba(176,183,231,0.1);
    width: 375px;
  }
  /deep/ .van-tabs__nav {
    top: 0px;
    display: flex;
    width: 150px;
    position: relative;
    left: 52%;
    margin-left: -90px;
    /deep/ .van-tab {
      font-family: 'PingFangSC-Semibold';
      height: 35px;
      line-height: 32px;
      border-radius: 5px;
      background: #fff;
      color: black;
      font-size: 16px;
    }
    /deep/ .van-tab--active {
      font-family: 'PingFangSC-Semibold';
      font-size: 20px;
      background: #fff;
      color: black;
      font-weight: bold;
    }
    /deep/ .van-tabs__line {
      top: 34px;
      width: 6px !important;
      height: 6px;
      background: linear-gradient(
        to right,
        rgb(255, 111, 74),
        rgb(255, 191, 95)
      );
    }
  }
}

.nav {
  width: 375px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.1);
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
    position: fixed;
    z-index: 30;
    float: left;
    padding: 15px 0px 13px 20px;
  }
  .ri {
    z-index: 30;
    position: absolute;
    right: 8px;
    top: 15px;
    padding: 0px 0px 13px 20px;
  }
}
.nav1 {
  width: 375px;
  height: 50px;
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
  padding-bottom: 60px;
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
.zsjz {
  width: 335px;
  margin: 0 auto;
  .jz {
    position: relative;
    background: #fff;
    margin-top: 10px;
    border-bottom: 1px solid rgb(247, 250, 255);
    border-radius: 8px;
    .min_title {
      height: 30px;
      line-height: 30px;
      h3 {
        font-family: 'PingFangSC-Regular';
        margin: 0;
        padding: 0;
        font-weight: normal;
        font-size: 16px;
        color: #434343;
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
        top: 6px;
        position: absolute;
        .iconto {
          color: rgb(228, 230, 255);
          line-height: 22px;
          text-align: center;
          display: block;
          margin: 0 auto;
        }
      }
    }

    p {
      font-size: 12px;
      font-family: 'PingFangSC-Light';
      color: rgb(102, 102, 102);
      margin-top: 3px;
      height: 15px;
    }
    .sub_title {
      padding-top: 7px;
      height: 20px;

      .jindu {
        height: 50px;

        span {
          font-family: 'PingFangSC-Light';
          color: rgb(51, 51, 51);
          font-size: 12px;
          float: right;
          position: absolute;
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
          left: 50px;
          bottom: 15px;
        }
      }
      i {
        font-family: 'PingFangSC-Medium';
        display: block;
        font-size: 11px;
        position: absolute;
        right: 18px;
        bottom: 10px;
        color: rgb(255, 156, 86);
        font-style: normal;
        padding-left: 15px;
        span {
          font-size: 16px;
          font-family: 'PingFangSC-Medium';
        }
      }
    }
  }
}

.zsjz_1 {
  width: 335px;
  margin: 0 auto;

  .jz {
    padding: 15px 10px;
    width: 315px;
    height: 85px;
    margin-top: 10px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    border-radius: 8px;
    .min_title {
      height: 30px;
      line-height: 30px;
      h3 {
        font-family: 'PingFangSC-Regular';
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: normal;
        color: #434343;
        padding-left: 15px;
        float: left;
        span {
          padding: 0px 10px;
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
    }

    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      line-height: 10px;
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
/deep/ .van-tabs__content {
  padding-top: 55px;
  height: 750px;
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
</style>
