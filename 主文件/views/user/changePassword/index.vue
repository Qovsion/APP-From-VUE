<template>
  <div class="centent">
    <div :class="scrollTag?'nav1':'nav'">
      <span>
        <i class="iconfont le navLeftfont iconguanbi"  @click="$router.back()"></i>
      </span>
    </div>
    <div class="title">
      <h4>修改密码:</h4>
    </div>
    <div class="yz">
      <van-cell-group>
        <van-field
          v-model="value_pwd"
          placeholder="请输入原始密码"
          label="原始密码"
          maxlength="20"
          :type="type"
          :right-icon="byzy"
          @click-right-icon="qkxm(value_pwd)"
        />
        <van-field
          v-model="value_newpwd"
          label="新密码"
          placeholder="请输入新密码"
          maxlength="20"
          type="password"
          :bind:input="inputChange(value_newpwd)"
        />
        <van-field
          v-model="value_endpwd"
          label="确认密码"
          placeholder="确认密码"
          type="password"
          maxlength="20"
          :bind:input="inputChange(value_endpwd)"
        />
      </van-cell-group>
      <van-button class="btn" type="info" @click="tj()">保存</van-button>
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
      type: 'password',
      scrollTag: false,
      value_newpwd: '',
      value_endpwd: '',
      value_pwd: '',
      false: false,
      PhoneText: '',
      byzy: 'closed-eye',
      rightIcon: ''

    }
  },
  created () {
  },
  methods: {
    changePassword () {
      const dada = Qs.stringify({
        ypassword: this.value_pwd,
        password: this.value_newpwd,
        passwords: this.value_endpwd
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/changePassword',
        data: dada
      }).then(res => {
        console.log(res)
        if (res.data.status === 1007) {
          Toast.fail('原密码错误')
        }
        if (res.data.status === 0) {
          this.$store.commit('delUser')
          this.value_newpwd = ''
          this.value_endpwd = ''
          this.value_pwd = ''
          this.$notify({ type: 'danger', message: '检测到您更换密码,请重新登录' })
          this.$router.push('/login')
        }
      })
    },
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
      if (this.value_newpwd.length < 6) {
        Toast.fail('密码必须六位数以上')
        return false
      }
      if (!this.value_newpwd || !this.value_endpwd) {
        Toast.fail('密码不能为空')
        return false
      }
      if (this.value_newpwd !== this.value_endpwd) {
        Toast.fail('输入密码不一致')
        return false
      }
      if (this.value_pwd === this.value_endpwd) {
        console.log(this.value_newpwd, this.value_endpwd)
        Toast.fail('与原始密码一致,请重新输入')
        return false
      }

      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      if (!pattern.test(this.value_newpwd)) {
      } else {
        Toast.fail('密码内不能使用特殊符号')
        return false
      }
      //   调用接口
      this.changePassword()
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
/deep/ [class*=van-hairline]::after {
  position: static;
}
/deep/ .van-hairline--top-bottom::after{
  border-width: 0px;
}
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
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
    font-family: 'PingFangSC-Medium';
    font-weight: normal;
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
  border:none;
  border-radius: 24px;
  margin-top: 30px;
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
