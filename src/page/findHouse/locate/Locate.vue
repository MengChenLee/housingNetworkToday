<template>
    <th-layout class="th_homeSearch">
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
            </mt-index-section>
            <mt-index-section v-for="(cityListItem,index) in cityList" :key="index" :index="index">
              <div
              v-for="(item,index2) in cityListItem"
              :key="index2">
                <mt-cell :title="item.name" :class="{actived:selectedCityList.indexOf(item.id)>-1}" @click.native='setCity(item)'></mt-cell>
                <ul class="indexSearchList" v-show="selectedCityList.indexOf(item.id)>-1">
                  <li
                  class="indexSearchItem"
                  v-for="(districtItem,index3) in item.cityList"
                  :key="index3"
                  :class="{actived:selectedAreaList.indexOf(districtItem.id)>-1}"
                  @click='setDistrict(districtItem)'>{{districtItem.name}}</li>
                </ul>
              </div>
            </mt-index-section>
          </mt-index-list>
      </div>
      <div slot="footer" class="th_homeSearch-footer" @click="submit">
        确定
      </div>
    </th-layout>
</template>

<script>
import {setCityList, getCityByName} from '../../../common/httpClient.js'
import ThLocateHeader from './locateHeader/locateHeader'
export default {
  data () {
    return {
      hotCity: [],
      cityList: {},
      lastCity: [],
      selectedCityList: [],
      selectedCityNameList: [],
      selectedAreaList: []
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
  },
  created () {
    this.getData()
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
        this.$set(this.cityList, '热', this.hotCity)
        cityList.forEach(item => {
          if (!this.cityList[item.pinyin] || !this.cityList[item.pinyin].length) {
            this.$set(this.cityList, item.pinyin, [])
          }
          this.cityList[item.pinyin].push(item)
        })
        // console.log(this.cityList)
      })
    },
    setCity (selectItem) {
      // this.selectedCityList = []
      if (!selectItem.cityList) {
        let data = {
          key: '99bf91bec40f5b30645d2612edced65aab2c27b7',
          name: '',
          parentId: selectItem.id
        }
        setCityList(data).then((res) => {
          res && this.$set(selectItem, 'cityList', res.content)
        })
      }
      this.lastCity.push(selectItem)
      let index = this.selectedCityList.indexOf(selectItem.id)
      if (index < 0) {
        this.selectedCityList.push(selectItem.id)
        this.selectedCityNameList.push(selectItem.id)
      } else {
        this.selectedCityList.splice(index, 1)
        this.selectedCityNameList.splice(index, 1)
        selectItem.cityList && selectItem.cityList.forEach((item) => {
          let _index = this.selectedAreaList.indexOf(item.id)
          _index > -1 && this.selectedAreaList.splice(_index, 1)
        })
      }
    },
    setDistrict (districtItem) {
      let index = this.selectedAreaList.indexOf(districtItem.id)
      if (index < 0) {
        this.selectedAreaList.push(districtItem.id)
      } else {
        this.selectedAreaList.splice(index, 1)
      }
    },
    submit () {
      if (this.selectedCityList.length === 1) {
        this.lastCity.forEach(item => {
          if (item.id === this.selectedCityList[0]) {
            this.$store.commit('locate/setLocation', Object.assign({}, this.location, {
              selectCityId: item.id,
              selectCity: item.name
            }))
            return false
          }
        })
      }
      // 今日房网专用
      if (window.jrfw.isJrfw() || window.jrfw.isJrfwFjj()) {
        window.jrfw.multipleSelectCity({
          cityIds: this.selectedCityList.join(','),
          cityNames: this.selectedCityNameList.join(','),
          districtId: this.selectedAreaList.join(',')
        })
      } else {
        // console.log(this.selectedCityList, this.selectedAreaList)
        sessionStorage.setItem('findHouse-selectedCity', this.selectedCityList.join(','))
        sessionStorage.setItem('findHouse-selectedArea', this.selectedAreaList.join(','))
        history.back()
      }
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
      height: 100%;
      .mint-indexlist-nav{
        border: 0;
        color: @cTheme;
        background-color: #00000000;
      }
      .mint-indexlist-content{
        margin-right: 0 !important;
        height: 100% !important;
        -webkit-overflow-scrolling: auto;
        .mint-indexsection-index{
          padding: 0 @plrPage;
          line-height: 1.5rem;
          font-size: @FontSize15;
          background-color: @cE8E8E8;
        }
        .mint-cell{
          min-height: 2.2rem;
          position: relative;
          padding-left: 10px;
          // .mint-cell-wrapper{
          //   background-size: 92% 1px;
          // }
          &:first-child .mint-cell-wrapper{
            background-origin: border-box;
            background-size: 92% 1px;
            padding: 0;
          }
          &.actived .mint-cell-right{
            width: 20px;
            height: 20px;
            background-color: #D14E33;
            border-radius: 50%;
            position: absolute;
            left: 85%;
            top: 50%;
            transform: translateY(-50%);
            &:after{
              content: "";
              border-radius: 0;
              border: 2px solid #ffffff;
              border-left: 0;
              border-top: 0;
              background-color: #D14E33;
              width: 4px;
              height: 8px;
              top: 3px;
              left: 6px;
              transform: rotate(45deg) scale(1);
              position: absolute;
              transition: transform .2s, -webkit-transform .2s;
            }
          }
        }
        .indexSearchList{
          overflow: hidden;
          margin-top: -0.5rem;
          padding: .3rem 0;
          // border-top: 1px solid #d9d9d9;
          position: relative;
          .indexSearchItem{
            padding:.15rem .225rem;
            float: left;
            border-radius: .2rem;
            font-size:@smallFontSize;
            background-color: @cF0F0F0;
            margin: .5rem .5rem 0;
            &.actived{
              background-color: @cTheme;
              color:@cf;
            }
          }
          &::before{
            content: '';
            width: calc(92% - 10px);
            position: absolute;
            top: 0.5rem;
            left: 10px;
            border-top: 1px solid #d9d9d9;
            transform: scaleY(.4)
          }
        }
      }
    }
  }
  .th_homeSearch-footer{
    width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: center;
    color: @cTheme;
    font-size: @FontSize15;
    font-weight: bolder;
    border-top:1px solid @cD8D8D8;
  }
}
</style>
