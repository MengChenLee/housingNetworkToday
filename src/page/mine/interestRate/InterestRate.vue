<template>
  <div class="th_intention_rate">
    <th-layout :hiddenFooter="true" ref="layBox">
      <div class="th_intention_rate-cont" ref="cont">
        <ul>
          <li>
            <span class="th_intention_rate-title">自定义</span>
            <span class="th_intention_rate-tips">（举例：利率上浮25%时，倍数输入1.25）</span>
            </li>
          <li class="th_intention_rate-select">
            <span>贷款利率</span>
            <input type="text" v-model="base"/>
            <span>%x</span>
            <input type="text" v-model="float"/>
            <span>倍={{Math.round(base * float * 100) / 100}}%</span>
            <span class="submit" @click="setInterestRate(Math.round(base * float * 100) / 100)">确定</span>
          </li>
          <li><span class="th_intention_rate-title">或选择贷款利率</span></li>
          <li v-for="(item,i) in floatList" :key="i"
            :class="{'th_intention_rate-select':select === Math.round(base * item * 100) / 100}"
            @click="setInterestRate(Math.round(base * item * 100) / 100)"
          >
            最新{{title}}
            {{getFloatText(item)}}
          </li>
        </ul>
      </div>
    </th-layout>
  </div>
</template>
<script>
export default {
  data () {
    return {
      base: this.$route.params.id === '1' ? 3.25 : 4.9,
      select: this.base,
      float: 1.00,
      title: '公积金',
      floatList: [
        1,
        // 1.3,
        1.2,
        1.15,
        1.1,
        1.05,
        0.95,
        0.9,
        0.85,
        0.8,
        0.7
      ]
    }
  },
  mounted () {
    this.setTitle()
  },
  activated () {
    this.base = this.$route.params.id === '1' ? 3.25 : 4.9
    this.setTitle()
  },
  methods: {
    setTitle () {
      this.title = this.$route.params.id === '1' ? '公积金' : '商贷'
      document.title = this.title + '利率'
      this.$route.meta.title = this.title + '利率'
      this.$refs.layBox.headerRefresh()
    },
    getFloatText (num) {
      if (num > 1) {
        return `利率上浮${Math.round(num * 10000 - 10000) / 100}%(${Math.round(this.base * num * 100) / 100}%)`
      } else if (num < 1) {
        return `利率下浮${Math.round(10000 - num * 10000) / 100}%(${Math.round(this.base * num * 100) / 100}%)`
      } else {
        return `基准利率(${this.base}%)`
      }
    },
    setInterestRate (interestRate) {
      sessionStorage.setItem('interestRate-' + this.$route.params.id, interestRate)
      history.back()
    }
  }
}
</script>
<style lang="less" scoped>
.th_intention_rate{
 height: 100%;
 font-size: @largeFontSize;
 color: @c9;
 li{
   line-height: 2rem;
   border-bottom: 1px solid @cD8D8D8;
   padding-left: @plrPage;
   &.th_intention_rate-select{
     color:@c3;
     .submit{
       height: 1.5rem;
       line-height: 1.5rem;
       padding: 0 @plrPage;
       float: right;
       margin-right: @plrPage;
       background-color: @cTheme;
       color: @cf;
       margin-top: .25rem;
       border-radius: @borderRadius;
       font-size: @defaultFontSize;
     }
   }
   .th_intention_rate-title{
    color:@cTheme;
  }
  .th_intention_rate-tips{
    font-size: @defaultFontSize;
  }
  input{
    width: 2rem;
    display: inline-block;
    border: 1px solid @cD8D8D8;
    text-align: center;
    outline: none;
  }
 }

}
</style>
