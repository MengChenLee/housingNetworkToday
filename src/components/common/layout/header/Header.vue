<template>
  <div class='th_header'>
    <mt-header :title='$route.meta.title'>
      <th-back-btn slot='left'></th-back-btn>
    </mt-header>
  </div>
</template>

<script>
import ThBackBtn from '../../../base/backBtn/BackBtn.vue'
export default {
  data () {
    return {
      hackReset: true
    }
  },
  components: {
    ThBackBtn
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
.th_header {
  width: 100%;
  height: @headerHeight;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  /deep/ .mint-header {
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    .mint-header-title{
      font-size: @FontSize17;
    }
    .right{
      position: absolute;
      top: 0;
      right: .4rem;
      font-size: @defaultFontSize;
      line-height: @headerHeight;
      color: @cf
    }
  }
}
</style>
