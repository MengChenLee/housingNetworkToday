<template>
  <div class="th_home_header">
      <th-city-locate class="th_home_header-locate" @click="click('homeLocate')"></th-city-locate>
      <router-link class="th_home_header-search" to="/home/search">
        <th-search></th-search>
      </router-link>
      <th-map class="th_home_header-map" @click.native="goMap"></th-map>
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
    location () {
      return this.$store.state.locate.location
    }
  },
  mounted () {

  },
  created () {
  },
  methods: {
    click (name) {
      this.$router.push({name: name})
    },
    goMap () {
      this.$router.push({path: '/home/map',
        query: {
          'lat': this.location.lat,
          'lng': this.location.lng
        }})
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
    width: calc(100% - 8.75rem);
    float: left;
  }
  .th_home_header-map{
    width: 4.375rem;
    float: left;
  }
}
</style>
