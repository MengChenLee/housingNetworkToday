<template lang="html">
    <div
      class="th_ad"
      :is="myAdType"
      :adList="adList"
      @click="click"
    ></div>
</template>

<script>
import ThAd1 from '../ad1/ad1'
import ThAd2 from '../ad2/ad2'
import ThAd3 from '../ad3/ad3'
import ThAd4 from '../ad4/ad4'
import ThAd5 from '../ad5/ad5'
import ThAd6 from '../ad6/ad6'
import ThAd7 from '../ad7/ad7'
export default {
  props: {
    adType: {
      type: Number
    },
    adList: {
      type: Array
    }
  },
  computed: {
    myAdType () {
      switch (this.adType) {
        case 1:
          return 'th-ad-1' // 一大
        case 2:
          return 'th-ad-2' // 一大（左右）
        case 3:
          return 'th-ad-3' // 一大（左）两小（右）
        case 4:
          return 'th-ad-4' // 一大（上）两小（下）
        case 5:
          return 'th-ad-5' // 两小（左）一大（右）
        case 6:
          return 'th-ad-6' // 两小（上）一大（下）
        default:
          return 'th-ad-7' // 四小
      }
    }
  },
  components: {
    ThAd1,
    ThAd2,
    ThAd3,
    ThAd4,
    ThAd5,
    ThAd6,
    ThAd7
  },
  methods: {
    click (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
  .th_ad{
    padding:(@plr+@mlr)  @plrPage @plr;
  }
</style>
