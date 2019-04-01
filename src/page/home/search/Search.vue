<template>
    <th-layout :hiddenFooter="true" class="th_homeSearch">
      <div class="hello" slot="header">
        <th-search-header @getData="getSearchData"></th-search-header>
      </div>
      <div class="th_homeSearch-cont" ref="cont">
        <div class="hotSearch" v-if="hotSearchlist&&hotSearchlist.length">
          <th-cell :cellData="{title:'最近热搜'}"></th-cell>
          <ul class="hotSearchList">
            <li
              class="hotSearchItem"
              v-for="(item,index) in hotSearchlist"
              :key="index"
              @click="goSearch(item)">
              {{item}}
            </li>
          </ul>
        </div>
        <div class="historySearch" v-if="searchHistory&&searchHistory.length">
          <th-cell :cellData="{title:'历史记录'}">
            <div @click="clean(-1)">全部清除</div>
          </th-cell>
          <ul>
            <li
            class="historySearchItem"
            v-for="(item,index) in searchHistory"
            :key="index">
              <span class="historySearchItemText" @click="goSearch(item)">{{item? item : '全部地区'}}</span>
              <span class="historySearchItemClose" @click="clean(index)"></span>
            </li>
          </ul>
        </div>
      </div>
    </th-layout>
</template>

<script>
import {setHotSearch} from '../../../common/httpClient.js'
import ThSearchHeader from './searchHeader/searchHeader'
export default {
  data () {
    return {
      hotSearchlist: [],
      searchHistory: []
    }
  },
  components: {
    ThSearchHeader
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  mounted () {
    const searchHistory = localStorage.getItem('searchHistory')
    searchHistory && (this.searchHistory = JSON.parse(searchHistory))
  },
  created () {
    this.getData()
  },
  activated () {
    // this.$refs.cont.scrollTop = this.$route.meta.scrollTop
  },
  methods: {
    getData () {
      let data = {
        cityId: this.location.selectCityId || this.location.cityId
      }
      setHotSearch(data).then((res) => {
        res && res.content && res.content.forEach(item => {
          this.hotSearchlist.push(item.tagName)
        })
      })
    },
    clean (index) {
      if (index < 0) {
        this.searchHistory = []
      } else {
        this.searchHistory.splice(index, 1)
      }
    },
    getSearchData (name) {
      let index = this.searchHistory.indexOf(name)
      index > -1 && this.searchHistory.splice(index, 1)
      this.searchHistory.splice(0, 0, name)
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      this.$router.push({name: 'findHouse', params: {search: name}})
    },
    goSearch (data) {
      this.getSearchData(data)
      this.$router.push({name: 'findHouse', params: {search: data}})
    }
  }
}
</script>

<style lang="less" scoped>
.th_homeSearch{
  color: @c9;
  .th_homeSearch-cont{
    padding: 0 @plrPage;
    .hotSearch{
      overflow: hidden;
      .hotSearchList{
        overflow: hidden;
        margin: -0.5rem 0 0 -0.5rem;
        .hotSearchItem{
          padding:.15rem .225rem;
          float: left;
          border-radius: .2rem;
          font-size:@smallFontSize;
          background-color: @cF0F0F0;
          margin: .5rem .5rem 0;
        }
      }
    }
    .historySearch{
      margin-top: .5rem;
      .historySearchItem{
        width: calc(100% + @plrPage - 2.125rem);
        font-size: @defaultFontSize;
        height: 1.875rem;
        line-height: 1.875rem;
        border-bottom: 1px solid @cD8D8D8;
        position: relative;
        padding-left: 2.125rem;
        &:before{
          content: " ";
          background-image: url('./imgs/history.png');
          background-size: contain;
          top: .4625rem;
          left: .275rem;
          position: absolute;
          width: .95rem;
          height: .95rem;
        }
        .historySearchItemText{
          width: calc(100%  - 3rem);
          display: inline-block;
        }
        .historySearchItemClose{
          width: 3rem;
          height: 100%;
          top: 0;
          right: 0;
          position: absolute;
          &:after{
            content: "+";
            font-size: @FontSize20;
            top: 0;
            right: 1.1rem;
            position: absolute;
            width: .6rem;
            line-height: 1.8rem;
            transform:rotate(45deg);
          }
        }
      }
    }
  }
}
</style>
