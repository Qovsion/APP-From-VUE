<template>
  <div class="content">
    <van-nav-bar title="问题反馈" left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="message"
        :autosize=" { maxHeight: 100, minHeight: 200 }"
        type="textarea"
        maxlength="200"
        placeholder="请输入留言"
      />
    </van-cell-group>
    <!-- <div class="uploadImage">
      <van-image width="100" height="120" fit="cover" :src="imglist" @click="$refs.uploadsrc.click()"/>
    </div>-->
    <van-cell-group style="margin-top:10px">
      <van-field label="联系方式：" label-class="leftText" v-model="value" placeholder="QQ、邮箱、手机(选填)" />
      <!-- <p class="tie">手机认证用户联系方式自动获取</p> -->
    </van-cell-group>
    <van-button class="btntj" type="info" @click="tj()">提交</van-button>
    <!-- <input type="file" ref="uploadsrc" style="display:none" @change="changeFile" /> -->
  </div>
</template>

<script>
// import Qs from 'qs'
import { Toast } from 'vant'
import Vue from 'vue'
import Qs from 'qs'
Vue.use(Toast)
export default {
  data () {
    return {
      value: '',
      message: '',
      user: {},
      // imglist: 'https://img.yzcdn.cn/vant/cat.jpeg',
      fileList: [{ url: this.imglist }]
    }
  },
  mounted () {
    if (this.$store.state.user.mobile) {
      this.value = this.$store.state.user.mobile
    }
  },
  methods: {

    // 更换图片
    changeFile () {
      console.log(111)

      const file = this.$refs.uploadsrc.files[0]
      let fd = new FormData()
      fd.append('faceimg', file)

      this.$http.post('https://www.125yan.com/interface.php?s=/Home/UserApi/uploadHeadPortrait', fd).then(res => {
        console.log(res.data.data.faceimg)
        this.imglist = `https://www.125yan.com/${res.data.data.faceimg}`
      })
    },
    tj () {
      if (!this.message) {
        Toast.fail('请填写反馈内容')
        return false
      }
      if (!this.value) {
        Toast.fail('请填写联系方式')
        return false
      }
      this.Postfeed()
    },
    Postfeed () {
      const dada = Qs.stringify({
        content: this.message,
        lxfs: this.value
      })
      this.$https({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/feedback'
      }).then(res => {
        console.log(res)
        Toast.success('提交成功，感谢您的反馈')
        this.$router.back()
        this.value = ''
      })
    }

  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ [class*='van-hairline']::after {
  position: static;
}
.btntj {
  width: 335px;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  border: none;
  background: rgb(74, 88, 255);
  margin-left: 10px;
  margin-top: 20px;
}
.tie {
  font-size: 14px;
  float: right;
  display: block;
  width: 260px;
  color: #8d8d8e;
}
.leftText {
  border: 1px solid;
}
.van-field__control {
  color: #8d8d8e;
}
.uploadImage {
  width: 100px;
  height: 120px;
}
.content {
  width: 355px;
  margin: 0 auto;
}
</style>
