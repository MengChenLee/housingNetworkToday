<template>
  <div class="th_nearby_map">
    <div  class="th_nearby_map-item" v-if="propertyList && propertyList[index]">
      <th-img-text-level>
        <div class="th_nearby_map-item-cont" slot="left" @click="goUrl(propertyList[index].id)">
          <div class="th_nearby_map-item-title"><div>{{propertyList[index].name}}</div><div><span>商铺</span></div><div><span>住宅</span></div></div>
          <table class="th_nearby_map-item-info">
              <tr><td><div class="th_nearby_map-item-size">{{propertyList[index].roomType}}<i class="split">|</i>{{propertyList[index].roomArea}}</div></td><td ><div class="th_nearby_map-item-price">{{Math.round(propertyList[index].price/10000)}}万元/㎡</div></td></tr>
          </table>
          <ul class="th_nearby_map-item-tag" v-if="propertyList[index].tags">
            <li v-for="(tagItem, i) in propertyList[index].tags.split('-')" :key="i">
              <div><span>{{tagItem}}</span></div>
            </li>
          </ul>
          <table class="th_nearby_map-item-info bottom">
              <tr><td><div class="th_nearby_map-item-locate">距您{{propertyList[index].distance}}</div></td><td><div class="th_nearby_map-item-price-last">0万元起</div></td></tr>
          </table>
        </div>
        <div class="th_nearby_map-item-img" @click="goUrl(null)">
          <img src="./imgs/map.png"/>
          <p>地图搜索周边楼盘</p>
        </div>
      </th-img-text-level>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propertyList: {
      type: Array
    }
  },
  data () {
    return {
      index: 0
    }
  },
  components: {

  },
  computed: {

  },
  mounted () {
    // this.changeIndex()
  },
  created () {
  },
  methods: {
    goUrl (id) {
      if (id) {
        this.$router.push({name: 'propertyDetail', params: {id: id}})
      } else {
        let property = this.propertyList[this.index]
        this.$router.push({path: '/home/map',
          query: {buildingGroupName: property.name,
            'lat': property.lat,
            'lng': property.lng
          }})
      }
    },
    changeIndex () {
      const indexMax = this.propertyList && this.propertyList.length
      if (typeof this.timerInterval !== 'undefined' || indexMax === 1) {
        clearInterval(this.timerInterval)
      }
      this.timerInterval = setInterval(() => {
        this.index = this.index + 1 > indexMax - 1 ? 0 : this.index + 1
      }, 3000)
    }
  }
}
</script>

<style lang="less" scoped>
.th_nearby_map{
  height: calc(4.45rem + @plrNewsitem*2);
  overflow: hidden;
  .th_nearby_map-item{
    height: 4.45rem;
    padding:@plrNewsitem @plrPage;
    overflow: hidden;
    border-bottom: 1px solid @cD8D8D8;
    color: @c9;
    display: block;
    box-sizing: content-box;
    & /deep/ .th_img_text_level {
      .th_img_text_level-left{
        width: calc(100% - 6.375rem);
        padding-right: @plrNewsList;
      }
      .th_img_text_level-right{
        width: 6.375rem;
        padding-left: @plrPage;
        border-left: 1px solid @cD8D8D8;
      }

    }
      .th_nearby_map-item-cont{
        height: 100%;
        position: relative;
        line-height: 1.2rem;
        .th_nearby_map-item-title{
          color: @c3;
          font-size: @defaultFontSize;
          line-height: @FontSize20;
          overflow: hidden;
          div{
            float: left;
            span{
              .FontSize10;
              margin-left: .2rem;
            }
            &:nth-child(2){
              color: @cTheme;
            }
            &:nth-child(3){
              color: @cD14E33;
            }
          }
        }
        .th_nearby_map-item-info{
          &.bottom{
            position: absolute;
            bottom: 0;
            left: 0;
          }

          .split{
            margin: 0 .5rem;
          }
          td:nth-child(2n){
            min-width: 3rem;
            text-align: right;
          }
          .th_nearby_map-item-size,.th_nearby_map-item-locate,.th_nearby_map-item-price-last{
            .lineClamp(1);
            .FontSize10;
            &.th_nearby_map-item-price-last{
              color: @c3;
            }
          }
          .th_nearby_map-item-price{
            color: @cE4805E;
            font-size: @smallFontSize;
            .lineClamp(1);
          }
        }
        .th_nearby_map-item-tag{
          margin-left: -.25rem;
          height: 1rem;
          overflow: hidden;
          li{
            float: left;
            &:first-child{
              margin-left: 0
            }
            div{
              .FontSize10;
              margin-left: 0;
              span{
                padding:0 .1rem;
                border: 1px solid @c9;
              }
            }
          }
        }
      }
      .th_nearby_map-item-img{
        height: 100%;
        text-align: center;
        font-size: @smallFontSize;
        img{
          width: 2.325rem;
          height: 2.2rem;
          margin: .575rem 0 .675rem;
        }
      }
    }
}
</style>
