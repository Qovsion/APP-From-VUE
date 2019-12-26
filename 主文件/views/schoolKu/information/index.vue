<template>
  <div class="content">
    <van-nav-bar title="资讯信息" fixed @click-left="$router.back()" left-arrow>
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="nav_info">
      <van-tabs v-model="active" swipeable  @change="cg(active)">
        <van-tab v-for="(index,i) in dome" :title="index.test" :key="i">
        </van-tab>
        <van-list
        :offset="offset"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="conter_wu"
      >
        <div class="conter" v-for="(item,i) in list" :key="i" @click="ArticleDetails(item.id,item.catid)">
          <div :class="item.thumb !=''?'list_new_img':'list_new'">
            <div class="new_img" v-if="item.thumb">
              <img :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
            </div>
            <h2>{{item.title}}</h2>

            <span class="text">{{item.description}}</span>

            <p>
              <i class="iconfont iconyanjing"></i>
              <span>{{item.hits_num}}</span>
            </p>
            <h5>{{item.inputtime}}</h5>
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
      offset: 10,
      page_num: 1,
      id: 0,
      activeIndex: 0,
      active: 0,
      dome: [

        { id: 53,
          test: '全部'
        },
        { id: 7,
          test: '招生'
        },
        { id: 6,
          test: '公告'
        },
        { id: 8,
          test: '资讯'
        },
        { id: 11,
          test: '访谈'
        },
        { id: 46,
          test: '考试'
        }

      ],
      article: 2,
      Article: [],
      newA: [],
      newIndex: [],
      list: []
    }
  },
  created () {
    const index = this.$route.query.index
    console.log(index)
    this.id = 53
    if (index === 1) {
      this.id = 7
      this.active = 1
    }
    if (index === 2) {
      this.id = 6
      this.active = 2
    }
    if (index === 3) {
      this.id = 46
      this.active = 5
    }

    console.log(this.id)
    this.onLoad()
  },
  methods: {

    cg (id) {
      window.scrollTo(0, 0)
      this.loading = true
      this.finished = false
      this.list = []
      this.page_num = 1
      for (var x = 0; x < this.dome.length; x++) {
        if (id === x) {
          this.id = this.dome[x].id
        }
      }

      console.log(this.id)
      this.onLoad()
    },
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    onLoad () {
      const dada = Qs.stringify({
        catid: this.id,
        school_id: this.$route.params.id,
        page: this.page_num
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      })
        .then((res) => {
          document.body.scrollTop = document.documentElement.scrollTop = 0
          this.Article = res.data.data
          this.loading = false
          if (this.Article.length !== 0) {
            this.page_num = this.page_num + 1
            this.list.push(...this.Article)
          } else {
            this.finished = true
          }
        })
    },
    odd (id) {
      console.log(id)
      this.newA = id
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ [class*=van-hairline]::after{
  position: static;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}

.nav_info {
  padding-top: 55px;
  .van-tabs {

  }

  /deep/ .van-tab {
    flex-basis: 14.5% !important;
    // width: 0px;
    height: 32px;
    width: 56px;
    line-height: 32px;
    border-radius: 16px;
    background: rgb(247, 250, 255);
    font-size: 12px;
    color: rgb(51, 51, 51);
    margin-left: 15px;
  }
  /deep/ .van-tab--active {
    background: rgb(175, 181, 255);
    color: #fff;
  }
  /deep/ .van-tabs__line {
    width: 0px !important;
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

  p {
    width: 150px;
    height: 15px;
    float: left;
    position: absolute;
    bottom: -18px;
    .iconyueduliang {
      color: #eee;
      font-size: 10px;
      color: rgb(204, 204, 204);
    }
    span {
      padding-left: 10px;
      line-height: 20px;
      display: inline-block;
      font-size: 12px;
      color: rgb(204, 204, 204);
    }
  }
  h5 {
    float: right;
    font-weight: normal;
    font-size: 11px;
    color: rgb(204, 204, 204);
    position: absolute;
    right: 5px;
    bottom: -8px;
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
/deep/ .van-tabs__content{
  height: 750px;
}
</style>
