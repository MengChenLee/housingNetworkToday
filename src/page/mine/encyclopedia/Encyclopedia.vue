<template>
  <div class="th_encyclopedia">
    <th-layout :hiddenFooter="true">
      <div class="th_encyclopedia-cont" ref="cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <th-news-list :newsList="list"></th-news-list>
        <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setNewsList} from '../../../common/httpClient.js'
import ThNewsList from '../../../components/newsList/NewsList.vue'
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
    ThNewsList
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
        'typeId': 110,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      setNewsList(data).then((res) => {
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
.th_encyclopedia{
 height: 100%;
}

</style>
