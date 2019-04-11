<template>
  <div class="th_recommend">
    <div :class="{'is_fixed' : isFixed}" id="fixedHeader" v-show="recommend.recommendFix">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">同价格</mt-tab-item>
        <mt-tab-item id="2">同区域</mt-tab-item>
      </mt-navbar>
    </div>
    <div :class="{'is_fixed' : isFixed}" v-show="!recommend.recommendFix">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">同价格</mt-tab-item>
        <mt-tab-item id="2">同区域</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <th-property-list :propertyList="recommend.samePriceList"></th-property-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <th-property-list  :propertyList="recommend.nearBuildingList"></th-property-list>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import ThPropertyList from '../../../../components/propertyList/PropertyList.vue'

import banner from './imgs/index_banner2.jpg'
export default {
  props: {
    recommend: {
      type: Object
    }
  },
  data () {
    return {
      banner: banner,
      selected: '1',
      newsList: [
        {
          title: '我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题',
          imgUrl: banner,
          des: '我是一个描述我是一个描述我是一个描述我是一个描述我是一个描述我是一个描述一个描述我是一个描述我是一个描述我是一个描述我是一个描述',
          time: +new Date(),
          author: '佘杨娟'
        },
        {
          title: '我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题我是一个标题',
          imgUrl: banner,
          des: '我是一个描述我是一个描述我是一个描述我是一个描述我是一个描述我是一个描述',
          time: +new Date(),
          author: '佘杨娟'
        }
      ],
      isFixed: false,
      offsetTop: 0,
      offsetHeight: 0
    }
  },
  components: {
    ThPropertyList
  },
  computed: {

  },
  activated () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.th_recommend{
  /*height: 100%;*/
  & /deep/ .mint-navbar{
    width: 100%;
    height: 1.82rem;
    background-color:rgba(0, 0, 0, 0);
    box-shadow:0 1px 0 0 rgba(216,216,216,1),0px -2px 0px 0px rgba(216,216,216,0.5);
    .mint-tab-item{
      padding: 0;
      .mint-tab-item-label{
        height: 1.8rem;
        line-height: 1.8rem;
        font-size:@FontSize15;
      }
      &.is-selected{
        border: 0;
        color: @cTheme;
      }
    }
  }
  & /deep/ .mint-tab-container{
    height: 105%;
    .mint-tab-container-wrap{
      height: 100%;
      .mint-tab-container-item{
        height: 100%;
        /*overflow: auto;*/
        /*-webkit-overflow-scrolling: touch;*/
      }
    }
  }
  .is_fixed{
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
  #fixedHeader{
    width: 100%;
    position: fixed;
    top: @headerHeight;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: @cf;
  }
}
</style>
