<template>
  <!-- 学校筛选 -->
  <div class="centent">
    <van-sticky :offset-top="0">
    <div class="search">
      <van-search shape="round" placeholder="请输入搜索内容" readonly @click="push()" />
    </div>
    </van-sticky>
    <div class="con_t">
      <!-- 同等学力/专业硕士... -->
      <van-grid :border="false">
        <van-grid-item @click="xxk_lx(0)" text="同等学力">
          <img slot="icon" src="../../../assets/icon/tongdengxueli.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(1)" text="专业硕士">
          <img slot="icon" src="../../../assets/icon/zhuanyeshuoshi.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(2)" text="国际硕士">
          <img slot="icon" src="../../../assets/icon/guojishuoshi.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(3)" text="中外合办">
          <img slot="icon" src="../../../assets/icon/zhongwaiheban.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(4)" text="在职博士">
          <img slot="icon" src="../../../assets/icon/zaizhiboshi.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(5)" text="国际博士">
          <img slot="icon" src="../../../assets/icon/guojiboshi.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(6)" text="高级研修">
          <img slot="icon" src="../../../assets/icon/gaojiyanxiu.png" />
        </van-grid-item>
        <van-grid-item @click="xxk_lx(7)" text="全部">
          <img slot="icon" class="qb" src="../../../assets/icon/quanbu.png" />
        </van-grid-item>
      </van-grid>
      <div class="btn">
        <van-button
          type="default"
          v-for="item in dq"
          :key="item.id"
          @click="dd(item.id,item.name)"
        >{{item.name}}</van-button>
      </div>
    </div>
    <div class="hot_major">
      <span class="major left">
        <slot>热门学校</slot>
      </span>
    </div>
    <van-grid class="rmxx" :border="false" icon-size="56px">
      <van-grid-item
        v-for="item in rmxx"
        :key="item.id"
        :text="item.title"
        @click="schoolHome(item.id)"
      >
      <img slot="icon" :src='"https://www.125yan.com/Uploads/" + item.thumb' alt="">
      </van-grid-item>
    </van-grid>
    <div class="indexList">
      <van-index-bar highlight-color="#fff" :index-list="pinyin">
        <div v-for="item in school" :key="item.id">
          <van-index-anchor :index="item[0].pinyin" />
          <div class="list" v-for="cc in item" :key="cc.id" @click="schoolHome(cc.id)">
            <div class="logo">
              <img :src="'https://www.125yan.com/Uploads/'+cc.thumb" alt />
            </div>
            <div class="title">
              <h2>{{cc.title}}</h2>
              <van-cell :title="`简章：${cc.jz_num}篇`" />
            </div>
          </div>
        </div>
      </van-index-bar>
    </div>
     <on-tabber></on-tabber>
  </div>
</template>

<script>
import Tabber from '@/components/on-tabber'
export default {
  components: { 'on-tabber': Tabber },
  data () {
    return {
      value: '',
      vanItem: [
        { 'id': 1, 'icon': '../../../assets/icon/tongdengxueli.png', 'text': '同等学力' },
        { 'id': 2, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '专业硕士' },
        { 'id': 3, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '国际硕士' },
        { 'id': 4, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '中外合办' },
        { 'id': 5, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '在职博士' },
        { 'id': 6, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '国际博士' },
        { 'id': 7, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '高级研修' },
        { 'id': 8, 'icon': 'https://static.easyicon.net/preview/122/1223065.gif', 'text': '全部' }
      ],
      dq: [],
      pinyin: [],
      rmxx: [],
      school: []
    }
  },
  created () {
    this.getXxk()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 索引栏判断
    handleScroll () {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      // if top > 480  索引栏显示
      var cc = document.getElementsByClassName('van-index-bar__sidebar')[0]
      if (top > 480) {
        cc.style.visibility = 'visible'
      }
      if (top < 480) {
        cc.style.visibility = 'hidden'
      }
    },
    dd (id, name) {
      // 地点跳转
      this.$router.push({ path: '/xxsx', query: { dd: id, ddName: name } })
    },
    push () {
      this.$router.push('/seach')
    },
    schoolHome (id) {
      this.$router.push({ path: `/schoolHome/${id}` })
    },
    getXxk () {
      this.$http.post('https://www.125yan.com/interface.php?s=/Home/Index/xxk')
        .then((res) => {
          res = res.data.data
          console.log(res)
          this.dq = res.dq
          this.pinyin = res.pinyin
          this.rmxx = res.rmxx
          this.school = res.school
          console.log(this.school)
        })
    },
    xxk_lx (index) {
      console.log(index)
      if (index === 7) {
        this.$router.push('/xxsx')
      } else {
        var name = this.vanItem[index].text
        this.$router.push({ path: '/xxsx', query: { lx: index + 1, name: name } })
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
/deep/ .van-index-anchor{
  background: rgb(250,252,255);
}
.search {
  padding: 16px 0px;
  background: #fff;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 20px 0px rgba(74, 88, 255, 0.05);
  /deep/ .van-search {
    width: 355px;
    height: 32px;
    margin: 0 auto;
    border-radius: 16px !important;
    overflow: hidden;
  }
}
/deep/ .van-grid-item__content{
  img{
    width: 48px;
    height: 48px;
  }
}
/deep/ .van-hairline--bottom {
  position: relative;
  z-index: 0 !important;
  font-weight: bold;
  color: #000 !important;
  background-color: rgba(246, 249, 255, 0.5) !important;
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
.rmxx {
/deep/ .van-grid-item__text {
  width: 71px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding-top: 5px;
}
}

.rmxx{
  width: 350px;
  margin: 0 auto;
}
.con_t {
  width: 355px;
  margin: 0 auto;
  /deep/ .van-grid-item__text {
    text-align: center;
    padding-top: 5px;
  }
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
  img {
    width: 24px;
    height: 26px;
  }
  .qb{
    width: 24px;
    height: 24px;
  }
    span {
    color: #7d7e80;
    font-size: 0.32rem;
    word-wrap: break-word;
  }
}
.list {
  display: flex;
  padding: 10px 0px;
  .logo {
    display: block;
    width: 48px;
    height: 48px;
    padding-left: 20px;
    position: relative;
    z-index: 1;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .title {
    h2 {
      width: 260px;
      padding-top: 5px;
      font-family: 'PingFangSC-Regular';
      font-weight: normal;
      margin: 0;
      font-size: 16px;
      padding-left: 15px;
      font-size: 16px;
      color: rgb(51, 51, 51);
    }
    .van-cell {
      padding: 0;
      margin: 0;
      text-align: left;
      padding-left: 16px;
      font-size: 11px;
      color: rgb(153, 153, 153);
    }
  }
}
.indexList {
  padding-bottom: 60px;
}
/deep/ .van-index-bar__sidebar {
  visibility: hidden;
}
//    /deep/ .van-index-bar__sidebar {
//    visibility:visible ;
//   }
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
</style>
