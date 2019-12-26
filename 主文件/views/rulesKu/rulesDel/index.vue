<template>
  <div class="content">
    <van-nav-bar title="简章详情" left-arrow fixed @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="xq">
      <h2>{{content.title}}</h2>
      <p>
        学制:
        <span class="jznum" style="margin-right:7px">{{content.length}}</span>
        学费:
        <span class="qian" style="margin-right:7px">{{content.money / 10000}}万</span>
        方式:
        <span class="nian">
          {{fs}}
          <i
            class="iconfont icontianjia_min-copy"
            @click="fstc=!fstc,ddtc=false"
            v-show="content.fangshis && content.fangshis.length>1"
          ></i>
        </span>
        地点:
        <span class="nian">
          {{dd}}
          <i
            class="iconfont icontianjia_min-copy"
            @click="ddtc=!ddtc,fstc=false"
            v-show="content.areas && content.areas.length>1"
          ></i>
        </span>
      </p>
      <div class="fstc" v-show="fstc">
        <ul>
          <li v-for="item in content.fangshis" :key="item" @click="dianji(item)">{{item}}</li>
        </ul>
      </div>
      <div class="ddtc" v-show="ddtc">
        <ul>
          <li v-for="item in content.areas" :key="item" @click="ddclick(item)">{{item}}</li>
        </ul>
      </div>
    </div>

    <div class="jj" @click="fstc=false,ddtc=false">{{content.description}}</div>
    <div class="jieshao" v-html="content.content" @click="fstc=false,ddtc=false"></div>
    <van-tabbar v-model="active" active-color="#7d7e80">
      <van-tabbar-item icon="home-o" @click="zanwu()">
        <span>转发分享</span>
        <i slot="icon" class="iconfont iconfenxiang"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="search" @click="telPhone()">
        <span>电话咨询</span>
        <i slot="icon" class="iconfont icondianhua"></i>
      </van-tabbar-item>
      <van-tabbar-item>
        <van-button type="primary" onclick="_MEIQIA('showPanel')">在线咨询</van-button>
      </van-tabbar-item>
      <van-tabbar-item @click="signUp()">
        <van-button type="primary">在线报名</van-button>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Qs from 'qs'
export default {
  data () {
    return {
      active: 0,
      fs: '',
      dd: '',
      ddtc: false,
      fstc: false,
      content: [],
      phone: 4000052125
    }
  },
  activated () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.getRmData()
  },
  created () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.getRmData()
  },
  methods: {
    signUp () {
      console.log(this.$route)
      this.$router.push({ path: '/signUp', query: { scid: this.$route.query.rlid, lx: this.$route.query.lx, zy: this.content.title, xy: this.$route.query.xy } })
    },
    telPhone () {
      window.location.href = 'tel:' + this.phone
    },
    dianji (name) {
      console.log(name)
      this.fs = name
      this.fstc = false
    },
    ddclick (name) {
      console.log(name)
      this.dd = name
      this.ddtc = false
    },
    getRmData () {
      const dada = Qs.stringify({
        id: this.$route.query.rlid
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/jz_xq'
      }).then(res => {
        res = res.data.data
        this.fs = res.fangshis[0]
        this.dd = res.areas[0]
        this.content = res
        console.log(res)
      })
    },
    zanwu () {
      this.$toast('此功能未上线')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.icondianhua {
  font-size: 17px;
}
.iconfenxiang {
  font-size: 16px;
}
.icontianjia_min-copy {
  font-size: 12px;
  background: rgb(216, 216, 216);
  color: #fff;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  width: 12px;
  height: 12px;
  line-height: 12px;
}
.van-tabbar {
  padding: 3px 0px;
  .van-tabbar-item {
    .van-button {
      width: 104px;
      height: 40px;
      margin-right: 5px;
      border-radius: 20px;
      border: none;
      background: linear-gradient(
        to right,
        rgb(255, 126, 78),
        rgb(255, 186, 94)
      );
    }
    &:nth-child(4) {
      .van-button {
        background: linear-gradient(
          to right,
          rgb(74, 88, 255),
          rgb(142, 178, 255)
        );
      }
    }
  }
}
.jieshao {
  width: 335px;
  font-size: 14px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 50px;
  line-height: 24px;
}
.jj {
  width: 315px;
  background: rgb(248, 248, 248);
  font-size: 12px;
  color: rgb(153, 153, 153);
  margin: 0 auto;
  line-height: 24px;
  padding: 10px;
  border-radius: 8px;
}
.nian {
  position: relative;
  padding: 0px 20px 0px 0px;
  .van-icon {
    position: absolute;
    top: 1px;
    width: 12px;
    height: 12px;
    background: rgb(216, 216, 216);
    color: #fff;
    font-weight: 700;
    margin-left: 3px;
  }
}
.xq {
  width: 335px;
  margin: 0 auto;
  padding-bottom: 10px;
  position: relative;
  padding-top: 50px;

  .fstc {
    background: #fff;
    position: absolute;
    left: 150px;
    width: 72px;
    padding: 10px;
    box-shadow: 0px 0px 20px 0px rgba(102, 102, 102, 0.08);
    ul {
      li {
        text-align: center;
        font-size: 12px;
        line-height: 22px;
        color: rgb(102, 102, 102);
      }
    }
  }
  .ddtc {
    background: #fff;
    position: absolute;
    left: 220px;
    width: 72px;
    padding: 10px;
    box-shadow: 0px 0px 20px 0px rgba(102, 102, 102, 0.08);
    ul {
      li {
        text-align: center;
        font-size: 12px;
        line-height: 22px;
        color: rgb(102, 102, 102);
      }
    }
  }
  h2 {
    font-size: 18px;
    display: inline-block;
  }
  /deep/ table {
    width: 90% !important;
  }
  /deep/ .van-tag {
    padding: 3px 8px;
    display: inline-block;
    margin-left: 10px !important;
  }
  p {
    font-size: 12px;
    color: rgb(102, 102, 102);
    .jznum {
      color: rgb(74, 88, 255);
    }
    .qian {
      color: rgb(255, 156, 86);
    }
  }
  .text_hide {
    text-indent: 30px;
    height: 295px;
    font-size: 16px;
    color: rgb(51, 51, 51);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 13;
    overflow: hidden;
  }
  .text_show {
    text-indent: 30px;
    font-size: 16px;
    color: rgb(51, 51, 51);
  }
  .mengceng_show {
    display: block;
    width: 100%;
    height: 80px;
    position: absolute;
    bottom: 50px;
    left: 0px;
  }
  .mengceng_hide {
    overflow: hidden;
  }
  .down {
    text-align: center;
    font-size: 14px;
    color: rgb(95, 115, 255);
  }
}
</style>
