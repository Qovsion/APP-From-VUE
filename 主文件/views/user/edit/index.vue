<template>
  <div class="centent" >
    <van-nav-bar
      title="编辑资料"
      fixed
      @click-left="$router.push({path:'/user/loginIndex',query:'e'})"
      left-arrow
    >
    <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>

    <div class="nr">
      <van-cell title="头像" is-link icon="location-o" @click="$refs.uploadsrc.click()">
        <van-image
          round
          fit="cover"
          width="1rem"
          height="1rem"
          :src="'https://www.125yan.com/'+user.faceimg"
        />
        <i slot="icon" class="iconfont icontouxiang"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="用户名" is-link icon="location-o" :value="user.name">
        <i slot="icon" class="iconfont iconyonghuming"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        icon="location-o"
        :value="user.nickname"
        @click="isshowNickname()"
      >
      <i slot="icon" class="iconfont iconnicheng"></i>
      <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="性别" is-link icon="location-o" :value="user.sex" @click="Gender()">
        <i slot="icon" class="iconfont iconxingbie"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell
        title="签名"
        is-link
        icon="location-o"
        :value="user.qianming"
        @click="QianmingClick()"
      >
      <i slot="icon" class="iconfont iconqianming"></i>
      <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <div class="bor"></div>
      <van-cell title="手机认证" is-link icon="location-o" :value="user.mobile" @click="PhoneRz()" >
        <i slot="icon" class="iconfont iconshoujirenzheng"></i>
        <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell
        title="修改密码"
        is-link
        icon="location-o"
        @click="$router.push('/user/changePassword')"
      >
      <i slot="icon" class="iconfont iconxiugaimima"></i>
      <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
    </div>

    <van-popup class="GenderPop" v-model="showPopup" :style="{ width:'85%',height: '21%' }">
      <span>选择性别</span>
      <van-radio-group class="GenderPopup" v-model="radio">
        <van-radio name="男" label-position="left" @click="GenderChange(radio)">男</van-radio>
        <van-radio name="女" label-position="left" @click="GenderChange(radio)">女</van-radio>
      </van-radio-group>
    </van-popup>
    <van-popup
      v-model="showNickname"
      :overlay="false"
      position="right"
      :style="{ width:'100%',height: '100%' }"
    >
      <van-nav-bar title="修改昵称" left-arrow @click-left="isshowNickname()">
        <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
        <van-button slot="right" type="warning" class="btn_nic" @click="changeName()">保存</van-button>
      </van-nav-bar>
      <van-cell-group style="margin:0 auto;width:370px;">
        <van-field
          v-model="message"
          maxlength="8"
          placeholder="请输入昵称"
          right-icon="cross"
          @click-right-icon="message=''"
        />
      </van-cell-group>
      <p style="color:rgb(204,204,204);font-size:12px;padding:10px 40px">最多{{message.length}}/8个字符</p>
    </van-popup>

    <van-popup
      v-model="qianming"
      :overlay="false"
      position="right"
      :style="{ width:'100%',height: '100%' }"
    >
      <van-nav-bar title="修改签名" left-arrow @click-left="isQianming()">
        <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
        <van-button slot="right" type="warning" class="btn_nic" @click="changeQianming()">保存</van-button>
      </van-nav-bar>
      <van-cell-group style="margin:0 auto;width:370px;">
        <van-field
          v-model="QianMingmessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入签名"
          show-word-limit
        />
      </van-cell-group>
    </van-popup>
    <input type="file" ref="uploadsrc" style="display:none" @change="changeFile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Qs from 'qs'
import { Toast } from 'vant'
// import axios from 'axios'
export default {
  computed: mapState(['src', 'username', 'Nickname', 'autograph', 'phone_rz']),
  data () {
    return {
      message: this.$store.state.user.nickname,
      QianMingmessage: this.$store.state.user.qianming || '',
      showNickname: false,
      scrollTag: false,
      showPopup: false,
      qianming: false,
      radio: '男',
      user: {}
    }
  },
  created () {
    this.get()
  },
  mounted () {
    // let _this = this
    window.addEventListener('scroll', () => {
      let top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      if (top > 50) {
        this.scrollTag = true
      } else {
        this.scrollTag = false
      }
    })
  },

  methods: {
    get () {
      this.user = this.$store.state.user
      console.log(this.user)
    },
    PhoneRz () {
      if (this.$store.state.user.mobile !== null) {
        this.$router.push('/user/PhoneRzCg')
      } else {
        this.$router.push('/user/PhoneRz')
      }
    },
    changeName () {
      // 编辑资料：修改昵称
      const dada = Qs.stringify({
        nickname: this.message

      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/editNickname'
      }).then(res => {
        console.log(res)
        this.user.nickname = this.message
        this.$store.commit('setUser', this.user)
        Toast.success('保存成功')
        this.isshowNickname()
      })
    },
    isshowNickname () {
      this.showNickname = !this.showNickname
    },
    QianmingClick () {
      this.qianming = true
    },
    isQianming () {
      this.qianming = false
    },
    changeQianming () {
      // 调用接口
      // 编辑资料：修改昵称
      const dada = Qs.stringify({
        qianming: this.QianMingmessage
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/editQianming'
      }).then(res => {
        console.log(res)
        this.user.qianming = this.QianMingmessage
        this.$store.commit('setUser', this.user)
        Toast.success('保存成功')
        this.qianming = false
      })
    },
    // 更换图片
    changeFile () {
      console.log(111)

      const file = this.$refs.uploadsrc.files[0]
      let fd = new FormData()
      fd.append('faceimg', file)

      this.$http.post('https://www.125yan.com/interface.php?s=/Home/UserApi/uploadHeadPortrait', fd).then(res => {
        console.log(res.data.data.faceimg)
        this.user.faceimg = res.data.data.faceimg
        this.$store.commit('setUser', this.user)
      })
    },
    //   切换性别状态
    GenderChange (radio) {
      // 调用接口 更改vuex 关闭弹出层
      const dada = Qs.stringify({
        sex: this.radio
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/editSex'
      }).then(res => {
        this.user.sex = radio
        this.$store.commit('setUser', this.user)
        Toast.success('保存成功')
        this.showPopup = false
      })
      console.log(radio)
    },

    Gender () {
      this.showPopup = true
    },
    tz () {
      console.log(1)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.iconfont{
  font-size: 16px;
}
.iconto{
   font-size: 11px;
  color: rgb(204,204,204);
  padding-left: 10px;
}
.GenderPopup {
  text-align: center;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .van-radio {
    height: 30px;
  }
  /deep/.van-radio__label {
    margin-right: 170px;
  }
}
.btn_nic {
  width: 44px;
  height: 24px;
  padding: 0;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  background: rgb(255, 176, 71);
  font-size: 12px;
  color: #fff;
}
.nr {
  margin: 50px auto;
  .van-cell {
    height: 57px;
    line-height: 40px;
    color: rgb(51, 51, 51);
  }
  /deep/ .van-cell__title{
    padding-left: 10px;
  }
  /deep/ .van-icon {
    display: block;
    line-height: 40px;
  }
}

.bor {
  background: rgb(247, 250, 255);
  height: 10px;
}

// 弹出层
.GenderPop {
  border-radius: 8px;
  .van-button {
    background: rgb(74, 88, 255);
    color: #fff;
    width: 295px;
    height: 40px;
    border-radius: 20px;
    margin-left: 10px;
    border: none;
  }
  span {
    display: block;
    margin: 15px auto;
    width: 60px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/.van-radio__icon--checked .van-icon {
  background-color: rgb(255, 176, 71) !important;
  border-color: rgb(255, 176, 71) !important;
}
</style>
