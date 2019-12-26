<template>
  <!-- 热门专业 -->
  <div class="content">
    <div class="items">
      <div class="itemn" v-for="item in hotMajor" :key="item.id" @click="zysx(item.id,item.major3)">
        <ul>
          <li>
            <h3>{{item.short_title.slice(0,5)}}</h3>
          </li>
          <li>
            <h4>
              简章
              <span>{{item.jz_num}}</span>篇
              <img src="../../assets/images/more_icon.png" alt />
            </h4>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data () {
    return {
      hotMajor: []
    }
  },
  activated () {
    if (!this.$route.params.id) {
      this.getMajor()
    } else {
      this.getMajor_zyss()
    }
    // if (this.$store.state.majorMaster_major === true && this.$store.state.OnlinePhD_major === true && this.$store.state.AdvancedStudies_major === true) {
    //   this.getMajor()
    // } else {
    //   this.getMajor_zyss()
    //   this.$store.state.majorMaster_major = true
    //   this.$store.state.OnlinePhD_major = true
    //   this.$store.state.AdvancedStudies_major = true
    // }
  },
  created () {
    if (!this.$route.params.id) {
      this.getMajor()
    } else {
      this.getMajor_zyss()
    }
    // if (this.$store.state.majorMaster_major === true && this.$store.state.OnlinePhD_major === true && this.$store.state.AdvancedStudies_major === true) {
    //   this.getMajor()
    // } else {
    //   this.getMajor_zyss()
    //   this.$store.state.majorMaster_major = true
    //   this.$store.state.OnlinePhD_major = true
    //   this.$store.state.AdvancedStudies_major = true
    // }
  },
  methods: {
    zysx (id, major3) {
      console.log(major3)
      this.$router.push({ path: `/zysx/${id}`, query: { major3: major3 } })
    },
    // 热门专业
    getMajor () {
      const dada = Qs.stringify({
        area_id: this.$store.state.indexRefresh
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/rmzy',
        data: dada
      })
        .then((res) => {
          this.hotMajor = res.data.data
        })
    },
    // 专业硕士热门专业
    getMajor_zyss () {
      const dada = Qs.stringify({
        major0: this.$route.params.id
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zyss_rmzy',
        data: dada
      }).then(res => {
        this.hotMajor = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.items {
  width: 355px;
  margin-left: 20px;
  overflow: hidden;
  .itemn {
    float: left;
    width: 104px;
    margin-top: 10px;
    height: 56px;
    margin-right: 10px;
    position: relative;
    border-radius: 4px;
    -moz-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.1);
    -webkit-box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.1);
    box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.1);
    ul {
      width: 49px;
      height: 36px;
      margin: 0px 0px 10px 5px;
      li {
        height: 5px;
        line-height: 10px;
        h3 {
          font-family: 'PingFangSC-Medium';
          width: 80px;
          padding: 0px 10px 0px 0px;
          font-size: 14px;
          color: rgb(51, 51, 51);
        }
        h4 {
          font-family: 'PingFangSC-Light';
          width: 90px;
          font-weight: normal;
          font-size: 11px;
          color: rgb(153, 153, 153);
          span {
            font-family: 'PingFangSC-Medium';
            color: rgb(74, 88, 255);
          }
          img {
            position: absolute;
            width: 15px;
            height: 15px;
            bottom: 8px;
            right: 10px;
          }
        }
      }
    }
  }
}
</style>
