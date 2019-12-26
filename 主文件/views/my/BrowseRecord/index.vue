<template>
  <div class="cntent">
    <van-nav-bar title="历史记录" fixed left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="hist">
      <van-swipe-cell :on-close="onClose" :id="i" :right-width="59" v-for="(item,i) in list" :key="i">
        <template slot="left"></template>

        <van-cell :border="false" :title="item.title.length>24 ? item.title.slice(0,22)+ '...':item.title"  @click="ArticleDetails(item.id,item.catid)"/>

        <template slot="right">
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <p class="nullText" v-show="list.length === 0">还没有内容，赶快去看一些吧！</p>
  </div>
</template>

<script>
export default {

  data () {
    return {
      result: [],
      list: this.$store.state.History
    }
  },
  activated () {
    var History = JSON.parse(window.localStorage.getItem('125History') || '{}')
    console.log(History)
    this.list = History
  },
  created () {
    var History = JSON.parse(window.localStorage.getItem('125History') || '{}')
    console.log(History)
    this.list = History
  },
  methods: {
    toggle (i) {
      this.$refs.checkboxes[i].toggle()
      console.log(this.$refs.checkboxes[i])
    },
    ArticleDetails (id, catid, i) {
      this.$router.push({ path: '/ArticleDetails', query: { id: id, catid: catid } })
    },
    // clickPosition 表示关闭时点击的位置
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          this.$dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            // 根据id删除数组中的记录
            var History = JSON.parse(window.localStorage.getItem('125History') || '{}')
            History.splice(instance.$el.id, 1)
            this.list = History
            this.$store.state.History = this.list
            console.log(this.$store.state.History)
            localStorage.setItem('125History', JSON.stringify(this.list))
            // console.log(instance.$el.id)
            instance.close()
          })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nullText{
  font-family: 'PingFangSC-Regular';
  color: rgb(153,153,153);
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
}

.hist {
  padding-top: 50px;
}
/deep/ .van-swipe-cell {
  border: none;
  height: 50px;
  line-height: 50px;
  .van-swipe-cell__right {
    position: relative;
    top: -53px;
  }
}
</style>
