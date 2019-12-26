<template>
  <div class="centent">
    <!-- 找回密码/设置密码页面 -->
    <van-nav-bar  left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
</van-nav-bar>

    <div class="title">
      <h4>设置新密码:</h4>
    </div>
    <div class="yz">
      <van-cell-group>

        <van-field
          v-model="value_newpwd"
          label="设置密码"
          maxlength="20"
          type="password"
          :bind:input="inputChange(value_newpwd)"
        />
        <van-field
          v-model="value_endpwd"
          label="确认密码"
          type="password"
          maxlength="20"
          :bind:input="inputChange(value_endpwd)"
        />
      </van-cell-group>
      <van-button class="btn" type="info" @click="tj()">完成</van-button>
    </div>
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
      type: 'password',
      scrollTag: false,
      value_endpwd: '',
      value_newpwd: '',
      false: false
    }
  },
  methods: {
    mmdl () {
      this.$router.push('/login')
    },
    inputChange (value) {
      let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
      if (!yz.test(value)) {
        this.rightIcon = ''
        return false
      } else {
        this.rightIcon = 'checked'
      }
    },
    tj () {
      if (this.value_newpwd !== this.value_endpwd) {
        Toast.fail('密码不一致')
      }
      if (!this.value_newpwd || !this.value_endpwd) {
        Toast.fail('密码不能为空')
      }
      if (this.value_newpwd.length < 6) {
        Toast.fail('密码必须六位数以上')
      }
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      if (!pattern.test(this.value_newpwd)) {
        // return false
      } else {
        Toast.fail('不能使用特殊符号')
      }
      //   调用接口
      this.setPasswordApi()
    },
    setPasswordApi () {
    // 验证注册验证码
      const dada = Qs.stringify({
        password: this.value_newpwd,
        passwords: this.value_endpwd
      })
      this.$https({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/passwordBack'
      }).then(res => {
        console.log(res)
        // this.$store.commit('setUser', res.data.data.token)
        if (res.data.status === 0) {
          this.$notify({ type: 'success', message: '找回密码成功' })
          this.$router.push('/login')
        }
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
    }

  }
}
</script>

<style lang="less" scoped>
/deep/ .van-cell:not(:last-child)::after {
  position: static;
}
/deep/ .van-hairline--top-bottom::after {
  border-width: 0px;
}
/deep/ [class*='van-hairline']::after {
  position: static;
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
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
/deep/ .van-icon-checked:before {
  color: rgb(176, 232, 135);
}
/deep/ .van-grid-item {
  width: 200px;
  margin: 0 auto;
}
.dlfs {
  position: relative;
  margin-top: 30%;
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
