<template lang="html">
  <div class="th_footer">
    <mt-tabbar v-model="myActive">
      <mt-tab-item id="home">
        <img slot="icon" :src="myActive === 'home'?homeT:homeF">
        首页
      </mt-tab-item>
      <mt-tab-item id="findHouse">
        <img slot="icon" :src="myActive === 'findHouse'?findHouseT:findHouseF">
        找房
      </mt-tab-item>
      <mt-tab-item id="recommend" @click.native="recommendFlag = true">
        <img slot="icon" :src="myActive === 'recommend'?recommendT:recommendF">
        推荐
      </mt-tab-item>
      <mt-tab-item id="information">
        <img slot="icon" :src="myActive === 'information'?informationT:informationF">
        消息
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" :src="myActive === 'mine'?mineT:mineF">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import homeF from './imgs/icon-home-false.png'
import homeT from './imgs/icon-home-true.png'
import findHouseF from './imgs/icon-findHouse-false.png'
import findHouseT from './imgs/icon-findHouse-true.png'
import recommendF from './imgs/icon-recommend-false.png'
import recommendT from './imgs/icon-recommend-true.png'
import informationF from './imgs/icon-information-false.png'
import informationT from './imgs/icon-information-true.png'
import mineF from './imgs/icon-mine-false.png'
import mineT from './imgs/icon-mine-true.png'

export default {
  props: {
    active: {
      type: String,
      default: 'home'
    }
  },
  data () {
    return {
      myActive: this.active,
      recommendFlag: false,
      homeF: homeF,
      homeT: homeT,
      findHouseF: findHouseF,
      findHouseT: findHouseT,
      recommendF: recommendF,
      recommendT: recommendT,
      informationF: informationF,
      informationT: informationT,
      mineF: mineF,
      mineT: mineT
    }
  },
  watch: {
    myActive (val) {
      // console.log(val)
      if (val === 'recommend' && this.recommendFlag === true) {
        sessionStorage.setItem('active', 1)
      }
      this.$router.replace(val)
    }
  },
  activated () {
    this.myActive = this.$route.name
  },
  components: {

  },
  computed: {

  },
  mounted () {
    // console.log(this.myActive)
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.th_footer{
  width: 100%;
  height: 55px;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  & /deep/ .mint-tabbar{
    background: @cf;
    .mint-tab-item-icon{
      text-align: center;
      img{
        width: auto;
        height: auto;
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .mint-tab-item.is-selected {
      color: @c1B1A78;
      background: @cf;
    }
  }
}
</style>
