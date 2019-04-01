<template>
  <div class="th_userInfo_swipe" >
    <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,i) in list" :key="i">
            <div class="th_userInfo_item" :style="'background-image: url('+item.dynamicCoverForUser+')'">
              <div class="th_userInfo_item-photo"><th-img-box :imgUrl="item.photo"></th-img-box></div>
              <div class="th_userInfo_item-cont">
                <p class="th_userInfo_item-name"><span>{{item.name}}</span></p>
                <div class="FontSize10 th_userInfo_item-identifier">{{item.identifier||'职位'}}</div>
                <div class="FontSize10">公司名称：{{item.companyName}}</div>
                <div class="FontSize10">服务区域：{{item.address}}</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    list: {
      type: Array
    },
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      swipeX: 0,
      swipeX_start: -1,
      swiperOption: {
        centeredSlides: true,
        slidesPerView: 1.1,
        on: {
          slideChangeTransitionEnd: () => {
            this.$emit('getActiveIndex', this.$refs.mySwiper.swiper.activeIndex)
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    activeIndex (val) {
      this.$refs.mySwiper.swiper.slideTo(val)
    }
  },
  mounted () {

  },
  created () {
  },
  methods: {
    click (id) {
      this.$router.push({name: 'buildingDetail', params: {id: id}})
    }
  }
}
</script>

<style lang="less" scoped>
.th_userInfo_swipe{
  .th_userInfo_item{
    height: 7rem;
    padding: 1rem;
    margin-top: .5rem;
    background-size: cover;
    display: flex;
    align-items:center;
    border-radius: @borderRadius;
    .th_userInfo_item-photo{
      width: 4.375rem;
      border-radius: 50%;
      overflow: hidden;
    }
    .th_userInfo_item-cont{
      color: @cf;
      overflow: hidden;
      font-size: @FontSize18;
      flex: 1;
      padding-left: 1rem;
      .th_userInfo_item-name{
        font-size: @FontSize18;
      }
      .th_userInfo_item-identifier{
        margin-bottom: .25rem;
      }
    }
  }
}
</style>
