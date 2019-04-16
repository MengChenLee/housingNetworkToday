<template>
  <div class="th_select_property">
    <th-layout>
      <div class="th_select_property-cont" ref="cont">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="all">
            <th-property-list :propertyList="propertyList.favorite" :selectAble="true" :selectList="selectList" :selectTextList="selectTextList" :selectPropertyRemarkList="selectPropertyRemarkList"></th-property-list>
            <div class="more_loading">
              <span v-show="loading&&!allLoaded">加载中...</span>
              <span v-show="allLoaded && !showImg">已全部加载</span>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div slot="footer" class="th_select_property-footer" @click="submit">
        确定
      </div>
    </th-layout>
    <div class="cannotImg" v-if="showImg">
      <div class="showImg">
        <img src="../imgs/not.png" alt="">
        <span>找不到楼盘/(ㄒoㄒ)/~~</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getFavorites} from '../../../common/httpClient.js'
import ThNewsList from './newsList/NewsList.vue'
import ThPropertyList from './propertyList/PropertyList.vue'
// import ThHouseFilider from './houseFilider'
export default {
  data () {
    return {
      showImg: false,
      active: 'all',
      selectList: [],
      selectTextList: [],
      selectPropertyRemarkList: [],
      propertyList: {
        // all: [],
        // sameArea: [],
        // samePrice: [],
        favorite: []
      },
      pageNo: 0,
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
  components: {
    ThNewsList,
    ThPropertyList
  },
  mounted () {
  },
  created () {
    let selectList = sessionStorage.getItem('selectPropertyList')
    selectList && (this.selectList = JSON.parse(selectList))
    let selectTextList = sessionStorage.getItem('selectPropertyTextList')
    selectTextList && (this.selectTextList = JSON.parse(selectTextList))
    let selectPropertyRemarkList = sessionStorage.getItem('selectPropertyRemarkList')
    selectPropertyRemarkList && (this.selectPropertyRemarkList = JSON.parse(selectPropertyRemarkList))
    this.setData()
  },
  methods: {
    loadMore () {
      if (!this.allLoaded) {
        this.loading = true
        ++this.pageNo
        this.setData()
      }
    },
    setData () {
      let data = {
        'accountId': this.userInfo.id,
        'lat': this.location.lat,
        'lng': this.location.lng,
        'pageNo': this.pageNo,
        'pageSize': 10,
        'targetId': 1,
        'targetType': 1
      }
      getFavorites(data).then((res) => {
        if (res.content) {
          this.propertyList.favorite = res && res.content
        } else {
          this.showImg = true
        }
      })
    },
    submit () {
      sessionStorage.setItem('newSelectPropertyList', JSON.stringify(this.selectList))
      sessionStorage.setItem('newSelectPropertyTextList', JSON.stringify(this.selectTextList))
      sessionStorage.setItem('newSelectPropertyRemarkList', JSON.stringify(this.selectPropertyRemarkList))
      // this.$router.push({path: '/newPropertyReport'})
      history.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .th_select_property{
    height: 100%;
    position: relative;
    .cannotImg{
      width: 100%;
      height: 100%;
      background-color: #f6f6f6;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      .showImg{
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        img{
          width: 100%;
        }
        span{
          font-family: '微软雅黑';
          font-size: @FontSize15;
          color: @cD8D8D8;
        }
      }
    }
    .th_select_property-cont{
      height: 100%;
      box-sizing: border-box;
      position: relative;
      /*padding-top: 1.8rem;*/
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
      .th_select_property-list{
        height: 100%;
        overflow: auto;
      }
    }
    .th_select_property-footer{
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
