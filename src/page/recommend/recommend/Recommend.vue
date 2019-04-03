<template>
  <div class="th_recommend">
    <th-layout>
      <div class="th_recommend-header" slot="header">
        <th-home-header v-model="selected"></th-home-header>
      </div>
      <div class="th_recommend-cont" ref="cont">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-promote-list :promoteList="promoteList"></th-promote-list>
            <div class="more_loading">
              <span v-show="loading&&!allLoaded">加载中...</span>
              <span v-show="allLoaded">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2" v-infinite-scroll="loadMore2" infinite-scroll-distance="20">
            <th-property-list :propertyList="propertyList"></th-property-list>
            <div class="more_loading">
              <span v-show="loading2&&!allLoaded2">加载中...</span>
              <span v-show="allLoaded2">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <th-news></th-news>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <th-footer-tab slot="footer" :active="'recommend'"></th-footer-tab>
    </th-layout>
  </div>
</template>

<script>
import {setRecommendData, setCommendList} from '../../../common/httpClient.js'
import ThNewsList from '../../../components/newsList/NewsList.vue'
import ThPromoteList from '../../../components/promoteList/PromoteList.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThFooterTab from '../../../components/common/layout/footerTab/FooterTab.vue'

import banner from './imgs/index_banner2.jpg'
import ThNews from './news/News.vue'
import ThHomeHeader from './homeHeader/homeHeader'
// import ThHouseFilider from './houseFilider'
export default {
  data () {
    return {
      banner: banner,
      selected: sessionStorage.getItem('active') || '1',
      promoteList: [],
      propertyList: [],
      newsList: [],
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true, // 全部加载
      pageNo2: 1,
      loading2: false, // 加载中
      allLoaded2: true // 全部加载
    }
  },
  components: {
    ThNewsList,
    ThPropertyList,
    ThHomeHeader,
    ThPromoteList,
    ThNews,
    ThFooterTab

    // ThHouseFilider
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  // beforeRouteLeave () {
  //   // console.log(111)
  //   // console.log(this.$refs.layBoxCont.children)
  //   // this.$route.meta.scrollTop = this.$refs.layBoxCont.children[0].scrollTop
  // },
  mounted () {
    this.setRecommendData()
    this.setCommendList()
    this.selected = sessionStorage.getItem('active') || '1'
  },
  created () {
  },
  activated () {
    this.selected = sessionStorage.getItem('active') || '1'
    // this.$refs.cont.scrollTop = this.$route.meta.scrollTop
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.setRecommendData()
      }
    },
    loadMore2 () {
      if (!this.allLoaded2) {
        this.loading2 = true
        ++this.pageNo2
        this.setCommendList()
      }
    },
    setRecommendData () {
      let data = {
        'cityId': this.location.selectCityId || this.location.cityId,
        'pageNo': this.pageNo,
        'pageSize': 3
      }
      setRecommendData(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.length !== 3
          if (this.pageNo === 1) {
            this.promoteList = cont
          } else {
            this.promoteList.push(...cont)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    setCommendList () {
      let data = {
        'cityId': this.location.selectCityId || this.location.cityId,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this.pageNo2,
        'pageSize': 10
      }
      setCommendList(data).then((res) => {
        this.loading2 = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded2 = cont.length !== 10
          if (this.pageNo2 === 1) {
            this.propertyList = cont
          } else {
            this.propertyList.push(...cont)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_recommend{
  height: 100%;
  .th_recommend-cont{
    & /deep/ .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        height: 100%;
        .mint-tab-container-item{
          height: 100%;
          overflow: auto;
        }
      }
    }
  }
}
</style>
