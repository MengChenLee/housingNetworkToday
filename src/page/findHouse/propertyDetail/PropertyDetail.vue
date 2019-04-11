<template>
  <div class="th_property_detail">
    <th-layout ref="layBox" v-if="reFresh">
      <div class="th_property_detail-cont" ref="cont">
        <th-swiper :bannerList="bannerList" v-if="bannerList" @click="goBrowserRes"></th-swiper>
        <th-base-info :baseInfo="baseInfo" v-if="baseInfo" @openSubscribe="openSubscribe"></th-base-info>
        <th-promote :promoteInfo="promoteInfo" v-if="promoteInfo"></th-promote>
        <th-look-house :lookHouseInfo="baseInfo && baseInfo.houseServiceIds" @click="goLookHouse"></th-look-house>
        <th-dynamic :dynamic="dynamic" :propertyId="baseInfo && baseInfo.id"  :num='dynamicNum' v-if="dynamic" @openSubscribe="openSubscribe"></th-dynamic>
        <th-house-type :houseType='buildingModelType' :propertyId="baseInfo && baseInfo.id" :num='houseTypeNum' v-if="buildingModelType"></th-house-type>
        <th-building :baseInfo="baseInfo" v-if="baseInfo"></th-building>
        <th-surrounding :baseInfo="baseInfo" v-if="baseInfo"></th-surrounding>
        <th-exchange :buildScore="buildScore" v-if="buildScore"></th-exchange>
        <th-recommend :recommend="recommend" v-if="recommend" id="recommend"></th-recommend>
      </div>
      <th-footer
        slot="footer"
        ref="footer"
        :isFavorite="isFavorite"
        :booking="booking"
        @addFavorite="addFavorite"
        @addSubscribe="addSubscribe"
        @chat='chat'
        @goReport="goReport"
        @share="share">
      </th-footer>
    </th-layout>
  </div>
</template>

<script>
import {setPropertyDetail, addFavorite, addSubscribe, setGroupMsnList} from '../../../common/httpClient.js'
import ThSwiper from '../../../components/swiper/Swiper.vue'
import ThBaseInfo from './baseInfo/baseInfo'
import ThPromote from './promote/promote'
import ThLookHouse from './lookHouse/lookHouse'
import ThDynamic from './dynamic/dynamic'
import ThHouseType from './houseType/houseType'
import ThBuilding from './building/building'
import ThSurrounding from './surrounding/surrounding'
import ThExchange from './exchange/exchange'
import ThRecommend from './recommend/recommend'
import ThFooter from './footer/footer'
export default {
  data () {
    return {
      id: this.$route.params.id,
      type: this.$store.state.user.user.type,
      selected: '',
      bannerList: [
        // {
        //   linkUrl: '',
        //   picPath: 'http://img.jrfw360.com/manage/1540020385949.jpg'
        // }
      ],
      baseInfo: null,
      promoteInfo: null,
      buildScore: null,
      buildingModelType: null,
      houseTypeNum: 0,
      dynamic: null,
      dynamicNum: 0,
      recommend: {
        nearBuildingList: null,
        samePriceList: null,
        recommendFix: false
      },
      newsList: [],
      isFavorite: false, // 是否收藏
      shareInfo: {},
      reFresh: true,
      popupVisible: false, // 订阅面板
      booking: null // 订阅的数据
    }
  },
  components: {
    ThSwiper,
    ThBaseInfo,
    ThPromote,
    ThLookHouse,
    ThDynamic,
    ThHouseType,
    ThBuilding,
    ThSurrounding,
    ThExchange,
    ThRecommend,
    ThFooter
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    },
    location () {
      return this.$store.state.locate.location
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.params.id
    this.setPropertyDetail()
    this.$refs.cont.scrollTop = 0
    to.meta.scrollTop = 0
    next()
  },
  created () {
  },
  mounted () {
  },
  activated () {
    this.id = this.$route.params.id
    this.setPropertyDetail()
  },
  updated () {
    document.getElementsByClassName('th_property_detail-cont')[0].addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取滚动条高度
    handleScroll () {
      let recommendOffsetTop = document.getElementById('recommend').offsetTop
      let recommendScrollTop = document.getElementsByClassName('th_property_detail-cont')[0].scrollTop
      if (recommendOffsetTop < recommendScrollTop) {
        this.recommend.recommendFix = true
      } else {
        this.recommend.recommendFix = false
      }
      // console.log(document.getElementById('recommend').offsetTop)
    },
    setPropertyDetail () {
      let data = {
        'accountId': this.userInfo.id,
        'id': this.id,
        'lat': this.location.lat,
        'lng': this.location.lng
        // 'loginToken': this.userInfo.loginToken
      }
      this.reFresh = false
      setPropertyDetail(data).then((res) => {
        this.reFresh = true
        let cont = res && res.content
        this.bannerList.push({linkUrl: '', picPath: cont.buildingInfo.logo})
        this.bannerList = cont.buildingInfo && cont.buildingInfo.attachment
        this.baseInfo = cont.buildingInfo
        this.buildingModelType = cont.buildingModelType
        this.houseTypeNum = cont.buildingModelTypeSize
        this.baseInfo.buildTypeList = cont.buildTypeList
        this.promoteInfo = cont.activity
        this.buildScore = cont.buildScore
        this.dynamic = cont.buildingNews
        this.dynamicNum = cont.newsNum
        // this.$set(this.recommend, 'nearBuildingList', cont.nearBuildingList)
        this.recommend.nearBuildingList = cont.nearBuildingList
        this.recommend.samePriceList = cont.samePriceList
        this.shareInfo = cont.shareInfo
        this.wxShare(this.shareInfo)
        this.isFavorite = cont.isFavorite
        this.booking = cont.booking
        document.title = this.baseInfo.name
        this.$route.meta.title = this.baseInfo.name
      })
    },
    openSubscribe () {
      this.$refs.footer.subscribe()
    },
    addFavorite () {
      let data = {
        'accountId': this.userInfo.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'targetId': this.id,
        'targetType': 1 // 1楼盘 2新闻
      }
      addFavorite(data).then((res) => {
        if (res.code === 1) {
          this.isFavorite = res.content === 1
          this.toast(res.msg || '收藏')
        } else {
          this.toast('接口异常，请稍后再试')
        }
      })
    },
    addSubscribe (params) {
      let data = {
        'accountId': this.userInfo.id,
        'buildGroupId': this.$route.params.id,
        'discount': false,
        'news': false,
        'sale': false
      }
      addSubscribe(Object.assign(data, params)).then((res) => {
        if (res.code === 1) {
          this.toast(res.content || '订阅')
        } else {
          this.toast('接口异常，请稍后再试')
        }
      })
    },
    goBrowserRes (index) {
      this.$router.push({name: 'browserRes', params: {id: this.id}})
    },

    goReport () {
      this.$router.push({path: `/propertyReport/${this.id}`,
        query: {
          buildingGroupName: this.baseInfo.name,
          reportRemark: this.baseInfo.reportRemark
        }
      })
    },
    goLookHouse (type) {
      this.$router.push({path: `/propertyServiceDetail/${this.id}`,
        query: {
          type: type,
          buildingGroupName: this.baseInfo.name,
          reportRemark: this.baseInfo.reportRemark
        }})
    },
    chat () {
      let data = {
        'accountId': this.userInfo.id,
        'bulidingGroupId': this.id,
        'otherAccountId': '',
        'pageNo': 1,
        'pageSize': 10
      }
      setGroupMsnList(data).then((res) => {
        let cont = res && res.content
        this.$router.push({path: '/chat/' + cont.groupId})
      })
    },
    share () {
      this.wxShare(this.shareInfo, true)
    }
  }
}
</script>

<style lang="less" scoped>
.th_property_detail{
  height: 100%;
  position: relative;
  .th_property_detail-cont{
    width: 100%;
    // overflow: hidden;
    .th_swiper{
      padding-top: @imgBase;
      & /deep/ .mint-swipe{
        .mint-swipe-item{
          .th_img-box{
            padding-top: @imgBase
          }
        }
      }
    }
    /deep/ .th_cell{
      position: relative;
      &:after{
        content: '';
        width: calc(100% + @plrPage);
        height: 0;
        display: block;
        border-bottom: 1px solid @cD8D8D8;
      }
    }
  }
}
</style>
