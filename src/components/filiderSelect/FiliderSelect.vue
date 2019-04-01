<template>
  <div class="th_filider_select">
    <div class="th_filider_select-menu" @click="changeTabContainStatus(active)">
      <mt-tabbar v-model="active">
        <mt-tab-item id="area" :class="{select:tabContainStatus}">{{selectList[0] && selectList[0].name || '区域'}}</mt-tab-item>
        <mt-tab-item id="price" :class="{select:tabContainStatus}">{{selectList[1] && selectList[1].name || '价格'}}</mt-tab-item>
        <mt-tab-item id="houseType" :class="{select:tabContainStatus}">{{selectList[2] && selectList[2].name || '户型'}}</mt-tab-item>
        <mt-tab-item id="more" :class="{select:tabContainStatus}">{{selectList[3] && selectList[3].name || '更多'}}</mt-tab-item>
        <mt-tab-item id="sort" v-if="!hideSort" :class="{select:tabContainStatus}">{{selectList[4] && selectList[4].name || '排序'}}</mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container v-model="active" v-show="tabContainStatus">
      <mt-tab-container-item id="area">
        <th-area :select="select" :selectList="selectList[0]" @close="close"></th-area>
      </mt-tab-container-item>
      <mt-tab-container-item id="price">
        <th-price :select="select" :selectList="selectList[1]" @close="close"></th-price>
      </mt-tab-container-item>
      <mt-tab-container-item id="houseType">
        <th-house-type :select="select" :selectList="selectList[2]" @close="close"></th-house-type>
      </mt-tab-container-item>
       <mt-tab-container-item id="more">
        <th-more :select="select" :selectList="selectList[3]" @close="close"></th-more>
      </mt-tab-container-item>
      <mt-tab-container-item id="sort" v-if="!hideSort">
        <th-sort :select="select" :selectList="selectList[4]" @close="close"></th-sort>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
</template>

<script>
import {setFindCondition} from '../../common/httpClient.js'
import ThArea from './area/Area.vue'
import ThPrice from './price/Price.vue'
import ThHouseType from './houseType/HouseType.vue'
import ThSort from './sort/Sort.vue'
import ThMore from './more/More.vue'
export default {
  props: {
    select: {
      type: Object
    },
    hideSort: {
      type: Boolean,
      default: false
    }
    // selectList: {
    //   type: Array
    // }
  },
  data () {
    return {
      active: '',
      tabContainStatus: false,
      selectList: []
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
    active (val) {
      this.tabContainStatus = true
    }
  },
  components: {
    ThArea,
    ThPrice,
    ThHouseType,
    ThSort,
    ThMore
  },
  mounted () {

  },
  created () {
    this.setFindCondition()
    // console.log(this.select[0])
  },
  methods: {
    setFindCondition () {
      let data = {
        'cityIds': this.location.cityId || this.location.selectCityId
      }
      setFindCondition(data).then((res) => {
        this.selectList = res && res.content
      })
    },
    changeTabContainStatus (active) {
      this.tabContainStatus = !this.tabContainStatus
    },
    close () {
      this.tabContainStatus = false
    }
  }
}
</script>

<style lang="less" scoped>
.th_filider_select{
  width: 100%;
  color: @c3;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: @FontSize15;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: @cf;
  .th_filider_select-menu{
    border-bottom: 1px solid @cD8D8D8;
    height: 100%;
    & /deep/ .mint-tabbar{
      height: 100%;
      background: @cf;
      position: relative;
      .mint-tab-item{
        height: 100%;
        box-sizing: border-box;
        position: relative;
        padding: calc((1.5rem - 12px)/2) 0;
        &.is-selected {
          background: @cf;
          color: @c3;
          &.select{
            color: @cD14E33;
            &::after{
              border-color: @cD14E33;
              transform: rotate(-45deg);
            }
          }
        }
        &.isHaveData{
          color: @cD14E33;
          &::after{
            border-color: @cD14E33;
          }
        }
        &:after{
          border: solid 1px @c3;
          border-bottom-width: 0;
          border-left-width: 0;
          content: " ";
          top: 43%;
          right: .8rem;
          position: absolute;
          width: 8px;
          height: 8px;
          transition: all 0.3s;
          transform: translateY(-50%) rotate(135deg);
        }
        &:before{
          content: " ";
          height: 100%;
          border-right: 1px solid @cD8D8D8;
          position: absolute;
          top:0;
          right: 0;
        }
        &:last-child:before{
          display: none;
        }
        .mint-tab-item-label{
          margin-right: 1rem;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
  & /deep/ .mint-tab-container{
      height: 19.5rem;
      .mint-tab-container-wrap,.mint-tab-container-item{
        height: 100% !important;
      }
    }
    .btn{
      width: 100%;
      height: 3rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: @cf;
    }
}
</style>
