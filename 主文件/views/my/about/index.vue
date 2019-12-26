<template>
  <div class="centent"  >
    <van-nav-bar title="关于我们" fixed @click-left="$router.back()" left-arrow>
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <!-- APP大图标 -->
    <div class="appDatu">
      <img src="../../../assets/set/logo.png" alt />
      <h4>125在职研究生</h4>
      <span>{{Edition}}</span>
    </div>
    <div class="bor"></div>
    <div class="nr">
      <van-cell title="用户服务协议"  @click="$router.push('/Agreement')">
      <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
      <van-cell title="信息保护声明"  @click="$router.push('/statement')">
       <i slot="right-icon" class="iconfont iconto" style="line-height: inherit;"></i>
      </van-cell>
    </div>
    <p class="bq">
      北京一二五科技有限公司
      Copyright©2011-2019
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Edition: this.$store.state.Edition
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.bq {
  position: absolute;
  bottom: 30px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  width: 160px;
  height: 34px;
  font-size: 12px;
  color: rgb(204, 204, 204);
}
.appDatu {
  width: 375px;
  margin-top: 100px;
  img {
    border-radius: 5px;
    display: block;
    margin: 0 auto;
    width: 96px;
    height: 96px;
  }
  h4 {
    font-family: 'PingFangSC-Medium';
    margin: 10px auto;
    padding: 0;
    text-align: center;
    font-size: 24px;
    color: rgb(51, 51, 51);
  }
  span {
    text-align: center;
    display: block;
    font-size: 14px;
    color: rgb(153, 153, 153);
  }
}
.bor {
  margin-top: 55px;
  height: 10px;
  background: rgb(247, 250, 255);
}
.nr {
  width: 335px;
  margin: 10px auto;
  .van-cell {
    height: 57px;
    line-height: 40px;
    color: rgb(51, 51, 51);
  }
  /deep/ .van-icon {
    display: block;
    line-height: 40px;
  }
}
</style>
