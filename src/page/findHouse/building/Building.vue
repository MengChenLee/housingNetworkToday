<template>
  <div class="th_building">
    <th-layout :hiddenFooter="true">
      <div class="th_building-cont" ref="cont">
        <ul class="th_building-type">
          <li>在售状态</li>
          <li>待售状态</li>
          <li>售罄状态</li>
        </ul>
        <div class="th_building-img">
          <th-img-box :imgUrl="banner"></th-img-box>
          <th-building-tag v-for="(item,i) in buildList" :key="i" :index="i" :buildingTag="item" :activeIndex="activeIndex === i" @getActiveIndex="getActiveIndex"></th-building-tag>
        </div>
        <th-building-swipe
        v-if="buildList"
        :buildList="buildList"
        :activeIndex="activeIndex"
        @getActiveIndex="getActiveIndex"></th-building-swipe>
        <div class="th_building-houseType">
          <th-cell :cellData="{title:'楼栋户型'}"></th-cell>
          <th-house-type-list :houseTypeList="houseTypeList[activeIndex]" v-if="houseTypeList[activeIndex]"></th-house-type-list>
        </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setBuilding, setHouseTypeByBuilding} from '../../../common/httpClient.js'
import ThBuildingSwipe from './buildingSwipe/BuildingSwipe.vue'
import ThHouseTypeList from '../../../components/houseTypeList/HouseTypeList.vue'
import ThBuildingTag from '../../../components/buildingTag/BuildingTag.vue'
export default {
  props: {
  },
  data () {
    return {
      banner: '',
      activeIndex: 0,
      buildList: null,
      houseTypeList: []
    }
  },
  watch: {
    // houseTypeList: {
    //   handler (val, oldVal) {
    //     console.log(val)
    //   },
    //   deep: true
    // }
  },
  components: {
    ThBuildingSwipe,
    ThHouseTypeList,
    ThBuildingTag
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  mounted () {

  },
  created () {
    this.setData()
  },
  activated () {
    this.setData()
  },
  methods: {
    getActiveIndex (index) {
      this.activeIndex = index
      this.setHouseType(index)
    },
    setData () {
      let data = {
        'id': this.$route.params.id,
        'accountId': this.userInfo.id
      }
      setBuilding(data).then((res) => {
        let cont = res && res.content
        this.banner = cont && cont.panorama
        this.buildList = cont && cont.buildingList
        cont && this.$set(this.houseTypeList, this.activeIndex, cont.buildingModelType)
      })
    },
    setHouseType (id) { // 楼栋id
      if (this.houseTypeList[this.activeIndex]) {
        return
      }
      let data = {
        'id': id,
        'accountId': this.userInfo.id
      }
      setHouseTypeByBuilding(data).then((res) => {
        let cont = res && res.content
        cont && this.$set(this.houseTypeList, this.activeIndex, cont.buildingModelType)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_building{
  height: 100%;
  .th_building-cont{
    width: 100%;
    height: 100%;
    overflow: auto;
    .th_building-type{
      overflow: hidden;
      font-size: @smallFontSize;
      line-height: 1.5rem;
      text-align: center;
      li{
        width: 33%;
        float: left;
        border-right: 1px solid @cD8D8D8;
        &:before{
          content: '';
          width: .4rem;
          height: .4rem;
          background-color: @cTheme;
          display: inline-block;
          border-radius: 50%;
          margin-right: .5rem;
        }
        &:nth-child(2){
          &:before{
            background-color: @cD14E33;
          }
        }
        &:nth-child(3){
          border: 0;
          &:before{
            background-color: @c9;
          }
        }
      }
    }
    .th_building-img{
      position: relative;
      /deep/ .th_img-box{
        padding-top: @imgBuilding;
      }
    }
    .th_building-houseType{
      padding: 0 @plrPage;
      & /deep/ .th_cell{
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
}
</style>
