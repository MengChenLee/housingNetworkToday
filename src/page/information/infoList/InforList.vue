<template>
  <div class="th_info_list">
    <th-layout ref="layBox" :hiddenFooter="true">
      <div class="th_info_list-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <ul>
          <li v-for="(item,i) in list" :key="i">
            <p>{{item.title}}</p>
            <!--<div>{{item.content}}</div>-->
          </li>
        </ul>
        <div class="more_loading">
            <span v-show="loading&&!allLoaded">加载中...</span>
            <span v-show="allLoaded">已全部加载</span>
          </div>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {setInfoListById} from '../../../common/httpClient.js'
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
  components: {
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  mounted () {
    this.getData()
    this.setTitle()
  },
  activated () {
    this.pageNo = 1
    this.getData()
    this.setTitle()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.getData()
      }
    },
    setTitle () {
      let title = ''
      // 获取信息列表  媒体类型 1报备提醒 2 群聊提醒 3 楼盘动态 4 楼盘推荐 5 订阅消息 6 客户动态 7系统通知
      switch (this.$route.params.id) {
        case '1':
          title = '报备提醒'
          break
        case '2':
          title = '群聊提醒'
          break
        case '3':
          title = '楼盘动态'
          break
        case '4':
          title = '楼盘推荐'
          break
        case '5':
          title = '订阅消息'
          break
        case '6':
          title = '客户动态'
          break
        case '7':
          title = '系统通知'
          break
        default:
          break
      }
      document.title = title
      this.$route.meta.title = title
      this.$refs.layBox.headerRefresh()
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'mediaType': this.$route.params.id,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      setInfoListById(data).then((res) => {
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
.th_info_list{
  height: 100%;
  color: @c9;
  /*padding-left:  @plrPage;*/
  font-size: @smallFontSize;
  ul{
    li{
      padding: @plrPage @plrPage @plrPage 0;
      border-bottom: 1px solid @cD8D8D8;;
    }
  }
}
</style>
