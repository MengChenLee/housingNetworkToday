<template>
  <div class="th_property_map" ref="cont">
    <th-layout class="th_property_map-cont" :zoom="zoom">
      <baidu-map
        class="th_property_map-baidu"
        :center="center"
        :zoom="zoom"
        @dragend="dragend"
        @ready="handler"
        :scroll-wheel-zoom="true"
        ak="0iHcMzD3HRWeh2aHmVV0hbGZlWvr8och">
        <bm-marker :position="center"  :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="show = true">
          <bm-label content="当前楼盘位置" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -30, height: 30}"/>
          <bm-info-window :show="show" @close="show = false" @open="show = true">当前楼盘位置</bm-info-window>
        </bm-marker>
        <bm-local-search :keyword="keyword" :bounds="bounds" :page-capacity="100" :panel="false" @searchcomplete="searchcomplete"></bm-local-search>
      </baidu-map>
      <swiper :options="swiperOption" ref="mySwiper" class="mySwiper" slot="footer">
          <swiper-slide v-for="(item,i) in menuList" :key="i" >
            <div class="th_property_map_item" @click="click(item.text)">
              <div class="th_property_map_item-img"><th-img-box class="Th_propertyList-item-img" :imgUrl="keyword === item.text?item.img_active:item.img"></th-img-box></div>
              <p class="th_property_map_item-text"> {{item.text}}</p>
            </div>
          </swiper-slide>
        </swiper>
    </th-layout>
  </div>
</template>
<script>
import {BmlMarkerClusterer} from 'vue-baidu-map'
import MyOverlay from './myOverlay/MyOverlay.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import bus from './imgs/bus.png'
import busActive from './imgs/busActive.png'
import subway from './imgs/subway.png'
import subwayActive from './imgs/subwayActive.png'
import school from './imgs/school.png'
import schoolActive from './imgs/schoolActive.png'
import property from './imgs/property.png'
import propertyActive from './imgs/propertyActive.png'
import hospital from './imgs/hospital.png'
import hospitalActive from './imgs/hospitalActive.png'
import bank from './imgs/bank.png'
import bankActive from './imgs/bankActive.png'
import shop from './imgs/shop.png'
import shopActive from './imgs/shopActive.png'
import fitness from './imgs/fitness.png'
import fitnessActive from './imgs/fitnessActive.png'
import food from './imgs/food.png'
import foodActive from './imgs/foodActive.png'
export default {
  data () {
    return {
      // center: {lng: 121.224, lat: 31.0305},
      center: {lng: this.$route.query.lng, lat: this.$route.query.lat},
      show: false,
      bs: null,
      zoom: 15,
      map: null,
      BMap: null,
      keyword: '',
      swiperOption: {
        slidesPerView: 'auto',
        on: {
          slideChangeTransitionEnd: () => {
            this.$emit('getActiveIndex', this.$refs.mySwiper.swiper.activeIndex)
          }
        }
      },
      menuList: [
        {
          img: bus,
          img_active: busActive,
          text: '公交'
        },
        {
          img: subway,
          img_active: subwayActive,
          text: '地铁'
        },
        {
          img: school,
          img_active: schoolActive,
          text: '学校'
        },
        {
          img: property,
          img_active: propertyActive,
          text: '楼盘'
        },
        {
          img: hospital,
          img_active: hospitalActive,
          text: '医院'
        },
        {
          img: bank,
          img_active: bankActive,
          text: '银行'
        },
        {
          img: shop,
          img_active: shopActive,
          text: '购物'
        },
        {
          img: fitness,
          img_active: fitnessActive,
          text: '健身'
        },
        {
          img: food,
          img_active: foodActive,
          text: '餐饮'
        }
      ]
    }
  },
  computed: {
    bounds () {
      if (this.map) {
        return {
          sw: this.bs.Ol,
          ne: this.bs.xl
        }
      } else {
        return {
          sw: this.center,
          ne: this.center
        }
      }
    }
  },
  activated () {
  },
  components: {
    BmlMarkerClusterer,
    MyOverlay,
    swiper,
    swiperSlide
  },
  methods: {
    handler ({BMap, map}) {
      this.BMap = BMap
      this.map = map
      this.bs = this.map.getBounds() // 获取可视区域
    },
    click (keyword) {
      this.keyword = keyword
    },
    searchcomplete (results) {
      // console.log(results)
    },
    dragend () {
      this.bs = this.map.getBounds() // 获取可视区域
    }
  }
}
</script>
<style lang="less" scoped>
.th_property_map{
  height: 100%;
  .th_property_map-baidu{
    width: 100%;
    height: 100%;
  }
  /deep/ .swiper-slide{
    width: 2.5rem;
    text-align: center;
    font-size: @smallFontSize;
    .th_property_map_item-img{
      width: 1.2rem;
      margin: .3rem auto 0;
    }
  }
}
</style>
