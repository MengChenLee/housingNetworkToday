<template>
    <div class="th_base_info">
      <div class="th_base_info-item-title">
        <div>{{baseInfo.name}}</div>
        <div v-if="baseInfo.buildingType" class="typeItem">
          <div v-for="(typeItem,i) in baseInfo.buildingType.split('-')" :key="i" >
            <span>{{typeItem}}</span>
          </div>
        </div>

        <div class="th_base_info-item-saleType" :class="{onsale:baseInfo.saleType ==='在售'}">{{baseInfo.saleType}}</div>
      </div>
      <table class="th_base_info-item-price">
        <tr v-for="(item,i) in baseInfo.buildTypeList" :key="i">
          <td><h5>{{item.typeName}}均价</h5>{{item.price}}万元/㎡</td>
          <td><h5>{{item.typeName}}总价</h5>{{item.totalPrice}}万元起</td>
          <td><h5>建筑面积</h5>{{item.area}}㎡</td>
        </tr>
      </table>
      <div class="th_base_info-item-info" >
        <table>
          <tr>
            <td>开盘时间：</td>
            <td>{{baseInfo.beginSellDate | formatTime('YMD_')}}</td>
          </tr>
          <tr>
            <td>交付时间：</td>
            <td>{{baseInfo.dealTimeInfo}}</td>
          </tr>
          <tr>
            <td>房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</td>
            <td>{{baseInfo.roomType}}</td>
          </tr>
          <tr>
            <td>售楼地址</td>
            <td>
              <span @click="goMap(null)">{{baseInfo.address}}</span>
            </td>
          </tr>
        </table>
        <div class="th_base_info-item-bg" v-if="baseInfo.activityTypePic">
            <th-img-box class="th_base_info-item-img" :imgUrl="baseInfo.activityTypePic"></th-img-box>
          </div>
      </div>
      <ul class="th_base_info-item-tag" v-if="baseInfo.tags">
        <li v-for="(tagItem, i) in baseInfo.tags.split('-')" :key="i">
          <div><span>{{tagItem}}</span></div>
        </li>
      </ul>
      <div class="th_base_info-item-more" @click="click"><span>更多详情</span></div>
      <table class="th_base_info-item-inform">
        <tr>
          <td @click="openSubscribe"><span>优惠通知我</span></td>
          <td @click="openSubscribe"><span>开盘通知我</span></td>
        </tr>
      </table>
    </div>
</template>

<script>
import ThCityLocate from '../../../../components/base/cityLocate/CityLocate.vue'
import ThSearch from '../../../../components/base/search/Search.vue'
export default {
  props: {
    baseInfo: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  components: {
    ThCityLocate,
    ThSearch
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    goMap (id) {
      if (id) {
        this.$router.push({name: 'propertyDetail', params: {id: id}})
      } else {
        this.$router.push({path: '/propertyMap',
          query: {
            lat: this.baseInfo.lat,
            lng: this.baseInfo.lng
          }
        })
      }
    },
    click () {
      this.$router.push({name: 'propertyBaseInfoDetail', params: {id: this.baseInfo.id}})
    },
    openSubscribe (params) {
      this.$emit('openSubscribe')
    }
  }
}
</script>

<style lang="less" scoped>
.th_base_info{
      padding: .5rem @plrPage 0;
      .th_base_info-item-title{
          color: @c3;
          font-size: @FontSize20;
          line-height: 2rem;
          font-weight: bold;
          overflow: hidden;
          position: relative;
          div{
            div{
              span{
                .FontSize10;
                margin-left: .2rem;
              }
              &:nth-child(3n+1) span{
                color: @cTheme;
              }
              &:nth-child(3n+2) span{
                color: @cD14E33;
              }
              &:nth-child(3n+3) span{
                color: @cD19B33;
              }
            }
          }
          div{
            float: left;
          }
          .th_base_info-item-saleType{
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
      .th_base_info-item-price{
        tr{
          border-bottom: 1px solid @cD8D8D8;
          td{
            font-size: @defaultFontSize;
            font-weight: bold;
            padding:.375rem 0 .375rem 8%;
            h5{
              font-size: @smallFontSize;
              color: @c9;
              font-weight: normal;
            }
          }
          &:nth-child(1){
            border-top: 1px solid @cD8D8D8;
            color: @cTheme;
          }
          &:nth-child(2){
            color: @cD14E33;
          }
          // &:nth-child(3){
          //   color: @cD19B33;
          // }
        }
      }
      .th_base_info-item-info{
        font-size: @defaultFontSize;
        color: @c3;
        position: relative;
        tr{
          td{
            line-height: 1.25rem;
            &:first-child{
              width: 3.5rem;
              height: 0;
              overflow: hidden;
              color: @c9;
            }
            &:last-child{
              padding-left: .5rem;
              .lineClamp(1);
            }
            span{
              max-width: calc(100% - .6rem);
              padding-right: 1rem;
              .lineClamp(1);
              position: relative;
              &:after{
                content:'';
                width: .6rem;
                height: 1rem;
                display: inline-block;
                background: url(./imgs/map.png) no-repeat;
                background-size: contain;
                background-position: center;
                position: absolute;
                top: 0;
                right:0 ;
              }
            }
          }
        }
        .th_base_info-item-bg{
          width: 4.425rem;
          height: 3.175rem;
          position: absolute;
          bottom: 1rem;
          right: 0;
          .th_base_info-item-img{
            padding-top: 71.75%;
          }
        }
      }
      .th_base_info-item-tag{
          margin:.2rem 0 0  -.3rem;
          color: @c9;
          overflow: hidden;
          line-height: @FontSize20;
          li{
            float: left;
            &:first-child{
              margin-left: 0
            }
            div{
              .FontSize10;
              margin-left: 0;
              span{
                padding:.1rem .2rem;
                border: 1px solid @c9;
              }
            }
          }
        }
      .th_base_info-item-more{
        color: @cD14E33;
        text-align: center;
        font-size: @smallFontSize;
        line-height: 2rem;
        span{
          &:after{
            border: solid 1px @cD14E33;;
            border-bottom-width: 0;
            border-left-width: 0;
            content: " ";
            vertical-align: middle;
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-left: 8px;
            -webkit-transform: translateY(-50%) rotate(135deg);
            transform: translateY(-50%) rotate(135deg);
          }
        }
      }
      .th_base_info-item-inform{
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
                width: .7rem;
                height: .7rem;
                display: inline-block;
                background: url(./imgs/favorable.png) no-repeat ;
                background-size: contain;
                background-position: center;
                position: relative;
                top: .1rem;
                left: -.5rem;
              }
            }
            &:last-child span:before{
              background-image: url(./imgs/open.png);

            }
          }
        }
      }
    }
</style>
