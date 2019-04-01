<template>
  <div class="th_Find_house">
    <th-layout>
      <div class="th_Find_house-header" slot="header">
        <span>{{title}}</span>
      </div>
      <div class="th_Find_house-cont"  ref="cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <th-property-list  :propertyList="propertyList"></th-property-list>
        <div class="more_loading">
          <span v-show="loading&&!allLoaded">加载中...</span>
          <span v-show="allLoaded">已全部加载</span>
        </div>
      </div>
      <div slot="footer" class="th_Find_house-footer" @click="confirmChannel">
        <span>确定</span>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getChannelBuildings, confirmChannel} from '../../common/httpClient.js'
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
    }
  },
  mounted () {
  },
  created () {
    // let url = location.search
    // if (url.indexOf('?') !== -1) {
    //   let str = url.substr(1)
    //   let strs = str.split('&')
    //   this.id = strs[0].split('=')[1]
    //   this.ground = strs[1].split('=')[1]
    // }
    this.setFindHouseData()
  },
  activated () {
    this.setFindHouseData()
  },
  methods: {
    setFindHouseData () {
      let dataBase = {
        'accountId': this.$route.query.accountId,
        'buildingGroupIds': this.$route.query.buildingGroupIds
      }
      getChannelBuildings(dataBase).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res.content.list
          this.propertyList = cont
          this.title = res.content.shareInfo.title
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    confirmChannel () {
      let data = {
        'accountId': this.$route.query.accountId,
        'buildingGroupIds': this.$route.query.buildingGroupIds
      }
      confirmChannel(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          this.toast(res.msg || '操作成功')
          // location.href = ''
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
      /*padding-top: 1.5rem;*/
      height: 100%;
      box-sizing: border-box;
    }
    .th_Find_house-footer{
      width: 100%;
      height: 100%;
      border-top: 1px solid #D8D8D8;
      text-align: center;
      span{
        font-size: 1rem;
        line-height: @footerHeight;
      }
    }
  }
</style>
