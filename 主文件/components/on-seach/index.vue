<template>
  <div class="content">
    <van-sticky :offset-top="0" style="position:fixed;z-index:10;top:0;">
      <div class="nav">
        <van-row>
          <van-col span="5">
            <div class="content_name">
              <span class="region left" v-on:click="showtoggle">
                全国
                <van-icon class="vant-i-icon" name="location" />
              </span>
            </div>
          </van-col>
          <van-col span="19">
            <div slot="action">搜索</div>
            <van-search v-model="Seachvalue" placeholder="请输入搜索关键词" shape="round"></van-search>
          </van-col>
        </van-row>
      </div>
    </van-sticky>
  </div>
</template>
<script>
export default {
  props: ['isShow'],
  data () {
    return {
      Seachvalue: '',
      value: ''
    }
  },
  methods: {
    showtoggle () {
      console.log(this.isShow)
      this.$emit('listen', 'chuanguoqu')
    }

  }

}

</script>
<style lang="less" scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.nav {
  height: 50px;
}
.content_name {
  width: 180px;
  height: 41px;
  display: block;
  background: #fff;
  padding: 13px 0px 0px 19px;

  .region {
    // display: block;
    vertical-align: middle;
    color: #757171;
    font-weight: 600;
    font-size: 16px;
    margin: 0 auto;

    background: #fff;
    .vant-i-icon {
      // width: 20px;
      margin-left: 2px;
      margin-top: -2px;
      vertical-align: middle;
    }
  }
}
</style>
