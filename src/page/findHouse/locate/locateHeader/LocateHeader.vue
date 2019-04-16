<template>
  <div class="th_locate_header">
      <th-back-btn></th-back-btn>
      <div class="th_locate_header-searchBtn" @click="search">搜索</div>
      <th-search class="th_locate_header-search" @getSearchData="getSearchData"></th-search>
    </div>
</template>

<script>
import ThBackBtn from '../../../../components/base/backBtn/BackBtn.vue'
import ThSearch from '../../../../components/base/search/Search.vue'
import ThMap from '../../../../components/base/map/Map.vue'
export default {
  props: {
    bannerList: {
      type: Array
    }
  },
  data () {
    return {
      searchData: ''
    }
  },
  components: {
    ThBackBtn,
    ThSearch,
    ThMap
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    getSearchData (data) {
      this.searchData = data
    },
    search () {
      // console.log(this.searchData)
      this.$emit('getData', this.searchData)
    }
  }
}
</script>

<style lang="less" scoped>
.th_locate_header{
  color: @cf;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: @FontSize15;
  padding: 0 @plrPage;
  .th_locate_header-search{
    width: calc(100% - 6.75rem);
    float: right;
  }
  .th_locate_header-searchBtn{
    width: 2rem;
    height: 100%;
    float: right;
    margin-left: 1rem;
  }
}
</style>
