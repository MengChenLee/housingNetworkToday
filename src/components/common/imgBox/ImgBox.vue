<template>
  <div class="th_img-box" @click="click">
    <div class="th_img-box-cont"
      :style="'background-image: url('+imgUrl+')'"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'th-img-box',
  props: {
    imgUrl: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {

  },
  watch: {
    oncontextmenu () {
      document.oncontextmenu = function () {
        return false
      }
    }
  },
  mounted () {

  },
  created () {
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.th_img-box{
  position: relative;
  padding-top: 100%;
  .th_img-box-cont{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    background-position: center;
    top: 0;
    left: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
}
</style>
