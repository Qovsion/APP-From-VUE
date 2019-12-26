<template>
  <!-- 高端培训 -->
  <div class="content">
    <van-sticky :offset-top="0">
    <van-nav-bar title="高端培训" @click-left="$router.back()" left-arrow>
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>

    <van-dropdown-menu :z-index="5" :overlay="isMengceng" >
      <van-dropdown-item
        :title="title_1"
        v-model="value1"
        :options="option1"
        @change="changeOption(value1)"
      />
      <van-dropdown-item  ref="cli"  :title="title_2" v-model="value2" >
        <!-- 地点选择 -->
        <ul class="listn_dd">
          <li
            v-for="item in items"
            :key="item.cc"
            @click.stop="cc(item.cc)"
            class="nn"
            :class="item.cc==classIndex?'active_on':''"
          >{{item.text}}</li>
        </ul>
        <ul class="listn_dd_chr">
          <li
            v-for="item in children"
            :key="item.id"
            @click.stop="rightCc(item.id)"
            :class="item.id==classIndex4?'active_on':''"
          >{{item.name}}</li>
        </ul>
      </van-dropdown-item>
      <van-dropdown-item
        :title="title_3"
        v-model="value3"
        :options="option3"
        @change="changeOption_ths(value3)"
      />
      <van-dropdown-item
        :title="title_4"
        v-model="value4"
        :options="option4"
        @change="changeOption_for(value4)"
      />
    </van-dropdown-menu>
       </van-sticky>
    <van-list
      v-model="loading"
      :finished="finished"
      :v-if="isShow"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item,i) in ZyArr" :key="i" @click="trun(item.id,i)" class="con">
        <h2>{{item.title}}</h2>
        <div class="tag">
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.lenth}}</van-tag>
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.fangshis[0]}}</van-tag>
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.areas[0]}}</van-tag>
        </div>
        <h3>¥ {{item.money/10000}}万</h3>
      </div>
    </van-list>
    <!-- 地点选择 -->
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      classIndex: '',
      classIndex4: '',
      isMengceng: true,
      calssIndex: 1,
      loading: false,
      finished: false,
      show: false,
      isShow: false,
      itemsIndex: 0,
      items: [], // 地址所需数据
      children: [

      ],

      activeId: 1,
      activeIndex: 0,
      title_1: '专业',
      title_2: '地点',
      title_3: '学费',
      title_4: '排序',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      option1: [

      ],
      option2: [

      ],
      page_num: 1,
      option3: [
        { text: '不限', value: 0 },
        { text: '1000~10000元', value: '14' },
        { text: '10001~15000元', value: '15' },
        { text: '15001~20000元', value: '151' },
        { text: '15001~20000元', value: '151' },
        { text: '20001~30000元', value: '144' },
        { text: '30001~40000元', value: '145' },
        { text: '40001~50000元', value: '146' },
        { text: '50001~80000元', value: '147' },
        { text: '40001~50000元', value: '146' },
        { text: '80001~150000元', value: '148' },
        { text: '150001~300000元', value: '149' }
      ],
      option4: [
        { text: '综合排序', value: '' },
        { text: '价格高', value: '1' },
        { text: '价格低', value: '2' }
      ],
      ZyArr: []

    }
  },

  mounted () {
    let cli = document.getElementsByClassName('van-dropdown-menu')[0].children[1]

    cli.addEventListener('click', () => {
      // this.show = true
      this.isShow = false
    })
  },
  created () {
    this.onLoad()
  },
  methods: {

    // 跳转页面
    trun (id, i) {
      // rulesDel?rlid=713&zy=心理学&xy=深圳大学
      this.$router.push({ path: `/gdpRulesxDel`, query: { rlid: id, zy: this.ZyArr[i].title, xy: this.ZyArr[i].short_title, gdpx: 8 } })
    },

    // 点击[地点]中导航左侧菜单
    cc (cc) {
      this.classIndex = cc
      this.value2 = Number(cc)
      var addClass = document.getElementsByClassName('listn_dd')[0]
      var ac = document.getElementsByClassName('listn_dd_chr')[0]
      addClass.classList.add('listn_dd_1')
      ac.style.display = 'block'

      this.loading = true
      this.finished = false
      this.page_num = 1
      this.onLoad(2)
    },
    // 点击[地点]中导航右侧菜单
    rightCc (id) {
      this.value5 = id
      this.classIndex4 = id
      // 关闭
      this.$refs.cli.toggle(false)
      this.page_num = 1
      this.onLoad(2)
    },
    onLoad (indexs) {
      const dada = Qs.stringify({
        zy: this.value1,
        dd: this.value2,
        xf: this.value3,
        px: this.value4,
        cs: this.value5,
        page: this.page_num,
        num: 10
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/gdpx_sx'
      })
        .then((res) => {
          res = res.data.data
          let xf = res.xf_arr.map(item => {
            return { text: item.name, value: item.id }
          })
          var objxf = [{ text: '不限', value: '' }]
          xf.unshift(...objxf)
          this.option3 = xf
          var objchr = [{ name: '不限', id: '' }
          ]
          let chr = res.cs_arr.map(item => {
            return { name: item.name, id: item.id }
          })
          chr.unshift(...objchr)
          this.children = chr

          console.log(this.children)
          let zyy = res.zy_arr.map(item => {
            return { text: item.name, value: item.id }
          })
          var obj1 = [{ text: '不限', value: '' }]

          zyy.unshift(...obj1)
          this.option1 = zyy

          let dd = res.dd_arr.map(item => {
            return { cc: item.id, text: item.name }
          })
          var obj2 = [{ cc: '', text: '不限' }]
          dd.unshift(...obj2)
          this.items = dd
          this.loading = false
          console.log(res.list.length)
          console.log(indexs)
          if (indexs === 2) {
            this.page_num = this.page_num + 1
            this.ZyArr = res.list
          } else if (res.list.length !== 0) {
            this.page_num++
            this.ZyArr.push(...res.list)
          } else {
            this.finished = true
          }
        })
    },

    changeOption (value) {
      console.log(value)
      this.page_num = 1
      this.onLoad(2)
    },
    changeOption_ths (value) {
      console.log(value)
      this.page_num = 1
      this.onLoad(2)
    },
    changeOption_for (value) {
      console.log(value)
      this.page_num = 1
      this.onLoad(2)
    },
    // 获取数据
    getTrain () {

    }

  }
}
</script>

<style lang="less" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.contt {
  padding-left: 10px;
  li {
    height: 50px;
    color: #4f4f4f;
    font-size: 14px;
    line-height: 50px;
  }
  .active {
    font-size: 15px;
    color: #4e5cff;
    font-weight: 700;
  }
}
.listn_dd {
  width: 375px;
  height: 500px;
  margin: 0 auto;
  padding: 10px 0px;
  float: left;
  overflow: scroll;
  .nn {
    text-align: center;
    border: none;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.listn_dd_1 {
  width: 90px;
  margin: 0;
  float: left;
  li {
    border-bottom: 1px solid rgb(247, 250, 255) !important;
  }
}
.listn_dd_chr {
  width: 280px;
  margin: 0 auto;
  padding: 10px 0px;
  float: left;
  height: 500px;
  overflow: scroll;
  display: none;
  li {
    text-align: center;
    width: 80px;
    padding-left: 60px;
    // margin: 0 auto;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: 500;
  }
}
.active_on {
  color: rgb(74, 88, 255) !important;
}
.content {
  padding-bottom: 60px;
}
/deep/ .van-tree-select {
  height: 750px !important;

}
.con {
  width: 335px;
  height: 66px;
  margin: 0 auto;
  position: relative;
  margin-top: 20px;
  border-bottom: 1px solid #f7faff;
  h2 {
    font-family: 'PingFangSC-Light';
    font-weight: normal;
    color: rgb(51, 51, 51);
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tag {
    position: absolute;
    bottom: 10px;
    border: none;
    .van-tag {
      margin-right: 5px;
    }
  }
  h3 {
    font-family: 'rgb(255,156,86)';
    font-size: 12px;
    position: absolute;
    bottom: 2px;
    right: 0;
    color: #ff9c56;
  }
}
</style>
