<template>
  <div class="content">
    <van-nav-bar left-arrow @click-left="$router.back()" >
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="title">
      <h4>注册</h4>
    </div>
    <div class="yz">
      <!-- readonly -->
      <van-field
       type="number"
        v-model="value_phone"
        label="手机号："
        maxlength="11"
        placeholder="请输入手机号"
        :error-message="PhoneText"
        :right-icon="rightIcon"
        :bind:input="inputChange(value_phone)"
      />
         <!-- @touchstart.stop="show_phone = true" -->
      <van-checkbox v-model="checked" shape="square">
        我已阅读并同意
        <span class="read" @click.stop="$router.push('/Agreement')">《用户服务协议》</span>和
        <span class="read"  @click.stop="$router.push('/statement')">《信息声明》</span>
      </van-checkbox>
      <van-button class="btn" type="info" @click="tj(value_phone)" :disabled="! checked">获取验证码</van-button>
    </div>
   <p class="bot">已有账户？<span style="color:rgb(74,88,255);font-size:12px" @click="$router.push('/login')">快速登录</span></p>
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
Vue.use(Toast)
export default {
  data () {
    return {
      checked: true,
      value_phone: '',
      PhoneText: '',
      rightIcon: '',
      show_phone: false
    }
  },
  mounted () {
    this.thisFocus()
    setTimeout(() => {
      this.thisFocus()
    }, 0)
  },
  methods: {
    onInput (value) {
      console.log(value)
      this.value_phone = (this.value_phone + value).slice(0, 11)
    },
    onDelete () {
      this.value_phone = this.value_phone.slice(0, this.value_phone.length - 1)
    },
    //   自动获取焦点
    thisFocus () {
      document.getElementsByClassName('van-field__control')[0].focus()
    },
    tj (phone) {
      if (!phone) {
        Toast.fail('请填写您的手机号')
      } else {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
          Toast.fail('手机号码有误，重试')
          return false
        } else {
          this.$router.push({ path: '/PhoneRzYz', query: { phone: phone } })
        }
      }
    },
    inputChange (value) {
      let yz = (/^1(3|4|5|6|7|8|9)\d{9}$/)
      if (!yz.test(value)) {
        this.rightIcon = ''
        return false
      } else {
        this.rightIcon = 'checked'
      }
    }

  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.bot{
  position: absolute;
  width: 300px;
  bottom: 20px;
  color: rgb(153,153,153);
  font-size: 12px;
  text-align: center;
  margin: 0 auto;
  left: 50%;
  margin-left: -150px;
}
/deep/ .van-cell{
  position: static;
}
/deep/ .van-checkbox {
  margin-top: 20px;
}
/deep/ .van-checkbox__icon .van-icon{
  width: 15px;
  height: 15px;
  line-height: 15px;
  margin-top: 1px;
}
/deep/ .van-checkbox__label {
  color: rgb(189, 189, 189);
  font-size: 12px;
}
/deep/ .van-icon-checked:before {
  color: rgb(176, 232, 135);
}
.read {
  color: rgb(125, 135, 255);
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
.title {
  width: 320px;
  margin: 0 auto;
  h4 {
    font-weight: normal;
      font-family: 'PingFangSC-Medium';
    font-size: 24px;
  }
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
