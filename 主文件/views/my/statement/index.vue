<template>
  <div class="content">
    <van-nav-bar title="信息声明" left-arrow @click-left="$router.back()">
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="cont" v-html="content_nr">

  </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      content_nr: []
    }
  },
  created () {
    this.suipian()
  },
  methods: {
    suipian () {
      const ta = Qs.stringify({
        id: 390
      })
      this.$http({
        method: 'post',
        data: ta,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/sp'
      })
        .then((res) => {
          this.content_nr = res.data.data
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
.cont {
  width: 335px;
  margin: 0 auto;
  font-size: 14px;
}
</style>
