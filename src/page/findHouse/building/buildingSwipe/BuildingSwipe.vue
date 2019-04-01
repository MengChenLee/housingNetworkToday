<template>
  <div class="th_building_swipe" >
    <swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,i) in buildList" :key="i" >
            <div class="th_building_item" @click="click(item.id)">
              <p class="th_building_item-name"><span>{{item.buildingName}}</span></p>
              <ul class="th_building_item-time">
                <li>近期开盘：{{item.beginSellDate | formatTime}}</li>
                <li>近期入住：{{item.checkInDate | formatTime}}</li>
              </ul>
              <ul>
                <li>单元：<span>{{item.unitNum}}单元</span></li>
                <li>梯户比：<span>{{item.ratio}}</span></li>
                <li>层数：<span>{{item.floor}}层</span></li>
                <li>在售房：<span>{{item.saleType}}</span></li>
              </ul>
            </div>
          </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    buildList: {
      type: Array
    },
    activeIndex: {
      type: Number
    }
  },
  data () {
    return {
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
.th_building_swipe{
  margin-top: .5rem;
  .th_building_item{
    margin: .25rem;
    padding: .5rem 1rem;
    box-shadow:0px 1px 5px rgba(0,0,0,0.3);
    .th_building_item-name{
      font-size: @FontSize15;
      span{
        display:inline-block;
        vertical-align:middle;
        margin-left: .5rem;
      }
      &::before{
        content: '';
        width: .5rem;
        height: .5rem;
        display: inline-block;
        background-color: @cTheme;
        border-radius: 50%;
        display:inline-block;
        vertical-align:middle;
      }
    }
    ul{
      overflow: hidden;
      li{
        width: 50%;
        line-height: 1.2rem;
        float: left;
        font-size: @smallFontSize;
        color: @c9;
        span{
          color: @c3;
        }
      }
      &.th_building_item-time{
        padding-bottom: .5rem;
        margin-bottom: .5rem;
        border-bottom: 1px solid @cD8D8D8;
      }
    }
  }
}
</style>
