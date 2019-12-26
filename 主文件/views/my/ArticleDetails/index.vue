<template>
  <div class="content">
    <van-nav-bar title="文章详情" fixed left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="conter_xq">
      <div class="title">
        <h3>{{content.title}}</h3>
        <span>来源：{{content.source}}</span>
        <span style="padding-left:10px;">{{content.inputtime}}</span>
      </div>
      <div class="conter_nr" v-html="content.content"></div>
    </div>

    <h3 v-if="this.Article.length!==0">相关文章</h3>
    <div
      class="conter"
      v-for="item in Article"
      :key="item.id"
      @click="ArticleDetails(item.id, item.catid)"
    >
      <div :class="item.thumb !=''?'list_new_img':'list_new'">
        <div class="new_img" v-if="item.thumb">
          <van-image lazy-load fit="cover" :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
        </div>
        <h2>{{item.title}}</h2>

        <span class="text">{{item.description}}</span>

        <div class="bttn" :style="item.title.length > 14 && item.thumb !=''?'bottom: 8px;' :'bottom: -14px;'">
              <i class="iconfont iconyanjing"></i>
              <span>{{item.hits_num}}</span>
              <h5>{{inputtime}}</h5>
            </div>
      </div>
    </div>
    <van-tabbar v-model="active" active-color="#7d7e80">
      <van-tabbar-item @click="thumbsUp()">
        <span>点赞{{likes}}</span>
        <i
          slot="icon"
          class="iconfont"
          :class="this.flag===false?'icondianzan-xuanzhong':'icondianzan-moren'"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item @click="Collection()">
        {{CollectionText}}
        <i
          slot="icon"
          class="iconfont"
          :class="this.status===2002?'iconshoucang-xuanzhong':'iconshoucang-moren'"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="zanwu()">
        分享
        <i slot="icon" class="iconfont iconfenxiang"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Qs from 'qs'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
const KEY = '125History'
export default {
  data () {
    return {
      active: 0,
      CollectionText: '收藏',
      likes: 0,
      content: [],
      Article: [],
      flag: true,
      inputtime: 0,
      status: 0
    }
  },
  created () {
    this.getArticleData()
    this.getArticleAbout()
    if (this.$store.state.user.token) {
      this.ifMyCollection()
    }
  },
  activated () {
    this.getArticleData()
    this.getArticleAbout()
    if (this.$store.state.user.token) {
      this.ifMyCollection()
    }
  },
  mounted () {
  },
  watch: {
    // 监听页面第一次进入
    $route (to, from) {
      this.getArticleData()
      this.getArticleAbout()
      if (this.$store.state.user.token) {
        this.ifMyCollection()
      }
    }
  },

  methods: {

    thumbsUp () {
      this.getArticleData()
      if (this.flag) {
        const dada = Qs.stringify({
          catid: this.$route.query.catid,
          id: this.$route.query.id
        })
        this.$http({
          method: 'post',
          data: dada,
          url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/addLike'
        }).then(res => {
          this.getArticleData()
          Toast('点赞+1')
        })
        this.flag = false
      } else {
        Toast('感谢您的点赞~')
      }

      return false

      // this.$router.push('/user')
    },
    zanwu () {
      Toast('该功能暂未上线')
    },
    getArticleData () {
      const dada = Qs.stringify({
        id: this.$route.query.id,
        catid: this.$route.query.catid
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz_xq'
      }).then(res => {
        res = res.data.data
        this.content = res

        if (res.likes === null) {
          res.likes = 0
        }
        this.likes = res.likes
        // 进入页面 将id与catid 存储到本地储存
        if (this.$route.query.id) {
          var obj = [{ id: this.$route.query.id, catid: this.$route.query.catid, title: this.content.title }]
          // this.History = Object.assign({}, this.History, ...obj)
          this.$store.state.History.unshift(...obj)
          // console.log(this.$store.state.History)
          // 对象数组格式去重
          const res = new Map()
          this.$store.state.History = this.$store.state.History.filter((a) => !res.has(a.id) && res.set(a.id, 1))
          window.localStorage.setItem(KEY, JSON.stringify(this.$store.state.History))
          console.log(this.$store.state.History)
          document.body.scrollTop = document.documentElement.scrollTop = 0
        }
      })
    },
    ifMyCollection () {
      // 判断收藏
      const dada = Qs.stringify({
        catid: this.$route.query.catid,
        id: this.$route.query.id
      })
      this.$http({
        method: 'post',
        data: dada,
        url:
          'https://www.125yan.com/interface.php?s=/Home/UserApi/ifMyCollection'
      }).then(res => {
        this.status = res.data.status
        if (res.data.status === 2002) {
          this.CollectionText = '已收藏'
        }
        if (res.data.status === 2003) {
          this.CollectionText = '未收藏'
        }
      })
    },
    Collection () {
      // 发起请求
      // if (this.$store.state.user.token) {
      const dada = Qs.stringify({
        catid: this.$route.query.catid,
        id: this.$route.query.id
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/addMyCollection'
      }).then(res => {
        // 此处判断 再次点击取消
        if (res.data.status === 0) {
          Toast('收藏成功')
        }
        if (res.data.status === 2000) {
          Toast('取消收藏')
        }
        if (this.$store.state.user.token) {
          this.ifMyCollection()
        }
      })
      return false
      // }
      // this.$router.push({ path: '/ArticleDetails', query: { id: this.$route.query.id, catid: this.$route.query.catid } })
    },
    // 相关文章
    getArticleAbout () {
      const dada = Qs.stringify({
        catid: this.$route.query.catid,
        id: this.$route.query.id,
        num: 5
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xgwz',
        data: dada
      }).then(res => {
        this.Article = res.data.data
        // 截取时间字符串
        this.inputtime = this.$moment(res.data.data.inputtime).format().substring(0, 10)
      })
    },
    ArticleDetails (id, catid) {
      this.$router.push({
        path: '/ArticleDetails',
        query: { id: id, catid: this.$route.query.catid }
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.content {
  padding-bottom: 66px;
}

.iconfont {
  font-size: 20px;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}

.icondianzan-xuanzhong {
  color: rgb(247, 99, 99);
}
.iconshoucang-xuanzhong {
  color: rgb(253, 189, 65);
}
h3 {
  margin: 0 auto;
  padding: 0;
  width: 335px;
  font-size: 18px;
}
.conter_xq {
  padding: 40px 0px;
  width: 335px;
  margin: 10px auto;

  .title {
    h3 {
      font-size: 18px;
      margin: 10px 0px 0px 0px;
      padding: 0px;
    }
    span {
      font-size: 14px;
      color: rgb(154, 154, 154);
    }
  }
  .conter_nr {
    font-size: 15px;
    color: rgb(90, 90, 90);
    line-height: 25px;
    /deep/ img {
      width: 335px !important;
      height: 195px !important;
    }
    /deep/ a {
      pointer-events: none;
    }
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
      left: -6px;
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
  // padding: 0px 0px 8px 0px;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 2px solid #f8f8f8;
  h2 {
    font-family: 'PingFangSC-Regular';
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
    // height: 64px;
    margin-top: 12px;
    float: right;
    // overflow: hidden;
    .van-image {
      overflow: hidden;
      display: inline-block;
    border-radius: 4px;
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
</style>
