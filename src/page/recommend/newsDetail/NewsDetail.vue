<template>
  <div class="th_news_detail">
    <!--<router-link to="/recommend?selected=3">&it;</router-link>-->
    <div class="th_news_detail-share" @click="share">分享</div>
    <th-layout>
      <div class="th_news_detail-box" v-if="newDetail" ref="cont">
        <div class="th_news_detail-title">
          {{newDetail.headline}}
        </div>
        <ul class="th_news_detail-info">
          <li>来源：{{newDetail.resource}}</li>
          <li>发布时间：{{newDetail.createDateFormat}}</li>
        </ul>
        <div class="th_news_detail-cont" v-html="newDetail.content"></div>
      </div>
      <div class="th_news_detail-footer" @click="submit" slot="footer">
        <span v-if="!isFavorite">收藏</span>
        <span v-else class="isFavorite">已收藏</span>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {setNewsDetail, addFavorite} from '../../../common/httpClient.js'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
export default {
  data () {
    return {
      newDetail: null,
      isFavorite: false,
      topTitle: '',
      content: '',
      shareInfo: ''
    }
  },
  components: {
    ThBackBtn
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    },
    location () {
      return this.$store.state.locate.location
    }
  },
  mounted () {
    // this.setNewsDetail()
  },
  created () {
    this.setNewsDetail()
  },
  activated () {
    // this.$refs.cont.scrollTop = this.$route.meta.scrollTop
    this.setNewsDetail()
  },
  methods: {
    setNewsDetail () {
      let data = {
        id: this.$route.params.id,
        accountId: this.userInfo.id
      }
      setNewsDetail(data).then((res) => {
        let cont = res.content
        this.newDetail = cont && cont.news
        this.isFavorite = cont && cont.isFavorite
        this.topTitle = cont.news.headline
        this.content = cont.news.content
        this.shareInfo = cont.shareInfo
        document.title = this.newDetail.headline
        this.$route.meta.title = this.newDetail.headline
        // this.$refs.layBox.headerRefresh()
      })
    },
    share () {
      // console.log('topShare')
      this.wxShare({
        title: this.shareInfo.title,
        imgUrl: this.shareInfo.imageUrl,
        link: this.shareInfo.url,
        desc: this.shareInfo.description
      }, true)
    },
    submit () {
      let data = {
        'accountId': this.userInfo.id,
        // 'id': this.$route.params.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        // 'loginToken': this.userInfo.loginToken,
        'targetId': this.$route.params.id,
        'targetType': 2 // 1楼盘 2新闻
      }
      addFavorite(data).then((res) => {
        if (res.code === 1) {
          this.isFavorite = !this.isFavorite
          this.toast(res.msg || '收藏')
        } else {
          this.toast('接口异常，请稍后再试')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_news_detail{
  height: 100%;
  position: relative;
  .th_back_btn{
    display: none !important;
  }
  a{
    position: absolute;
    top: 0;
    left: .6rem;
    z-index: 100;
    font-size: @FontSize17;
    line-height: @headerHeight;
    color: @cf;
    width: @headerHeight;
    height: @headerHeight;
  }
  .th_news_detail-share{
    // width: 4rem;
    position: absolute;
    top: 0;
    right: .6rem;
    z-index: 100;
    font-size: @FontSize17;
    line-height: @headerHeight;
    color: @cf;
  }
  .th_news_detail-box{
    padding: 0 @plrPage;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .th_news_detail-title{
      color: @c3;
      line-height: 1.5rem;
      font-size: @FontSize15;
      font-weight: bold;
    }
    .th_news_detail-info{
      color: @c9;
      font-size: @smallFontSize;
      margin: .5rem 0 1rem;
      li{
        display: inline-block;
      }
    }
    .th_news_detail-cont{
      color: @c4C4C4C;
      font-size: @defaultFontSize;
      /deep/ img{
        max-width: 100%;
        max-height: 100%;
      }
      /deep/ p{
        overflow: hidden;
        // white-space:normal;
        // word-break: break-all;
      }
    }
  }
  .th_news_detail-footer{
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
    & .isFavorite{
      color: @c9;
    }
  }
}
</style>
