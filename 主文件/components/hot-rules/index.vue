<template>
  <!-- 热门简章 -->
  <div class="content">
    <div class="list_rules">
      <div class="list_s" v-for="(item,i) in hotRmjz" :key="item.id" @click="rulesDel(item.id,i)">
        <div class="logo left">
          <img :src="'https://www.125yan.com/Uploads/' + item.s_thumb" />
        </div>
        <div class="font">
          <div class="font-w">
            <h3>{{item.short_title}}</h3>
            <!-- <span>{{item.leixing}}</span> -->
            <span class="lx" style="color:#7CC982;" v-if="item.leixing==='同等学力'">{{item.leixing}}</span>
            <span class="lx" style="color:#70A5FF;" v-if="item.leixing=='专业硕士'">{{item.leixing}}</span>
            <span class="lx" style="color:#FF7977;" v-if="item.leixing=='国际硕士'">{{item.leixing}}</span>
            <span class="lx" style="color:#FF9C4D;" v-if="item.leixing=='中外合办'">{{item.leixing}}</span>
            <span class="lx" style="color:#878DC1;" v-if="item.leixing=='在职博士'">{{item.leixing}}</span>
            <span class="lx" style="color:#4C6E99;" v-if="item.leixing=='国际博士'">{{item.leixing}}</span>
            <span class="lx" style="color:#A8BA9A;" v-if="item.leixing=='高级研修'">{{item.leixing}}</span>
          </div>
          <span class="min_title">{{item.s_title}}/{{item.c_title}}</span>
        </div>
        <div class="right icon_xf">
          <van-tag type="warning">
            <span>{{item.money/10000}}</span>万
          </van-tag>
        </div>
        <span class="hang">{{item.title}}</span>
        <div class="tag">
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.m_title}}</van-tag>
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.length}}</van-tag>
          <van-tag color="#F6F8FF" text-color="#93B1FF">{{item.fangshis[0]}}</van-tag>
        </div>
      </div>

      <div class="log">
        <van-button class="more" :loading="loading" type="info" @click="load()">查看更多</van-button>
      </div>
      <!-- <on-grid></on-grid> -->
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {

  data () {
    return {
      hotRmjz: [],
      loading: false
    }
  },
  activated () {
    if (!this.$route.params.id) {
      this.getRmzj()
    } else {
      this.getRmjz_zyss()
    }
    // if (this.$store.state.majorMaster_rules === true && this.$store.state.OnlinePhD_rules === true && this.$store.state.AdvancedStudies_rules === true) {
    //   this.getRmzj()
    // } else {
    //   this.getRmzj()
    //   this.$store.state.majorMaster_rules = true
    //   this.$store.state.OnlinePhD_rules = true
    //   this.$store.state.AdvancedStudies_rules = true
    // }
  },
  created () {
    if (!this.$route.params.id) {
      this.getRmzj()
    } else {
      this.getRmjz_zyss()
    }
    // if (this.$store.state.majorMaster_rules === true && this.$store.state.OnlinePhD_rules === true && this.$store.state.AdvancedStudies_rules === true) {
    //   this.getRmzj()
    // } else {
    //   this.getRmjz_zyss()
    //   this.$store.state.majorMaster_rules = true
    //   this.$store.state.OnlinePhD_rules = true
    //   this.$store.state.AdvancedStudies_rules = true
    // }
  },
  methods: {
    // 热门简章
    getRmzj () {
      const dada = Qs.stringify({
        area_id: this.$store.state.indexRefresh
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/rmjz',
        data: dada
      })
        .then((res) => {
          this.hotRmjz = res.data.data
        })
    },
    getRmjz_zyss () {
      const dada = Qs.stringify({
        major0: this.$route.params.id,
        area_id: this.$store.state.indexRefresh
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zyss_rmjz',
        data: dada
      }).then(res => {
        this.hotRmjz = res.data.data
      })
    },
    rulesDel (id, i) {
      this.$router.push({ path: '/rulesDel', query: { rlid: id, zy: this.hotRmjz[i].m_title, xy: this.hotRmjz[i].s_title } })
    },
    // 点击加载
    load () {
      this.$router.push('/jzsx')
    }

  }
}
</script>

<style lang="less" scoped>
.left {
  float: left;
}
.list_rules {
  width: 335px;
  margin: 0 auto;
  .list_s {
    margin: 0 auto;
    // padding: 0px 10px;
    border-radius: 8px;
    width: 335px;
    height: 144px;
    position: relative;
    margin-top: 5px;
    -moz-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    -webkit-box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
    .logo {
      width: 56px;
      height: 56px;
      margin: 15px 0px 0px 15px;
      img {
        width: 56px;
        height: 100%;
      }
    }
    .font {
      .font-w {
        width: 335px;
        height: 35px;
        line-height: 35px;
        h3 {
          font-weight: normal;
          font-family: 'PingFangSC-Medium';
          display: inline-block;
          font-size: 16px;
          color: rgb(51, 51, 51);
          padding-left: 8px;
        }
        span {
          font-family: 'PingFangSC-Light';
          padding-left: 8px;
          display: inline-block;
          font-size: 12px;
          color: rgb(102, 102, 102);
        }
      }
      .min_title {
        font-family: 'PingFangSC-Light';
        padding-left: 8px;
        font-size: 12px;
        color: rgb(102, 102, 102);
      }
    }
    .hang {
      color: rgb(51, 51, 51);
      font-family: 'PingFangSC-Light';
      width: 310px;
      font-size: 12px;
      float: left;
      margin-left: 20px;
      margin-top: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .icon_xf {
    position: absolute;
    right: 2px;
    top: 25px;
    color: #434343;
    span {
      font-size: 12px;
      font-weight: 600;
      font-family: 'PingFangSC-Medium';
    }

    .van-tag {
      font-size: 12px;
      font-weight: normal;
      font-family: 'PingFangSC-Medium';
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
      background: linear-gradient(
        to right,
        rgb(255, 186, 94),
        rgb(255, 126, 78)
      ) !important;
    }
  }
  .tag {
    position: absolute;
    bottom: 10px;
    border: none;
    margin-left: 15px;
    .van-tag {
      margin-right: 5px;
    }
  }
  .log {
    margin: 10px auto;
    width: 335px;

    .more {
      width: 100%;
      border: none;
      height: 40px;
      background: #f7faff;
      color: #85a6ff;
      border-radius: 20px;
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
