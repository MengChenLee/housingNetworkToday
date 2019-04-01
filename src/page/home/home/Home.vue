<template>
  <th-layout>
    <div slot="header">
      <th-home-header></th-home-header>
      <baidu-map @ready="handler"></baidu-map>
    </div>
    <div ref='cont' v-infinite-scroll="loadMore" infinite-scroll-distance="20">
      <th-swiper :bannerList="homeData && homeData.topAds" ></th-swiper>
      <th-menu :menuList="homeData && homeData.iconLink"></th-menu>
      <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['news']"></th-cell>
      <th-home-news :newsList="homeData && homeData.news"></th-home-news>
      <th-ad :adList="homeData && homeData.middleAds" :adType="homeData.middleAds.length > 3? 7:homeData.middleAds.length" @click="dealAdLink"></th-ad>
      <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['propertyActivity']"></th-cell>
      <th-slide-property-activity :slidePropertyActivityList="homeData && homeData.activityList" v-if="homeData && homeData.activityList"></th-slide-property-activity>
      <th-cell :isHomeCell="true" :cellData="cellData['nearbyMap']">
        <div class="th_locate" @click="freshLocate">{{(location.district + location.street) || '无详细定位'}}</div>
      </th-cell>
      <th-nearby-map :propertyList="homeData && homeData.nearBuilding && [homeData.nearBuilding]"></th-nearby-map>
      <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['propertyRecommend']"></th-cell>
      <th-property-list :propertyList="homeData && homeData.todayCommendList"></th-property-list>
      <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['property']"></th-cell>
      <th-property-list :propertyList="homeData && homeData.commendList"></th-property-list>
      <div class="more_loading">
        <span v-show="loading&&!allLoaded">加载中...</span>
        <span v-show="allLoaded">已全部加载</span>
      </div>
       <mt-popup
        v-model="popupVisible"
        v-if="homeData.posterAds"
        :closeOnClickModal="false"
        popup-transition="popup-fade">
        <div class="imgBox">
            <div class="imgBox-cont" :style="'background-image: url('+homeData.posterAds.picPath+')'" @click="dealAdLink(homeData.posterAds)"></div>
            <img class="close" :src="close" @click="popupVisible = false"/>
        </div>
      </mt-popup>
    </div>
    <th-footer-tab slot="footer" :active="'home'"></th-footer-tab>
  </th-layout>
</template>

<script>
import {setHomeData} from '../../../common/httpClient.js'
// import md5 from 'js-md5'setLogin

import ThSwiper from '../../../components/swiper/Swiper.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThAd from './ad/ad/ad'
import ThMenu from './menu/menu'
import ThHomeNews from './homeNews/homeNews'
import ThNearbyMap from './nearbyMap/nearbyMap'
import ThSlidePropertyActivity from './slidePropertyActivity/slidePropertyActivity'
import ThHomeHeader from './homeHeader/homeHeader'
import ThFooterTab from '../../../components/common/layout/footerTab/FooterTab.vue'
import close from './imgs/close.png'
export default {
  data () {
    return {
      homeData: {
        middleAds: []
      },
      geolocation: null,
      cellData: {
        news: {
          title: '今日头条',
          linkUrl: 'http://h5.jrfw360.com/recommend',
          value: '更多',
          active: 3
        },
        propertyActivity: {
          title: '热门活动',
          linkUrl: 'http://h5.jrfw360.com/recommend',
          value: '更多',
          active: 1
        },
        propertyRecommend: {
          title: '今日优推',
          linkUrl: 'http://h5.jrfw360.com/recommend',
          value: '更多',
          active: 2
        },
        nearbyMap: {
          title: '附近地图',
          linkUrl: '',
          value: ''
        },
        property: {
          title: '推荐楼盘',
          linkUrl: 'http://h5.jrfw360.com/findHouse',
          value: '更多'
        }
      },
      popupVisible: false,
      close: close,
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  components: {
    ThSwiper,
    ThMenu,
    ThHomeNews,
    ThAd,
    ThSlidePropertyActivity,
    ThNearbyMap,
    ThPropertyList,
    ThHomeHeader,
    ThFooterTab
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
    locate: {
      handler (val, oldVal) {
        JSON.stringify(val) + '' !== JSON.stringify(oldVal) + '' && this.getData()
      },
      deep: true
    }
  },
  mounted () {
    this.getData()
  },
  // activated () {
  //   this.$refs.cont.scrollTop = this.$route.meta.scrollTop
  // },
  methods: {
    handler ({BMap, map}) {
      this.geolocation = new BMap.Geolocation()
      this.freshLocate()
    },
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    getData () {
      let data = {
        cityId: this.location.selectCityId || this.location.cityId,
        cityName: this.location.selectCity || this.location.city,
        lat: this.location.lat,
        lng: this.location.lng,
        pageNo: this.pageNo,
        pageSize: 10
      }
      setHomeData(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.commendList.length !== 10
          if (this.pageNo === 1) {
            this.homeData = cont
            this.popupVisible = true
          } else {
            this.homeData.commendList.push(...cont.commendList)
          }
          if (this.homeData.cityId) {
            this.$store.commit('locate/setLocation', Object.assign({}, this.location, {
              cityId: this.homeData.cityId
            }))
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    freshLocate () {
      let self = this
      this.geolocation.enableSDKLocation()
      this.geolocation.getCurrentPosition(function (r) {
        self.$store.commit('locate/setLocation', Object.assign({}, this.location, {
          cityId: self.location.cityId,
          province: r.address.province,
          city: r.address.city,
          district: r.address.district,
          street: r.address.street,
          lat: r.point.lat,
          lng: r.point.lng
        }))
      })
      this.toast('定位刷新成功')
    },
    dealAdLink (item) {
      item.linkUrl && this.dealLink(item.linkUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.th_locate{
  position: relative;
  padding-right:1rem;
  &:after {
    content: " ";
    top: 0;
    position: absolute;
    right: 0;
    width: .7rem;
    height: .7rem;
    margin-top: .9rem;
    background-image: url('./imgs/fresh.png');
    background-size: cover;
  }
}
/deep/ .mint-popup{
  background-color: rgba(0, 0, 0, 0);
  .imgBox{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .imgBox-cont{
      width: 12.15rem;
      height:16.8rem ;
      background-size: cover;
      border-radius: @borderRadius;
    }
    .close{
      width:1.4rem ;
      margin: 0 auto;
      display: block;
      margin-top:2.3rem;
    }
  }
}
</style>
