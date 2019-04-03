<template>
  <div class="th_swiper">
    <mt-swipe>
      <mt-swipe-item
        v-for="(itemValue, index) in bannerList"
        :key="index"
        @click.native="click(itemValue,index)"
      >
        <th-img-box :imgUrl="itemValue.picPath || itemValue"></th-img-box>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {

  },
  computed: {

  },
  mounted () {
  },
  created () {
  },
  methods: {
    click (item, index) {
      this.$emit('click', index)
      item.linkUrl && this.dealLink(item.linkUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.th_swiper{
  background-color: #999;
  position: relative;
  padding-top: @imgBanner;
  & /deep/ .mint-swipe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .mint-swipe-item{
      .th_img-box{
        padding-top: @imgBanner
      }
    }
    .mint-swipe-indicator{
      background-color: @cf!important;
      opacity: 1;
      &.is-active{
        background-color: @c1B1A78!important
      }
    }
  }
}
</style>
