<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <!-- <router-view></router-view> -->
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- <on-tabber
      v-show="$route.name =='home' || $route.name =='zyhome' || $route.name =='school' || $route.name =='jzsx' || $route.name =='myIndex' || $route.name =='master' || $route.name =='majorMaster' || $route.name =='OnlinePhD' || $route.name =='curriculum' || $route.name =='AdvancedStudies' || $route.name =='Train' || $route.name =='loginIndex'"
    ></on-tabber>-->
  </div>
</template>
<script>
// :name="direction"
// class="appView"
//  v-on:touchstart="bodyTouchStart"
//     v-on:touchmove="bodyTouchMove"
//     v-on:touchend="bodyTouchEnd"
// import Tabber from '@/components/on-tabber'
var swidth = document.documentElement.clientWidth
export default {
  // components: { 'on-tabber': Tabber },
  name: 'app',
  data: () => ({
    // direction 页面切换的过渡动画，配合transition组件使用
    direction: 'slide-left',
    // touchLeft 划动起点界限，起点在靠近屏幕左侧时才有效
    touchLeft: swidth * 2 / 5,
    // touchStartPoint 记录起始点X坐标
    touchStartPoint: 0,
    // distance 记录划动的距离
    distance: 0,
    // 回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退
    backBtn: null
  }),

  watch: {
    '$route' (val, old, next) {
      // 当前路由
      console.log(val.name, old.name)
      if (val.name === 'zyhome' || val.name === 'home' || val.name === 'school' || val.name === 'jzsx') {
        old = null
        return false
      } else if (val.name === null) {
        return false
      } else if (old === null) {
        return false
      } else {
        window.scrollTo(0, 0)
        console.log('清零')
      }
      // 上一个路由
    }
    // 监听路有变化，决定页面过渡动画
    // $route (to, from) {
    //   // if (from.name === 'login' || from.path.indexOf('home') > -1) {
    //   // } else if (to.path.indexOf('home') > -1) {
    //   this.direction = 'slide-left'
    //   // } else {
    //   const toDepth = to.path.length
    //   const fromDepth = from.path.length
    //   // console.log(toDepth, fromDepth)
    //   this.direction = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   // }
    // }
  },

  methods: {
    bodyTouchStart: function (event) {
      this.backBtn = document.getElementById('navback')
      if (this.backBtn) {
        // 获得起点X坐标，初始化distance为0
        this.touchStartPoint = event.targetTouches[0].pageX
        this.distance = 0
      }
    },
    bodyTouchMove: function (event) {
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 只监听单指划动，多指划动不作响应
        if (event.targetTouches.length > 1) {
          return
        }
        // 实时计算distance
        this.distance = event.targetTouches[0].pageX - this.touchStartPoint
        // 根据distance在页面上做出反馈。这里演示通过返回按钮的背景变化作出反馈
        if (this.distance > 0 && this.distance < 100) {
          this.backBtn.style.backgroundPosition = ((this.distance - 100) / 100) * 50 + 'px 0'
        } else if (this.distance >= 100) {
          this.backBtn.style.backgroundPosition = '0 0'
        } else {
          this.backBtn.style.backgroundPosition = '-50px 0'
        }
      }
    },
    bodyTouchEnd: function (event) {
      console.log(this.backBtn, this.touchStartPoint, this.touchLeft)
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 划动结束，重置数据
        this.touchStartPoint = 0
        this.backBtn.style.backgroundPosition = '-50px 0'
        // 当划动距离超过100px时，触发返回事件
        this.$router.back()
        if (this.distance > 100) {
          // 返回前修改样式，让过渡动画看起来更快
          document.getElementById('app').classList.add('quickback')
          setTimeout(function () {
            document.getElementById('app').classList.remove('quickback')
          }, 250)
        }
      }
    }
  }
}
</script>
<style lang="less">
#app {
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  // overflow-y: hidden;
}
.appView {
  width: 100%;
  background: #fff;
  // min-height: 100vh;
  transition: transform 0.24s ease-out;
}
#app.quickback .appView {
  transition-duration: 0.2s;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-active {
  transform: translate(-30%, 0);
}
.slide-right-enter {
  transform: translate(-30%, 0);
}
.slide-right-leave-active {
  transform: translate(50%, 0);
}
</style>
