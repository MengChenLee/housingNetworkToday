<template>
  <div class="th_news">
      <div class="th_news-header">
        <mt-navbar v-model="active">
          <mt-tab-item id="all">全部</mt-tab-item>
          <mt-tab-item id="featured">精选</mt-tab-item>
          <mt-tab-item id="local">本地</mt-tab-item>
          <mt-tab-item id="encyclopedia">百科</mt-tab-item>
          <mt-tab-item id="broke">爆料</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="th_news-cont">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="all" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-news-list :newsList="newsList.all"></th-news-list>
            <div class="more_loading">
              <span v-show="loading_all&&!allLoaded_all">加载中...</span>
              <span v-show="allLoaded_all">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="featured" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
              <th-news-list :newsList="newsList.featured"></th-news-list>
              <div class="more_loading">
                <span v-show="loading_featured&&!allLoaded_featured">加载中...</span>
                <span v-show="allLoaded_featured">已全部加载</span>
              </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="local" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-news-list :newsList="newsList.local"></th-news-list>
            <div class="more_loading">
              <span v-show="loading_local&&!allLoaded_local">加载中...</span>
              <span v-show="allLoaded_local">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="encyclopedia" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-news-list :newsList="newsList.encyclopedia"></th-news-list>
            <div class="more_loading">
              <span v-show="loading_encyclopedia&&!allLoaded_encyclopedia">加载中...</span>
              <span v-show="allLoaded_encyclopedia">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="broke" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-news-list :newsList="newsList.broke"></th-news-list>
            <div class="more_loading">
              <span v-show="loading_broke&&!allLoaded_broke">加载中...</span>
              <span v-show="allLoaded_broke">已全部加载</span>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
  </div>
</template>

<script>
import {setNewsList} from '../../../../common/httpClient.js'
import ThNewsList from '../../../../components/newsList/NewsList.vue'

import banner from '../imgs/index_banner2.jpg'
// import ThHouseFilider from './houseFilider'
export default {
  data () {
    return {
      banner: banner,
      active: 'all',
      newsList: {
        all: [],
        featured: [],
        local: [],
        encyclopedia: [],
        broke: []
      },
      // 初始化无限加载相关参数
      pageNo_all: 1,
      loading_all: false, // 加载中
      allLoaded_all: true, // 全部加载
      pageNo_featured: 1,
      loading_featured: false, // 加载中
      allLoaded_featured: true, // 全部加载
      pageNo_local: 1,
      loading_local: false, // 加载中
      allLoaded_local: true, // 全部加载
      pageNo_encyclopedia: 1,
      loading_encyclopedia: false, // 加载中
      allLoaded_encyclopedia: true, // 全部加载
      pageNo_broke: 1,
      loading_broke: false, // 加载中
      allLoaded_broke: true // 全部加载
    }
  },
  watch: {
    active (val) {
      if (!this.newsList[val].length) {
        this.setNewsList()
      }
    }
  },
  components: {
    ThNewsList
    // ThHouseFilider
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  async mounted () {
    this.setNewsList()
  },
  created () {
  },
  methods: {
    loadMore () {
      if (!this['allLoaded_' + this.active]) {
        this['loading_' + this.active] = true
        ++this['pageNo_' + this.active]
        this.setNewsList()
      }
    },
    setNewsList () {
      let data = {
        'pageNo': this['pageNo_' + this.active],
        'pageSize': 10
      }
      switch (this.active) {
        case 'all':
          break
        case 'featured':
          data = Object.assign({}, data, {typeId: 109})
          break
        case 'local':
          data = Object.assign({}, data, {cityId: this.location.selectCityId || this.location.cityId})
          break
        case 'encyclopedia':
          data = Object.assign({}, data, {typeId: 110})
          break
        case 'broke':
          data = Object.assign({}, data, {typeId: 111})
          break
      }
      setNewsList(data).then((res) => {
        this['loading_' + this.active] = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this['allLoaded_' + this.active] = cont.length !== 10
          if (this['loading_' + this.active] === 1) {
            this.newsList[this.active] = cont
          } else {
            this.newsList[this.active].push(...cont)
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
.th_news{
  height: 100%;
  .th_news-header{
    width: 100%;;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    box-shadow:0px 2px 0px 0px @cD8D8D8;
    & /deep/ .mint-navbar{
      height: 1.8rem;
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
  .th_news-cont{
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
    .th_news-list{
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
