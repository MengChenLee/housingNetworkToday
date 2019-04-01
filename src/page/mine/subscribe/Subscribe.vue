<template>
  <div class="th_subscribe">
    <th-layout :hiddenFooter="true">
      <div class="th_subscribe-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <th-property-list :propertyList="list"></th-property-list>
        <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getSubscribeList} from '../../../common/httpClient.js'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
export default {
  data () {
    return {
      list: [],
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
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this.pageNo,
        'pageSize': 10,
        'loginToken': this.userInfo.loginToken
      }
      getSubscribeList(data).then((res) => {
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
    }
  }
}
</script>

<style lang="less" scoped>
.th_subscribe{
 height: 100%;
}

</style>
