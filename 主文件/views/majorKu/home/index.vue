<template>
  <div class="content">
    <div class="search">
      <van-search shape="round" placeholder="请输入搜索内容" readonly @click="push()" />
    </div>
    <!-- 地点选择 -->
    <van-tree-select
      v-model="activeIndex"
      :items="items"
      @click-nav="getMap($event)"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    >
      <template slot="content">
        <div v-show="isShow" class="rmtj_c">
          <h3>
            <i></i>热门关注
          </h3>

          <ul>
            <li v-for="item in rmgz" :key="item.id" @click="tz(item.id, item.major3)">
              <h2>{{item.short_title}}</h2>
              <div>
                简章:
                <span>{{item.jz_num}}</span>篇
              </div>
            </li>
          </ul>
          <h3>
            <i></i>热门推荐
          </h3>
          <ul>
            <li v-for="item in rmtj" :key="item.id" @click="tz(item.id, item.major3)">
              <h2>{{item.short_title}}</h2>
              <div>
                简章:
                <span>{{item.jz_num}}</span>篇
              </div>
            </li>
          </ul>
        </div>

        <van-tabs v-show="!isShow" sticky v-model="Vindex" @click="hdChange(Vindex)">
          <div id="hd" ref="msg">
            <div class="hdchr">
              <van-tab
                v-for="(item,i) in huadArr"
                :disabled="isdisabled[i]"
                :title="huadArr[i].name"
                :key="i+450"
              ></van-tab>
              <ul class="contt" :id="i" v-for="(item,i) in lxDataArr" ref="Box" :key="item.id">
                <li class="title" v-if="lxDataArr[i].num !== 0">
                  <i></i>
                  {{item.name}}
                  <span class="rig">{{item.num}}个专业</span>
                </li>
                <li
                  @click.stop="cc(it.id,item.id,it.moxing,it.major3)"
                  :class="it.id==lxDataArr[i].arr.id?'active':''"
                  :index="it.id"
                  class="qt"
                  v-for="it in lxDataArr[i].arr"
                  :key="it.id"
                >{{it.short_title}}</li>
              </ul>
            </div>
          </div>
        </van-tabs>
      </template>
    </van-tree-select>
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import Tabber from '@/components/on-tabber'
// import BScroll from 'better-scroll'
import Qs from 'qs'
export default {
  components: { 'on-tabber': Tabber },
  data () {
    return {
      isdisabled: [], // 禁用状态
      Vindex: 0,
      activeIndex: 0,
      isShow: true,
      activeId: 1,
      items: [
        { text: '热门专业', value: '1' },
        { text: '同等学力', value: '2' },
        { text: '专业硕士', value: '3' },
        { text: '国际硕士', value: '4' },
        { text: '中外合办', value: '5' },
        { text: '在职博士', value: '6' },
        { text: '国际博士', value: '7' },
        { text: '高级研修', value: '8' }
      ], // 地址所需数据
      rmgz: [], // 热门关注数据
      rmtj: [], // 热门推荐数据
      inE: 0,
      childrenList: [],
      huadArr: [],
      lxDataArr: [],
      scrollTop: 0,
      scroll: null,
      toparr: [0, 509, 904],
      cn: 0,
      offset: [],
      Index: 0,
      setsArr: []
    }
  },
  activated () {
    if (this.$route.query.lx) {
      this.activeIndex = this.$route.query.lx
      this.getMap(this.$route.query.lx)
    }
    this.getZYkData()
    this.getlxData()
    this.getzytj()
  },
  created () {
    if (this.$route.query.lx) {
      this.activeIndex = this.$route.query.lx
      this.getMap(this.$route.query.lx)
    }
    this.getZYkData()
    this.getlxData()
    this.getzytj()
    console.log(this.activeIndex)
  },

  mounted () {
    this.$nextTick(() => {
      var scrollHeight = document.getElementsByClassName('van-tree-select')[0]
      scrollHeight.style.setProperty('height', window.innerHeight - 80 + 'px', 'important')
      var hdHeight = document.getElementById('hd')
      hdHeight.style.setProperty('height', window.innerHeight - 184 + 'px', 'important')
      console.log(scrollHeight.style.height)
      console.log(window.innerHeight)
      var cc = this.$refs.msg
      cc.addEventListener('scroll', this.menu)
    })
  },

  methods: {
    // sortByKey (array, key) { // (数组、排序的列)
    //   return array.sort(function (a, b) {
    //     var x = a[key]
    //     var y = b[key]
    //     return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    //   })
    // },

    hdChange (i) {
      console.log(i)
      this.Index = i
      // 点击的li距离顶部的高度 = 点击滑动的高度
      this.$refs.msg.scrollTop = this.$refs.Box[i].offsetTop - 70
      console.log(this.$refs.msg.scrollTop)
    },
    tz (id, major3) {
      this.$router.push({ path: `/zysx/${id}`, query: { major3: major3 } })
    },
    moren () { },
    // 点击左侧数据
    getMap (e) {
      this.offset = []
      this.setsArr = []
      // if (e === 2 || e === 7) {
      //   this.Vindex = this.Vindex + 1
      // }
      if (e === 3 || e === 2) {
        this.Vindex = 1
      } else if (e === 4) {
        this.Vindex = 11
      } else if (e === 1) {
        this.Vindex = 0
      } else {
        this.Vindex = 0
      }
      console.log(this.offset, this.setsArr)
      // setTimeout(() => {
      //   for (var x = 0; x < this.$refs.Box.length; x++) {
      //   // 循环li 将他的高度加入到数组
      //     this.offset.push(this.$refs.Box[x].offsetTop)
      //     var sets = new Set(this.offset)
      //     this.setsArr = [...sets]
      //     console.log(this.setsArr)
      //   }
      // }, 1000)

      this.inE = e
      console.log(this.inE, e)
      e === 0 ? (this.isShow = true) : (this.isShow = false)

      this.$refs.msg.scrollTop = 0
      this.lxDataArr = []

      this.getlxData()
      this.getZYkData()
      this.getzytj()
    },
    menu () {
      // 滑动赋值

      this.scroll = this.$refs.msg.scrollTop
      for (var x = 0; x < this.$refs.Box.length; x++) {
        // 循环li 将他的高度加入到数组
        this.offset.push(this.$refs.Box[x].offsetTop)
        var sets = new Set(this.offset)
        this.setsArr = [...sets]
        console.log(this.setsArr)
        console.log(this.scroll, this.setsArr)
        if (this.scroll >= this.setsArr[x] - 100) {
          this.Vindex = x
        }
      }

      // 如果滑动数值大于 数组中 任意高度
      // if (this.scroll >= this.offset[x] - 184) { // 当前tab索引等于哪个索引
      //   this.Vindex = x
      // }
      // console.log(new Set(this.offset))
    },
    cc (id, prid, moxing, major3) {
      // console.log(id, prid, moxing, major3)
      if (moxing === '360') {
        this.$router.push({ path: `/zysx/${id}`, query: { major3: major3 } })
      }
      if (moxing === '361') {
        this.$router.push({ path: `/zysx/${id}`, query: { prid: prid, major3: major3 } })
      }
      if (moxing === '359') {
        this.$router.push({ path: `/dym/${id}`, query: { prid: prid, major3: major3 } })
      }
    },
    getZYkData () {
      const dada = Qs.stringify({})
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zyk_rmzy'
      }).then(res => {
        res = res.data.data
        this.rmgz = res.splice(0, 6)
      })
    },
    // 热门推荐
    getzytj () {
      const dada = Qs.stringify({
        num: 6
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_tj'
      }).then(res => {
        res = res.data.data
        this.rmtj = res
        // this.rmtj = res.splice(0, 6)
      })
    },
    // 热门关注数据获取
    getlxData () {
      const dada = Qs.stringify({
        lx: this.inE
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_sx'
      }).then(res => {
        res = res.data.data
        // var b = this.sortByKey(res.fl, 'id')
        this.huadArr = res.fl
        // 循环加入禁用状态
        for (var x = 0; x < this.huadArr.length; x++) {
          this.huadArr[x].num === 0 ? this.isdisabled[x] = true : this.isdisabled[x] = false
        }
        // var c = this.sortByKey(res.list, 'id')
        this.lxDataArr = res.list
      })
    },
    push () {
      this.$router.push(`/seach`)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ body {
  overflow: hidden;
}
/deep/.van-sidebar-item--select {
  /deep/.van-sidebar-item__text {
    color: rgb(74, 88, 255);
    font-weight: bold;
    font-size: 16px;
    transition: 0.1s;
  }
}
/deep/ .van-tree-select__nav {
  // 左侧栏宽度
  width: 96px;
}

/deep/ .van-sidebar-item__text {
  text-align: center;
  font-size: 14px;
  font-family: 'PingFangSC-Light';
}
/deep/ .van-hairline--top-bottom {
  // position: static;
}

/deep/ .van-tree-select {
}
#hd {
  height: 550px;
  padding: 0px 20px;

  // overflow: auto;
  overflow-y: scroll;
  .hdchr {
    // height: 21287px;
    // height: 1500px;
  }
}
/deep/ .van-tabs__nav {
  height: 40px;
  width: 250px;
}
.contt {
  // height: 800px;
  overflow-x: hidden;
  i {
    margin-left: 5px;
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    border-radius: 4px;
    background-image: linear-gradient(rgb(255, 111, 74), rgb(255, 191, 95));
  }
  li.title {
    font-family: 'PingFangSC-Medium';
    width: 100%;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
    line-height: 50px;
    border-bottom: 1px solid rgb(247, 250, 255);
    .rig {
      font-family: 'PingFangSC-Regular';
      font-size: 11px;
      color: rgb(214, 214, 214);
      float: right;
      margin-right: 25px;
    }
  }
  li.qt {
    font-family: 'PingFangSC-Regular';
    width: 84%;
    // height: 50px;
    font-size: 16px;
    line-height: 50px;
    margin-left: 20px;
    border-bottom: 1px solid rgb(247, 250, 255);
    .rig {
      font-family: 'PingFangSC-Regular';
      font-size: 11px;
      color: rgb(214, 214, 214);
      float: right;
      margin-right: 15px;
    }
  }
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
.van-grid-item {
  width: 56px;
  line-height: 10px;
  height: 36px;
}
.rmtj_c {
  h3 {
    font-size: 16px;
    font-family: 'PingFangSC-Medium';
    i {
      margin-left: 10px;
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 8px;
      border-radius: 4px;
      background-image: linear-gradient(rgb(255, 111, 74), rgb(255, 191, 95));
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-top: 6px;
    li {
      padding: 0px 13px;
      flex: 25%;
      height: 60px;
      border: 1px solid rgb(247, 250, 255);
      h2 {
        font-family: 'PingFangSC-Regular';
        color: rgb(51, 51, 51);
        margin: 0;
        height: 23px;
        font-weight: normal;
        line-height: 23px;
        overflow: hidden;
        padding-top: 10px;
        font-size: 14px;
      }
      div {
        font-family: 'PingFangSC-Light';
        font-size: 11px;
        color: rgb(153, 153, 153);
        span {
          font-family: 'PingFangSC-Regular';
          color: rgb(77, 91, 255);
        }
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  height: 62px;
}
/deep/ .van-grid-item__content {
  height: 40px;
}
.van-sidebar-item--select {
  border-left: 4px solid;
  border-color: rgb(255, 176, 71);
}

.van-tree-select__nav-item {
  height: 60px;
  text-align: center;
  line-height: 40px;
}

.van-tabs {
  position: fixed;
  border: none;
  // margin-top: 1px;
}
/deep/ .van-tab {
  margin-top: 15px;
  font-family: 'PingFangSC-Medium';
  width: 64px;
  height: 32px;
  border-radius: 16px;
  line-height: 32px;
  background: rgb(247, 250, 255);
  border: none;
  margin-right: 10px;
}
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  width: 64px;
  height: 32px;
  border-radius: 16px;
  line-height: 32px;
  background: rgb(255, 247, 235);
  border: 1px solid rgb(255, 226, 188);
}
/deep/ .van-ellipsis {
  font-size: 12px;
}
/deep/ .van-sticky--fixed {
  position: static;
}
/deep/ .van-hairline--top-bottom::after {
  border-width: 0;
}
</style>
