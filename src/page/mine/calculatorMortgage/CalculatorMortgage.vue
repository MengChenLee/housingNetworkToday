<template>
  <div class="th_calculator_mortgage">
    <th-layout>
      <div class="th_calculator_mortgage-cont" ref="cont">
        <th-swiper :bannerList="adsList"></th-swiper>
        <mt-navbar v-model="active">
          <mt-tab-item id="providentFundLoan">公积金贷款</mt-tab-item>
          <mt-tab-item id="commercialLoan">商业贷款</mt-tab-item>
          <mt-tab-item id="portfolioLoan">组合贷款</mt-tab-item>
        </mt-navbar>
        <div class="th_calculator_mortgage-info">
          <div v-if="active === 'providentFundLoan' || active === 'portfolioLoan'">
            <mt-cell :title="active === 'portfolioLoan'?'公积金贷款金额':'贷款金额'" isLink class="money">
                <input type="text" placeholder="请输入贷款金额" v-model="submitData.loanMoney" />
            </mt-cell>
            <mt-cell :title="active === 'portfolioLoan'?'公积金按揭年数':'按揭年数'" isLink>
                <input type="text" placeholder="请选择按揭年数" v-model="submitData.monthNum" readonly @click="selectMonth(1)"/>
            </mt-cell>
            <mt-cell title="公积金利率" isLink>
                <input type="text" placeholder="请选择公积金利率" v-model="submitData.yearRate" readonly @click="goInterestRate(1)"/>
            </mt-cell>
          </div>
          <div v-if="active === 'commercialLoan' || active === 'portfolioLoan'">
            <mt-cell :title="active === 'portfolioLoan'?'商业贷款金额':'贷款金额'" isLink class="money">
                <input type="text" placeholder="请输入贷款金额" v-model="submitData.loanMoney2" />
            </mt-cell>
            <mt-cell :title="active === 'portfolioLoan'?'商业按揭年数':'按揭年数'" isLink>
                <input type="text" placeholder="请选择按揭年数" v-model="submitData.monthNum2" readonly  @click="selectMonth(2)"/>
            </mt-cell>
            <mt-cell title="商业利率" isLink>
                <input type="text" placeholder="请选择商业利率" v-model="submitData.yearRate2" readonly @click="goInterestRate(2)"/>
            </mt-cell>
          </div>
        </div>
      </div>
      <div slot="footer" class="th_calculator_mortgage-footer" @click="submit">
        开始计算
      </div>
    </th-layout>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="slots" value-key="title" @change="onValuesChange"></mt-picker>
      <ul class="submit">
        <li @click="selectAns">确定</li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
// setGroupCalculatorMortgage
import {getAdsList} from '../../../common/httpClient.js'
import ThSwiper from '../../../components/swiper/Swiper.vue'
export default {
  data () {
    return {
      adsList: [],
      slots: [
        {
          values: []
        }
      ],
      monthMark: 0,
      popupVisible: false,
      active: 'providentFundLoan',
      submitData: {
        'loanMoney': '',
        'loanMoney2': '',
        'monthNum': '',
        'monthNum2': '',
        'yearRate': '',
        'yearRate2': ''
      }
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  components: {
    ThSwiper
  },
  mounted () {
    this.getData()
    this.setMonthList()
    this.setInterestRate()
    this.wxShare({
      title: '今日房网-房贷计算器',
      link: 'http://h5.jrfw360.com/calculatorMortgage',
      desc: '神器在手，购房无忧'
    })
  },
  activated () {
    this.setInterestRate()
  },
  methods: {
    setMonthList () {
      let slotsList = []
      for (let i = 30; i > 0; i--) {
        slotsList.push(i)
      }
      this.$set(this.slots[0], 'values', slotsList)
    },
    setInterestRate () {
      this.$set(this.submitData, 'yearRate', sessionStorage.getItem('interestRate-1'))
      this.$set(this.submitData, 'yearRate2', sessionStorage.getItem('interestRate-2'))
    },
    selectMonth (mark) {
      this.monthMark = mark
      this.popupVisible = true
      if (this.monthMark === 1 && !this.submitData.monthNum) {
        this.$set(this.submitData, 'monthNum', this.slots[0].values[0])
      } else if (this.monthMark === 2 && !this.submitData.monthNum2) {
        this.$set(this.submitData, 'monthNum2', this.slots[0].values[0])
      }
    },
    goInterestRate (num) {
      this.$router.push({path: '/interestRate/' + num})
    },
    onValuesChange (picker, values) {
      if (this.monthMark === 1) {
        this.$set(this.submitData, 'monthNum', values[0])
      } else if (this.monthMark === 2) {
        this.$set(this.submitData, 'monthNum2', values[0])
      }
    },
    selectAns () {
      this.popupVisible = false
      // this.$emit('click', this.value)
    },
    getData () {
      let data = {
        'adType': 'CAL'
      }
      getAdsList(data).then((res) => {
        this.adsList = res && res.content
      })
    },
    submit () {
      let data = Object.assign(this.submitData, {
        active: this.active
      })
      this.$router.push({name: 'calculatorResult',
        query: data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_calculator_mortgage{
 height: 100%;
 .th_calculator_mortgage-cont{
   /deep/ .mint-navbar{
      height: @headerHeight;
      overflow: hidden;
      .mint-tab-item{
        padding:0;
        color: @c3;
        position: relative;
        .mint-tab-item-label{
          font-size: @FontSize15;
          height: @headerHeight;
          line-height: @headerHeight;
        }
        &.is-selected{
          color: @cTheme;
          font-weight: bold;
          &:after{
            display: none
          }
        }
      }
    }
  .th_calculator_mortgage-info{
    & /deep/ .mint-cell{
      &.money{
        .mint-cell-allow-right::after{
          content: '万';
          transform:rotate(0);
          border: 0;
          position: static;
        }
      }
      .mint-cell-mask{
        display: none;
      }
      .mint-cell-title{
        min-width: 6.5rem;
        color: @c3;
        flex: 0;
        .mint-cell-text{
          margin-left: .2rem;
        }
      }
      .mint-cell-value{
        min-height: inherit;
        margin: 1px auto;
        flex: 1;
        font-size: @smallFontSize;
        input{
          width: 100%;
          min-height: inherit;
          display: inline-block;
          outline: none;
          border:0;
        }
        &.is-link{
          margin-right: 15px;
        }
      }
      .mint-cell-allow-right::after{
        width: 8px;
        height: 8px;
        border: solid 1px @c9;
        border-bottom-width: 0;
        border-left-width: 0;
        right: 10px;
      }
    }
  }

 }
 .th_calculator_mortgage-footer{
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
  /deep/ .mint-popup{
    width: 100%;
    .picker-center-highlight{
      background-color: @cDBE0FF;
      z-index: -1;
    }
    .submit{
      display: flex;
      text-align: center;
      font-size: @FontSize15;
      line-height: 1.875rem;
      li{
        flex: 1;
        .lineargGradient();
        color: @cf;
      }
    }
  }
}
</style>
