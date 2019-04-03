<template>
  <div class="th_Find_house">
    <th-house-filider :select="select" :selectList='selectList' :hiddenCity="districtMultiple"></th-house-filider>
    <th-layout>
      <div class="th_Find_house-header" slot="header">
        <th-home-header :searchData="select.buildingGroupName" :hiddenCity="districtMultiple"></th-home-header>
      </div>
      <div class="th_Find_house-cont"  ref="cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
          <th-property-list  :propertyList="newsList"></th-property-list>
          <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
      <th-footer-tab slot="footer" :active="'findHouse'"></th-footer-tab>
    </th-layout>
  </div>
</template>

<script>
import {setFindCondition, setFindHouseData} from '../../../common/httpClient.js'
import ThNewsList from '../../../components/newsList/NewsList.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThFooterTab from '../../../components/common/layout/footerTab/FooterTab.vue'
import banner from './imgs/index_banner2.jpg'
import ThHomeHeader from './homeHeader/HomeHeader.vue'
import ThHouseFilider from './houseFilider/HouseFilider'
export default {
  data () {
    return {
      banner: banner,
      selectList: [], // 多选数据
      select: {
        'cityIds': '',
        'buildingGroupName': '', // 楼盘名称
        'districtId': '', // 区县id
        'streetIds': '', // 街道ids
        'lineId': 0, // 地铁id
        'stepIds': '', // 地铁站ids
        'eachPrice': '', // 单价
        'totalPrice': '', // 总价
        'firstPayment': '', // 首付
        'moduleType': '', // 户型
        'moreIds': '', // 更多ids
        'orderBy': '' // 排序
      },
      selectedCity: [], // 城市选择
      newsList: [],
      // 初始化无限加载相关参数
      pageNo: 0,
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  components: {
    ThFooterTab,
    ThNewsList,
    ThPropertyList,
    ThHomeHeader,
    ThHouseFilider
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
  watch: {
    select: {
      handler (val, oldval) {
        // console.log(val, oldval)
        // if (JSON.stringify(val) !== JSON.stringify(oldval)) {
        this.pageNo = 1
        // }
      },
      deep: true
    }
  },
  mounted () {
  },
  created () {
    sessionStorage.setItem('findHouse-selectedArea', '')
    sessionStorage.setItem('findHouse-selectedCity', '')
    this.$set(this.select, 'cityIds', this.location.selectCityId || this.location.cityId)
  },
  activated () {
    if (sessionStorage.getItem('findHouse-selectedCity')) {
      this.$set(this.select, 'cityIds', sessionStorage.getItem('findHouse-selectedCity'))
    }
    this.$set(this.select, 'districtId', sessionStorage.getItem('findHouse-selectedArea'))
    // 搜索页返回数据填充
    this.$set(this.select, 'buildingGroupName', this.$route.params.search)
    this.setFindHouseData()
    this.setFindCondition()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.setFindHouseData()
      }
    },
    setFindCondition () {
      let data = {
        'cityIds': this.location.selectCityId || this.location.cityId
      }
      setFindCondition(data).then((res) => {
        this.selectList = res && res.content
      })
    },
    setFindHouseData () {
      let dataBase = {
        'accountId': this.userInfo.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      let data = Object.assign({}, dataBase, this.select)
      for (let key in data) {
        if (typeof data[key] === 'object') {
          delete data[key]
        }
      }
      // console.log(data)
      setFindHouseData(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.length !== 10
          if (this.pageNo === 1) {
            this.newsList = cont
          } else {
            this.newsList.push(...cont)
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
.th_Find_house{
  height: 100%;
  position: relative;
  .th_Find_house-cont{
    padding-top: 1.5rem;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
