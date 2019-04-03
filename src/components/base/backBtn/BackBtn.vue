<template>
  <div class="back">
    <div class="th_back_btn" @click="back">
    </div>
  </div>
</template>

<script>
export default {
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
  mounted () {

  },
  created () {
  },
  methods: {
    back () {
      if (window.jrfw.isApp()) {
        window.jrfw.back()
      } else if (window.jrfw.getIsWxClient()) {
        if (window.history.length > 1) {
          window.jrfw.back()
        } else {
          window.location.href = 'http://h5.jrfw360.com/home'
        }
      } else {
        history.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.back{
  width: 0;
  height: 100%;
  float: left;
  .th_back_btn{
    width: 1.5rem;
    height: 100%;
    color: @cf;
    position: relative;
    left: -10px;
    &:after{
      border: solid 1.8px @cf;
      border-bottom-width: 0;
      border-left-width: 0;
      content: " ";
      top: 50%;
      left: 55%;
      position: absolute;
      width: .55rem;
      height: .55rem;
      transform: translateY(-50%) rotate(-135deg);
    }
  }
}

</style>
