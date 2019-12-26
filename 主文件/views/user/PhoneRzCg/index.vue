<template>
  <div class="centent">
    <van-nav-bar fixed @click-left="$router.back()" left-arrow>
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <!-- AOO大图标 -->
    <div class="appDatu">
      <img src="../../../assets/images/gs.png" alt />
      <h4>恭喜你，完成手机认证！</h4>
      <van-button class="btn" type="info" @click="$router.push('/user/loginIndex')">返回个人中心</van-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.appDatu {
  width: 375px;
  margin-top: 100px;
  position: relative;
  img {
    display: block;
    margin: 0 auto;
    width: 64px;
    height: 64px;
  }
  h4 {
    margin: 20px auto;
    padding: 0;
    text-align: center;
    font-size: 18px;
    color: rgb(51, 51, 51);
  }
  .btn {
      border: 1px solid;
      position: absolute;
    border: none;
    width: 320px;
     left: 50%;
      margin-left: -160px;
    height: 48px;
    border-radius: 24px;
    margin-top: 30px;
    background: rgb(74, 88, 255);
  }
}
</style>
