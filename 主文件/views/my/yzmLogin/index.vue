<template>
  <div class="centent">
    <div :class="scrollTag?'nav1':'nav'">
      <span>
        <i slot="right" class="iconfont ri navLeftfont iconguanbi" @click="$router.back()"></i>
      </span>
    </div>
    <div class="title">
      <h4>
        你好
        <br />欢迎来到在研之家
      </h4>
    </div>
    <div class="yz">
        <!-- readonly -->
      <van-field
      type="number"
        :border="false"
        label-align="center"
        v-model="value_phone"
        maxlength="11"
        placeholder="请输入手机号"
        :bind:input="inputChange(value_phone)"
      >
        <span class="numphone" slot="label">+86   <i>I</i></span>
        <!-- @touchstart.stop="show_phone = true,show_key = false" -->
        <!-- :error-message="PhoneText" -->
        <i slot="right-icon" class="iconfont" :class="rightIcon"></i>
      </van-field>
      <van-cell-group>
        <van-field
          type="number"
          :border="false"
          label-align="center"
          v-model="value_pwd"
          placeholder="请输入验证码"
          label="验证码："
          maxlength="6"
          @click-right-icon="qkxm(value_pwd)"
        >
          <!-- @touchstart.stop="show_key = true, show_phone = false" -->
          <van-button
            slot="button"
            class="riz"
            size="small"
            ref="yzm"
            type="primary"
            :disabled="yznmjy"
            @click="yzmyz()"
          >获取验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button
        class="btn"
        :disabled="isdisabled"
        type="info"
        @click="tj(value_phone,value_pwd)"
      >登录</van-button>
    </div>
    <p class="kszc" @click="$router.push('/register')">快速注册</p>
    <div class="dlfs">
      <van-divider contentPosition="center" class="fgx">其他登录方式</van-divider>
      <van-grid :border="false">
        <van-grid-item use-slot @click="mmdl()">
          <img src="../../../assets/images/mimadl.png" alt />
          <span>密码登录</span>
        </van-grid-item>
        <van-grid-item use-slot text="验证码登录" @click="zanwu()">
          <img src="../../../assets/images/wxdl.png" alt />
          <span>微信登录</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-number-keyboard
      :show="show_key"
      extra-key="."
      close-button-text="完成"
      @blur="show_key = false"
      @input="onInput"
      @delete="onDelete"
    />
    <van-number-keyboard
      :show="show_phone"
      extra-key="."
      close-button-text="完成"
      @blur="show_phone = false"
      @input="onInput_phone"
      @delete="onDelete_phone"
    />
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
      isdisabled: true,
      yznmjy: false,
      type: 'password',
      scrollTag: false,
      value_phone: '',
      value_pwd: '',
      false: false,
      PhoneText: '',
      byzy: 'closed-eye',
      rightIcon: '',
      flag: false,
      show_key: false,
      show_phone: false,
      user: []

    }
  },
  created () {

  },
  methods: {
    onInput (value) {
      console.log(value)
      this.value_pwd = (this.value_pwd + value).slice(0, 6)
    },
    onDelete () {
      this.value_pwd = this.value_pwd.slice(0, this.value_pwd.length - 1)
    },
    onInput_phone (value) {
      console.log(value)
      this.value_phone = (this.value_phone + value).slice(0, 11)
    },
    onDelete_phone () {
      this.value_phone = this.value_phone.slice(0, this.value_phone.length - 1)
    },
    mmdl () {
      this.$router.push('/login')
    },
    yzmyz () {
      // 验证码倒计时
      // 判断 第一次执行不调用 第二次执行调用
      console.log(this.flag)

      if (this.flag === false) {
        this.yzmjk()
      }
      this.yznmjy = true
      this.isdisabled = false
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
    yzmjk () {
      // 获取验证码
      const dada = Qs.stringify({
        mobile: this.value_phone
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getRegisterVerifyCode'
      }).then(res => {
        console.log(res.data.data.token)
        // 存入本地储存
        if (res.data.data.token === undefined) {
          Toast.fail('请稍后再试')
        }
        // 存入vuex
        if (res.data.data.token) {
          this.$store.commit('setUser', res.data.data.token)
        }
      })
    },
    inputChange (value) {
      let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
      if (!yz.test(value)) {
        this.rightIcon = ''
        return false
      } else {
        this.rightIcon = 'iconzhengque'
      }
    },
    getInfo (userPush) {
      this.$https({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getInfo'
      }).then(res => {
        this.users = res.data.data
        console.log(res)
        // 回退回来 不执行
        console.log(this.$store.state.user)
        this.$store.commit('setUser', this.users)
        this.$router.push(userPush)
        // 从新进入页面 首先users=res 发至vuex本地储存 user从本地储存获取
        this.user = this.$store.state.user
        console.log(this.user)
      })
    },
    tj (phone, pwd) {
      if (!pwd || !phone) {
        Toast.fail('请填写您的手机号或密码')
      } else {
        let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
        if (!yz.test(phone)) {
          Toast.fail('手机号码有误，重试')
          return false
        } else {
          // 此处调用接口判断账号密码正确错误
          // 验证注册验证码
          const dada = Qs.stringify({
            code: this.value_pwd
          })
          this.$https({
            method: 'post',
            data: dada,
            url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/checkRegisterVerifyCode'
          }).then(res => {
            console.log(res)
            if (res.data.status === 1004) {
              Toast.success('登录成功')
              this.$store.commit('setUser', res.data.data.token)
              console.log(this.$route.query.redirect + '?id=' + this.$route.query.id + '&catid=' + this.$route.query.catid)
              if (this.$route.query.id || this.$route.query.catid) {
                const user = this.$route.query.redirect + '?id=' + this.$route.query.id + '&catid=' + this.$route.query.catid || '/user/loginIndex'
                console.log(user)
                this.getInfo(user)
              } else {
                const user = this.$route.query.redirect || '/user/loginIndex'
                this.getInfo(user)
              }
              console.log(this.$store.state.user)
            }
            if (res.data.status === 1003) {
              Toast.fail('验证码错误')
            }
            if (res.data.status === 999) {
              Toast.fail('验证码无效')
            }
          })
        }
      }
    },
    zanwu () {
      this.$toast('此功能未上线')
    }

  }
}
</script>

<style lang="less" scoped>
.van-field__label--center{
  text-align: left;
  width: 30px;
}
/deep/ .van-field__label{
  width: 70px;
}
.numphone{

  i{
    font-style: normal;
    margin-left: 15px;
  }
}
.yz {
  width: 320px;
  margin: 0 auto;
  .van-field {
    width: 320px;
    height: 48px;
    border-radius: 24px;
    box-shadow: 0px 0px 15px 0px rgba(176, 183, 231, 0.08);
    margin-top: 10px;
  }
}
/deep/ .van-hairline--top-bottom {
  position: static;
}
/deep/ .van-cell {
  position: static;
}
.iconzhengque {
  color: rgb(176, 232, 135);
  font-size: 14px;
}
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.van-button--primary {
  background: #fff;
  border: none;
  color: rgb(74, 88, 255);
}

/deep/ .van-icon-checked:before {
  color: rgb(176, 232, 135);
}
/deep/ .van-grid-item {
  width: 200px;
  margin: 0 auto;
}

.dlfs {
  height: 150px;
  margin-top: 80px;
  img {
    width: 32px;
    height: 32px;
  }
  span {
    font-size: 14px;
    color: rgb(102, 102, 102);
    padding-top: 10px;
  }
}
.van-cell {
  color: rgb(204, 204, 204);
}
.title {
  width: 320px;
  margin: 0 auto;
  h4 {
    font-weight: normal;
    font-family: 'PingFangSC-Medium';
    font-size: 24px;
  }
}
.kszc {
  width: 320px;
  text-align: center;
  padding-top: 20px;
  margin: 0 auto;
  font-size: 14px;
  color: rgb(255, 176, 71);
}
.btn {
  width: 320px;
  height: 48px;
  margin: 0 auto;
  border-radius: 24px;
  margin-top: 30px;
  background: rgb(74, 88, 255);
  border: none;
}
.nav {
  width: 375px;
  height: 50px;
  z-index: 30;
  //   background-color: rgba(255, 255, 255, 0);
  //   color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  i {
    // width: 375px;
    height: 44px;
    // display: block;
    position: relative;
    left: 85%;
    transform: translateX(-10%);
  }
  .van-icon {
    float: left;
    padding: 15px 0px 13px 20px;
  }
}
</style>
