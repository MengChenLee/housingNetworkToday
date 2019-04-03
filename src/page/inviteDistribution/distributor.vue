<template>
  <div class="th_Find_house">
    <th-layout>
      <div class="th_Find_house-header" slot="header">
        <span>{{title}}</span>
      </div>
      <div class="th_Find_house-cont"  ref="cont">
        <th-property-list  :propertyList="propertyList"></th-property-list>
        <div class="more_loading">
          <span v-show="loading&&!allLoaded">加载中...</span>
          <span v-show="allLoaded">已全部加载</span>
        </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getDistributorBuildings} from '../../common/httpClient.js'
import ThPropertyList from './propertyList/PropertyList.vue'
export default {
  data () {
    return {
      propertyList: [],
      // id: '',
      // ground: '',
      title: '',
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  components: {
    ThPropertyList
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    },
    location () {
      return this.$store.state.locate.location
    },
    districtMultiple () {
      return (this.select.cityIds + '').indexOf(',') > -1
    }
  },
  mounted () {
    // this.setFindHouseData()
  },
  created () {
    this.setFindHouseData()
  },
  activated () {
  },
  methods: {
    setFindHouseData () {
      let dataBase = {
        'accountId': this.$route.query.accountId,
        'buildingGroupIds': this.$route.query.buildingGroupIds
      }
      getDistributorBuildings(dataBase).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res.content.list
          this.propertyList = cont
          this.title = res.content.shareInfo.title
          // this.allLoaded = cont.length !== 10
          // if (this.pageNo === 1) {
          // } else {
          //   this.propertyList.push(...cont)
          // }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .th_Find_house{
    height: 100%;
    position: relative;
    .th_Find_house-header{
      width: 100%;
      height: 100%;
      text-align: center;
      span{
        display: inline-block;
        width: 60%;
        font-size: 0.8rem;
        line-height: @headerHeight;
        color: @cf;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .th_Find_house-cont{
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>
