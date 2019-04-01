<template>
  <div class="th_search_header">
      <div class="th_search_header-back" @click="back">
        <th-back-btn></th-back-btn>
      </div>
      <th-search class="th_search_header-search" @search="search" @getSearchData="getSearchData"></th-search>
      <div class="th_search_header-searchBtn" @click="search">搜索</div>
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
      // console.log(event)
      this.$emit('getData', this.searchData)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.th_search_header{
  color: @cf;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: @FontSize15;
  padding: 0 @plrPage;
  .th_search_header-back{
    width: 2rem;
    height: 100%;
    float: left;
  }
  .th_search_header-search{
    width: calc(100% - 6.75rem);
    float: left;
  }
  .th_search_header-searchBtn{
    width: 2rem;
    height: 100%;
    float: right;
  }
}
</style>
