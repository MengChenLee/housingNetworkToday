<template>
  <div class="th_reward">
    <th-layout :hiddenFooter="true">
      <div class="th_reward-header" slot="header">
        <th-back-btn></th-back-btn>
        <mt-navbar v-model="active">
          <mt-tab-item id="projectReward">项目奖金</mt-tab-item>
          <mt-tab-item id="clinchReward">成交奖金</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="th_reward-cont" ref="cont">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="projectReward" class="th_clinch_reward-cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <th-property-list :propertyList="list.projectReward" :isReward="true"></th-property-list>
            <div class="more_loading">
              <span v-show="loading_projectReward&&!allLoaded_projectReward">加载中...</span>
              <span v-show="allLoaded_projectReward">已全部加载</span>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="clinchReward" class="th_clinch_reward-cont" v-infinite-scroll="loadMore" infinite-scroll-distance="20">
            <!-- <ul class="th_clinch_reward-money-box">
              <li>
                <p class="th_clinch_reward-money">20000.00元</p>
                <p>已结奖金</p>
              </li>
              <li>
                <p class="th_clinch_reward-money">5000.00元</p>
                <p>待结奖金</p>
              </li>
            </ul> -->
            <!-- 搜索框 -->
            <!-- <div class="th_clinch_reward-top">
              <div class="th_clinch_reward-filter" v-show="searcBtn" @click="clickSearch">确定</div>
              <div class="th_clinch_reward-filter" v-show="!searcBtn" @click="popupVisible = true">筛选</div>
              <div class="th_clinch_reward-search">
                <input type="text" v-model="searchText" placeholder="搜索" @focus="searcBtn=true" @blur="searcBtn=false"/>
              </div>
            </div>
            <ul>
              <li v-for="(item,i) in list.clinchReward" :key="i" class="th_clinch_reward-item">
                <div >
                  <p>楼盘名称：{{item.buildingGroupName}}</p>
                  <p>姓 名：{{item.username}}</p>
                  <p>性 别：{{item.sex === 1?'男':'女'}}</p>
                  <p>看房服务：{{item.visitType || '暂无设置'}}</p>
                  <p>报备时间：{{item.reportTime | formatTime('YMD.')}}</p>
                </div>
              </li>
            </ul> -->
            <div class="more_loading">
              <span v-show="loading_clinchReward&&!allLoaded_clinchReward">加载中...</span>
              <span v-show="allLoaded_clinchReward">已全部加载</span>
            </div>
            <mt-popup
              class="th_report-popup"
              v-model="popupVisible"
              position="right">
              <ul class="th_report-popup-cont">
                <li v-for="(item,i) in statusList" :key="i" :class="{active:status===item.value}" @click="clickStatus(item.value)">{{item.text}}</li>
              </ul>
            </mt-popup>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getRewardBuildings} from '../../../common/httpClient.js'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
export default {
  data () {
    return {
      active: 'projectReward',
      list: {
        projectReward: [],
        clinchReward: []
      },
      popupVisible: false,
      searcBtn: false,
      searchText: '',
      status: 0, // 0全部 1报备 2带看 3 案场签到4看房接待5看房确认6认筹7认购8签约
      statusList: [
        {
          text: '案场签到',
          value: 3
        },
        {
          text: '看房接待',
          value: 4
        },
        {
          text: '看房确认',
          value: 5
        },
        {
          text: '认筹',
          value: 6
        },
        {
          text: '认购',
          value: 7
        },
        {
          text: '签约',
          value: 8
        },
        {
          text: '全部',
          value: 0
        }
      ],
      // 初始化无限加载相关参数
      pageNo_projectReward: 1,
      loading_projectReward: false, // 加载中
      allLoaded_projectReward: true, // 全部加载
      pageNo_clinchReward: 1,
      loading_clinchReward: false, // 加载中
      allLoaded_clinchReward: true // 全部加载
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  watch: {
    active (val) {
      if (!this.list[val].length) {
        this.getData()
      }
    }
  },
  components: {
    ThPropertyList,
    ThBackBtn
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  methods: {
    loadMore () {
      if (!this['allLoaded_' + this.active]) {
        this['loading_' + this.active] = true
        ++this['pageNo_' + this.active]
        this.getData()
      }
    },
    clickStatus (status) {
      this.pageNo = 1
      this.status = status
      // this.setData()
    },
    clickSearch () {
      this.pageNo = 1
      // this.setData()
    },
    getData () {
      let data = {
        'accountId': this.userInfo.id,
        'pageNo': this['pageNo_' + this.active],
        'pageSize': 10
      }
      getRewardBuildings(data).then((res) => {
        this['loading_' + this.active] = false
        if (res && res.code === 1) {
          let cont = res && res.content
          this['allLoaded_' + this.active] = cont.length !== 10
          if (this['loading_' + this.active] === 1) {
            this.list[this.active] = cont
          } else {
            this.list[this.active].push(...cont)
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    getStatusText (status) {
      switch (status) {
        // 0全部 1报备 2带看 3 案场签到4看房接待5看房确认6认筹7认购8签约
        case 1:
          return '报备'
        case 2:
          return '带看'
        case 3:
          return '案场签到'
        case 4:
          return '看房接待'
        case 5:
          return '看房确认'
        case 6:
          return '认筹'
        case 7:
          return '认购'
        case 8:
          return '签约'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.th_reward{
  height: 100%;
  .th_reward-header{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 8px;
    box-sizing: border-box;
    & /deep/ .mint-navbar{
      margin: 0 2rem;
      height: @headerHeight;
      overflow: hidden;
      background-color: rgba(0,0,0,0);
      .mint-tab-item{
        padding:0;
        color: @cf;
        position: relative;
        .mint-tab-item-label{
          font-size: @FontSize15;
          height: @headerHeight;
          line-height: @headerHeight;
        }
        &.is-selected:after{
          content: '';
          position: absolute;
          width: 40%;
          height: 2px;
          background-color: @cf;
          bottom: 6px;
          border-radius: 2px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .th_reward-cont{
    height: 100%;
    & /deep/ .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        height: 100%;
        .mint-tab-container-item.th_clinch_reward-cont{
          height: 100%;
          font-size: @smallFontSize;
          overflow: auto;
          position:relative;
          .th_clinch_reward-money-box{
            display:flex;
            color:@c3;
            border-bottom:1px solid @cD8D8D8;
            li{
              flex:1;
              padding:.6rem 0;
              font-size:@FontSize13;
              text-align:center;
              .th_clinch_reward-money{
                font-size:@FontSize17;
              }
              &:last-child{
                border-left:1px solid @cD8D8D8;
              }
            }
          }
          .th_clinch_reward-top{
            padding: @plrPage 0 @plrPage @plrPage;
            border-bottom: 1px solid @cD8D8D8;
            .th_clinch_reward-filter{
              width: 2.5rem;
              height: 1.5rem;
              line-height: 1.5rem;
              float: right;
              text-align: center;
              color: @c3549D2;
            }
            .th_clinch_reward-search{
              overflow: hidden;
              border-radius:7.5rem;
              border:1px solid @cD8D8D8;
              padding-left: 2rem;
              position: relative;
              input{
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                display: block;
                border: 0;
                outline: none;
              }
              &:before{
                width: 1rem;
                height: 1rem;
                content: '';
                background: url('./imgs/search.png') no-repeat;
                background-size: contain;
                position: absolute;
                top: .25rem;
                left: .6rem;
              }
            }
          }
          .th_clinch_reward-item{
            margin:0 @plrPage;
            padding:@plrPage 0;
            color: @c3;
            border-bottom: 1px solid @cD8D8D8;
          }
          .th_report-popup{
            width: 7rem;
            height: 100%;
            position: absolute;
            .th_report-popup-cont{
              padding: @plrPage;
              li{
                margin-top: .25rem;
                height: 1.25rem;
                line-height: 1.25rem;
                background-color: @cD8D8D8;
                text-align: center;
                border-radius: @borderRadius;
                &.active{
                  color: @cf;
                  background-color: @cF76C1D;
                }
              }
            }
          }
          /deep/ .v-modal{
            position: absolute;
          }
        }
      }
    }
  }
  .th_reward-footer{
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
