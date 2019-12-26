<template>
  <div class="content">
    <div class="hot_major">
      <h5 class="left"></h5>
      <span class="major left">
        <slot>插槽默认....请输入</slot>
      </span>
      <span class="gd right">
        更多
        <i class="iconfont iconto" ></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.content{
  width: 335px;
  margin: 0 auto;
}
.left {
  float: left;
}
.iconto{
  font-size: 12px;
  color: #ccc;
}
.hot_major {
  width: 335px;
  height: 30px;
  padding: 10px 0px 10px 0px;
  position: relative;
  overflow: hidden;
  h5 {
    margin: 0;
    padding: 0;
    width: 5px;
    height: 16px;
    position: absolute;
    border-radius: 3px;
    top: 32%;
    box-shadow: 0px 0px 2px 0px rgba(75,89,255,0.2);
    background: url('../../assets/images/long_icon.png') no-repeat center / 12px
      auto;
  }

  .major {
    font-family: 'PingFangSC-Medium';
    position: relative;
    font-size: 20px;
    font-weight: 600;
    left: 15px;
    .major_box {
      width: 104px;
      height: 56px;
      border-radius: 4px;
      position: relative;
      float: left;
    }
  }

  .gd {
    width: 60px;
    height: 30px;
    position: absolute;
    top: 55%;
    margin-top: -10px;
    right: 0px;
    font-size: 12px;
    font-family: 'PingFangSC-Medium';
    color: rgb(153, 153, 153);
    text-align: right;
    i {
      font-size: 10px;
      color: rgb(216, 216, 216);
      position: relative;
      margin-top: -12px;
    }
  }
}
</style>
