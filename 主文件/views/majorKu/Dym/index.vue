<template>
  <div class="content">
    <van-nav-bar title="专业详情" left-arrow fixed @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="xq">
      <div class="xq_content">
        <h2>
          {{content.short_title.length>10?content.short_title.slice(0,10)+"...":content.short_title}}
          <van-tag
            round
            color="#7CC982"
            text-color="#fff"
            v-if="content.lxname=='同等学力'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#70A5FF"
            text-color="#fff"
            v-if="content.lxname=='专业硕士'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#FF7977"
            text-color="#fff"
            v-if="content.lxname=='国际硕士'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#FF9C4D"
            text-color="#fff"
            v-if="content.lxname=='中外合办'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#878DC1"
            text-color="#fff"
            v-if="content.lxname=='在职博士'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#4C6E99"
            text-color="#fff"
            v-if="content.lxname=='国际博士'"
          >{{content.lxname}}</van-tag>
          <van-tag
            round
            color="#A8BA9A"
            text-color="#fff"
            v-if="content.lxname=='高级研修'"
          >{{content.lxname}}</van-tag>
        </h2>
        <p>
          <i>
            简章:
            <span class="jznum">{{content.jz_num}}篇</span>
          </i>
          <i>
            学费:
            <span class="qian">{{content.min_money/10000}}万-{{content.max_money/10000}}万</span>
          </i>
          <i>
            院校:
            <span class="nian">2所</span>
          </i>
        </p>
      </div>
      <div :class="texthide?'text_show':'text_hide'" v-html="wz.content"></div>
      <img src="../../../assets/images/mengcneg.png" class="mengceng_show" v-show="!mengceng" />
      <p class="down" @click="gd()">
        {{ textGd}}
        <i class="iconfont" :class="texthide?'iconfxdown':'iconxfup'"></i>
      </p>
    </div>
    <div class="bor"></div>
    <!-- 提交专业意向 -->
    <div class="tjzy">
      <h2>提交专业意向</h2>
      <van-cell-group>
        <van-field
          v-model="value_name"
          placeholder="请输入姓名"
          label="姓名:"
          maxlength="6"
        />
        <van-field
          v-model="value_phone"
          label="手机号"
          maxlength="11"
          placeholder="请输入手机号"
          :error-message="PhoneText"
        />
        <!-- <van-field v-model="yzm" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button
            slot="button"
            class="riz"
            size="small"
            ref="yzm"
            :disabled="yznmjy"
            type="primary"
            @click="yzmyz()"
          >获取验证码</van-button>
        </van-field>-->
      </van-cell-group>
      <van-button class="btn" type="info" @click="tj(value_name,value_phone,yzm)">提交</van-button>
    </div>
    <div class="bor" style="margin-top:30px;"></div>
    <div class="hot_major" v-if="this.Article.length !== 0">
      <span class="major left">在线问答</span>
      <span class="gd right" @click="tanchuang()">
        <i slot="icon" class="iconfont icontiwen"></i>
        我要提问
      </span>
    </div>
    <!-- 问答 -->
    <div class="zxwd">
      <div class="wd" v-for="item in Article" :key="item.id">
        <div class="wd_no">
          <span class="wn">问</span>
          <span class="wt">{{item.title}}</span>
        </div>
        <div class="wd_no">
          <span class="da">答</span>
          <span class="wt_da">{{item.description}}</span>
        </div>
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
  </div>
</template>

<script>
import { Toast } from 'vant'
import Vue from 'vue'
import Qs from 'qs'
Vue.use(Toast)
export default {
  data () {
    return {
      value: '',
      school_id: 2,
      inputCode: false,
      list: [],
      content: [],
      isPopup: false,
      mengceng: false,
      texthide: false,
      yznmjy: false,
      textGd: '查看更多',
      value_name: '',
      value_phone: '',
      yzm: '',
      PhoneText: '',
      Article: [],
      wz: []
    }
  },
  created () {
    this.school_id = 4
    this.getTrain()
    this.getXyInfo()
    this.getWd()
    this.getWz()
  },
  methods: {

    tj (name, phone, yzm) {
      if (!name) {
        Toast.fail('请填写您的名字')
      }
      if (!phone) {
        Toast.fail('请填写您的手机号')
      } else {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
          Toast.fail('手机号码有误，请重填')
          return false
        }
        this.yzqq()
      }
      // if (!yzm) {
      //   Toast.fail('请填写验证码')
      // }
    },
    // 提问弹窗
    tanchuang () {
      this.isPopup = !this.isPopup
      setTimeout(() => {
        this.inputCode = true
      })
    },
    sub () {
      if (this.value.length < 6) {
        Toast.fail('输入小于6个字符')
      } else {
        this.from_wd()
      }
    },
    yzmyz () {
      this.yznmjy = true
      var i = 59
      this.$refs.yzm.innerHTML = `<span>(${i}秒后重新获取)<span>`
      var obj = setInterval(() => {
        i--
        this.$refs.yzm.innerHTML = `<span>(${i}秒后重新获取)<span>`
        if (i <= 0) {
          clearInterval(obj)
          this.$refs.yzm.innerHTML = `<span>获取验证码<span>`
          this.yznmjy = false
        }
      }, 1000)
    },
    // 问答提交
    from_wd () {
      const dada = Qs.stringify({
        zy: this.content.major3,
        xx: this.content.id,
        lx: this.content.major0,
        bt: this.value
        // 专业 学校 类型 标题
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/form_zyyx'
      }).then(res => {
        Toast.fail('提交成功')
        this.isPopup = false
      })
    },
    yzqq () {
      const dada = Qs.stringify({
        name: this.value_name,
        dh: this.value_phone,
        zyid: this.$route.query.prid
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/form_zyyx'
      }).then(res => {
        Toast.success('提交成功')
      })
    },
    qkxm (value) {
      this.value_name = ''
    },
    guanbi () {
      this.isPopup = false
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
        id: this.$route.params.id
        // id: this.$route.query.prid
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_info'
      }).then(res => {
        this.content = res.data.data.data
      })
    },
    getWz () {
      const dada = Qs.stringify({
        id: this.$route.params.id
        // id: this.$route.query.prid
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zy_js'
      }).then(res => {
        this.wz = res.data.data
      })
    },
    // 获取简章数据
    getTrain () {
      const dada = Qs.stringify({
        school_id: 2,
        xy: 10
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
    // 问答  接口调用文章列表的问答
    getWd () {
      const dada = Qs.stringify({
        major3: this.$route.query.major3,
        catid: 54
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/wz',
        data: dada
      })
        .then((res) => {
          this.Article = res.data.data.splice(0, 3)
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
}

.tjzy {
  width: 335px;
  margin: 0 auto;
  .van-field {
    width: 320px;
    height: 48px;
    border-radius: 24px;
    box-shadow: 0px 0px 15px 0px rgba(176, 183, 231, 0.08);
    margin-top: 10px;
  }
  h2 {
    color: rgb(51, 51, 51);
    font-size: 20px;
    font-weight: bold;
    font-family: 'PingFangSC-Medium';
    font-size: 20px;
  }
  .van-button.btn {
    background: rgb(74, 88, 255);
    border: none;
    margin: 0 auto;
    width: 320px;
    height: 44px;
    color: #fff;
    border-radius: 22px;
    margin-top: 10px;
  }
}
.van-button--primary {
  background: #fff;
  border: none;
  color: rgb(74, 88, 255);
}
.xq {
  width: 335px;
  margin: 0 auto;
  padding-bottom: 10px;
  position: relative;
  .xq_content {
    width: 295px;
    height: 50px;
    margin: 70px auto 20px auto;
    padding: 20px;
    position: relative;
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
    border-radius: 8px;

    h2 {
      padding: 0;
      margin: 0;
      position: relative;
      font-size: 20px;
      font-weight: bold;
      font-family: 'PingFangSC-Medium';
      /deep/ .van-tag {
        position: absolute;
        width: 52px;
        top: 4px;
        text-align: center;
        font-size: 12px;
        display: inline-block;
        margin-left: 10px !important;
      }
    }

    p {
      i {
        font-style: normal;
        padding-right: 15px;
      }
      font-size: 12px;
      color: rgb(102, 102, 102);
      .jznum {
        color: rgb(74, 88, 255);
      }
      .qian {
        color: rgb(255, 156, 86);
      }
    }
  }
  .text_hide {
    font-family: 'PingFangSC-Light';
    height: 286px;
    font-size: 16px;
    color: rgb(51, 51, 51);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 13;
    overflow: hidden;
  }
  .text_show {
    font-family: 'PingFangSC-Light';
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
        // background: rgb(247,250,255);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        right: 10px;
        line-height: 25px;
        .van-icon {
          line-height: 20px;
          text-align: right;
          font-size: 18px;
          color: #e4e6ff;
        }
      }

      i {
        font-size: 11px;
        color: rgb(255, 156, 86);
        // float: left;
        font-style: normal;
        // padding-left: 15px;
        position: absolute;
        right: 15px;
        bottom: 5px;
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
  width: 335px;
  height: 30px;
  padding: 0px 0px 10px 10px;
  position: relative;
  overflow: hidden;
  .major {
    font-family: 'PingFangSC-Medium';
    position: relative;
    font-size: 20px;
    font-weight: 600;
    .major_box {
      width: 104px;
      height: 56px;
      border-radius: 4px;
      position: relative;
      float: left;
    }
  }

  .gd {
    width: 80px;
    height: 30px;
    position: absolute;
    top: 40%;
    right: 0px;
    font-size: 14px;
    text-align: right;
    color: rgb(255, 176, 71);
    vertical-align: middle;
    i {
      font-size: 10px;
      position: relative;
      margin-top: -12px;
    }
  }
}
// 在线问答
.zxwd {
  width: 335px;
  margin: 0 auto;
  margin-left: 20px;
  position: relative;
  .wd {
    border-bottom: 2px solid #f8f8f8;
    padding: 0px 0px 5px 0px;
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
        padding: 2px 0px;
        display: inline-block;
        margin-top: 2px;
        width: 16px;
        height: 16px;
        color: #fff;
        background: rgb(74, 88, 255);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
      .wt {
        width: 300px;
        display: block;
        color: rgb(51, 51, 51);
        font-size: 14px;
        padding-left: 5px;
        line-height: 25px;
      }

      .wt_da {
        padding-left: 5px;
        font-size: 12px;
        color: rgb(51, 51, 51);
        line-height: 25px;
      }
      .da {
        padding: 2px;
        display: inline-block;
        width: 16px;
        height: 16px;
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
      overflow: hidden;
      .wn {
        padding: 2px 0px;
        margin-top: 2px;
        width: 16px;
        height: 16px;
        color: #fff;
        background: rgb(74, 88, 255);
        font-size: 12px;
        text-align: center;
        border-radius: 4px;
      }
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
      }
      .da {
        padding: 2px;
        color: #fff;
        float: left;
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
.van-cell:not(:last-child)::after{
  position: static;
}
.van-cell {
  position: static;
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
      font-size: 16px;
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
