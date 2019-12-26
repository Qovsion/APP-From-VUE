<template>
  <div class="centent">
    <!-- 手机认证页面 -->
    <van-nav-bar fixed @click-left="$router.back()" left-arrow>
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="title">
      <h4>手机认证</h4>
    </div>
    <div class="yz">
      <van-field
        v-model="value_phone"
        maxlength="11"
        placeholder="请输入手机号"
        :error-message="PhoneText"
        :right-icon="rightIcon"
        :bind:input="inputChange(value_phone)"
      />

      <van-button class="btn" type="info" @click="tj(value_phone)">获取验证码</van-button>
    </div>
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
      value_phone: '',
      PhoneText: '',
      byzy: 'closed-eye',
      rightIcon: '',
      user: {}
    }
  },
  created () {
    this.user = this.$store.state.user
  },
  methods: {
    inputChange (value) {
      let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
      if (!yz.test(value)) {
        this.rightIcon = ''
        return false
      } else {
        this.rightIcon = 'checked'
      }
    },
    tj (phone) {
      if (!phone) {
        Toast.fail('请填写您的手机号')
      } else {
        let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
        if (!yz.test(phone)) {
          Toast.fail('手机号码有误，重试')
          return false
        } else {
          // 此处调用接口
          // 获取验证码
          const dada = Qs.stringify({
            mobile: this.value_phone
          })
          this.$http({
            method: 'post',
            data: dada,
            url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/getChangeMobileVerifyCode'
          }).then(res => {
            console.log(res.data.data.token)
            // 存入本地储存
            if (res.data.data.token === undefined) {
              Toast.fail('请稍后再试')
            }
            // 存入vuex
            if (res.data.data.token) {
              this.user = this.$store.state.user
              this.user.token = res.data.data.token
              this.$store.commit('setUser', this.user)
              console.log(res.data.data.token)
            }
          })
          // 跳转认证成功页面
          this.$router.push({ path: '/shoujirz', query: { phone: this.value_phone } })
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.yz {
  width: 320px;
  margin: 0 auto;
  .van-field {
    width: 320px;
    height: 48px;
    border-radius: 24px;
    box-shadow: 0px 0px 15px 0px rgba(176,183,231,0.08);
    margin-top: 10px;
  }
}
/deep/ .van-icon-checked:before{
    color: rgb(176,232,135);
}
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.btn {
  width: 320px;
  height: 48px;
  border:none;
  margin: 0 auto;
  border-radius: 24px;
  margin-top: 30px;
  background: rgb(74, 88, 255);
}
.title {
  width: 320px;
  margin: 0 auto;
  h4 {
    margin-top: 90px;
    font-size: 24px;
  }
}
</style>
