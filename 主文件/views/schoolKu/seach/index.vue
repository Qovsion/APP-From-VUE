<template>
  <div>
    <form action="/">
      <van-search
      class="search"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel"
        :focus="true"
        ref="id"
      />

    </form>
    <div class="content">
      <van-cell title="历史记录" v-show="!this.historyList.length == 0">
         <i slot="right-icon" class="iconfont iconshanchu"  @click="clearHistory()" style="line-height: inherit;"></i>
         <i slot="icon" class="iconfont iconjilu"   style="line-height: inherit;"></i>
      </van-cell>
      <div class="jilu">
        <van-tag round type="primary" v-for="item in historyList" :key="item" @click="push(item)">{{item}}</van-tag>
      </div>

      <van-cell title="热搜排行" icon="shop-o">
        <i slot="icon" class="iconfont iconpaihang"   style="line-height: inherit;"></i>
      </van-cell>
      <!-- <li v-for="item in 5" :key="item"> -->
      <div class="paihang" >
        <div @click="$router.push({ path: '/ArticleDetails', query: { id: RankingList[0].id, catid: RankingList[0].catid } })">
          <van-tag round color="rgb(254,86,86)">1</van-tag>
          <span class="span" >{{RankingList[0].name}}</span>
        </div>
        <div @click="$router.push({ path: '/ArticleDetails', query: { id: RankingList[1].id, catid: RankingList[1].catid } })">
          <van-tag round color="rgb(255,132,88)">2</van-tag>
          <span class="span">{{RankingList[1].name}}</span>
        </div>
        <div @click="$router.push({ path: '/ArticleDetails', query: { id: RankingList[2].id, catid: RankingList[2].catid } })">
          <van-tag round color="rgb(254,108,101)">3</van-tag>
          <span class="span" v-if="RankingList">{{RankingList[2].name}}</span>
        </div>
        <div @click="$router.push({ path: '/ArticleDetails', query: { id: RankingList[3].id, catid: RankingList[3].catid } })">
          <van-tag round color="rgb(221,221,221)">4</van-tag>
          <span class="span">{{RankingList[3].name}}</span>
        </div>
        <div @click="$router.push({ path: '/ArticleDetails', query: { id: RankingList[4].id, catid: RankingList[4].catid } })">
          <van-tag round color="rgb(221,221,221)">5</van-tag>
          <span class="span">{{RankingList[4].name}}</span>
        </div>
      </div>

      <!-- </li> -->
    </div>
  </div>
</template>

<script>
// import onSeach from '../../components/on-seach'

import Qs from 'qs'
const KEY = '125SEACH'
export default {
  data () {
    return {
      color: '',
      isChange: false,
      // 搜索关键字
      value: '',
      // 历史记录
      historyList: [],
      RankingList: []
    }
  },
  activated () {
    this.value = ''
  },
  created () {
    this.Ranking()
    console.log(this.historyList)
    // 历史记录获取
    this.historyList = JSON.parse(window.localStorage.getItem(KEY) || '[]')
  },
  mounted () {
    this.thisFocus()
    setTimeout(() => {
      this.thisFocus()
    }, 0)
  },
  methods: {
    push (name) {
      console.log(name)
      this.$router.push({ path: '/seachdel', query: { text: name } })
    },
    // 清空
    clearHistory () {
      this.historyList = []
      window.localStorage.setItem(KEY, JSON.stringify(this.historyList))
    },
    onCancel () {
      // 点击取消按钮时
      this.$router.go(-1)
    },
    onSearch (text) {
      // 代表有内容
      if (!text) return false

      // 转为数组

      // 创建一个set对象 set是一个不能重复的集合  构造函数传参是数组
      const set = new Set(this.historyList)
      set.add(text)
      this.historyList = Array.from(set)
      // 存储本地
      window.localStorage.setItem(KEY, JSON.stringify(this.historyList))
      // 回车触发搜索函数
      // 跳转至搜索结果  this.$router.push()
      this.$router.push({ path: '/seachdel', query: { text: text } })
    },
    Ranking () {
      const ta = Qs.stringify({
        id: 393
      })
      this.$http({
        method: 'post',
        data: ta,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/sp'
      })
        .then((res) => {
          this.RankingList = JSON.parse(res.data.data)
          console.log(this.RankingList)
        })
    },
    thisFocus () {
      document.getElementsByClassName('van-field__control')[0] && document.getElementsByClassName('van-field__control')[0].focus()
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont{
  color: #ccc;
  font-size: 14px;
}
  .search {
  padding: 16px 15px;
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
.content {
  margin: 0 auto;
  .jilu {

    // height: 24px;
    line-height: 0px;
    .van-tag {
      font-family: 'PingFangSC-Light';
      background: rgb(247, 250, 255);
      color: rgb(102, 102, 102);
      margin-left: 13px;
      margin-bottom: 10px;
      height: 24px;
      padding: 2px 10px;

    }
  }
  .span {
    color: rgb(186, 186, 186);
    font-size: 16px;
    padding-left: 10px;

  }
}
.van-cell {

  position: static; //去掉单元格下划线
}
.van-cell__title {
  padding-left: 10px;
  span {
    color: rgb(51,51,51);
    font-family: 'PingFangSC-Semibold';
    font-size: 14px;
    font-weight: bold;
  }
}
.paihang{
  width: 345px;
  margin: 0 auto;
  padding: 0;
   line-height: 0px;
  div{
    height: 35px;
  }
  .span{
    color: rgb(153,153,153);
  font-size: 14px;
    padding: 0px 5px;
  }
}
</style>
