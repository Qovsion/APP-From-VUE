<template>
  <div class="content">
    <van-nav-bar title="对比详情" fixed left-arrow @click-left="$router.back()">
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

    <div class="tab">
      <div class="tab_n1">
        <div class="tab_title">
          <div class="le">
            <img :src="'https://www.125yan.com/Uploads/'+content.one.s_thumb" alt />
            <h4>{{content.one.s_title.slice(0,6)}}</h4>
          </div>
          <div class="vs">
            <i class="iconfont iconVS"></i>
          </div>
          <div class="ri">
            <img :src="'https://www.125yan.com/Uploads/'+content.two.s_thumb" alt />
            <h4>{{content.two.s_title.slice(0,6)}}</h4>
          </div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.m_title}}</div>
          <div class="vs">方向</div>
          <div class="le">{{content.two.m_title}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.lxname}}</div>
          <div class="vs">类型</div>
          <div class="le">{{content.two.lxname}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.short_title}}</div>
          <div class="vs">专业</div>
          <div class="le">{{content.two.short_title}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.length}}</div>
          <div class="vs">学制</div>
          <div class="le">{{content.two.length}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.money /10000}}万</div>
          <div class="vs">学费</div>
          <div class="le">{{content.two.money /10000}}万</div>
        </div>
        <div class="tab_mintitle">
          <div class="le">
            {{content.one.zhengshus[0]}}
            {{content.one.zhengshus[1]}}
          </div>
          <div class="vs">所获证书</div>
          <div class="le">
            {{content.two.zhengshus[0]}}
            {{content.two.zhengshus[1]}}
          </div>
        </div>
        <div class="tab_mintitle">
          <div class="le">
            {{content.one.bktjs[0]}}
            {{content.one.bktjs[1]}}
            {{content.one.bktjs[2]}}
          </div>
          <div class="vs" style="line-height: 100px;">报考条件</div>
          <div class="le">
            {{content.two.bktjs[0]}}
            {{content.two.bktjs[1]}}
            {{content.two.bktjs[2]}}
          </div>
        </div>
        <div class="tab_mintitle">
          <div class="le">
            {{content.one.fangshis[0]}}
            {{content.one.fangshis[1]}}
          </div>
          <div class="vs">上课方式</div>
          <div class="le">
            {{content.two.fangshis[0]}}
            {{content.two.fangshis[1]}}
          </div>
        </div>
        <div class="tab_mintitle">
          <div class="le">{{content.one.areas[0]}}</div>
          <div class="vs">上课地点</div>
          <div class="le">{{content.two.areas[0]}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le youshi">{{content.one.youshi}}</div>
          <div class="vs" style="line-height: 100px;">优势</div>
          <div class="le youshi">{{content.two.youshi}}</div>
        </div>
        <div class="tab_mintitle">
          <div class="le" @click="btn(1)">
            <span class="phone">400-0052-125</span>
            <van-button round type="info" class="btn">在线报名</van-button>
          </div>
          <div class="vs">联系方式</div>
          <div class="le" @click="btn(2)">
            <span class="phone">400-0052-125</span>
            <van-button round type="info" class="btn">在线报名</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      content: []
    }
  },
  created () {
    this.Contrast()
  },
  methods: {
    btn (i) {
      if (i === 1) {
        this.$router.push({ path: '/signUp', query: { lx: this.content.one.major0, xy: this.content.one.s_title, zy: this.content.one.short_title } })
      }
      if (i === 2) {
        this.$router.push({ path: '/signUp', query: { lx: this.content.two.major0, xy: this.content.two.s_title, zy: this.content.two.short_title } })
      }
    },
    Contrast () {
      const dada = Qs.stringify({
        id: this.$route.query.id
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/db_xq'
      }).then(res => {
        this.content = res.data.data
        console.log(this.content)
      })
    }

  }
}
</script>

<style lang="less" scoped>
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
.tab {
  display: flex;
  .tab_n1 {
    width: 355px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .tab_title {
    flex: 0.33;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    position: relative;
    border-bottom: 2px solid rgb(78, 93, 255);
    .le {
      margin-right: 20px;
      img {
        width: 24px;
        height: 24px;
      }
      h4 {
        font-family: 'PingFangSC-Medium';
        margin: 0;
        padding: 0;
        width: 100px;
        line-height: 24px;
        vertical-align: middle;
        height: 28px;
        display: inline-block;
        padding-left: 5px;
        color: rgb(51, 51, 51);
        font-size: 16px;
      }
    }
    .ri {
      margin-left: 20px;
      img {
        width: 24px;
        height: 24px;
      }
      h4 {
        font-family: 'PingFangSC-Medium';
        margin: 0;
        padding: 0;
        width: 100px;
        line-height: 24px;
        vertical-align: middle;
        height: 28px;
        display: inline-block;
        padding-left: 5px;
        color: rgb(51, 51, 51);
        font-size: 16px;
      }
    }
    .vs {
      position: absolute;
      width: 72px;
      border-bottom: 2px solid rgb(255, 176, 71);
      .iconVS {
        font-size: 28px;
        color: rgb(255, 234, 212);
      }
    }
  }
  .tab_mintitle {
    line-height: 30px;
    // height: 45px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    border-bottom: 1px solid rgb(244, 248, 255);
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    .vs {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 72px;
      background: rgb(247, 250, 255);
      border-bottom: 1px solid rgb(247, 250, 255);
    }
    .le {
      color: rgb(51, 51, 51) !important;

      width: 110px;
      padding: 5px 5px;
    }
    .youshi {
      font-size: 12px;
      color: rgb(51, 51, 51);
      line-height: 20px;
    }
    .phone {
      color: rgb(255, 133, 79);
      font-family: 'PingFangSC-Medium';
      font-size: 12px;
    }
    .btn {
      width: 104px;
      height: 32px;
      line-height: 32px;
      border: none;
      background: linear-gradient(
        to right,
        rgb(74, 88, 255),
        rgb(142, 178, 255)
      ) !important;
    }
  }
}
</style>
