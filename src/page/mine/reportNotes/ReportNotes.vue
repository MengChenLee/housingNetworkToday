<template>
  <div class="th_report_notes">
    <th-layout :hiddenFooter="true">
      <div class="th_report_notes-cont" ref="cont"  v-infinite-scroll="loadMore" infinite-scroll-distance="20">
        <div class="th_report_notes-top">
          <div class="th_report_notes-filter" v-show="searcBtn" @click="clickSearch">确定</div>
          <div class="th_report_notes-filter" v-show="!searcBtn" @click="popupVisible = true">筛选</div>
          <div class="th_report_notes-search">
            <input type="text" v-model="searchText" placeholder="搜索" @focus="searcBtn=true" @blur="searcBtn=false"/>
          </div>
        </div>
        <ul>
          <li v-for="(item,i) in list" :key="i" class="th_report_notes-item">
            <div class="th_report_notes-item-left">
              <p>楼盘名称：{{item.buildingGroupName}}</p>
              <p>姓 名：{{item.username}}</p>
              <p>性 别：{{item.sex === 1?'男':'女'}}</p>
              <p>看房服务：{{item.visitType || '暂无设置'}}</p>
              <p>报备时间：{{item.reportTime | formatTime('YMD.')}}</p>
            </div>
            <div class="th_report_notes-item-right">
              <p>预计到访时间：{{item.firstVisitTime | formatTime('YMDHM.')}}</p>
              <p>到访人数：{{item.visitorNum}}</p>
              <p class="th_report_notes-item-status"> 报备状态：{{getStatusText(item.status)}}</p>
            </div>
          </li>
        </ul>
        <div class="more_loading">
          <span v-show="loading&&!allLoaded">加载中...</span>
          <span v-show="allLoaded">已全部加载</span>
        </div>
        <mt-popup
          class="th_report-popup"
          v-model="popupVisible"
          position="right">
          <ul class="th_report-popup-cont">
            <li v-for="(item,i) in statusList" :key="i" :class="{active:status===item.value}" @click="clickStatus(item.value)">{{item.text}}</li>
          </ul>
        </mt-popup>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {getReportList} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      list: [],
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
      pageNo: 1,
      loading: false, // 加载中
      allLoaded: true // 全部加载
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  components: {
  },
  created () {
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
    clickStatus (status) {
      this.pageNo = 1
      this.status = status
      this.setData()
    },
    clickSearch () {
      this.pageNo = 1
      this.setData()
    },
    setData () {
      let data = {
        // 'id': this.userInfo.id,
        'id': 60,
        'username': this.searchText,
        'status': this.status,
        'pageNo': this.pageNo,
        'pageSize': 50
      }
      getReportList(data).then((res) => {
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
.th_report_notes{
  height: 100%;
  font-size: @smallFontSize;
  .th_report_notes-cont{
      .th_report_notes-top{
        padding-left: @plrPage;
        margin:  @plrPage 0;
        .th_report_notes-filter{
          width: 2.5rem;
          height: 1.5rem;
          line-height: 1.5rem;
          float: right;
          text-align: center;
          color: @c3549D2;
        }
        .th_report_notes-search{
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
      .th_report_notes-item{
        padding: @plrPage;
        border-bottom: 1px solid @cD8D8D8;
        overflow: hidden;
        position: relative;
        .th_report_notes-item-left{
          color: @c3;
          width: 7.5rem;
          padding-right: @plrPage;
          float: left;
          position: relative;
          &::after{
            content: '';
            width: 1px;
            height: 90%;
            position: absolute;
            top: 50%;
            right: 0;
            background-color: @c979797;
            transform: translateY(-50%);
          }
        }
        .th_report_notes-item-right{
          height: 100%;
          padding-left: @plrPage;
          overflow: hidden;
          color: @cD14E33;
          .th_report_notes-item-status{
              width: calc(100% - 7.5rem - @plrPage*4);
              height: 1.25rem;
              line-height: 1.25rem;
              color: @cf;
              background-color: @cF76C1D;
              position: absolute;
              right: @plrPage;
              bottom: @plrPage;
              border-radius: @borderRadius;
              text-align: center;
          }
        }
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
</style>
