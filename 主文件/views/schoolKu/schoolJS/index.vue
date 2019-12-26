<template>
  <div class="content"  >
    <van-nav-bar title="学校介绍" fixed @click-left="$router.back()" left-arrow>
      <i slot="left"   class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="text" v-html="text"></div>

    <van-tabbar v-model="active" active-color='#7d7e80'>
      <van-tabbar-item  @click="thumbsUp()">
        <span>点赞{{likes}}</span>
         <i
          slot="icon"
          class="iconfont"
          :class="this.flag===false?'icondianzan-xuanzhong':'icondianzan-moren'"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="search" @click="Collection()">{{CollectionText}}
         <i
          slot="icon"
          class="iconfont"
          :class="this.status===2002?'iconshoucang-xuanzhong':'iconshoucang-moren'"
        ></i>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="zanwu()">分享
          <i slot="icon" class="iconfont iconfenxiang"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Qs from 'qs'
import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      CollectionText: '收藏',
      text: [],
      active: 0,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      },
      catid: null,
      id: null,
      likes: 0,
      flag: true,
      status: 0
    }
  },
  created () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.xxjs()
    console.log(this.$route.params)
  },
  activated () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  updated () {
    // this.ifMyCollection()
  },
  methods: {
    xxjs () {
      const dada = Qs.stringify({
        id: this.$route.params.id
      })
      this.$http({
        method: 'post',
        data: dada,
        url:
          'https://www.125yan.com/interface.php?s=/Home/Index/xx_js'
      }).then(res => {
        this.text = res.data.data.content
        this.likes = res.data.data.likes
        this.id = res.data.data.id
        this.catid = res.data.data.catid
        this.ifMyCollection(res.data.data.id, res.data.data.catid)
      })
    },

    zanwu () {
      Toast('该功能暂未上线')
    },
    thumbsUp () {
      if (this.$store.state.user.token) {
        this.xxjs()
        if (this.flag) {
          const dada = Qs.stringify({
            catid: this.catid,
            id: this.id
          })
          this.$http({
            method: 'post',
            data: dada,
            url: 'https://www.125yan.com/interface.php?s=/Home/UserApi/addLike'
          }).then(res => {
            Toast('点赞+1')
            this.xxjs()
          })
          this.flag = false
        } else {
          Toast('感谢您的点赞~')
        }

        return false
      }
      this.$router.push('/login')
    },
    ifMyCollection (id, catid) {
      // 判断收藏
      const dada = Qs.stringify({
        catid: catid,
        id: id
      })
      this.$http({
        method: 'post',
        data: dada,
        url:
          'https://www.125yan.com/interface.php?s=/Home/UserApi/ifMyCollection'
      }).then(res => {
        this.status = res.data.status
        if (res.data.status === 2002) {
          this.CollectionText = '已收藏'
        }
        if (res.data.status === 2003) {
          this.CollectionText = '未收藏'
        }
      })
    },
    Collection () {
      // 发起请求
      if (this.$store.state.user.token) {
        const dada = Qs.stringify({
          catid: this.catid,
          id: this.id
        })
        this.$http({
          method: 'post',
          data: dada,
          url:
            'https://www.125yan.com/interface.php?s=/Home/UserApi/addMyCollection'
        }).then(res => {
          console.log(res)
          // 此处判断 再次点击取消
          if (res.data.status === 0) {
            Toast('收藏成功')
          }
          if (res.data.status === 2000) {
            Toast('取消收藏')
          }
          this.ifMyCollection(this.id, this.catid)
        })
        return false
      }
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont{
  font-size: 20px;
}
.icondianzan-xuanzhong{
  color: rgb(247, 99, 99)
}
.iconshoucang-xuanzhong{
  color: rgb(253, 189, 65);
}
.text {
  padding: 40px 0px;
  width: 335px;
  margin: 0 auto;
  font-size: 15px;
  line-height: 32px;
  color: rgb(51,51,51);
}
</style>
