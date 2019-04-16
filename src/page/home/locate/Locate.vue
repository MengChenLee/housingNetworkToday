<template>
    <th-layout :hiddenFooter="true" class="th_homeSearch">
      <div class="hello" slot="header">
        <th-locate-header @getData="getData"></th-locate-header>
      </div>
      <div class="th_homeSearch-cont" ref="cont">
          <mt-index-list>
            <mt-index-section class="th_homeSearch-info" :index="''">
              <div class="hotSearch">
                <th-cell :cellData="{title:'当前定位城市'}"></th-cell>
                <ul class="hotSearchList">
                  <li class="hotSearchItem" @click='setCity(location)'>{{location.city}}</li>
                </ul>
              </div>
              <div class="hotSearch" v-if="hotCity&&hotCity.length">
                <th-cell :cellData="{title:'热门城市'}"></th-cell>
                <ul class="hotSearchList">
                  <li class="hotSearchItem" v-for="(item,index) in hotCity" :key="index" @click='setCity(item)'>{{item.name}}</li>
                </ul>
              </div>
              <div class="hotSearch" v-if="historyCity&&historyCity.length">
                <th-cell :cellData="{title:'历史记录'}">
                  <div @click="clean">全部清除</div>
                </th-cell>
                <ul class="hotSearchList">
                  <li class="hotSearchItem" v-for="(item,index) in historyCity" :key="index" @click='setCity(item)'>{{item.name}}</li>
                </ul>
              </div>
            </mt-index-section>
            <mt-index-section v-for="(cityListItem,index) in cityList" :key="index" :index="index">
              <mt-cell v-for="(item,index2) in cityListItem" :key="index2" :title="item.name" @click.native='setCity(item)'></mt-cell>
            </mt-index-section>
          </mt-index-list>
      </div>
    </th-layout>
</template>

<script>
import {getCityByName} from '../../../common/httpClient.js'
import ThLocateHeader from './locateHeader/locateHeader'
export default {
  data () {
    return {
      historyCity: [],
      hotCity: [],
      cityList: {}
    }
  },
  components: {
    ThLocateHeader
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  mounted () {
    let historyCity = sessionStorage.getItem('historyCity')
    historyCity && (this.historyCity = JSON.parse(historyCity))
  },
  created () {
    this.getData()
  },
  activated () {
    // this.$refs.cont.scrollTop = this.$route.meta.scrollTop
  },
  methods: {
    getData (name) {
      let data = {
        key: '99bf91bec40f5b30645d2612edced65aab2c27b7',
        name: name
      }
      getCityByName(data).then((res) => {
        let cont = res && res.content
        let cityList = cont && cont.cityList
        cont && cont.city && (cityList = [cont.city])
        this.hotCity = cont && cont.hotCity
        this.cityList = {}
        cityList.forEach(item => {
          if (!this.cityList[item.pinyin] || !this.cityList[item.pinyin].length) {
            this.$set(this.cityList, item.pinyin, [])
          }
          this.cityList[item.pinyin].push(item)
        })
        console.log(this.cityList)
      })
    },
    clean () {
      this.historyCity.splice(0, this.historyCity.length)
      sessionStorage.setItem('historyCity', JSON.stringify(this.historyCity))
    },
    setCity (selectItem) {
      if (!selectItem.name) { // 点击当前定位城市
        this.$store.commit('locate/setLocation', Object.assign({}, this.location, {
          selectCityId: 0,
          selectCity: ''
        }))
      } else { // 点击其他
        this.$store.commit('locate/setLocation', Object.assign({}, this.location, {
          selectCityId: selectItem.id,
          selectCity: selectItem.name
        }))
        this.historyCity.forEach((item, index) => {
          item === selectItem && this.historyCity.splice(index, 1)
        })
        this.historyCity.splice(0, 0, selectItem)
        sessionStorage.setItem('historyCity', JSON.stringify(this.historyCity))
      }
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.th_homeSearch{
  color: @c9;
  .th_homeSearch-cont{
    .th_homeSearch-info{
      background-color: @cf;
      .hotSearch{
        padding: 0 calc(@plrPage + 23px) 0 @plrPage;
        overflow: hidden;
        &:last-child{
          margin-bottom: 1rem;
        }
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
    }
    & /deep/ .mint-indexlist{
      .mint-indexlist-nav{
        border: 0;
        color: @cTheme;
        background-color: #00000000;
      }
      .mint-indexlist-content{
        margin-right: 0 !important;
        -webkit-overflow-scrolling: auto;
        .mint-indexsection-index{
          padding: 0 @plrPage;
          line-height: 1.5rem;
          font-size: @FontSize15;
          background-color: @cE8E8E8;
        }
        .mint-cell{
          min-height: 2.2rem;
          .mint-cell-wrapper{
            background-size: 92% 1px;
          }
        }
      }
    }
  }
}
</style>
