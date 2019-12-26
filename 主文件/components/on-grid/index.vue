<template>
  <div id="content" @scroll="scoll(e)">
    <van-sticky :offset-top="500">
      <van-grid clickable :border="false" :column-num="5" icon-size="12px">
        <van-grid-item icon="home-o" text="路由跳转" to="/" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
        <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
      </van-grid>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // offsetTop: ''
    }
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var nav = document.getElementById('content')// 获取到包裹导航的最外层DIV的ID，并存入变量nav
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 此处将导航条的滚动存入scrolltop
      if (scrollTop > 50) { // 逻辑判断此处的50为导航菜单上方标题栏DIV的高度，如果向下滚动导航菜单，触发下方的CSS样式更改
        nav.style.position = 'fixed' // 导航栏绝对定位
        nav.style.bottom = '0' // 导航距离顶部0像素，一直在顶部出现
        nav.style.zIndex = '99999' // 设置导航菜单层级优先度最高
      // } else {
      // nav.style.position = 'relative' // 此处为导航菜单回拉后复原，根据项目需求来写，我觉得这里我写的是有些问题的，不过在我的项目中可以实现效果，具体要看情况
      }
    }

  }
}
</script>

<style lang="less" scoped>
#content {
  width: 100%;
  position: absolute;
  margin: 0 auto;
  bottom: 0;
  .van-grid-item{
    font-size: 12px;
  }
}
</style>
