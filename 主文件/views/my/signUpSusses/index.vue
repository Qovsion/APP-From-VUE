<template>
  <div class="centent">
    <van-nav-bar fixed @click-left="$router.back()" left-arrow>
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <!-- AOO大图标 -->
    <div class="appDatu">
      <img src="../../../assets/images/gs.png" alt />
      <h4>恭喜你，报名成功！</h4>
      <p>
        您填写的信息已提交，老师会在24小时内与您联系
        如有任何问题，请拨打
        <span style="color:rgb(255,176,71)">40004-98986</span>
      </p>
      <van-button class="btn" type="info" @click="$router.push('/')">返回首页</van-button>
    </div>
    <div class="pf">去应用商店评分</div>
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

.pf{
    position: fixed;
    bottom: 10px;
    margin: 0 auto;
    color: rgb(102, 102, 102);
    text-align: center;
    width: 100px;
    left: 50%;
    margin-left: -50px;
    font-size: 12px;
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
  p {
    font-size: 12px;
    color: rgb(102, 102, 102);
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
