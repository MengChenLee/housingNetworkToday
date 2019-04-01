<template>
  <div class="th_house_type_detail">
    <th-layout :hiddenFooter="true">
      <div class="th_house_type_detail-box" v-if="info" ref="cont">
        <th-swiper :bannerList="info.attachment" v-if="info.attachment" @click="browserPicture"></th-swiper>
        <div class="th_news_detail-info">
          <div class="th_house_type_detail-item-title">
            <span>{{info.modelTypeName}}</span>
            <span>{{info.price}}万元起</span>
            <div class="th_house_type_detail-item-saleType" :class="{onsale:info.saleType ==='在售'}">{{info.saleType}}</div>
          </div>
          <div class="th_house_type_detail-item-info" >
            <table>
              <tr>
                <td>楼栋：</td>
                <td>
                  <span v-for="(item,i) in info.buildingList" :key="i">{{item.buildingName}}</span>
                </td>
              </tr>
              <tr>
                <td>楼盘：</td>
                <td>{{info.buildingGroupName}}</td>
              </tr>
              <tr>
                <td>数量：</td>
                <td>{{info.roomNum}}套</td>
              </tr>
              <tr>
                <td>面积：</td>
                <td>
                  <span>{{info.area}}㎡</span>
                </td>
              </tr>
            </table>
          </div>
          <table class="th_house_type_detail-item-inform">
            <tr>
              <td @click="goUrl"><span>房贷计算器</span></td>
              <td @click="addSubscribe"><span>降价通知我</span></td>
            </tr>
          </table>
        </div>
        <div class="th_house_type_detail-other">
          <th-cell :cellData="{title:'其他户型'}"></th-cell>
          <th-house-type-list :houseTypeList="otherHouseType" v-if="otherHouseType"></th-house-type-list>
        </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setHouseTypeDetail, setHouseTypeSubscribe} from '../../../common/httpClient.js'
import ThSwiper from '../../../components/swiper/Swiper.vue'
import ThHouseTypeList from '../../../components/houseTypeList/HouseTypeList.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      info: null,
      otherHouseType: []
    }
  },
  components: {
    ThSwiper,
    ThHouseTypeList
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
    this.setData()
    this.$refs.cont.scrollTop = 0
    to.meta.scrollTop = 0
    next()
  },
  mounted () {

  },
  created () {
    // this.setData()
  },
  activated () {
    this.id = this.$route.params.id
    this.setData()
  },
  methods: {
    setData () {
      let data = {
        'id': this.id
      }
      setHouseTypeDetail(data).then((res) => {
        let cont = res && res.content
        this.info = cont && cont.buildingModelType
        this.info.buildingList = cont && cont.buildingList
        this.otherHouseType = cont && cont.otherBuildingModelType
      })
    },
    goUrl () {
      this.$router.push({name: 'calculatorMortgage'})
    },
    addSubscribe () {
      let data = {
        'accountId': this.userInfo.id,
        'id': this.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'loginToken': this.userInfo.loginToken
      }
      setHouseTypeSubscribe(Object.assign(data)).then((res) => {
        if (res.code === 1) {
          this.toast(res.content || '订阅')
        } else {
          this.toast('接口异常，请稍后再试')
        }
      })
    },
    click (index) {
      console.log(1)
    },
    browserPicture (index) {
      let picList = []
      this.info.attachment.forEach(item => {
        picList.push({
          images: item.picPath
        })
      })
      this.openPopupVisible(picList, index)
    }
  }
}
</script>

<style lang="less" scoped>
.th_house_type_detail{
  height: 100%;
    .th_house_type_detail-item-title{
        color: @c3;
        font-size: @FontSize20;
        line-height: 2rem;
        font-weight: bold;
        overflow: hidden;
        position: relative;
        padding: 0 @plrPage;
        span{
          &:nth-child(2){
            font-size: @defaultFontSize;
            color: @cTheme;
            font-weight: normal;
          }
        }
        .th_house_type_detail-item-saleType{
          line-height: 1rem;
          padding: 0 .2rem;
          transform: scale(0.83);
          color: @cf;
          background-color: @c9;
          font-size: @smallFontSize;
          border-radius: 2px;
          position: absolute;
          top: .5rem;
          right: 0;
          &.onsale{
            background-color: @cD14E33;
          }
        }
      }

    .th_house_type_detail-item-info{
      font-size: @defaultFontSize;
      color: @c3;
      position: relative;
      padding: 0 @plrPage;
      tr{
        td{
          line-height: 1.25rem;
          &:first-child{
            width: 2.5rem;
            height: 0;
            overflow: hidden;
            color: @c9;
          }
        }
      }
    }
    .th_house_type_detail-item-inform{
      line-height: 2rem;
      text-align: center;
      color: @cTheme;
      tr{
        border-bottom: 1px solid @cD8D8D8;
        border-top: 1px solid @cD8D8D8;
        td{
          font-size: @defaultFontSize;
          span{
            padding-left: .5rem;
            &:before{
              content:'';
              width: .8rem;
              height: .8rem;
              display: inline-block;
              background: url(./imgs/calculator.png) no-repeat ;
              background-size: contain;
              background-position: center;
              position: relative;
              top: .1rem;
              left: -.5rem;
            }
          }
          &:last-child span:before{
            width: .7rem;
              height: .7rem;
            background-image: url(./imgs/open.png);

          }
        }
      }
    }
    .th_house_type_detail-other{
      padding: 0 @plrPage;
    }
  }
</style>
