<template>
  <div class="th_building_detail">
    <th-building-filider :select="select" :selectList='selectList'></th-building-filider>
    <th-layout :hiddenFooter="true">
      <div class="th_building_detail-cont"  ref="cont">
        <div class="th_building_detail-list">
          <ul v-for="(item,i) in dataList" :key="i">
            <li>
              <div class="th_building_detail-list-floor">{{i}}F</div>
              <ul v-for="(item2,i) in item" :key="i" class="th_building_detail-item" @click="goDetail(item2.id)">
                <li class="th_building_detail-item-name">{{item2.modelName}}</li>
                <li class="th_building_detail-item-price">{{item2.pricePerSquare}}万</li>
                <li class="th_building_detail-item-area">{{item2.floorArea}}㎡</li>
                <li class="th_building_detail-item-type">{{item2.saleType}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setBuildingDetailCondition, setBuildingDetail} from '../../../common/httpClient.js'
import ThBuildingFilider from './buildingFilider/BuildingFilider.vue'
export default {
  props: {
    newsDetail: {
      type: Array
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      select: {
        buildingModelTypeId: '0',
        floorId: '0',
        saleStatusId: '0',
        unitId: '0'
      },
      selectList: [],
      dataList: {}
    }
  },
  components: {
    ThBuildingFilider
  },
  computed: {

  },
  watch: {
    select: {
      handler (val) {
        console.log(val)
        this.setData()
      },
      deep: true
    }
  },
  activated () {
    this.id = this.$route.params.id
    this.setData()
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.params.id
    this.setData()
    this.$refs.cont.scrollTop = 0
    to.meta.scrollTop = 0
    next()
  },
  mounted () {
    this.setData()
    this.setCondition()
  },
  created () {
  },
  methods: {
    setData () {
      let dataBase = {
        'id': this.id
      }
      let data = Object.assign({}, dataBase, {
        buildingModelTypeId: Number(this.select.buildingModelTypeId),
        floorId: Number(this.select.floorId),
        saleStatusId: Number(this.select.saleStatusId),
        unitId: Number(this.select.unitId)
      })
      setBuildingDetail(data).then((res) => {
        this.dataList = res && res.content
      })
    },
    setCondition () { // 楼栋id
      let data = {
        'id': this.id
      }
      setBuildingDetailCondition(data).then((res) => {
        console.log('select', res)
        this.selectList = res && res.content
      })
    },
    goDetail (id) {
      this.$router.push({name: 'saleControl', params: {id: id}})
    }
  }
}
</script>

<style lang="less" scoped>
.th_building_detail{
  height: 100%;
  .th_building_detail-cont{
    width: 100%;
    padding-top: 1.5rem;
    box-sizing: border-box;
    .th_building_detail-list-floor{
      color: @cTheme;
      background-color: @cDBE0FF;
      text-align: center;
      font-size: @smallFontSize;
      line-height: 1.5rem;
    }
    .th_building_detail-item{
      overflow: hidden;
      border-bottom: 1px solid @cD8D8D8;
      padding: .2rem .4rem;
      line-height: 1.6rem;
      color: @c9;
      .th_building_detail-item-name, .th_building_detail-item-area{
        width: 70%;
        float: left;
        &.th_building_detail-item-name{
          color: @c3;
          font-size: @FontSize15;
          font-weight: bold;
        }
        &.th_building_detail-item-area{
          font-size: @defaultFontSize;
        }
      }
      .th_building_detail-item-price, .th_building_detail-item-type{
        width: 30%;
        float: left;
        text-align: right;
        &.th_building_detail-item-price{
          color: @cE4805E;
          font-size: @FontSize15;
          font-weight: bold;
        }
        &.th_building_detail-item-type{
          font-size: @defaultFontSize;
        }
      }
    }
  }
}
</style>
