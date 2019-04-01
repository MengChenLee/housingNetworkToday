<template>
  <div class="th_promote_detail">
    <!--<span class="linkBtn" @click="clickBtn">&it;</span>-->
    <th-layout v-if="promoteDetail">
      <div class="th_promote_detail-box" ref="cont">
        <th-img-box class="th_promote_detail-img" :imgUrl="promoteDetail.picPath"></th-img-box>
        <div class="th_promote_detail-cont">
          <div class="th_promote_detail-title">
            {{promoteDetail.buildingGroupName}}
            <span>[{{promoteDetail.title}}]</span>
          </div>
          <ul class="th_promote_detail-info">
            <li>已有{{promoteDetail.joinNum || 0}}人参与</li>
            <li>剩余时间：{{fromDate()}}</li>
          </ul>
          <ul>
            <li>
              <th-cell :cellData="{title:'流程与详情'}"></th-cell>
              <p>
                <table class="th_property_list-item-info">
                  <tr><td>活动详情：</td><td>{{promoteDetail.content}}</td></tr>
                  <tr><td>适用范围：</td><td>{{promoteDetail.useRange}}</td></tr>
                  <tr><td>使用方法：</td><td>{{promoteDetail.useMethod}}</td></tr>
                  <tr><td>服务承诺：</td><td>{{promoteDetail.service}}</td></tr>
                </table>
              </p>
            </li>
            <li>
              <th-cell :cellData="{title:'楼盘详情'}"></th-cell>
              <p>
                <table class="th_property_list-item-info">
                  <tr><td>均价：</td><td>{{promoteDetail.price / 10000}}万元/㎡</td></tr>
                  <tr><td>开盘时间：</td><td>{{promoteDetail.beginSellDate | formatTime('YMD_')}}</td></tr>
                  <tr><td>地 址：</td><td>{{promoteDetail.address}}</td></tr>
                </table>
              </p>
            </li>
          </ul>
          <div class="th_promote_detail-more" @click="click"><span>更多详情</span></div>
        </div>
      </div>
      <th-footer slot="footer" @call="call" @signUp="goReport" @chat="chat"></th-footer>
    </th-layout>
  </div>
</template>

<script>
import {setPromoteDetail, setSignUpPromote} from '../../../common/httpClient.js'
import ThFooter from './footer/footer'
export default {
  data () {
    return {
      selected: '',
      id: this.$route.params.id,
      promoteDetail: null,
      phone: '',
      endDate: ''
    }
  },
  components: {
    ThFooter
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
    this.selected = +this.$route.query.id
    // this.setData()
  },
  created () {
  },
  activated () {
    this.selected = +this.$route.query.id
    this.id = this.$route.params.id
    this.setData()
  },
  methods: {
    setData () {
      setPromoteDetail({id: this.id}).then((res) => {
        let cont = res && res.content
        this.promoteDetail = cont && cont.activity
        this.phone = cont.activity.phone
        this.endDate = cont.activity.endDate
        this.wxShare(cont.shareInfo)
      })
    },
    click () {
      this.$router.push({name: 'propertyDetail', params: {id: this.promoteDetail.buildingGroupId}})
    },
    call () {
      window.location.href = `tel:` + this.phone
    },
    goReport () {
      this.$router.push({path: `/propertyReport/${this.promoteDetail.buildingGroupId}`,
        query: {
          buildingGroupName: this.promoteDetail.buildingGroupName,
          reportRemark: this.promoteDetail.reportRemark
        }})
    },
    /**
     * 优惠活动报名，暂时无用，直接跳转报备
     */
    signUp () {
      let data = {
        'accountId': this.userInfo.id,
        'activityId': this.$route.params.id,
        'content': 'string',
        'phone': this.userInfo.phone,
        'username': this.userInfo.username
      }
      setSignUpPromote(data).then((res) => {
        if (res.code === 1) {
          this.toast('报名成功')
        } else {
          this.toast('接口异常，请稍后再试')
        }
      })
    },
    clickBtn () {
      // console.log(this.selected)
      if (this.selected === 2) {
        this.$router.push({path: '/recommend?selected=2'})
      } else {
        this.$router.go(-1)
      }
    },
    chat () {
      // params: {id: this.propertyId}
      this.$router.push({name: 'chat'})
    },
    fromDate () {
      let nowDate = new Date().getTime()
      let time = this.endDate - nowDate
      let days = Math.floor(time / (24 * 3600 * 1000))
      let leave1 = time % (24 * 3600 * 1000)
      let hours = Math.floor(leave1 / (3600 * 1000))
      // let leave2 = leave1 % (3600 * 1000)
      // let minutes = Math.floor(leave2 / (60 * 1000))
      // let leave3 = leave2 % (60 * 1000)
      // let seconds = Math.round(leave3 / 1000)
      return days + '天 ' + hours + '小时 '// + minutes + ' 分钟' + seconds + ' 秒'
    }
  }
}
</script>

<style lang="less" scoped>
.th_promote_detail{
  height: 100%;
  position: relative;
  .linkBtn{
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
  .th_promote_detail-box{
    .th_promote_detail-img{
      padding-top: @imgBase;
    }
    .th_promote_detail-cont{
      padding: 0 @plrPage;
      font-size: @defaultFontSize;
      color: @c3;
      .th_promote_detail-title{
        line-height: 1.5rem;
        font-size: @FontSize15;
        font-weight: bold;
        span{
          color: @cD14E33;
        }
      }
      .th_promote_detail-info{
        color: @c9;
        font-size: @smallFontSize;
        margin: .5rem 0 1rem;
      }
      .th_property_list-item-info{
        tr{
          td{
            line-height: 1.25rem;
            vertical-align: top;
            &:first-child{
              width: 4.5rem;
              height: 0;
              overflow: hidden;
              color: @c9;
            }
            &:last-child{
              // padding-left: .5rem;
            }
            span{
              max-width: calc(100% - .6rem);
              padding-right: 1rem;
            }
          }
        }
      }
      .th_promote_detail-more{
        color: @cD14E33;
        text-align: center;
        font-size: @smallFontSize;
        line-height: 2rem;
      }
    }
  }
}
</style>
