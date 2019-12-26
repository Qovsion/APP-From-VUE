<template>
  <div class="content">
    <van-nav-bar title="学院详情" left-arrow fixed @click-left="back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="xq">
      <h2>{{content.short_title}}</h2>
      <p>
        简章
        <span class="jznum">{{content.jz_num}}篇</span> 学费:
        <span class="qian">{{content.min_money /10000}}万-{{content.max_money / 10000}}万</span>
      </p>
      <div :class="texthide?'text_show':'text_hide'" v-html="content.content"></div>
      <img src="../../../assets/images/mengcneg.png" class="mengceng_show" v-show="!mengceng" />
      <p class="down" @click="gd()">
        {{ textGd}}
        <i class="iconfont" :class="texthide?'iconfxdown':'iconxfup'"></i>
      </p>
    </div>

    <div class="bor"></div>

    <div class="hot_major" v-if="list.length!==0">
      <span class="major left" >招生简章</span>
    </div>
    <div class="zsjz">
      <div class="jz" v-for="(item,i) in list" :key="item.id" @click="jzsx(item.id,i)">
        <div class="min_title">
          <h3>
            {{item.short_title}}
            <!-- <span>{{item.lxname}}</span> -->
          </h3>
          <div class="jt">
            <i class="iconfont iconto"></i>
          </div>
          <!-- 箭头 -->
          <i class="jz_qian">¥<span>{{item.money / 10000}}</span>万</i>
        </div>
        <p>{{item.zyname}}/{{item.length}}/{{item.areas[0]}}</p>
        <div class="sub_title">
          <div class="jindu">
            <span>关注度:</span>
            <van-progress
              :percentage="item.tiao"
              color="#FFC17C"
              :show-pivot="false"
              track-color="#F7FAFF"
            />
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
      list: [],
      content: [],
      mengceng: false,
      texthide: false,
      textGd: '查看更多'

    }
  },
  activated () {
    this.getTrain()
    this.getXyInfo()
  },
  created () {
    this.getTrain()
    this.getXyInfo()
  },
  methods: {
    jzsx (id, i) {
      this.$router.push({ path: `/rulesDel`, query: { rlid: id, lx: this.list[i].major0, zy: this.list[i].zyname, xy: this.content.short_title } })
    },
    gd () {
      this.mengceng = !this.mengceng
      this.texthide = !this.texthide
      if (this.texthide) {
        this.textGd = '收起'
      } else {
        this.textGd = '查看更多'
      }
    },
    //   获取学院详情
    getXyInfo () {
      const dada = Qs.stringify({
        xy: this.$route.query.xy
        // 学校ID 类型 学院 专业 地点
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_xyxq'
      }).then(res => {
        this.content = res.data.data[0]
        console.log(this.content)
      })
    },
    // 获取简章数据
    getTrain () {
      const dada = Qs.stringify({
        school_id: this.$route.params.id,
        xy: this.$route.query.xy
        // 学校ID 类型 学院 专业 地点
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_xyjz'
      }).then(res => {
        res = res.data.data
        this.list = res.list
      })
    },
    back () {
      this.$router.back()
    }
  }

}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.xq {
  width: 335px;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 50px;
  position: relative;

  h2 {
    font-size: 18px;
  }
  p {
    font-size: 12px;
    color: rgb(102, 102, 102);
    .jznum {
      margin-right: 10px;
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
.bor {
  height: 10px;
  background: rgb(247, 250, 255);
}
.zsjz {
  width: 335px;
  margin: 0 auto;
  .jz {
    width: 335px;
    height: 104px;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    margin-top: 10px;
    border-radius: 8px;
    .min_title {
      height: 35px;
      line-height: 35px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: 16px;
        color: #434343;
        padding-left: 15px;
        float: left;
        span {
          color: rgb(124, 201, 130);
          font-size: 12px;
        }
      }
      .jt {
        width: 22px;
        height: 22px;
        border-radius: 22px;
        background: rgb(247, 250, 255);
        right: 10px;
        top: 17px;
        position: absolute;
        .iconto {
          color: rgb(228, 230, 255);
          line-height: 22px;
          text-align: center;
          display: block;
          margin: 0 auto;
        }
      }

      .jz_qian {
        font-size: 12px;
        color: rgb(255, 156, 86);
        font-style: normal;
        position: absolute;
        right: 15px;
        bottom: 5px;
        span{
          font-size: 16px;
        }
      }
    }
    p {
      font-size: 11px;
      color: #c4c4c4;
      margin: 0;
      border: 3px solid #fff;
      padding-left: 12px;
    }

    .sub_title {
      padding-top: 7px;
      height: 20px;
      .jindu {
        height: 50px;
        span {
          font-size: 11px;
          float: right;
          position: absolute;
          left: 15px;
          bottom: 15px;
        }
        /deep/ .van-progress {
          width: 60px;
          position: absolute;
          left: 70px;
          bottom: 20px;
        }
      }

      .van-button {
        width: 90px;
        height: 24px;
        line-height: 24px;
        border-radius: 16px;
        position: absolute;
        bottom: 6px;
        right: 5px;
        color: rgb(177, 187, 255) !important;
        float: right;
      }
    }
  }
}
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
