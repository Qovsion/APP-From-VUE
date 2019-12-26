<template>
  <div class="content">
    <van-nav-bar title="学校筛选" :fixed="true" :border="false" @click-left="$router.back()" left-arrow>
      <i slot="left" class="iconfont navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <van-sticky :offset-top="-5">
      <!-- 类型下拉 -->
      <van-dropdown-menu :z-index="5" :overlay="true" @click.native="ooo">
        <van-dropdown-item ref="item_one" :title="title_1" v-model="value1">
          <ul class="listn">
            <li
              :class="item.value==classIndex1?'active_on':''"
              v-for="item in option1"
              :key="item.value"
              @click="changeOption(item.value)"
            >{{item.text}}</li>
          </ul>
        </van-dropdown-item>
        <!-- 方式下拉 -->
        <van-dropdown-item :title="title_2" v-model="value2" ref="item_tw">
          <ul class="listn">
            <li
              :class="item.value==classIndex2?'active_on':''"
              v-for="item in option2"
              :key="item.value"
              @click="changeOption_ths(item.value)"
            >{{item.text}}</li>
          </ul>
        </van-dropdown-item>
        <!-- 地点下拉 -->
        <van-dropdown-item ref="item_for" :title="title_3" v-model="value3" v-if="dd">
          <van-button
            :class="item.value==classIndex3?'van-cell__value--alone':''"
            type="default"
            v-for="item in option3"
            :key="item.value"
            @click="changeOption_for(item.value)"
            :close="isClose()"
          >{{item.text}}</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <div class="cont-t">
      <div class="options" v-show="sshow">
        <van-button type="default" :v-model="name1" v-show="isYc_lx" @click="guanbi_on()">
          {{name1}}
          <i class="iconfont iconguanbi-min"></i>
        </van-button>
        <van-button type="default" :v-model="name3" v-show="isYc_dd" @click="guanbi_fo()">
          {{name3}}
          <i class="iconfont iconguanbi-min"></i>
        </van-button>
        <div class="rig" @click="remove()">
          <span>清除</span>
          <i class="iconfont iconguanbi-min"></i>
        </div>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 学校内容 -->
        <div
          class="list"
          v-for="cc in addData"
          :key="cc.id"
          @click="trun(cc.id,cc.major0,cc.major3)"
        >
          <div class="logo">
            <img :src="'https://www.125yan.com/Uploads/'+cc.thumb" alt />
          </div>
          <div class="title">
            <h2>{{cc.title}}</h2>
            <van-cell :title="`简章：${cc.jz_num}篇`" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      dd: true,
      sshow: false,
      classIndex1: '',
      classIndex2: '',
      classIndex3: '',
      title_1: '类型',
      title_2: '方式',
      title_3: '地点',
      // vallue id
      value1: '',
      value2: '',
      value3: '',
      // 名称
      name1: '不限',
      name2: '学校地区',
      name3: '不限',
      isYc_lx: false,
      isYc_fs: false,
      isYc_dd: false,
      option1: [
        { text: '不限', value: '' },
        { text: '同等学力', value: '1' },
        { text: '专业硕士', value: '2' },
        { text: '国际硕士', value: '3' },
        { text: '中外合办', value: '4' },
        { text: '在职博士', value: '5' },
        { text: '国际博士', value: '6' },
        { text: '高级研修', value: '7' }
      ],
      option2: [
        { text: '不限', value: '2' },
        { text: '学校地区', value: '' }
      ],
      option3: [
      ],
      optionZ: [
        { text: '不限', value: '2' },
        { text: '学校地区', value: '' },
        { text: '上课地区', value: '1' },
        { text: '网络授课', value: '3' }
      ],
      optionX: [
        { text: '不限', value: '2' },
        { text: '学校地区', value: '' },
        { text: '上课地区', value: '1' }
      ],
      optionW: [
        { text: '不限', value: '2' },
        { text: '网络授课', value: '3' }
      ],
      addData: [],
      dd_arr: [],
      skdq: [],
      skdq_cs: 0,
      page_num: 1,
      didian: '',
      skdidian: ''
    }
  },
  created () {
    if (this.$route.query.lx) {
      this.value1 = this.$route.query.lx
      this.classIndex1 = this.$route.query.lx

      if (this.$route.query.name) {
        this.name1 = this.$route.query.name
        this.isYc_lx = true
        this.sshow = true
      }
    }
    if (this.$route.query.dd) {
      this.didian = this.$route.query.dd
      this.classIndex3 = this.$route.query.dd
      if (this.$route.query.ddName) {
        this.name3 = this.$route.query.ddName
        this.isYc_dd = true
        this.sshow = true
      }
    }
    this.onLoad(2)
  },
  activated () {
    if (this.$route.query.lx) {
      this.value1 = Number(this.$route.query.lx)
      this.classIndex1 = this.$route.query.lx

      if (this.$route.query.name) {
        this.name1 = this.$route.query.name
        this.isYc_lx = true
        this.sshow = true
      }
    }
    if (this.$route.query.dd) {
      this.didian = this.$route.query.dd
      this.classIndex3 = this.$route.query.dd
      if (this.$route.query.ddName) {
        this.name3 = this.$route.query.ddName
        this.isYc_dd = true
        this.sshow = true
      }
    }
    this.onLoad()
  },
  mounted () {

  },

  methods: {
    // 跳转学校首页
    trun (id, lx, mar) {
      if (lx === null) {
        this.$router.push(`/schoolHome/${id}`)
      } else {
        this.$router.push({
          path: `/schoolClass/${lx}`,
          query: { id: id, mar: mar, lx: lx }

        })
      }
    },
    guanbi_on () {
      this.value1 = ''
      this.classIndex1 = 0
      this.isYc_lx = false
      this.value2 = ''
      this.classIndex2 = ''
      this.dd = true
      this.page_num = 1
      this.onLoad(2)
      if (this.isYc_lx === false && this.isYc_dd === false) {
        this.sshow = false
      }
    },
    guanbi_fw () {
      this.value2 = ''
      this.classIndex2 = 0
      this.page_num = 1
      this.onLoad(2)
    },
    guanbi_fo () {
      this.value3 = ''
      this.classIndex3 = 0
      this.isYc_dd = false
      if (this.isYc_lx === false && this.isYc_dd === false) {
        this.sshow = false
      }
      this.onLoad(2)
    },
    remove () {
      this.classIndex1 = 0
      this.value1 = ''
      this.value3 = ''
      this.value2 = ''
      this.classIndex3 = 0
      this.sshow = false
      this.onLoad(2)
    },
    changeOption (index) {
      this.value1 = index
      this.classIndex1 = index
      this.value2 = ''
      this.classIndex2 = ''
      this.dd = true
      this.$refs.item_one.toggle(false)
      var cc = this.$refs.item_one.$refs.wrapper.lastChild
      cc.addEventListener('click', (e) => {
        var nr = e.target.innerText
        this.name1 = nr
        if (this.name1 !== '不限') {
          this.isYc_lx = true
        } else {
          this.isYc_lx = false
          if (this.name3 === '不限') {
            this.sshow = false
          }
        }
      })
      this.isYc_lx = false
      this.isYc_dd = false
      this.sshow = true
      this.classIndex3 = ''
      this.value3 = ''
      this.didian = ''
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.option2 = []
      this.onLoad(2)
      window.scrollTo(0, 0)
    },
    changeOption_ths (index) {
      this.value2 = index
      this.classIndex2 = index
      // 判断地点显示隐藏

      if (this.value2 === '3') {
        this.value3 = ''
        this.classIndex3 = ''
        this.dd = false
      } else {
        this.dd = true
      }
      this.isYc_dd = false
      this.$refs.item_tw.toggle(false)
      var cc = this.$refs.item_tw.$refs.wrapper.lastChild
      cc.addEventListener('click', (e) => {
        var nr = e.target.innerText
        this.name2 = nr
      })
      this.page_num = 1
      this.addData = []
      this.loading = true
      this.finished = false
      this.onLoad(2)
      console.log(1111)
      this.value3 = ''
      this.classIndex3 = ''
      this.didian = ''
      this.skdidian = ''
    },
    changeOption_for (index) {
      this.value3 = index
      this.classIndex3 = this.value3
      this.$refs.item_for.toggle(false)
      var cc = this.$refs.item_for.$refs.wrapper.lastChild
      cc.addEventListener('click', (e) => {
        var nr = e.target.children[0].innerText
        this.name3 = nr
        if (this.name3 === '不限') {
          this.isYc_dd = false
          this.sshow = false
        } else {
          this.isYc_dd = true
          this.sshow = true
        }
      })
      console.log(this.value2)
      if (this.value2 === '') {
        this.didian = this.value3
        this.skdidian = ''
        console.log(11111)
      } else {
        this.skdidian = this.value3
        this.didian = ''
        console.log(2222)
      }
      this.loading = true
      this.finished = false
      this.page_num = 1
      this.addData = []
      this.onLoad(2)
    },
    isClose () {

    },
    ooo (e) {
      if (e.target) {
        var ccc = document.getElementsByClassName('van-cell__value')
        for (var i = 0; i > ccc.length; i++) {
        }
      }
      if (this.title_3 === e.target.innerText) {
        var cc = this.$refs.item_for.$refs.wrapper.lastChild
        cc.style.paddingBottom = '30px'
      } else {
      }
    },
    onLoad (indexs) {
      const dade = Qs.stringify({
        lx: this.value1,
        fs: this.value2,
        // skdd: 2,
        dd: this.didian,
        skdd: this.skdidian,
        page: this.page_num,
        num: 20
      })
      this.$http({
        method: 'post',
        data: dade,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/xx_sx'
      })

        .then((res) => {
          res = res.data.data
          this.dd_arr = res.dd_arr
          console.log(this.value1 === '1' || this.value1 === '3' || this.value1 === 1 || this.value1 === 3)
          if (this.value1 === '1' || this.value1 === '3' || this.value1 === 1 || this.value1 === 3) {
            this.option2 = this.optionZ
          } else {
            this.option2 = []
            console.log(this.option2)
            var obj = [{ text: '不限', value: '2' }, { text: '学校地区', value: '' }]
            this.option2 = obj
          }
          if (this.value1 === '4' || this.value1 === '6' || this.value1 === '7' || this.$route.query.lx === 4 || this.$route.query.lx === 6 || this.$route.query.lx === 7) {
            this.option2 = this.optionX
          }

          // 重铸dd_arr
          let co = this.dd_arr.map((item) => {
            return { value: item.id, text: item.name }
          })
          var mr = [{ text: '不限', value: '' }]
          co.unshift(...mr)
          if (this.value2 === '1') {
            this.skdq = res.skdq_arr
            this.skdq = this.skdq.map((item) => {
              return { value: item.id, text: item.name }
            })
            this.skdq.unshift(...mr)
            this.option3 = this.skdq
          } else {
            this.option3 = co
          }
          this.loading = false
          if (indexs === 2) {
            // 点击筛选后 走这里
            this.page_num = this.page_num + 1
            this.addData = res.list
          } else if (res.list.length !== 0) {
            // 没有筛选 正常追加
            this.page_num = this.page_num + 1
            this.addData.push(...res.list)
          } else {
            this.finished = true
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
/deep/ .van-dropdown-menu__title--active {
  color: rgb(74, 88, 255);
}
/deep/ .van-hairline--top-bottom::after {
  border-width: 0px;
}
/deep/ .van-dropdown-menu {
  top: 50px;
}
/deep/ .van-nav-bar--fixed {
  z-index: 10 !important;
}
.iconguanbi-min {
  font-size: 14px;
  vertical-align: middle;
}
.van-nav-bar__left {
  z-index: 12 !important;
}
/deep/ .van-sticky--fixed {
  z-index: 9 !important;
}
.options {
  width: 375px;
  height: 55px;
  background: #f7faff;
  position: relative;
  .van-button {
    margin-top: 13px;
    margin-left: 5px;
    height: 32px;
    border: none;
    line-height: 32px;
    border-radius: 16px;
    background: #ffffff;
    font-size: 12px;
    color: #333333;
    .van-icon {
      position: relative;
      right: 0px;
      padding: 1px;
      top: 3px;
    }
  }

  .rig {
    position: absolute;
    right: 25px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: rgb(51, 51, 51);
    top: 16px;
  }
}
.van-dropdown-item {
  .van-button {
    width: 80px;
    height: 32px;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
    border: none;
    line-height: 32px;
    background: rgb(247, 250, 255);
  }
  .van-cell__value--alone {
    color: #fff;
    background: rgb(74, 88, 255);
  }
}
.listn {
  width: 375px;
  margin: 0 auto;
  padding: 10px 0px;
  li {
    text-align: center;
    width: 335px;
    margin: 0 auto;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.active_on {
  color: rgb(74, 88, 255);
}
.cont-t {
  margin-top: 50px;
}
.list {
  display: flex;
  padding: 10px 0px;
  .logo {
    display: block;
    width: 48px;
    height: 48px;
    padding-left: 20px;
    position: relative;
    z-index: 1;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .title {
    h2 {
      padding-top: 5px;
      font-family: 'PingFangSC-Regular';
      font-weight: normal;
      margin: 0;
      font-size: 16px;
      padding-left: 15px;
      font-size: 16px;
      color: rgb(51, 51, 51);
    }
    .van-cell {
      padding: 0;
      margin: 0;
      text-align: left;
      padding-left: 16px;
      font-size: 11px;
      color: rgb(153, 153, 153);
    }
  }
}
</style>
