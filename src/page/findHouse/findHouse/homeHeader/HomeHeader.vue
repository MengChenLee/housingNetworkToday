<template>
  <div class="th_home_header">
      <th-city-locate class="th_home_header-locate" :hiddenCity="hiddenCity" @click="click('findHouseLocate')"></th-city-locate>
      <router-link class="th_home_header-search" to="/home/search">
        <th-search :searchData="searchData"></th-search>
      </router-link>
      <!-- <div class="th_home_header-searchBtn">搜索</div> -->
    </div>
</template>

<script>
import ThCityLocate from '../../../../components/base/cityLocate/CityLocate.vue'
import ThSearch from '../../../../components/base/search/Search.vue'
import ThMap from '../../../../components/base/map/Map.vue'
export default {
  props: {
    bannerList: {
      type: Array
    },
    searchData: {
      type: String,
      default: ''
    },
    hiddenCity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ThCityLocate,
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
    click (name) {
      this.$router.push({name: name})
    }
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
  .th_home_header-locate{
    width: 4.375rem;
    float: left;
  }
  .th_home_header-search{
    width: calc(100% - 4.375rem);
    float: left;
  }
  .th_home_header-searchBtn{
    width: 4.375rem;
    float: left;
    text-align: right;
  }
}
</style>
