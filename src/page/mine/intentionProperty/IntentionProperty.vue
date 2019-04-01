<template>
  <div class="th_intention_property">
    <th-layout :hiddenFooter="$route.query.source !== 'client'">
      <div class="th_intention_property-cont" ref="cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <th-property-list :propertyList="list" :selectAble="$route.query.source === 'client'" :selectList="selectList"></th-property-list>
      </div>
      <div slot="footer" class="th_intention_property-footer" @click="submit">
        确定
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setFindHouseData, setBuildingClient} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
export default {
  data () {
    return {
      list: [],
      selectList: [],
      // 初始化无限加载相关参数
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
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
  components: {
    ThPropertyList
    // ThHouseFilider
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  activated () {
    this.pageNo = 1
    this.getData()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'cityIds': this.location.selectCityId || this.location.cityId,
        lat: this.location.lat,
        lng: this.location.lng,
        'pageNo': this.pageNo,
        'pageSize': 10,
        'moreIds': this.$route.query.id
      }
      if (!data.moreIds) {
        const select = localStorage.getItem('select')
        data = Object.assign({}, data, JSON.parse(select))
      }
      setFindHouseData(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.length !== 10
          if (this.pageNo === 1) {
            this.list = cont
          } else {
            this.list.push(...cont)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    submit () {
      let data = {
        'accountId': this.userInfo.id,
        'buildingGroupIds': this.selectList.join(',')
      }
      setBuildingClient(data).then((res) => {
        if (res && res.code === 1) {
          this.wxShare(res.content, true)
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_intention_property{
 height: 100%;
 .th_intention_property-footer{
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
