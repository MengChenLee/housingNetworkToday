<template>
  <div class="th_calculator_result">
    <th-layout :hiddenFooter="true">
      <div class="th_calculator_result-cont" ref="cont">
        <mt-navbar v-model="active">
          <mt-tab-item id="interest">等额本息</mt-tab-item>
          <mt-tab-item id="principal">等额本金</mt-tab-item>
        </mt-navbar>
        <table>
          <tr v-if="result.principal">
            <td>贷款总额</td>
            <td class="money">{{result.principal}}</td>
          </tr>
          <tr v-if="result.months">
            <td>还款月数</td>
            <td class="month">{{result.months}}</td>
          </tr>
          <tr v-if="result.rate">
            <td>商贷利率</td>
            <td class="rate">{{result.rate}}%</td>
          </tr>
          <tr v-if="result.fundRate">
            <td>公积金利率</td>
            <td class="rate">{{result.fundRate}}%</td>
          </tr>
          <tr v-if="result.secordYear">
            <td>{{result.firstYear}}</td>
            <td>
              <p class="money">{{result.preLoan | showNum}}</p>
              <p class="money" v-if="result.decreaseMonth">每月递减：{{result.decreaseMonth | showNum}}</p>
            </td>
          </tr>
          <tr v-if="!result.secordYear && result.preLoan">
            <td>{{result.decreaseMonth?'首':'每'}}月还款</td>
            <td>
              <p class="money">{{result.preLoan | showNum}}</p>
              <p class="money" v-if="result.decreaseMonth">每月递减：{{result.decreaseMonth | showNum}}</p>
            </td>
          </tr>
          <tr v-if="result.secordPreLoan">
            <td>{{result.secordYear}}</td>
            <td>
              <p class="money">{{result.secordPreLoan | showNum}}</p>
              <p  class="money" v-if="result.secordDecreaseMonth">每月递减：{{result.secordDecreaseMonth | showNum}}</p>
            </td>
          </tr>
          <tr v-if="result.interest">
            <td>总支付利息</td>
            <td class="money">{{result.interest | showNum}}</td>
          </tr>
          <tr v-if="result.totalMoney">
            <td>本息合计</td>
            <td class="money">{{result.totalMoney | showNum}}</td>
          </tr>
        </table>
        <th-cell v-if="list.length" :isHomeCell="true" :cellData="{title:'推荐楼盘'}">
          <span></span>
        </th-cell>
        <th-property-list :propertyList="list"></th-property-list>
      </div>
    </th-layout>
  </div>
</template>
<script>
import ThPropertyList from '../../../components/propertyList/PropertyList.vue'
import {setCalculatorMortgage, setGroupCalculatorMortgage} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      active: 'interest',
      data: null,
      result: {},
      list: []
    }
  },
  watch: {
    active (val) {
      if (val === 'interest') {
        this.result = this.data.type2
      } else {
        this.result = this.data.type1
      }
    }
  },
  components: {
    ThPropertyList
  },
  computed: {
    location () {
      return this.$store.state.locate.location
    }
  },
  mounted () {
    this.getData()
  },
  activated () {
    this.getData()
  },
  filters: {
    showNum (num) {
      return Math.round(num * 100) / 100
    }
  },
  methods: {
    getData () {
      let data = Object.assign({}, this.$route.query, {
        lat: this.location.lat,
        lng: this.location.lng
      })
      delete data.active
      if (this.$route.query.active === 'portfolioLoan') { // 组合贷款
        setGroupCalculatorMortgage(data).then((res) => {
          this.data = res && res.content
          this.list = this.data && this.data.buildingList
          this.result = this.data.type2
        })
      } else { // 商业贷款
        if (this.$route.query.active === 'commercialLoan') {
          data.loanMoney = data.loanMoney2
          data.monthNum = data.monthNum2
          data.yearRate = data.yearRate2
        }
        setCalculatorMortgage(data).then((res) => {
          this.data = res && res.content
          this.list = this.data && this.data.buildingList
          this.result = this.data.type2
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.th_calculator_result{
 height: 100%;
 font-size: @defaultFontSize;
 line-height: 1.6rem;
 /deep/ .mint-navbar{
    width: 214px;
    overflow: hidden;
    margin: 0 auto;
    padding: .5rem 0;
    .mint-tab-item{
      width: 50%;
      padding:0;
      color: @c3;
      position: relative;
      .mint-tab-item-label{
        font-size: @FontSize15;
        height: 1.5rem;
        line-height: 1.5rem;
        // padding: 0 1.2rem;
      }
      &.is-selected{
        background-color: @cTheme;
        font-weight: bold;
        border-radius: @borderRadius;
        color: @cf;
        border:0;
        margin: 0;
        &:after{
          display: none
        }
      }
    }
  }
 table{
   width: calc(100% -  @plrPage);
   margin-left: @plrPage;
   border-collapse:collapse;
   border-top:1px solid @cD8D8D8;
   tr{
     border-bottom:1px solid @cD8D8D8;
     td{
       color: @c3;
       &:last-child{
         text-align: right;
         color: @c6;
       }
       &.money::after{
         content: '元';
         display: inline-block;
         margin:0 .2rem 0 .5rem;
         color: @c3;
       }
       &.rate::after{
         content: '';
         display: inline-block;
         margin:0 .75rem;
         color: @c3;
       }
       &.month::after{
         content: '月';
         display: inline-block;
         margin:0 .2rem 0 .5rem;
         color: @c3;
       }
       & .money::after{
         content: '元';
         display: inline-block;
         margin:0 .2rem 0 .5rem;
         color: @c3;
       }
     }
   }
 }
}
</style>
