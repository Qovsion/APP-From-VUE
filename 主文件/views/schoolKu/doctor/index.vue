<template>
  <div class="content">
    <van-nav-bar title="在职博士" @click-left="$router.back()" left-arrow>
       <i slot="left" class="iconfont iconfanhui"></i>
    </van-nav-bar>
    <div class="content-con" >
      <div class="con_list" v-for="(item,i) in Zzss" :key="item.tjxh" @click="turn(item.lx,i)">
        <div class="no_fl">
          <van-tag round >途径{{item.tjxh}}</van-tag>
          <h3>
            {{item.lxmc}}
          </h3>
          <van-rate :value="item.px" :count="item.px" bind:change="onChange" />
        </div>
        <ul>
          <li>入学方式：{{item.rxfs}}</li>
          <li>报名时间：{{item.bmsj}}</li>
          <li>考试时间：{{item.kssj}}</li>
        </ul>
        <p>
          <i>
            时长:
            <b class="time">&nbsp;{{item.sc}}</b>
          </i>
          <i>
            费用:
            <b class="qian">&nbsp;{{item.fy}}</b>
          </i>
        </p>
        <h5>
          <van-tag plain v-show="item.zs[0]">{{item.zs[0]}}</van-tag>
          <van-tag plain v-show="item.zs[1]">{{item.zs[1]}}</van-tag>
        </h5>
      </div>
    </div>
    <on-tabber></on-tabber>
  </div>
</template>

<script>
import Qs from 'qs'
// import Tabber from '@/components/on-tabber'
export default {
  // components: { 'on-tabber': Tabber },
  data () {
    return {
      value: 5,
      count: 5,
      Zzss: []
    }
  },
  created () {
    this.getZzss()
  },
  methods: {
    turn (id, i) {
      this.$router.push({ path: `/OnlinePhD/${id}`, query: { lx: this.Zzss[i].lx, name: this.Zzss[i].lxmc } })
    },
    onChange (event) {
      this.setData({
        value: event.detail
      })
    },
    // 在职硕士
    getZzss () {
      const dade = Qs.stringify({
        fl: 2
      })
      this.$http({
        method: 'post',
        data: dade,
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zzss'
      })
        .then((res) => {
          console.log(res)
          this.Zzss = res.data.data
        })
    }

  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  width: 375px;
  position: fixed;
  top: 0;
}
.no_fl {
  height: 50px;
  display: flex;
  line-height: 40px;
  .van-tag {
    padding: 4px 12px;
    margin-left: 20px;
    height: 10px !important;
    margin-top: 27px !important;
    background-image: linear-gradient(
      to right,
      rgb(255, 126, 78),
      rgb(255, 186, 94)
    );
  }
}
.content-con {
  padding-top: 50px;
  padding-bottom: 70px;
  width: 355px;
  margin: 0 auto;
  .con_list {
    width: 100%;
    height: 165px;
    background: url('../../../assets/images/bj_zzss.png') no-repeat center;
    background-size: 355px 165px;
    position: relative;
    .van-tag {
    }
    h3 {
      color: rgb(51, 51, 51);
      font-family: 'PingFangSC-Medium';
      padding-left: 10px;
      font-size: 15px;
    }
    .van-rate {
      position: absolute;
      right: 20px;
      top: 25px;
      // margin: 18px 20px 0px 0px;
    }
    ul {
      list-style: none;
      padding-left: 20px;
      li {
        height: 22px;
        line-height: 22px;
        color: #6e6e6e;
        font-size: 13px;
      }
    }
    p {
      font-family: 'PingFangSC-Light';
      float: left;
      font-size: 12px;
      color: rgb(102, 102, 102);
      padding-left: 20px;
      i {
        padding-right: 8px;
        font-style: normal;
        b {
          font-weight: normal;
          font-family: 'PingFangSC-Regular';
          color: rgb(74, 88, 255);
          font-size: 13px;
          padding-left: 2px;

        }
         .time{
              color: rgb(74, 88, 255);
          }
          .qian{
             color: rgb(255, 156, 86);
          }
      }
    }
    h5 {
      position: absolute;
      right: 20px;
      bottom: 16px;
      padding: 0;
      margin: 0;
      float: right;
      .van-tag {
        height: 16px;
        margin: 0px 0px 0px 10px;
        color: rgb(95, 115, 255);
        &:nth-child(2) {
          color: rgb(255, 156, 86);
        }
      }
    }
  }
}
</style>
