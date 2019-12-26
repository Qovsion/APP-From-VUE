<template>
  <div class="content" v-touch:right="SlipBack">
    <van-nav-bar title="在线报名" fixed left-arrow @click-left="$router.back()">
      <i slot="left" class="iconfont le navLeftfont iconfanhui"></i>
    </van-nav-bar>
    <div class="jz">
      <van-button plain hairline type="info" @click="ale()">
        {{islx}}
        <i class="iconfont iconxfup"></i>
      </van-button>
    </div>
    <van-cell-group>
      <van-field
        required
        v-model="zy"
        placeholder="请输入专业"
        clearable
        label="意向专业"
        input-align="right"
      />
      <van-field
        required
        v-model="school"
        placeholder="请输入学校"
        clearable
        label="意向学校"
        input-align="right"
      />

      <van-field required v-model="username" placeholder="请输入姓名" label="真实姓名" input-align="right" />
      <van-cell required title="性别" is-link :value="sex" @click="Gender()">
        <i slot="right-icon" class="iconfont iconto"></i>
      </van-cell>
      <van-cell required title="出生日期" is-link :value="date" @click="DateBirth()">
        <i slot="right-icon" class="iconfont iconto"></i>
      </van-cell>
      <van-field required v-model="phone" placeholder="请输入手机号" label="手机" input-align="right" />
      <van-field required v-model="email" placeholder="请输入邮箱" label="邮箱" input-align="right" />
      <van-cell required title="最高学历" is-link :value="xueli" @click="xueliOption()">
        <i slot="right-icon" class="iconfont iconto"></i>
      </van-cell>
      <van-cell required title="毕业时间" is-link :value="biyeDate" @click="graduationDate()">
        <i slot="right-icon" class="iconfont iconto"></i>
      </van-cell>
      <van-cell required title="所在城市" is-link :value="grListText" @click="grLists()">
        <i slot="right-icon" class="iconfont iconto"></i>
      </van-cell>
      <van-field v-model="beizhu" label="备注" input-align="right" />
      <van-checkbox v-model="checked" shape="square">
        我已阅读并同意
        <span class="statement" @click="$router.push('/statement')">《个人信息保护声明》</span>
      </van-checkbox>
    </van-cell-group>
    <!-- 报考弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <ul class="listn">
        <li
          :class="item.text==classIndex1?'active_on':''"
          v-for="item in option1"
          :key="item.value"
          @click="changeOption(item.value,item.text)"
        >{{item.text}}</li>
      </ul>
    </van-popup>
    <!-- 性别选择弹出层 -->
    <van-popup class="GenderPop" v-model="showPopup" :style="{ width:'85%',height: '21%' }">
      <span>选择性别</span>
      <van-radio-group class="GenderPopup" v-model="radio">
        <van-radio name="1" label-position="left" @click="GenderChange(radio)">男</van-radio>
        <van-radio name="2" label-position="left" @click="GenderChange(radio)">女</van-radio>
      </van-radio-group>
    </van-popup>
    <!-- 年月日选择器 -->
    <van-popup v-model="Datashow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="sub"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="Datashow = false"
      />
    </van-popup>
    <!-- 学历弹出层 -->
    <van-popup
      v-model="xuelipro"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <ul class="listn">
        <li
          :class="item.value==classIndex2?'active_on':''"
          v-for="item in option2"
          :key="item.value"
          @click="changeXueli(item.value,item.text)"
        >{{item.text}}</li>
      </ul>
    </van-popup>
    <!-- 毕业时间选择器 -->
    <van-popup v-model="graduationDateShow" position="bottom" :style="{ height: '40%' }">
      <!-- <van-datetime-picker
        v-model="currentDates"
        type="year-month"
        @confirm="subs"
        :min-date="minDates"
        :max-date="maxDate"

      />-->
      <van-picker
        :default-index="45"
        show-toolbar
        :columns="biyeList"
        @confirm="subs"
        @cancel="graduationDateShow = false"
      />
    </van-popup>
    <!--省市区 -->
    <van-popup v-model="grList" position="bottom" :style="{ height: '40%' }">
      <van-area :area-list="areaList" value="110101" @confirm="grListWc" @cancel="grList=false" />
    </van-popup>
    <van-button class="btntj" :disabled="!checked" type="info" @click="tj()">提交</van-button>
    <div class="conter">
      <h3>温馨提示</h3>
      <p>一、按照报名表所列各项如实填写，方便审核</p>
      <p>二、报名成功后，会出现报名成功页面</p>
      <p>
        三、如有任何问题，请拨打电话
        <span>40004-98986</span>
      </p>
      <p>四、如遇到占线或无人接听，请填写报名表，我们会在第一时间与你联系</p>
    </div>
  </div>
</template>

<script>
import gtList from '@/utils/gtList.js'
import biyeList from '@/utils/biyeList.js'
import Qs from 'qs'
export default {
  data () {
    return {
      biyeList: [],
      graduationDateShow: false,
      xuelipro: false,
      grList: false,
      grListText: '请选择',
      areaList: [],
      // currentDates: new Date(1990, 1, 1),
      // minDates: new Date(1955, 1, 1), // 00
      minDate: new Date(1955, 1, 1), // 90
      maxDate: new Date(),
      currentDate: new Date(2000, 1, 1),
      biyeDate: '请选择',
      Datashow: false,
      radio: '',
      showPopup: false,
      islx: '请选择报考类型',
      checked: true,
      show: false,
      zy: '',
      school: '',
      username: '',
      sex: '请选择',
      date: '请选择',
      phone: '',
      email: '',
      xueli: '请选择',
      biye: '',
      city: '',
      beizhu: '',
      value1: '', // 报考
      classIndex1: '',
      value2: '', // 最高学历
      classIndex2: '',
      option1: [
        { text: '同等学力', value: '1' },
        { text: '专业硕士', value: '2' },
        { text: '国际硕士', value: '3' },
        { text: '中外合办', value: '4' },
        { text: '在职博士', value: '5' },
        { text: '国际博士', value: '6' },
        { text: '高级研修', value: '7' }
      ],
      option2: [
        { text: '高中及以下', value: '1' },
        { text: '中专', value: '2' },
        { text: '大专', value: '3' },
        { text: '本科在读', value: '4' },
        { text: '本科无学位', value: '5' },
        { text: '本科有学位', value: '6' },
        { text: '硕士', value: '7' },
        { text: '博士', value: '8' }
      ]
    }
  },
  created () {
    console.log(gtList)
    console.log(biyeList)
    this.areaList = gtList // 地址数据
    this.biyeList = biyeList.biye_list
  },
  activated () {
    // 判断携带参数 填充数据
    if (this.$route.query.gdpx) {
      var obj = { text: '高端培训', value: '8' }
      this.option1.push(obj)
      this.value1 = this.option1[this.$route.query.gdpx - 1].text
      this.classIndex1 = this.option1[this.$route.query.gdpx - 1].text
      this.islx = this.option1[this.$route.query.gdpx - 1].text
    }
    if (this.$route.query.xy) {
      this.school = this.$route.query.xy
    }
    if (this.$route.query.lx) {
      this.value1 = this.option1[this.$route.query.lx - 1].text
      this.classIndex1 = this.option1[this.$route.query.lx - 1].text
      this.islx = this.option1[this.$route.query.lx - 1].text
    }
    if (this.$route.query.xy) {
      this.school = this.$route.query.xy
    }
    if (this.$route.query.zy) {
      this.zy = this.$route.query.zy
    }
  },
  mounted () {
    // 判断携带参数 填充数据
    if (this.$route.query.gdpx) {
      var obj = { text: '高端培训', value: '8' }
      this.option1.push(obj)
      this.value1 = this.option1[this.$route.query.gdpx - 1].text
      this.classIndex1 = this.option1[this.$route.query.gdpx - 1].text
      this.islx = this.option1[this.$route.query.gdpx - 1].text
    }
    if (this.$route.query.xy) {
      this.school = this.$route.query.xy
    }
    if (this.$route.query.lx) {
      this.value1 = this.$route.query.lx
      this.classIndex1 = this.$route.query.lx
      this.islx = this.option1[this.$route.query.lx - 1].text
    }
    if (this.$route.query.xy) {
      this.school = this.$route.query.xy
    }
    if (this.$route.query.zy) {
      this.zy = this.$route.query.zy
    }
  },

  methods: {
    grListWc (value) {
      var c = value[0].name
      var s = value[1].name
      var q = value[2].name
      this.grListText = c + '  ' + '  ' + s + '  ' + q
      this.grList = false
    },
    grLists () {
      this.grList = true
    },
    graduationDate () {
      // 毕业时间
      this.graduationDateShow = true
    },
    subs (value) {
      // 毕业时间确定
      // this.$moment(new Date(value)).format('YYYY-MM-DD')
      this.biyeDate = value
      this.graduationDateShow = false
    },
    xueliOption () {
      // 学历选择
      this.xuelipro = true
    },
    sub (value) {
      // 日期选择
      this.date = this.$moment(new Date(value)).format('YYYY-MM-DD')
      this.Datashow = false
    },
    DateBirth () {
      this.Datashow = true
    },
    // 男女选择
    GenderChange (radio) {
      if (radio === '1') {
        this.sex = '男'
      }
      if (radio === '2') {
        this.sex = '女'
      }
      this.showPopup = false
    },
    Gender () {
      this.showPopup = true
    },
    changeOption (value, name) {
      this.islx = name
      this.value1 = name
      this.classIndex1 = this.value1
      console.log(this.value1, this.classIndex1)
      this.show = false
    },
    changeXueli (value, name) {
      this.xueli = name
      this.value2 = value
      this.classIndex2 = value
      this.xuelipro = false
    },
    ale () {
      this.show = !this.show
    },

    tj () {
      // if (
      //   !this.username ||
      //   !this.phone ||
      //   !this.zy ||
      //   !this.school ||
      //   !this.sex ||
      //   !this.date ||
      //   !this.email ||
      //   !this.xueli ||
      //   !this.xueli ||
      //   !this.biyeDate ||
      //   !this.grListText
      // ) {
      //   this.$toast('为*项必填')
      //   return false
      // }
      if (!this.zy) {
        this.$toast('意向专业不能为空')
        return false
      }
      if (!this.school) {
        this.$toast('意向学校不能为空')
        return false
      }
      if (!this.username) {
        this.$toast('姓名不能为空')
        return false
      }
      // 验证姓名是否为汉字
      var reg = /^[\u4e00-\u9fa5]+$/
      if (reg.test(this.username)) {
      } else {
        this.$toast('姓名必须为汉字')
        return false
      }

      if (!this.sex || this.sex === '请选择') {
        this.$toast('性别不能为空')
        return false
      }

      // 姓名必须是汉字 邮箱验证 毕业时间
      if (!this.date || this.date === '请选择') {
        this.$toast('出生日期不能为空')
        return false
      }
      if (!this.phone) {
        this.$toast('手机号不能为空')
        return false
      }
      let yz = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!yz.test(this.phone)) {
        this.$toast('手机号错误')
        return false
      }
      if (!this.email) {
        this.$toast('邮箱不能为空')
        return false
      }

      var regEmail = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      if (regEmail.test(this.email)) {
      } else {
        this.$toast('请填写正规的邮箱格式')
        return false
      }
      if (!this.xueli || this.xueli === '请选择') {
        this.$toast('学历不能为空')
        return false
      }
      if (!this.biyeDate || this.biyeDate === '请选择') {
        this.$toast('毕业时间不能为空')
        return false
      }

      if (!this.grListText || this.grListText === '请选择') {
        this.$toast('所在城市不能为空')
        return false
      }
      if (this.value1 === '' || this.islx === '请选择报考类型') {
        this.$toast('请选择报考类型')
        return false
      }
      const dada = Qs.stringify({
        lx: this.value1,
        name: this.username,
        dh: this.phone,
        zy: this.zy,
        xx: this.school,
        xb: this.sex,
        csrq: this.date,
        yx: this.email,
        xl: this.xueli,
        bysj: this.biyeDate,
        dq: this.grListText,
        bz: this.beizhu
      })
      this.$http({
        method: 'post',
        data: dada,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/form_jh'
      }).then(res => {
        res = res.data.data
        if (res.status === 99) {
          this.$router.push('/signUpSusses')
          this.islx = '请选择报考类型'
          this.username = ''
          this.phone = ''
          this.zy = ''
          this.school = ''
          this.sex = '请选择'
          this.date = '请选择'
          this.email = ''
          this.xueli = '请选择'
          this.biyeDate = '请选择'
          this.grListText = '请选择'
          this.beizhu = ''
          this.value1 = ''
          this.classIndex1 = ''
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
/deep/ .van-hairline--top-bottom::after {
  border-width: 0px;
}

.van-popup {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.iconto {
  font-size: 11px;
  color: rgb(204, 204, 204);
  padding-left: 10px;
}
.conter {
  width: 335px;
  margin: 0 auto;
  padding-top: 80px;
  h3 {
    padding: 3px 0px;
    font-size: 15px;
    color: rgb(89, 89, 89);
  }
  p {
    color: rgb(128, 128, 128);
    margin: 0;
    padding: 5px 0px;
    line-height: 25px;
    font-size: 14px;
    span {
      color: rgb(255, 190, 105);
    }
  }
}
// 弹出层
.GenderPop {
  border-radius: 8px;
  .van-button {
    background: rgb(74, 88, 255);
    color: #fff;
    width: 295px;
    height: 40px;
    border-radius: 20px;
    margin-left: 10px;
    border: none;
  }
  span {
    display: block;
    margin: 15px auto;
    width: 60px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.GenderPopup {
  text-align: center;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .van-radio {
    height: 30px;
  }
  /deep/.van-radio__label {
    margin-right: 170px;
  }
}
.van-cell__right-icon {
  line-height: 34px;
}
.van-cell{
}
.listn {
  width: 375px;
  margin: 0 auto;
  padding: 30px 0px 0px 0px;
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
.van-checkbox {
  padding-top: 20px;
  padding-left: 10px;
}
/deep/ .van-checkbox__label {
  font-size: 12px;
  color: rgb(153, 153, 153);
  padding-top: 5px;
}
.statement {
  color: rgb(74, 88, 255);
}
.content {
  width: 355px;
  margin: 0 auto;
}
.van-cell-group {
  width: 355px;
  margin-top: 10px;
}
/deep/ .van-cell:not(:last-child)::after{
  width: 335px;
      left: 12px;
}
.van-cell {
  height: 54px;
  line-height: 34px;
}
/deep/ .van-cell__title {
  span {
    color: rgb(102, 102, 102);
  }
}
.btntj {
  width: 335px;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  border: none;
  background: rgb(74, 88, 255);
  float: right;
  margin-top: 20px;
}
.jz {
  position: relative;
  .van-button {
    width: 315px;
    height: 44px;
    left: 50%;
    margin-top: 70px;
    margin-left: -157px;
    .van-icon {
      margin-left: 10px;
      top: 2px;
    }
  }
}
</style>
