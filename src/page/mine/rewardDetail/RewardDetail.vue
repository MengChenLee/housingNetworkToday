<template>
  <div class="th_reward_detail">
    <th-layout>
      <div class="th_reward_detail-header" slot="header">
        <th-back-btn></th-back-btn>
        <mt-navbar v-model="active">
          <mt-tab-item id="rewardProgram">奖金方案</mt-tab-item>
          <mt-tab-item id="rewardRule">奖金规则</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="th_reward_detail-cont" ref="cont">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="rewardProgram">
            <div class="block" v-for="(item,index) in list" :key="index">
              <div class="line">
                  <div class="text_justify title">{{item.feeRule}}</div>
                  <div class="info">{{item.bouns}}元</div>
              </div>
              <div class="line" v-if="item.ruleContent">
                  <div class="text_justify title">规则</div>
                  <div class="info">{{item.ruleContent}}</div>
              </div>
              <div class="line">
                  <div class="text_justify title">对象</div>
                  <div class="info">{{item.title}}</div>
              </div>
              <div class="line">
                  <div class="text_justify title">有效期</div>
                  <div class="info">{{item.startDate|formatTime('YMD.')}}-{{item.endDate|formatTime('YMD.')}}</div>
              </div>
              <div class="line" v-if="item.list.length>0">
                  <div class="text_justify title">户型</div>
                  <div class="info">
                    <div class="img_wrap" v-for="(i_item,i_index) in item.list" :key="i_index">
                      <img class="img" :src="i_item.picPath"/>
                      <div class="img_title">{{i_item.title}}</div>
                    </div>
                  </div>
              </div>
          </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="rewardRule">
            <div v-html="rule"></div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div slot="footer" class="th_reward_detail-footer" @click="submit">
        <span>楼盘详情</span>
      </div>
    </th-layout>
  </div>
</template>

<script>
import {getRewardBuildingBouns, getRewardBuildingBounsRule} from '../../../common/httpClient.js'
import ThBackBtn from '../../../components/base/backBtn/BackBtn.vue'
import ThDatePicker from '../../../components/datePicker/DatePicker.vue'
export default {
  data () {
    return {
      active: 'rewardProgram',
      list: [],
      rule: ''
    }
  },
  components: {
    ThBackBtn,
    ThDatePicker
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  async mounted () {
  },
  created () {
    this.setData()
    this.getRewardBuildingBounsRule()
  },
  activated () {
    this.setData()
  },
  methods: {
    setData () {
      let data = {
        'accountId': this.userInfo.id,
        'id': this.$route.params.id
      }
      getRewardBuildingBouns(data).then(res => {
        if (res && res.content) {
          this.list = res.content.list
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    getRewardBuildingBounsRule () {
      let data = {
        'id': this.$route.params.id
      }
      getRewardBuildingBounsRule(data).then(res => {
        if (res && res.content) {
          this.rule = res.content && res.content.rule
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    submit () {
      this.$router.push({path: `/propertyDetail/${this.$route.params.id}`})
    }
  }
}
</script>

<style lang="less" scoped>
.th_reward_detail{
  height: 100%;
  font-size: @defaultFontSize;
  .th_reward_detail-header{
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
  .th_reward_detail-cont{
    .block{
      padding-top: 8px;
      padding-right: 8px;
      margin-left: 8px;
      &:not(:last-child){
        border-bottom:1px solid @cD8D8D8;
      }
    }
    .line {
      display: flex;
      margin-bottom: 7px;
    }
    .text_justify {
      text-align: justify;
      flex-shrink: 0;
      min-width: 60px;
      font-size: @defaultFontSize;
      color: @c3;
      margin-right: 20px;
      font-weight: bold;
      height: 1rem;
    }

    .text_justify:after {
      content: " ";
      display: inline-block;
      width: 100%;
    }

    .info {
      flex-grow: 1;
      font-size: @defaultFontSize;
      line-height: 1rem;
      color: @c3;
    }
    .img{
      max-width: 80px;
      display: inline-block;
      align-self: flex-start;
      &_wrap{
        margin-bottom: 10px;
        display: flex;
      }
      &_title{
        display: inline-block;
      }
    }
  }
  .th_reward_detail-footer{
    width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: right;
    color: @cTheme;
    border-top:1px solid @cD8D8D8;
    span{
      width: 3.75rem;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      display: inline-block;
      font-size:@FontSize13;
      background-color: @cTheme;
      border-radius: @borderRadius;
      color: @cf;
      font-weight: bold;
      margin-right: .6rem;
    }
  }

}
</style>
