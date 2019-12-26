<template>
  <!-- 热门学校滑动 -->
  <div class="content">
    <div class="toch">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="item in Rmxx" :key="item.id" v-lazy="item">
          <div class="baner" @click="tz(item.id,item.catid)">
            <img class="logo" :src="'https://www.125yan.com/Uploads/'+item.thumb" alt />
            <h2>{{item.title}}</h2>
            <p>
              简章：
              <span style="font-family:'PingFangSC-Regular';">{{item.jz_num}} 篇</span>
            </p>
            <div class="btn">
              <van-tag
                color="#FFF9F2"
                v-if="item.biaozhi[0]"
                text-color="#FFD0AA"
              >{{item.biaozhi[0]}}</van-tag>
              <van-tag
                color="#F8FAFF"
                v-if="item.biaozhi[1]"
                text-color="#85A6FF"
              >{{item.biaozhi[1]}}</van-tag>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="cli"></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Qs from 'qs'
import 'swiper/dist/css/swiper.css'
export default {
  props: ['isNzxx'],
  components: { swiper, swiperSlide },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      Rmxx: []
    }
  },
  activated () {
    console.log(this.isNzxx)
    if (!this.$route.params.id) {
      this.getRmxx()
    } else {
      this.getRmxx_zyss()
    }
  },
  created () {
    if (!this.$route.params.id) {
      this.getRmxx()
    } else {
      this.getRmxx_zyss()
    }
  },
  methods: {
    // 跳转学校首页
    tz (id, catid) {
      if (this.isNzxx === 1) {
        // 跳转到学校类型
        this.$router.push({ path: `/schoolClass/${id}`, query: { id: id, lx: this.$route.query.lx } })
      } else if (this.isNzxx === 2) {
        this.$router.push({ path: `/schoolClass/${id}`, query: { id: id, lx: this.$route.query.lx } })
      } else if (this.isNzxx === 3) {
        this.$router.push({ path: `/schoolClass/${id}`, query: { id: id, lx: this.$route.query.lx } })
      } else {
        this.$router.push(`/schoolHome/${id}`)
      }
    },
    // 热门学校
    getRmxx () {
      const dada = Qs.stringify({
        area_id: this.$store.state.indexRefresh
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/rmxx',
        data: dada
      })
        .then((res) => {
          this.Rmxx = res.data.data
        })
    },
    // 专业硕士热门学校
    getRmxx_zyss () {
      const dada = Qs.stringify({
        major0: this.$route.params.id,
        area_id: this.$store.state.indexRefresh
      })
      this.$http({
        method: 'post',
        url: 'https://www.125yan.com/interface.php?s=/Home/Index/zyss_rmxx',
        data: dada
      }).then(res => {
        console.log(res.data.data)
        this.Rmxx = res.data.data
      })
    }
  }

}
</script>

<style lang="less" scoped>
.toch {
  margin: 0 auto;
}
.swiper-container {
  .swiper-slide {
    width: 105px !important;
    margin-left: 20px;
    .baner {
      box-shadow: 0px 0px 11px 0px rgba(176, 183, 231, 0.11);
      width: 140px;
      height: 176px;
      position: relative;
      .logo {
        width: 56px;
        height: 56px;
        padding: 20px 42px 5px 42px;
      }
      h2 {
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        height: 16px;
        line-height: 16px;
        overflow: hidden;
        font-weight: normal;
        color: rgb(51, 51, 51);
        text-align: center;
        position: relative;
        margin: 0px;
      }
      p {
        font-family: 'PingFangSC-Semibold';
        font-size: 11px;
        color: #6f6f6f;
        text-align: center;
        padding: 0px;
        height: 25px;
        margin: 5px;
        line-height: 25px;
      }
      .btn {
        height: 10px;
        line-height: 10px;
        text-align: center;
        .van-tag {
          font-family: 'PingFangSC-Medium';
          margin-right: 5px;
          text-align: center;
          border: none;
        }
      }
    }
    .cli {
      width: 380px;
      height: 140px;
    }
  }
}
</style>
