<template>
  <div class="th_shop">
    <th-layout>
      <div class="th_shop-cont" ref="cont">
        <th-user-info-swipe
          v-if="list.userInfoVO.length"
          :list="list.userInfoVO">
        </th-user-info-swipe>
        <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['news']"></th-cell>
        <th-news-list :newsList="list.news" v-if="list.news.length"></th-news-list>
        <th-cell :isHomeCell="true" :isHaveArrow="true" :cellData="cellData['property']"></th-cell>
        <th-property-list :propertyList="list.property" v-if="list.property.length"></th-property-list>
        <div class="more_loading">
          <span v-show="loading&&!allLoaded">加载中...</span>
          <span v-show="allLoaded">已全部加载</span>
        </div>
      </div>
      <th-footer slot="footer" @call="call"  @chat="goChat"></th-footer>
    </th-layout>
  </div>
</template>

<script>
import {getUserShop, setChatMsnList} from '../../../common/httpClient.js'
import ThUserInfoSwipe from './userInfoSwipe/UserInfoSwipe.vue'
import ThNewsList from '../../../components/newsList/NewsList.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import ThFooter from './footer/footer'
// import ThHouseFilider from './houseFilider'
export default {
  data () {
    return {
      list: {
        userInfoVO: [],
        news: [],
        property: []
      },
      cellData: {
        news: {
          title: '经济头条',
          linkUrl: '',
          value: ''
        },
        property: {
          title: '推荐楼盘',
          linkUrl: 'http://h5.jrfw360.com/findHouse',
          value: '更多'
        }
      },
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
  watch: {
    active (val) {
      if (!this.list.length) {
        this.getData()
      }
    }
  },
  components: {
    ThUserInfoSwipe,
    ThNewsList,
    ThPropertyList,
    ThFooter
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
        'accountId': this.$route.params.id,
        'pageNo': this.pageNo,
        'pageSize': 10
      }
      getUserShop(data).then((res) => {
        this.loading = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this.allLoaded = cont.buildingList.length !== 10
          if (this.pageNo === 1) {
            this.$set(this.list, 'userInfoVO', [cont.userInfoVO])
            this.$set(this.list, 'news', [cont.news])
            this.$set(this.list, 'property', cont.buildingList)
          } else {
            this.list.property.push(...cont)
          }
          cont.shareInfo && this.wxShare(cont.shareInfo)
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    call () {
      if (!this.list.userInfoVO.phone) {
        this.toast('该用户没有手机号')
        return
      }
      window.location.href = `tel:${this.list.userInfoVO.phone}`
    },
    goChat (accountId) {
      if (this.userInfo.id === accountId) {
        this.toast('不能私聊自己')
        return false
      }
      let data = {
        'accountId': this.userInfo.id,
        'otherAccountId': this.$route.params.id,
        'loginToken': this.userInfo.loginToken,
        'pageNo': 1,
        'pageSize': 10
      }
      setChatMsnList(data).then((res) => {
        let cont = res && res.content
        this.$router.push({name: 'chat', params: {id: cont.groupId}})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_shop{
  height: 100%;
  .th_shop-header{
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
  .th_shop-cont{
    height: 100%;
    box-sizing: border-box;
    position: relative;
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
    .th_shop-list{
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
