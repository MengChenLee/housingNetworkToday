<template>
  <div class="th_house_filider">
    <div class="th_house_filider-menu" @click="changeTabContainStatus(active)">
      <mt-tabbar v-model="active">
        <mt-tab-item id="area" :class="{select:tabContainStatus}" v-show="!hiddenCity">{{selectList[0] && selectList[0].name || '区域'}}</mt-tab-item>
        <mt-tab-item id="price" :class="{select:tabContainStatus}">{{selectList[1] && selectList[1].name || '价格'}}</mt-tab-item>
        <mt-tab-item id="houseType" :class="{select:tabContainStatus}">{{selectList[2] && selectList[2].name || '户型'}}</mt-tab-item>
        <mt-tab-item id="more" :class="{select:tabContainStatus}">{{selectList[3] && selectList[3].name || '更多'}}</mt-tab-item>
        <mt-tab-item id="sort" :class="{select:tabContainStatus}">{{selectList[4] && selectList[4].name || '排序'}}</mt-tab-item>
      </mt-tabbar>
    </div>
    <mt-tab-container v-model="active" v-show="tabContainStatus">
      <mt-tab-container-item id="area" v-show="!hiddenCity">
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
      <mt-tab-container-item id="sort">
        <th-sort :select="select" :selectList="selectList[4]" @close="close"></th-sort>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
</template>

<script>
import ThArea from './area/Area.vue'
import ThPrice from './price/Price.vue'
import ThHouseType from './houseType/houseType'
import ThSort from './sort/Sort.vue'
import ThMore from './more/More.vue'
export default {
  props: {
    select: {
      type: Object
    },
    selectList: {
      type: Array
    },
    hiddenCity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: 'area',
      tabContainStatus: false
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
  computed: {

  },
  mounted () {

  },
  created () {
    // console.log(this.select[0])
  },
  methods: {
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
.th_house_filider{
  width: 100%;
  color: @c3;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: @FontSize15;
  position: absolute;
  top: @headerHeight;
  left: 0;
  z-index: 1;
  background-color: @cf;
  .th_house_filider-menu{
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
