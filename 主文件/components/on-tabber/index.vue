<template>
  <div>
    <van-tabbar fixed v-model="active"   >
      <van-tabbar-item to="/" @click="tab(0)" replace>
        <span>首页</span>
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.active? icon.active : icon.inactive"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item to="/zyhome" @click="tab(1)" replace>
        <span>专业</span>
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.active? icon.active_zy : icon.inactive_zy"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item to="/school" @click="tab(2)" replace>
        <span>学校</span>
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.active? icon.active_xx : icon.inactive_xx"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item to="/jzsx" @click="tab(3)" replace>
        <span>简章</span>
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.active? icon.active_jz : icon.inactive_jz"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item  @click="tab(4)" replace>
        <span>我的</span>
        <i
          slot="icon"
          slot-scope="props"
          class="iconfont"
          :class="props.active? icon.active_my : icon.inactive_my"
        ></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      icon: {
        active: 'iconshouye1',
        inactive: 'iconshouye',
        active_zy: 'iconzhuanye1',
        inactive_zy: 'iconzhuanye',
        active_jz: 'iconjianzhang1',
        inactive_jz: 'iconjianzhang',
        active_xx: 'iconxuexiao1',
        inactive_xx: 'iconxuexiao',
        active_my: 'iconwode1',
        inactive_my: 'iconwode'
      }
    }
  },

  created () {
    console.log(this.$route.name)
    if (this.$route.name === 'home') {
      this.active = 0
    }
    if (this.$route.name === 'zyhome') {
      this.active = 1
    }
    if (this.$route.name === 'school') {
      this.active = 2
    }
    if (this.$route.name === 'jzsx') {
      this.active = 3
    }
    if (this.$route.name === 'myIndex') {
      this.active = 4
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 100,
        'loading': { forbidClick: true }
      })
    } else {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 600,
        'loading': { forbidClick: true }
      })
    }
    if (this.$route.name === 'loginIndex') {
      this.active = 4
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 100,
        'loading': { forbidClick: true }
      })
    } else {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 600,
        'loading': { forbidClick: true }
      })
    }
  },
  mounted () {
    console.log(this.$route.name)

    setTimeout(() => {
      if (this.$route.name === 'home') {
        this.active = 0
      }
      if (this.$route.name === 'zyhome') {
        this.active = 1
      }
      if (this.$route.name === 'school') {
        this.active = 2
      }
      if (this.$route.name === 'jzsx') {
        this.active = 3
      }
      if (this.$route.name === 'myIndex') {
        this.active = 4
      }
      if (this.$route.name === 'loginIndex') {
        this.active = 4
      }
    }, 80)
  },
  activated () {
    console.log(this.$route.name)
    if (this.$route.name === 'home') {
      this.active = 0
    }
    if (this.$route.name === 'zyhome') {
      this.active = 1
    }
    if (this.$route.name === 'school') {
      this.active = 2
    }
    if (this.$route.name === 'jzsx') {
      this.active = 3
    }
    if (this.$route.name === 'myIndex') {
      this.active = 4
    }
    if (this.$route.name === 'loginIndex') {
      this.active = 4
    }
  },
  methods: {
    tabs (i) {
      console.log(i)
      this.active = i
    },
    // tab栏登录前后路由切换
    tab (index, val) {
      console.log(this.$store.state.user)
      if (index === 4) {
        if (this.$store.state.user.token) {
          console.log(index)
          this.$router.push({ path: '/user/loginIndex', query: 'e', replace: true })
          return false
        }
        if (!this.$store.state.user.token) {
          this.$router.push({ path: '/myIndex', replace: true })
        }
      } else {
        // this.$router.push('../' + val)
      }
      if (index === 0) {
        // if (this.$store.state.user.token) {
        // this.$router.push('/')
        // }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabbar {
  height: 60px;
  -moz-box-shadow: -1px 2px 3px #e0dede;
  -webkit-box-shadow: -1px 2px 3px #e0dede;
  box-shadow: -1px 2px 3px #e0dede;
}
.active_tab img {
  width: 24px;
  height: 24px;
}
.iconfont {
  font-size: 20px;
}
.van-tabbar-item--active {
  color: rgb(74, 88, 255);
}
</style>
