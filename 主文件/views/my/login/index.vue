<template>
  <div class="centent">
    <div :class="scrollTag?'nav1':'nav'">
      <span>
        <i class="iconfont navLeftfont iconguanbi" @click="$router.back()" />
      </span>
    </div>
    <div class="title">
      <h4>
        你好
        <br />欢迎来到在研之家
      </h4>
    </div>
    <div class="yz">
      <van-field
        type="number"
        label-align="center"
        v-model="value_phone"
        label="手机号"
        maxlength="11"
        placeholder="请输入手机号"
      />
        <!-- :error-message="PhoneText" -->
        <!-- @touchstart.stop="show_phone = true" -->
      <van-cell-group>
        <van-field
          v-model="value_pwd"
          label-align="center"
          placeholder="请输入密码"
          label="密码  "
          maxlength="10"
          type="password"
          :right-icon="byzy"
          @click-right-icon="qkxm(value_pwd)"
        />
      </van-cell-group>
      <van-button class="btn" type="info" @click="tj(value_phone,value_pwd)">登录</van-button>
    </div>
    <p class="wjmm" @click="Retrieve()">忘记密码</p>
    <div class="dlfs">
      <van-divider contentPosition="center" class="fgx">其他登录方式</van-divider>
      <van-grid :border="false">
        <van-grid-item use-slot text="验证码登录" @click="yzmdl()">
          <img src="../../../assets/images/yzmdl.png" alt />
          <span>验证码登录</span>
        </van-grid-item>
        <van-grid-item use-slot text="微信登录" @click="zanwu()">
          <img src="../../../assets/images/wxdl.png" alt />
          <span>微信登录</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-number-keyboard
      :show="show_phone"
      extra-key="."
      close-button-text="完成"
      @blur="show_phone = false"
      @input="onInput"
      @delete="onDelete"
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
      type: 'password',
      scrollTag: false,
      value_phone: '',
      value_pwd: '',
      false: false,
      // PhoneText: '',
      byzy: 'closed-eye',
      show_phone: false

    }
  },
  mounted () {

  },
  methods: {
    // onInput (value) {
    //   this.value_phone = (this.value_phone + value).slice(0, 11)
    // },
    // onDelete () {
    //   this.value_phone = this.value_phone.slice(0, this.value_phone.length - 1)
    // },
    Retrieve () {
      this.$router.push('/Retrieve')
    },
    yzmdl () {
      this.$router.push('/yzmLogin')
    },
    tj (phone, pwd) {
      if (!pwd || !phone) {
        Toast.fail('请填写您的手机号或密码')
      } else {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
          Toast.fail('手机号码有误，重试')
          return false
        } else {
          // 此处调用接口判断账号密码正确错误
          this.loginData()
        }
      }
    },
    loginData () {
      // 密码登陆
      const dada = Qs.stringify({
        username: this.value_phone,
        password: this.value_pwd
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/login'
      }).then(res => {
        console.log(res.data.status)
        this.$store.commit('setUser', res.data.data)
        if (res.data.status === 0) {
          Toast.success(res.data.message)
          this.$router.push('/user/loginIndex')
        } else {
          Toast.fail('账号或者密码错误')
        }
        // this.$router.push('/login')
      })
    },
    qkxm (value) {
      console.log(value)
      if (this.type === 'password') {
        this.byzy = 'eye-o'
        this.type = 'text'
      }
      window.setTimeout(() => {
        if (this.type === 'text') {
          console.log(1)
          this.byzy = 'closed-eye'
          this.type = 'password'
        }
      }, 5000)
    },
    zanwu () {
      this.$toast('此功能未上线')
    }
  }
}
</script>

<style lang="less" scoped>
.html,body{
  overflow: hidden;
  height: 100%;
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
/deep/ .van-hairline--top-bottom{
  position: static;
}
// 文字居中
/deep/ .van-field__label--center {
  width: 50px;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines; // 兼容ie浏览器
}
/deep/ .van-cell {
  position: static;
}
/deep/.van-field__control {
  padding-left: 10px;
}
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
.wjmm {
  width: 320px;
  text-align: center;
  padding-top: 20px;
  margin: 0 auto;
  font-size: 14px;
  color: rgb(74, 88, 255);
}
.btn {
  width: 320px;
  height: 48px;
  margin: 0 auto;
  border-radius: 24px;
  margin-top: 30px;
  border: none;
  background: rgb(74, 88, 255);
}
.nav {
  width: 375px;
  height: 50px;
  z-index: 30;
  font-weight: 600;
  line-height: 50px;
  font-size: 18px;
  span {
    height: 44px;
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
