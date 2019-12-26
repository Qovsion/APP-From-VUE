<template>
  <div class="content">
    <div :class="scrollTag?'nav1':'nav'">
      <i class="iconfont le navLeftfont iconfanhui" @click="back()"></i>
    </div>
    <!-- 调换位置 -->
    <div class="tab">
      <van-tabs v-model="active" swipeable @change="changeChannel(active)">
        <van-tab v-for="item in dome" :title="item.title" :key="item.id"></van-tab>
        <van-list
          :offset="offset"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="conter_1" v-for="(item,i) in list" :key="i" v-show="active===0" @click="ArticleDetails(item.id,item.catid)">
            <div :class="item.thumb !=''?'list_new_img':'list_new'">
              <div class="new_img"  v-show="item.thumb">
                <img v-if="item.thumb" :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
              </div>
              <h2>{{item.title}}</h2>
 <span class="text">{{item.description}}</span>
              <!-- <span class="text">{{item.description}}</span> -->

              <p>
                <img src="../../../assets/images/show_icon.png" alt />
                <span>{{item.hits_num}}</span>
              </p>
              <h5>{{item.inputtime}}</h5>
            </div>
          </div>

          <div class="zxwd" v-show="active===1">
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
                <van-tag ref="zk" color="#F7FAFF" text-color="#ACB7FF" @click="zhankai(item.id,i)">
                  <span>展开</span>
                  <i class="iconfont iconxfup"></i>
                </van-tag>
              </div>
            </div>
            <!-- 我要提问 -->
            <div class="tiwen" v-show="!isPopup">
              <van-button type="default" @click="tanchuang()">我要提问</van-button>
            </div>
          </div>
          <!-- 弹出层 -->
          <van-popup v-model="isPopup">
            <van-cell-group>
               <i class="iconfont iconguanbi-min" @click="guanbi()"></i>
              <van-field
                rows="7"
                type="textarea"
                maxlength="200"
                show-word-limit
                v-model="value"
                :focus="inputCode"
                placeholder="请输入您的问题"
              />
            </van-cell-group>
            <div class="tijiao">
              <van-button type="default" @click="sub()">提交</van-button>
            </div>
          </van-popup>
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
      offset: 1,
      page_num: 1,
      value: '',
      catid: 5,
      inputCode: false,
      isPopup: false,
      scrollTag: false,
      active: 0,
      dome: [{ id: 1, title: '问题' }, { id: 2, title: '问答' }],
      isshow: false,
      daan: false,
      zys: '展开',
      zhanShow: false,
      Article: [],
      id: '',
      list: []
    }
  },
  mounted () {
    if (this.active === 0) {
      this.catid = 5
    } else {
      this.catid = 54
    }
  },
  activated () {
    console.log(this.$route.query.q)
    console.log(this.active)
    if (this.$route.query.q) {
      this.active = this.$route.query.q
    }
    this.onLoad()
  },
  created () {
    if (this.$route.query.q) {
      this.active = this.$route.query.q
    }
    this.onLoad()
  },
  updated () {
    this.moren()
  },
  methods: {
    ArticleDetails (id, catid) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    // 提问弹窗
    tanchuang () {
      this.isPopup = !this.isPopup
      setTimeout(() => {
        this.inputCode = true
      })
    },
    // 发送提交
    sub () {
      console.log(this.value)

      this.$toast({
        message: '提交成功',
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
      this.isPopup = false
    },
    guanbi () {
      this.isPopup = !this.isPopup
    },
    // 默认展开
    moren () {
      console.log(this.Article.length)

      let cc = document.getElementsByClassName('wd_no_1')[0]
      if (cc) {
        cc.style.display = 'block'
        let bt = document.getElementsByClassName('van-tag')[0]
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
      //   if (this.Article.length === 0) {
      //   return false
      // }
    },
    // 展开收起
    zhankai (id, i) {
      let cc = document.getElementsByClassName('wd_no_1')[i]
      if (this.$refs.daan[i].id === id) {
        let bt = document.getElementsByClassName('van-tag')[i]
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
    },
    changeChannel (index) {
      // 滑动  index 滑动索引
      window.scrollTo(0, 0)
      console.log(index)
      var btm = document.getElementsByClassName('van-list')[0]

      if (index === 0) {
        btm.style.padding = '0px'
        this.list = []
        this.loading = true
        this.finished = false
        this.page_num = 1
        this.onLoad()
      }
      if (index === 1) {
        btm.style.padding = '0px 0px 50px 0px'
        console.log(btm)
        this.list = []
        this.page_num = 1
        this.loading = true
        this.finished = false
        this.toggle = false
        this.onLoad()
      }
    },
    onLoad () {
      if (this.active === 0) {
        this.catid = 5
      } else {
        this.catid = 54
      }
      const dada = Qs.stringify({
        school_id: this.$route.params.id,
        catid: this.catid,
        page: this.page_num,
        num: 30
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      }).then(res => {
        this.loading = false
        this.Article = res.data.data
        if (this.Article.length !== 0) {
          this.page_num++
          this.list.push(...this.Article)
        } else {
          this.finished = true
        }
      })
    },

    back () {
      this.$router.go(-1)
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
.content{
  width: 375px;
  margin: 0 auto;
  overflow-x: hidden;

}
/deep/ .van-hairline--top-bottom::after{
  border-width: 0px
}
/deep/ [class*=van-hairline]::after{
  position: static;
}
.iconfanhui{
  position: absolute;
  z-index: 800;
}
.conter_1 {
  width: 355px;
  margin: 0 auto;
  margin-left: 10px;
}
/deep/ .van-tabs__content {
  padding-top: 60px;
  height: 750px;
}
.tab {
  background: #fff;
  // padding-top: 10px;
  position: relative;
  z-index: 10;
  top: -80px;
  border: none;
  /deep/ .van-tabs--line .van-tabs__wrap {
    padding-top: 5px;
    height: auto;
    position: fixed;
    z-index: 9999;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176,183,231,0.2);
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
/deep/ .van-hairline--top-bottom {
  position: static;
}
/deep/ .van-tabs {
  position: static;
}
.nav {
  width: 375px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.1);
  font-weight: 600;
  line-height: 50px;
  position: relative;
  font-size: 18px;
  span {
    width: 375px;
    display: block;
    position: relative;
    left: 50%;
    transform: translateX(-20%);
  }
  .le {
    z-index: 30;
    position: fixed;

    float: left;
    padding: 0px 0px 13px 20px;
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
    height: 36px;
    font-size: 16px;
    font-weight: normal;
    color: rgb(51, 51, 51);
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
/deep/ .van-tabs__wrap--scrollable {
  height: 50px;
  padding: 0px 0px 5px;
}
.zxwd {
  width: 335px;
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
        line-height: 16px;
        height: 18px;
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
       line-height: 16px;
        height: 18px;
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

.tiwen {
  width: 375px;
  height: 60px;
  padding: 10px 0px;
  -moz-box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.03);
  box-shadow: 0px -5px 18px rgba(0, 0, 0, 0.05);
  background: #fff;
  position: fixed;
  bottom:0;
  left: 0;
  z-index: 1000;
  .van-button {
    position: absolute;
    color: #fff;
    border-radius: 20px;
    left: 50%;
    width: 335px;
    height: 40px;
    margin-left: -167px;
    background: linear-gradient(to right, rgb(255, 186, 94), rgb(255, 126, 78));
  }
}
.van-popup {
  width: 335px;
  height: 300px;
  border-radius: 10px;
  .van-cell-group {
    width: 325px;
    height: 230px;
    margin: 0 auto;
    position: relative;

    i {
      width: 20px;
      height: 20px;
      font-size: 15px;
      color: rgb(216, 216, 216);
      position: absolute;
      z-index: 5;
      top: 5px;
      right: 0px;
    }
    .van-field {
      margin-top: 5px;
      height: 230px;
      font-size: 15px;
    }

    /deep/ .van-field__word-limit {
      text-align: center;
    }
  }
  .tijiao {
    width: 325px;
    margin: 0 auto;
    position: relative;
    .van-button {
      position: absolute;
      color: #fff;
      border-radius: 20px;
      width: 300px;
      height: 40px;
      line-height: 30px;
      left: 50%;
      margin-left: -150px;
      background: linear-gradient(
        to right,
        rgb(255, 186, 94),
        rgb(255, 126, 78)
      );
    }
  }
}
</style>
