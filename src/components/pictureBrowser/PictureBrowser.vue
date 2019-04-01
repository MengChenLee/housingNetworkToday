<template>
  <mt-swipe :auto="0" :speed="1000" class="th_picture_rowser" @click.native="click" :defaultIndex="defaultIndex">
    <mt-swipe-item v-for="(item,i) in picList" :key="i" >
      <img class="th_picture_rowser-img" :src="item.images" />
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  props: {
    picList: {
      type: Array,
      default: function () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.th_picture_rowser{
  height: 100%;
  /deep/ .mint-swipe-item{
    .th_picture_rowser-img{
      width:100% ;
      height: 100% ;
      // display: block;
      // margin: 0 auto;
      // position: relative;
      // top:50%;
      // left: 0;
      // transform: translateY(-50%);
      object-fit: contain;
    }
  }
}
</style>
