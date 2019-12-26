<template>
  <div class="content">
    <van-nav-bar title="专题信息" fixed left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <van-list
      :offset="offset"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="conter"
    >
    <!-- 推荐位 -->
      <van-cell v-for="item in TJList" :key="item.id" @click="ArticleDetails(item.id,item.catid)">
        <div :class="item.thumb !=''?'list_new_img':'list_new'">
          <div class="new_img" v-if="item.thumb">
            <van-image
              lazy-load
              fit="cover"
              :src="'https://www.125yan.com/Uploads/'+item.thumb"
              alt
            />
          </div>
          <h2 >{{item.title}}</h2>

          <span class="text">{{item.description}}</span>

          <div class="bttn" :style="item.title.length > 14?'bottom: 13px;':'bottom: -8px;'">
            <i class="iconfont iconyanjing"></i>
            <span>{{item.hits_num}}</span>
            <h5>{{item.inputtime}}</h5>
          </div>
        </div>
      </van-cell>

      <van-cell v-for="item in list" :key="item.id" @click="ArticleDetails(item.id,item.catid)">
        <div :class="item.thumb !=''?'list_new_img':'list_new'">
          <div class="new_img" v-if="item.thumb">
            <van-image
              lazy-load
              fit="cover"
              :src="'https://www.125yan.com/Uploads/'+item.thumb"
              alt
            />
          </div>
          <h2 >{{item.title}}</h2>

          <span class="text">{{item.description}}</span>

          <div class="bttn" :style="item.title.length > 14?'bottom: 13px;':'bottom: -8px;'">
            <i class="iconfont iconyanjing"></i>
            <span>{{item.hits_num}}</span>
            <h5>{{item.inputtime}}</h5>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      Article: [],
      offset: 50,
      num: 2,
      page_num: 1,
      timer: null,
      list: [],
      TJList: []
    }
  },
  created () {
    this.TJ()
    this.onLoad()
    this.getArticle()
  },
  mounted () {

  },
  methods: {
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    // 推荐位
    TJ () {
      const dada = Qs.stringify({
        pos_id: 27
      })
      // https://www.125yan.com/interface.php?s=/Home/Index/25
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/lbt/'
      })
        .then((res) => {
          this.TJList = res.data.data
        })
    },
    onLoad () {
      setTimeout(() => {
        this.loading = false
        const dada = Qs.stringify({
          orders: 1,
          catid: 92,
          page: this.page_num,
          num: 10
        })
        this.$http({
          method: 'post',
          url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
          data: dada
        })
          .then((res) => {
            this.Article = res.data.data
            if (this.Article.length !== 0) {
              this.page_num = this.page_num + 1

              this.list.push(...this.Article)
              console.log(this.list)
            } else {
              this.finished = true
            }
          })
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.conter {
  padding-top: 50px;
}
.van-cell{
  font-size: 0px;
  padding:0;
      position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    line-height: 22px;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
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
    }
    span {
      color: #eee;
      font-size: 14px;
      left: 25px;
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
  padding: 0px 0px 2px 0px;
  margin: 0 auto;
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
/deep/ .van-tabs__wrap--scrollable {
  height: 50px;
  padding: 0px 0px 5px;
}
</style>
