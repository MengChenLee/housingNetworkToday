<template>
  <div class="th_home_header">
      <mt-navbar v-model="active">
        <mt-tab-item id="1">活动</mt-tab-item>
        <mt-tab-item id="2">楼盘</mt-tab-item>
        <mt-tab-item id="3">头条</mt-tab-item>
      </mt-navbar>
    </div>
</template>

<script>
import ThCityLocate from '../../../../components/base/cityLocate/CityLocate.vue'
import ThSearch from '../../../../components/base/search/Search.vue'
import ThMap from '../../../../components/base/map/Map.vue'
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    bannerList: {
      type: Array
    },
    selected: {
      type: String
    }
  },
  data () {
    return {
      active: ''
    }
  },
  components: {
    ThCityLocate,
    ThSearch,
    ThMap
  },
  computed: {

  },
  watch: {
    selected (val) {
      this.active = val
      sessionStorage.setItem('active', val)
    },
    active (val) {
      console.log(val, this.active)
      sessionStorage.setItem('active', this.active)
      this.$emit('change', this.active)
    }
  },
  mounted () {
    this.active = sessionStorage.getItem('active') || this.selected
  },
  activated () {
    this.active = sessionStorage.getItem('active') || this.selected
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.th_home_header{
  color: @cf;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: @FontSize15;
  padding: 0 @plrPage;
  & /deep/ .mint-navbar{
    background-color:rgba(0, 0, 0, 0);
    .mint-tab-item{
      padding: 0;
      .mint-tab-item-label{
        height: 2.2rem;
        line-height: 2.2rem;
        font-size:@FontSize17;
      }
      &.is-selected{
        color: @cf;
        border: 0;
        position: relative;
        &:after{
          content: '';
          width: 1.15rem;
          height: .15rem;
          background-color: @cf;
          border-radius: 3px;
          position: absolute;
          bottom: 0.5rem;
          left: 50%;
          margin-left: -.575rem
        }
      }
    }
  }
  .th_home_header-locate{
    width: 4.375rem;
    float: left;
  }
  .th_home_header-search{
    width: calc(100% - 8.75rem);
    float: left;
  }
  .th_home_header-searchBtn{
    width: 4.375rem;
    float: left;
  }
}
</style>
