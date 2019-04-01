<template>
  <div class="th_favorite">
    <th-layout :hiddenFooter="true">
      <div class="th_favorite-header">
        <mt-navbar v-model="active">
          <mt-tab-item id="property">楼盘</mt-tab-item>
          <mt-tab-item id="news">头条</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="th_favorite-cont" ref="cont">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="property" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-property-list :propertyList="list.property"></th-property-list>
            <div class="more_loading">
              <span v-show="loading_property&&!allLoaded_property">加载中...</span>
              <span v-show="allLoaded_property">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="news" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-news-list :newsList="list.news"></th-news-list>
            <div class="more_loading">
              <span v-show="loading_news&&!allLoaded_news">加载中...</span>
              <span v-show="allLoaded_news">已全部加载</span>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getFavorites} from '../../../common/httpClient.js'
import ThNewsList from '../../../components/newsList/NewsList.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
// import ThHouseFilider from './houseFilider'
export default {
  data () {
    return {
      active: 'property',
      list: {
        property: [],
        news: []
      },
      // 初始化无限加载相关参数
      pageNo_property: 1,
      loading_property: false, // 加载中
      allLoaded_property: true, // 全部加载
      pageNo_news: 1,
      loading_news: false, // 加载中
      allLoaded_news: true // 全部加载
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    },
    location () {
      return this.$store.state.locate.location
    }
  },
  watch: {
    active (val) {
      if (!this.list[val].length) {
        this.getData()
      }
    }
  },
  components: {
    ThNewsList,
    ThPropertyList
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  methods: {
    loadMore () {
      if (!this['allLoaded_' + this.active]) {
        this['loading_' + this.active] = true
        ++this['pageNo_' + this.active]
        this.getData()
      }
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this['pageNo_' + this.active],
        'pageSize': 10,
        'targetId': 1,
        'targetType': this.active === 'property' ? 1 : 2 // 1楼盘 2新闻
      }
      getFavorites(data).then((res) => {
        this['loading_' + this.active] = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this['allLoaded_' + this.active] = cont.length !== 10
          if (this['loading_' + this.active] === 1) {
            this.list[this.active] = cont
          } else {
            this.list[this.active].push(...cont)
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
.th_favorite{
  height: 100%;
  .th_favorite-header{
    width: 100%;;
    height: 1.625rem !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    box-shadow:0px 2px 0px 0px @cD8D8D8;
    & /deep/ .mint-navbar{
      height: 1.625rem;
      overflow: hidden;
      .mint-tab-item{
        padding:0;
        color: @c3;
        .mint-tab-item-label{
          font-size: @FontSize15;
          height: 1.8rem;
          line-height: 1.8rem;
        }
        &.is-selected{
          color: @cTheme;
        }
      }
    }
  }
  .th_favorite-cont{
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding-top: 1.8rem;
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
    .th_favorite-list{
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
