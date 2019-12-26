<template>
  <!-- 搜索 -->
  <div class="content">
    <form action="/">
      <van-search
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
    <van-tabs
      @change="changeChannel(activeIndex)"
      color="#FF9153"
      swipeable
      v-model="activeIndex"
      :offset-top="0"
      sticky
      :lazy-render="true"
    >
      <van-tab v-for="item in dome" :title="item.test" :key="item.id">
        <div class="tab-title" slot="title" @click="odd(item)">{{item.test}}</div>
      </van-tab>
      <div class="nonr" v-show="num">
        <p>很遗憾，没有找到您想要的信息哦。</p>
        <p>您换个关键词我帮您再找找看</p>
      </div>
      <van-list
       :offset="offset"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
        class="conter"
        v-for="(item,i) in Article"
        :key="item.id"
        @click="ArticleDetails(item.id,item.catid)"
      >
        <!-- 使用catid判断使用样式 -->
        <van-cell
          :class="item.catid===1?'':'list'"
          @click="schoolHome(item.id)"
          v-show="item.catid==1"
        >
          <div class="logo">
            <img :src="'https://www.125yan.com/Uploads/'+item.s_thumb" alt />
          </div>
          <div class="titles">
            <div class="min_title">
              <h2>{{item.title}}</h2>
              <van-tag color="#F8FAFF" text-color="#85A6FF">985</van-tag>
              <van-tag color="#FFF9F2" text-color="#FFD1AB">211</van-tag>
            </div>
            <div class="num_jzxf">
              简章:
              <span>{{item.jz_num}}篇</span>
              学费:
              <span>{{item.xuefei}}</span>
            </div>
          </div>
        </van-cell>
        <van-cell :class="item.catid===3?'':'zy'" v-if="item.catid==3" @click="zysx(item.id)">
          <h3>{{item.title}}</h3>
          <van-tag>{{item.lxname}}</van-tag>
          <p>{{item.description}}</p>
          <div class="num_zy">
            简章:
            <span>{{item.jz_num}}篇</span>
            学费:
            <span>{{item.xuefei}}</span>
            院校:
            <span>{{item.xx_num}}</span>
          </div>
        </van-cell>
        <van-cell :class="item.catid===4?'':'jz'" v-if="item.catid==4" @click="rulesDel(item.id)">
          <h3>{{item.title}}</h3>
          <div class="biaoji">
            <van-tag>{{item.zy_name}}</van-tag>
            <van-tag>{{item.xuezhi}}</van-tag>
            <van-tag>{{item.dq_arr[0]}}</van-tag>
          </div>

          <div class="xf">
            学费:
            <span>{{item.xuefei}}</span>
          </div>
        </van-cell>
        <van-cell :class="item.catid===5?'':'bk'" v-if="item.catid==5"  @click="ArticleDetails(item.id,item.catid)">
          <h3>{{item.title}}</h3>
          <div class="but">{{item.inputtime}}</div>
        </van-cell>

        <van-cell :class="item.catid===53?'':'zx'" v-if="item.catid==53"  @click="ArticleDetails(item.id,item.y_catid)">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
          <div class="but">{{item.inputtime}}</div>
          <div class="viue">
            <img src="../../../assets/images/show_icon.png" alt />
            {{item.views}}111
          </div>
        </van-cell>

         <van-cell :class="item.catid===57?'':'zx'" v-if="item.catid==57"  @click="ArticleDetails(item.id,item.y_catid)">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
          <div class="but">{{item.inputtime}}</div>
          <div class="viue">
            <img src="../../../assets/images/show_icon.png" alt />
            {{item.views}}111
          </div>
        </van-cell>

         <van-cell :class="item.catid===46?'':'zx'" v-if="item.catid==46"  @click="ArticleDetails(item.id,item.y_catid)">
          <h3>{{item.title}}</h3>
          <p>{{item.description}}</p>
          <div class="but">{{item.inputtime}}</div>
          <div class="viue">
            <img src="../../../assets/images/show_icon.png" alt />
            {{item.views}}111
          </div>
        </van-cell>

        <van-cell :class="item.catid===54?'':'zxwd'" v-if="item.catid==54">
          <div class="wd">
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
        </van-cell>
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
      finished: false,

      offset: 100,
      isStyle: '0',
      isPopup: false,
      inputCode: false,
      value: this.$route.query.text,
      activeIndex: 0,
      idIndex: 0,
      zhanShow: false,
      num: false,
      dome: [
        { id: 0, test: '综合' },
        { id: 1, test: '院校' },
        { id: 3, test: '专业' },
        { id: 4, test: '简章' },
        { id: 5, test: '报考' },
        { id: 53, test: '资讯' },
        { id: 57, test: '试题' },
        { id: 46, test: '备考' },
        { id: 54, test: '问答' }

      ],
      Article: [],
      newA: []
    }
  },
  created () {
    // this.getArticle()
    this.sousuoGet()
  },
  mounted () {
  },
  updated () {
    this.moren()
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        this.loading = false
        if (this.Article.length < 40) {
          this.page_num = this.page_num + 1
          this.getArticle()
          this.list.push(...this.Article)
          console.log(this.list)
        }
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    schoolHome (id) {
      this.$router.push(`/schoolHome/${id}`)
    },
    zysx (id) {
      this.$router.push(`/zysx/${id}`)
    },
    rulesDel (id) {
      this.$router.push({ path: `/rulesDel`, query: { rlid: id } })
    },
    ArticleDetails (id, catid) {
      this.$router.push({ path: `/ArticleDetails`, query: { id: id, catid: catid } })
    },
    onSearch () {
      this.sousuoGet()
      this.$route.query.text = this.value
    },
    onCancel () {
      // 取消
      this.$router.go(-1)
    },

    sousuoGet () {
      const ta = Qs.stringify({
        lx: this.idIndex,
        page: 1,
        num: 10,
        tit: this.value
      })
      this.$http({
        method: 'post',
        data: ta,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/sousuo'
      })
        .then((res) => {
          this.Article = res.data.data.list
          this.num = res.data.data.num
          if (this.num === '0') {
            this.num = true
          } else {
            this.num = false
          }
        })
    },
    odd (id) {
      console.log(id)
      this.newA = id
    },
    changeChannel (e) {
      this.idIndex = this.dome[e].id
      this.sousuoGet()
    },
    // 默认展开
    moren () {
      let cc = document.getElementsByClassName('wd_no_1')[0]
      cc.style.display = 'block'
      let bt = document.getElementsByClassName('zk')[0]
      console.log(bt)
      cc.style.display === 'block' ? bt.innerHTML = `<span data-v-fc334854="">收起</span><i data-v-fc334854="" class="van-icon van-icon-arrow-up"></i>` : bt.innerHTML = `<span data-v-fc334854="">展开</span><i data-v-fc334854="" class="van-icon van-icon-arrow-down"></i>`
      cc.style.display === 'block' ? this.zhanShow = true : this.zhanShow = false

      if (this.zhanShow) {
        bt.style.setProperty('background', 'rgb(255,250,244)', 'important')
        bt.style.setProperty('color', 'rgb(255,177,122)', 'important')
      } else {
        bt.style.setProperty('background', '#F7FAFF', 'important')
        bt.style.setProperty('color', '#ACB7FF', 'important')
      }
    },
    // 展开收起
    zhankai (id, i) {
      for (var x = 0; x < this.$refs.daan.length; x++) {
        console.log(this.$refs.daan, x)
        let cc = document.getElementsByClassName('wd_no_1')[x]
        if (this.$refs.daan[x].id === id) {
          let bt = document.getElementsByClassName('zk')[x]
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
    },
    guanbi () {
      this.isPopup = !this.isPopup
    }

  }
}

</script>

<style lang="less" scoped>
.nonr {
  height: 124px;
  text-align: center;
  background: #fff;
  padding: 10px 0px;
  width: 100%;
  border-top: 10px solid rgb(247, 250, 255);
  border-bottom: 10px solid rgb(247, 250, 255);
  p {
    font-size: 14px;
    color: #333;
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
  margin-top: 10px;
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

.zxwd {
  // width: 335px;
  margin: 0 auto;
  padding: 5px 20px;
  // margin-left: 20px;
  position: relative;
  .wd {
    padding: 0px 0px 30px 0px;
    position: relative;
    &:nth-child(1) {
      .wd_no_1 {
        // display: block;
      }
    }
    .wd_no {
      .wn {
        padding: 1px;
        display: inline-block;
        margin-top: 2px;
        width: 16px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        background: rgb(74, 88, 255);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
      .wt {
        line-height: 30px;
        color: rgb(51, 51, 51);
        font-size: 14px;
        padding-left: 5px;
      }

      .wt_da {
        font-size: 12px;
        color: rgb(51, 51, 51);
        padding-left: 5px;
        padding-top: 5px;
        line-height: 25px;
      }
      .da {
        padding: 1px;
        margin-top: 5px;
        display: inline-block;
        width: 16px;
        color: #fff;
        background: rgb(255, 193, 124);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
    }
    .wd_no_1 {
      line-height: 14px;
      padding: 10px 0px;
      display: none;
      .wn {
        padding: 1px;
        margin-top: 2px;
        width: 16px;
        color: #fff;
        background: rgb(74, 88, 255);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
      .wt {
        line-height: 30px;
        color: #333333;
        font-size: 14px;
        padding-left: 5px;
      }

      .wt_da {
        font-size: 12px;
        color: #4a4a4a;
        line-height: 25px;
        padding-left: 5px;
        padding-top: 10px;
      }
      .da {
        padding: 3px;
        width: 16px;
        color: #fff;
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
      left: 10px;
      bottom: 0px;
    }
    .van-tag {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}
.list {
   padding: 5px 20px;
  .van-cell__value {
    display: flex;
  }
  .van-cell__title {
    flex: 0.63;
  }
  .logo {
    padding: 20px 0px 20px 0px;
    position: relative;
    display: block;
    width: 56px;
    height: 56px;
    z-index: 1;
    img {
      width: 56px;
      height: 56px;
    }
  }
  .titles {
    h2 {
      padding-top: 5px;
      font-family: 'PingFangSC-Regular';
      font-weight: normal;
      margin: 0;
      font-size: 16px;
      padding-left: 15px;
      font-size: 16px;
      color: rgb(51, 51, 51);
    }
    .num_jzxf {
      font-family: 'PingFangSC-Light';
      padding: 0;
      margin: 0;
      text-align: left;
      padding-left: 16px;
      font-size: 11px;
      color: rgb(153, 153, 153);
      span {
        font-family: 'PingFangSC-Regular';
        font-size: 11px;
        color: rgb(74, 88, 255);
        &:nth-child(2) {
          color: rgb(255, 156, 86);
        }
      }
    }
  }
}
.min_title {
  height: 50px;
  line-height: 50px;
  // padding-top: 20px;
  width: 230px;
  float: left;
  overflow: hidden;

  h2 {
    font-family: 'PingFangSC-Semibold';
    font-size: 18px;
    margin: 0;
    padding: 0;
    float: left;
    height: 50px;
  }
  .van-tag {
    float: left;
    margin-left: 8px;
    margin-top: 20px;
    width: 32px;
    height: 16px;
    border-radius: 4px;
  }
}
.jz {
  padding: 5px 20px;
  h3 {
    font-weight: normal;
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
  .biaoji {
    float: left;
    .van-tag {
      margin-right: 10px;
      border: none;
      background: rgb(246, 248, 255);
      color: rgb(133, 166, 255);
      font-family: 'PingFangSC-Light';
      border-radius: 2px;
    }
  }
  .xf {
    font-family: 'PingFangSC-Light';
    font-size: 11px;
    color: rgb(51, 51, 51);
    span {
      font-family: 'PingFangSC-Regular';
      font-size: 11px;
      color: rgb(255, 156, 86);
    }
  }
}
.zx {
  padding: 5px 20px;
  h3 {
    margin: 0;
    padding: 5px 0px;
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
    display: inline-block;
    font-weight: normal;
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
  p {
    color: rgb(102,102,102);
    font-size: 12px;
    font-family: 'PingFangSC-Light';
    margin: 0;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .but {
    color: rgb(204,204,204);
    float: left;
  }
  .viue {
    color: rgb(204,204,204);
    float: right;
  }
}
.bk {
  padding: 5px 20px;
  h3 {
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
    font-weight: normal;
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
  .but {
    color: rgb(204,204,204);
    float: right;
  }
}
.zy {
  padding: 5px 20px;
  h3 {
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
    display: inline-block;
    font-weight: normal;
    font-family: 'PingFangSC-Regular';
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
  p {
    font-family: 'PingFangSC-Light';
    font-size: 12px;
    margin: 0;
    padding: 0;
    color: rgb(102, 102, 102);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .van-tag {
    margin-right: 10px;
    border: none;
    background: rgb(246, 248, 255);
    color: rgb(133, 166, 255);
    font-family: 'PingFangSC-Light';
    border-radius: 2px;
  }
  .num_zy {
    font-family: 'PingFangSC-Light';
    font-size: 12px;
    color: rgb(102, 102, 102);
    span {
      font-family: 'PingFangSC-Regular';
      color: rgb(74, 88, 255);
      &:nth-child(2) {
        color: rgb(255, 156, 86);
      }
    }
  }
}
</style>
