<template>
  <div class="content">
    <van-nav-bar fixed @click-left="$router.back()" left-arrow>
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="con">
      <h4>发送验证码至:</h4>
      <div class="yzm">
        <span class="phone">{{this.$route.query.phone}}</span>
          <van-button
            slot="button"
            class="riz"
            size="small"
            ref="yzm"
            :disabled="yznmjy"
            type="primary"
            @click="yzmyz()"
          >获取验证码</van-button>
      </div>
    </div>
    <div class="yzmsr">
      <div class="yzm_nn">
        <van-password-input
          :value="value"
          :mask="false"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          gutter="10px"
          length="4"
        />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
    <van-button class="btntj" type="info" @click="tj()">提交</van-button>
     <p class="bot">已有账户？<span style="color:rgb(74,88,255);font-size:12px" @click="$router.push('/yzmlogin')">快速登录</span></p>
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
      code: '',
      yznmjy: false,
      value: '',
      showKeyboard: true,
      flag: false
    }
  },
  mounted () {
    this.yzmyz()
    this.yzmjk()
  },
  methods: {
    yzmjk () {
    // 获取手机验证码
      const dada = Qs.stringify({
        mobile: this.$route.query.phone
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getPasswordBackVerifyCode'
      }).then(res => {
        console.log(res.data.data.token)
        if (res.data.data.token) {
          this.$store.commit('setUser', res.data.data.token)
        }
      })
    },
    tj () {
    // 验证注册验证码
      const dada = Qs.stringify({
        code: this.value
      })
      this.$https({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/checkPasswordBackVerifyCode'
      }).then(res => {
        console.log(res.data)

        if (res.data.status === 0) {
          this.$store.commit('setUser', res.data.data.token)
          // Toast.success('认证成功')
          // 跳转设置新密码页面
          this.$router.push('/RetrievePassword')
        }
      })
    },
    yzmyz () {
      // 判断 第一次执行不调用 第二次执行调用
      console.log(this.flag)
      if (this.flag === true) {
        this.yzmjk()
        console.log(1)
      }
      if (this.flag === false) {
        this.flag = true
        console.log(2)
      }
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
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    }
  }

}
</script>

<style lang="less" scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.bot{
position: relative;
  top: 200px;
  width: 8rem;
  color: #999999;
  font-size: 0.32rem;
  text-align: center;
  margin: 0 auto;

}
.content {
  width: 335px;
  margin: 0 auto;
}
.yzmsr {
  .sr{
    font-style: normal;
    display: block;
    width: 120px;
     font-size: 16px;
     color: rgb(153, 153, 153);
     margin: 10px 0px;
  }
  .yzm_nn{
    width: 335px;
  }
}
/deep/ .van-password-input__security{
  li{
    border-bottom: 1px solid #666;
  }
}
.yzm {
  height: 30px;
  .phone {
    font-family: 'PingFangSC-Regular';
    color: rgb(153, 153, 153);
    font-size: 16px;
    float: left;
    height: 40px;
    line-height: 40px;
  }
  .van-button--primary {
    background: #fff;
    border: none;
    color: rgb(74, 88, 255);
  }
  /deep/ .van-button {
    color: rgb(74, 88, 255);
    float: right;
    margin-top: 6px;
  }
}
.btntj{
  width: 335px;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  border:none;
  background: rgb(74, 88, 255);
    float: right;
    margin-top: 20px;
}
.con{
  h4{
    font-family: 'PingFangSC-Medium';
    font-weight: normal;
    font-size: 24px;
    padding: 0;
    margin: 112px 0px 20px 0px;
  }
}
.tjzy {
  width: 335px;
  margin: 0 auto;
  h2 {
    font-size: 20px;
  }
}
</style>
