<template>
  <div class="content"  >
    <van-nav-bar
      title="我的收藏"
      fixed
      :right-text="isBianji"
      @click-right="Bianji()"
      @click-left="all(text)"
    >
    <i slot="left" class="iconfont" :class="this.flag?'':'iconfanhui'">{{text}}</i>
    </van-nav-bar>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-cell-group>
        <van-cell
          v-for="(item,i) in Article.mycollection"
          clickable
          :key="item.id"
          @click="toggle(item,i)"
        >
          <template slot="title">
            <div :class="item.thumb !=''?'list_new_img':'list_new'">
              <div class="new_img" v-show="item.thumb">
                <van-image
                  lazy-load
                  fit="contain"
                  :src="'https://www.125yan.com/Uploads/'+item.thumb"
                  alt
                />
              </div>
              <h2>{{item.title}}</h2>

              <span class="text">{{item.description}}</span>

              <p>
                <i class="iconfont iconyanjing"></i>
                <span>{{item.views}}</span>
              </p>
              <h5>{{item.inputtime}}</h5>
            </div>
          </template>
          <van-checkbox :name="item" ref="checkboxes" slot="right-icon" v-show="flag" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="zhong" v-if="this.flag">
      <van-button class="btntj" type="info" @click="tj()" >取消收藏</van-button>
    </div>
  <p class="nullText" v-show="!Article.mycollection">还没有内容，赶快去看一些吧！</p>
  </div>
</template>

<script>
import Qs from 'qs'
import { Toast } from 'vant'
export default {
  data () {
    return {
      flag: false,
      flags: true,
      result: [],
      isBianji: '编辑',
      Article: [],
      checkedId: null,
      checkedcatId: null,
      text: '',
      options: [],
      toggleAll: true
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    toggle (data, i) {
      if (this.flag) {
        console.log(this.checkedId)
        this.checkedId = data.id
        this.checkedcatId = data.catid

        if (this.$refs.checkboxes[i].checked === false) {
          for (var x = 0; x < this.checkedId.length; x++) {
            let obj = { id: this.checkedId, catid: this.checkedcatId }
            this.options.push(obj)
          }
        }
        if (this.$refs.checkboxes[i].checked === true) {
          // 取消选择后
          for (var y = 0; y < this.checkedId.length; y++) {
            let obj = { id: this.checkedId, catid: this.checkedcatId }
            this.options.pop(obj)
          }
        }
        console.log(this.options)
        this.$refs.checkboxes[i].toggle()
        console.log(this.$refs.checkboxes[i].checked)
      } else {
        console.log(data.catid)
        if (data.catid === '1') {
          this.$router.push({ path: `/schoolJS/${data.id}` })
        } else {
          this.$router.push({ path: '/ArticleDetails', query: { id: data.id, catid: data.catid } })
        }
      }
    },
    Bianji () {
      if (!this.Article.mycollection) {
        this.$toast('无可编辑内容')
      } else {
        this.isBianji === '编辑'
          ? (this.isBianji = '取消')
          : (this.isBianji = '编辑')
        this.flag === false ? (this.flag = true) : (this.flag = false)
        this.flag === false ? (this.text = '') : (this.text = '全选')
      }
    },
    all () {
      if (this.flag === false) {
        this.$router.back()
      } else {
        // 全选   如果已全部选中 再次点击时 去掉选中状态
        if (this.toggleAll) {
          this.text = '反选'
          this.options = []
          for (var x = 0; x < this.Article.mycollection.length; x++) {
            let obj = { id: this.Article.mycollection[x].id, catid: this.Article.mycollection[x].catid }
            this.options.push(obj)
            this.$refs.checkboxGroup.toggleAll(true)
          }
          console.log(this.options)
          this.toggleAll = false
        } else {
          this.text = '全选'
          this.options = []
          this.$refs.checkboxGroup.toggleAll()
          this.toggleAll = true
        }
      }
    },
    tj () {
      if (this.flag === false) {
        Toast('请先选择')
      } else {
        // 发起请求
        const dada = Qs.stringify({
          paramsarr: this.options
        })
        this.$http({
          method: 'post',
          data: dada,
          url:
            'https://www.125yan.com/interface.php?s=/Home/UserApi/delMyCollection'
        }).then(res => {
          console.log(res)
          this.getArticle()
          this.options = []
          this.$toast('取消成功')
          this.flag = false
          this.text = ''
          this.isBianji = '编辑'
        })
      }
      console.log(this.checkedId, this.checkedcatId)
    },

    getArticle () {
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/myCollection'
      }).then(res => {
        this.Article = res.data.data
        console.log(this.Article)
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.van-checkbox-group{
  padding: 45px 0px 68px 0px;
}
.iconyanjing {
  font-size: 12px;
  color: #ccc;
}
.nullText{
  font-family: 'PingFangSC-Regular';
  color: rgb(153,153,153);
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
}
.zhong {
  background: #fff;
  width: 375px;
  height: 40px;
  padding: 15px 0px;
  box-shadow: 0px 0px 20px 0px #f8f8f8;
  margin: 0 auto;
  position: fixed;
  bottom: 0px;
  .btntj {
    position: absolute;
    left: 50%;
    margin-left: -167px;
    border:none;
    width: 335px;
    height: 50px;
    border-radius: 25px;
    color: #fff;
    border: none;
    background: rgb(74, 88, 255);
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
}
.content {
  // width: 335px;
  margin: 0 auto;
  .van-tab {
    // position: fixed;
    // position: -webkit-sticky; // 兼容 -webkit 内核的浏览器
    // top: 10px;
    // border: 1px solid;
  }

  .bt_banner {
    display: block;
    width: 335px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
/deep/ .van-checkbox{
  margin-left: -18px;
  margin: 25px 0px 0px -12px;
}
.list_new {
  margin: 0 auto;
  // height: 130px;
  padding: 9px 0px 24px 0px;
  width: 335px;
  line-height: 12px;
  position: relative;
  h2 {
    font-family: 'PingFangSC-Regular';
    font-weight: normal;
    padding: 0px 0px 10px 0px;
    margin: 0;
    line-height: 25px;
    font-size: 16px;
    color: rgb(51,51,51);

  }
  .text {
    padding: 0px 20px 13px 0px;
    font-family: 'PingFangSC-Light';
    line-height: 20px;
    height: 25px;
    display: inline-block;
    font-size: 12px;
    color: rgb(153,153,153);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
    right: 15px;
    bottom: -14px;
  }
}

.list_new_img {
  width: 335px;
  padding: 0px 0px 15px 0px;
  margin: 0 auto;
  h2 {
    font-family: 'PingFangSC-Regular';
    padding-top: 3px;
    width: 210px;
    height: 36px;
    font-size: 16px;
    font-weight: normal;
    color: rgb(51,51,51);
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
    margin-top: 9px;
    margin-right: 20px;
    float: right;
      border-radius: 4px;
      overflow: hidden;
    .van-image {
      width: 120px;
      height: 64px;
    }
  }
  p {
    width: 150px;
    height: 15px;
    float: left;
    position: absolute;
    bottom: 6px;
    left: 18px;
    .iconyueduliang {
      color: #eee;
      font-size: 10px;
      color: rgb(204, 204, 204);
    }
    span {
      font-family: 'PingFangSC-Regular';
      padding-left: 10px;
      display: inline-block;
      font-size: 11px;
      color: rgb(204,204,204);
       position: absolute;
      bottom: -8px;
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
/deep/ .van-tabs__wrap--scrollable{
  height: 50px;
  padding:0px 0px 5px;
}
</style>
