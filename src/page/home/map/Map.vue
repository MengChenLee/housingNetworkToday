<template>
  <div class="th_map" ref="cont">
    <th-filider-select class="th_map-select"  :select="select" :hideSort="true"></th-filider-select>
    <th-layout class="th_map-cont" :hiddenFooter="true">
      <baidu-map
        class="th_map-baidu"
        :center="center"
        :zoom="zoom"
        :minZoom='1'
        @ready="handler"
        @zoomend="zoomend"
        @dragend="dragend"
        :scroll-wheel-zoom="true"
        ak="0iHcMzD3HRWeh2aHmVV0hbGZlWvr8och">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
        <div v-if="points">
          <my-overlay
            v-for="(item,i) in points"
            :key="i"
            :index='i'
            :myOverlay="item"
            :active="active === item.id"
            v-show="item.districtId && zoom<changeZoom || item.id && zoom>changeZoom"
            @click="clickHandler"
            @mouseover.native="active = true"
            @mouseleave.native="active = false">
          </my-overlay>
        </div>
        <!-- <bm-marker :position="center"  :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @click="show = true">
        </bm-marker> -->
        <!-- <my-overlay
          v-for="(item,i) in points"
          :key="i"
          :myOverlay="item"
          :active="false"
          v-if="item.id && zoom>changeZoom"
          @click="clickHandler"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </my-overlay> -->
      </baidu-map>
      <th-property-list :propertyList="propertyList" v-show="active"></th-property-list>
    </th-layout>
  </div>
</template>
<script>
// {BmlMarkerClusterer}
import {setMapList} from '../../../common/httpClient.js'
import {BmlMarkerClusterer} from 'vue-baidu-map'
import MyOverlay from './myOverlay/MyOverlay.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThFiliderSelect from '../../../components/filiderSelect/FiliderSelect.vue'
export default {
  name: 'homeMap',
  data () {
    return {
      center: {lng: this.$route.query.lng, lat: this.$route.query.lat},
      zoom: 100,
      changeZoom: 100.5,
      points: [],
      pointIds: [],
      map: null,
      BMap: null,
      distance: false,
      active: 0,
      propertyList: [],
      select: {
        'districtId': 0, // 区县id
        'streetIds': '', // 街道ids
        'lineId': 0, // 地铁id
        'stepIds': '', // 地铁站ids
        'eachPrice': '', // 单价
        'totalPrice': '', // 总价
        'firstPayment': '', // 首付
        'moduleType': '', // 户型
        'moreIds': '', // 更多ids
        'orderBy': 0, // 排序
        'pageNo': 1,
        'pageSize': 10
      },
      isApp: window.jrfw.isApp(),
      'buildingGroupName': this.$route.query.buildingGroupName
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
    points: {
      handler (val) {
        console.log(val)
      },
      deep: true
    },
    select: {
      handler (val) {
        this.setMapList(2)
      },
      deep: true
    }
  },
  components: {
    ThFiliderSelect,
    BmlMarkerClusterer,
    MyOverlay,
    ThPropertyList
  },
  /*
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    function myFun(result){
      var cityName = result.name;
      map.setCenter(cityName);
      alert("当前定位城市:"+cityName);
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
  */
  methods: {
    handler ({BMap, map}) {
      this.BMap = BMap
      this.map = map
      this.setMapList(this.buildingGroupName ? 3 : 1)
    },
    zoomend ({type, target}) {
      if (this.map) {
        this.zoom = this.map.getZoom()
        this.active = 0
        if (this.zoom < this.changeZoom) return
        var bs = this.map.getBounds() // 获取可视区域
        var pointA = new this.BMap.Point(bs.He, bs.Vd) // 创建点坐标A宁波市宁海县
        var pointB = new this.BMap.Point(bs.Le, bs.Xd) // 创建点坐标B北京市朝阳区
        // this.points = this.points
        this.setMapList(4, this.map.getDistance(pointA, pointB).toFixed(2) / 2)
      }
    },
    dragend () {
      // this.center = this.map.getCenter()
      this.active = 0
      var bs = this.map.getBounds() // 获取可视区域
      var pointA = new this.BMap.Point(bs.He, bs.Vd) // 创建点坐标A宁波市宁海县
      var pointB = new this.BMap.Point(bs.Le, bs.Xd) // 创建点坐标B北京市朝阳区
      this.setMapList(4, this.map.getDistance(pointA, pointB).toFixed(2) / 2)
    },
    locationSuccess ({point, AddressComponent, marker}) {
      // console.log(point, AddressComponent, marker)
    },
    clickHandler (item) {
      console.log(item)
      if (item.districtId) {
        this.$set(this.select, 'districtId', item.districtId)
        // this.map.centerAndZoom(new this.BMap.Point(item.longitude, item.latitude), 14)
        // this.center = {item.longitude, item.latitude}
        this.center = {lng: item.longitude, lat: item.latitude}
        this.zoom = 12
        this.setMapList(2)
      } else {
        this.active = this.active === item.id ? 0 : item.id
        this.propertyList = [item]
        this.map.centerAndZoom(new this.BMap.Point(item.lng, item.lat), this.zoom)
        // this.center = new this.BMap.Point(item.lng, item.lat)
      }
    },
    setMapList (type, distance) {
      let data = {}
      if (type === 1) { // 获取区域级的楼盘
        data = {
          'cityId': this.location.selectCityId || this.location.cityId
        }
      } else if (type === 2) { // 获取搜索楼盘
        data = this.select
      } else if (type === 3) { // 通过搜索获取楼盘
        data = {
          'buildingGroupName': this.buildingGroupName
        }
      } else { // 获取周边楼盘
        let center = this.map.getCenter()
        data = {
          'distance': Number(distance),
          'lat': center.lat,
          'lng': center.lng
        }
      }
      delete data.areaText
      delete data.lineText
      delete data.moreText
      delete data.orderText
      // if (!this.distance && data.distance) return
      setMapList(data).then((res) => {
        if (res && res.code === 1) {
          res.content.forEach(item => {
            if (item.countNum) { // 区域
              this.zoom = 11
            } else { // 楼盘
              this.zoom = 12
            }
            if (this.pointIds.indexOf(item.id) < 0) {
              this.points.push(item)
              item.id && this.pointIds.push(item.id)
            }
          })
          if (res.content[0] && res.content[0].id & this.zoom > this.changeZoom) {
            this.toast(`共找到${res.content.length}个楼盘`)
          }
        }
        // return true
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_map{
  height: 100%;
  .th_map-select{
    height: 1.5rem !important;
    top: @headerHeight;
    &.isApp{
      top:0;
    }
      // .th_filider_select{
      //   /deep/ .mint-tab-container{
      //     width: 100%;
      //     height: calc(100% - 2rem);
      //     position: absolute;

      //   }
    // }
  }
  .th_map-cont{
    /deep/.th_laybox-cont{
      padding-top: 1.5rem;
    }
  }
  .th_map-baidu{
    width: 100%;
    height: 100%;
  }
  .Th_propertyList{
    width: 100%;
    height: auto !important;
    position: absolute;
    bottom: 0;
    left: 0;
    background:@cf;
  }
}
</style>
