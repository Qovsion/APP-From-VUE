<template>
  <div class="content">
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
        src="../../assets/images/school_banner.png"
        class="bt_banner"
        alt
        v-show="activeIndex===0"
      />-->
      <van-list
        :offset="offset"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="conter_wu"
        v-if="this.dome[this.activeIndex].id !== 0 "
      >
        <div v-if="this.dome[this.activeIndex].id !== 54 ">
          <div
            class="conter"
            v-for="(item,i) in list"
            :key="i"
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
        </div>

        <!-- 问答 -->
        <div
          class="zxwd"
          style="width:335px;margin:0 auto;"
          v-if="this.dome[this.activeIndex].id === 54"
        >
          <div class="wd" v-for="(item,i) in list" :key="i">
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
                <van-icon name="arrow-down" />
              </van-tag>
            </div>
          </div>
        </div>
      </van-list>

      <!-- 对比 -->
      <van-list
        :offset="offset_db"
        v-model="loading_db"
        :finished="finished_db"
        finished-text="没有更多了"
        @load="getDuibi"
        class="conter_wu"
        v-if="this.dome[this.activeIndex].id === 0"
      >
        <div class="duibi" style="width:335px;margin:0 auto;">
          <div
            class="school"
            v-for="item in ListArr.dbList"
            :key="item.id"
            @click="Contrast(item.id)"
          >
            <div class="cls">
              <div class="logo">
                <img :src="'https://www.125yan.com/Uploads/'+item.one.s_thumb" alt />
              </div>
              <div class="title">
                <h3>{{item.one.c_title.slice(0,6)}}</h3>
                <span>{{item.one.s_title.slice(0,7)}}</span>
                <van-tag color="#fff" text-color="#85A6FF">{{item.one.m_title.slice(0,6)}}</van-tag>
              </div>
            </div>
            <div class="vs">
              <i class="iconfont iconVS"></i>
            </div>
            <div class="cls">
              <div class="logo">
                <img :src="'https://www.125yan.com/Uploads/'+item.two.s_thumb" alt />
              </div>
              <div class="title">
                <h3>{{item.two.c_title.slice(0,6)}}</h3>
                <span>{{item.two.s_title.slice(0,7)}}</span>
                <van-tag color="#fff" text-color="#85A6FF">{{item.two.m_title.slice(0,6)}}</van-tag>
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
      loading: false,
      loading_db: false,
      finished_db: false,
      finished: false,
      offset: 1,
      offset_db: 1,
      page_num: 1,
      zhanShow: false,
      activeIndex: 0,
      idIndex: 92,
      pages: 1,
      dome: [
        { id: 92, test: '必读', bd: 'bdList', page: 1 },
        { id: 5, test: '报考', bd: 'bkList', page: 1 },
        { id: 53, test: '资讯', bd: 'zxList', page: 1 },
        // { id: 49, test: '面试', bd: 'msList', page: 1 },
        { id: 57, test: '考试', bd: 'ksList', page: 1 },
        { id: 51, test: '成绩', bd: 'cjList', page: 1 },
        { id: 62, test: '复试', bd: 'fsList', page: 1 },
        { id: 54, test: '问答', bd: 'wdList', page: 1 },
        { id: 0, test: '对比', bd: 'dbList', page: 1 }
      ],
      Article: [],
      newA: [],
      list: [],
      ListArr: {
        bdList: [],
        bkList: [],
        zxList: [],
        msList: [],
        ksList: [],
        cjList: [],
        fsList: [],
        wdList: [],
        dbList: []
      },
      urls: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
      duibi: [],
      indexRefresh: 0,
      activeLength: [],
      oldActive: [],
      flagArticle: false,
      dbhua: false
    }
  },
  activated () {
    this.list = []
    this.page_num = 1
    this.getArticle(2)
    this.getDuibi()

    if (this.$route.params.id === '1') {
      this.dome = this.$store.state.MasterTab
    }
    if (this.$route.params.id === '5') {
      this.dome = this.$store.state.Master
    }
    if (this.$route.params.id === '3' || this.$route.params.id === '4' || this.$route.params.id === '6' || this.$route.params.id === '7') {
      this.dome = this.$store.state.MasterOpention
    }
  },
  created () {
    this.list = []
    this.page_num = 1
    this.getArticle(2)
    this.getDuibi()
    if (this.$route.params.id === '1') {
      this.dome = this.$store.state.MasterTab
    }
    if (this.$route.params.id === '5') {
      this.dome = this.$store.state.Master
    }
    if (this.$route.params.id === '3' || this.$route.params.id === '4' || this.$route.params.id === '6' || this.$route.params.id === '7') {
      this.dome = this.$store.state.MasterOpention
    }
    if (this.$store.state.majorMaster_Ace === true && this.$store.state.OnlinePhD_Ace === true && this.$store.state.AdvancedStudies_Ace === true) {
      this.$store.state.majorMaster_rules = true
      this.$store.state.OnlinePhD_rules = true
      this.$store.state.AdvancedStudies_rules = true
    }
    // this.onLoad()
  },
  mounted () {
    console.log(this.dome)
  },

  updated () {
    this.indexRefresh = this.$store.state.indexRefresh
    this.moren()
  },
  watch: {
    activeIndex: function (newE, oldE) {
      // 监听tab栏数据变化
      console.log(newE, oldE)
      this.activeLength.push(oldE)
      // 进行去重
      let a = new Set(this.activeLength)
      this.activeLength = Array.from(a)
      console.log(this.activeLength)
    },
    indexRefresh: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      // 当文章 indexRefresh 发生变化时 更换文章数据
      if (newVal) {
        this.finished = false
        this.page_num = 1
        this.list = []
        // this.onLoad()
      }
    }
  },
  methods: {

    onLoad () {
      // setTimeout(() => {
      const dada = Qs.stringify({
        catid: this.idIndex,
        page: this.page_num,
        major0: this.$route.params.id,
        num: 20
      })

      this.$http({
        method: 'post',
        url: this.urls,
        data: dada
      })
        .then((res) => {
          if (this.dome[this.activeIndex].id !== 0) {
            this.flagArticle = true
            // 把数据加入到每一个数组中的bd对象中
            this.ListArr[this.dome[this.activeIndex].bd].push(...res.data.data)
            // 让list等于这个bd
            this.list = this.ListArr[this.dome[this.activeIndex].bd]
            // 上拉加载

            this.loading = false
            if (res.data.data.length !== 0) {
              this.dome[this.activeIndex].page++
              this.page_num = this.dome[this.activeIndex].page
            } else {
              this.finished = true
            }
          }
        })
      // }, 500)
    },
    Contrast (id) {
      this.$router.push({ path: '/ContrastDetails', query: { id: id } })
    },
    getDuibi () {
      // setTimeout(() => {
      const dada = Qs.stringify({
        page: this.pages,
        num: 10
      })

      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/db_wz',
        data: dada
      })
        .then((res) => {
          this.loading_db = false
          this.duibi.push(...res.data.data)
          this.ListArr.dbList = this.duibi
          console.log(res.data.data.length)

          if (res.data.data.length > 5) {
            this.pages++
          } else {
            this.finished_db = true
          }
        })
    },
    odd (id) {
      this.newA = id
    },
    changeChannel (e) {
      // 切换时判断bd有无数据 无数据加载 有数据让bd数据切换为显示数据
      var bd = this.ListArr[this.dome[e].bd]
      this.page_num = this.dome[e].page
      this.finished = false
      this.idIndex = this.dome[e].id
      if (bd.length > 0) {
        if (this.dome[e].id === 0) {
          this.list = []
        }
        this.list = bd
      } else {
        console.log(this.dome[e].id)
        if (this.dome[e].id === 0) {
          this.list = []
          console.log(this.ListArr.bdList)
        }
        if (this.dome[e].id !== 0) {
          this.onLoad()
        }
      }
    },
    getArticle (index) {
      const dada = Qs.stringify({
        catid: this.idIndex,
        page: this.page_num,
        major0: this.$route.params.id,
        num: 10
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      })
        .then((res) => {
          this.loading = false
          if (index === 2) {
            this.page_num++
            this.list = res.data.data
          } else if (res.data.data.length !== 0) {
            this.page_num = this.page_num + 1
            this.list.push(...res.data.data)
            // 对象数组格式去重
            const ss = new Map()
            this.list = this.list.filter((a) => !ss.has(a.id) && ss.set(a.id, 1))
          }
          if (this.Article.length === 0) {
            this.finished = true
          }
        })
    },
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
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
    }

  }

}
</script>

<style lang="less" scoped>
.conter_wu {
  padding-bottom: 60px;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}

.duibi {
  overflow: hidden;
  .school {
    margin: 0 auto !important;
    display: flex;
    .vs {
      flex: 0.33;
      padding: 0 10px;
      display: flex;
      .iconVS {
        font-size: 28px;
        color: rgb(255, 234, 212);
      }
    }
    .cls {
      flex: 0.33;
      display: flex;
      .logo {
        width: 40px;
        height: 40px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .title {
        line-height: 20px;
        width: 100px;
        margin: 0;
        padding: 0;
        margin-left: 10px;
        h3 {
          margin: 0;
          padding: 0;
          font-weight: normal;
          font-size: 14px;
          font-family: 'PingFangSC-Regular';
        }
        span {
          color: rgb(153, 153, 153);
          display: block;
          margin: 0;
          font-family: 'PingFangSC-Light';
          font-size: 12px;
        }
        .van-tag {
          margin-left: -4px;
          margin-top: 5px;
        }
      }
    }
  }
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
  padding: 0px 0px 8px 0px;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 2px solid #f8f8f8;

  h2 {
    font-family: 'PingFangSC-Regular';
    padding-top: 3px;
    width: 210px;
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
    bottom: 5px;
    left: 0px;
    .iconyanjing {
      color: #eee;
      font-size: 14px;
      position: absolute;
      left: -7px;
    }
    span {
      font-family: 'PingFangSC-Regular';
      padding-left: 10px;
      display: inline-block;
      font-size: 11px;
      color: rgb(204, 204, 204);
      position: absolute;
      left: 14px;
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

/deep/[class*='van-hairline']::after {
  position: static;
}
</style>
