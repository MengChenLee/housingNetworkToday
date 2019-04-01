<template>
  <div class="th_map">
      地图
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

  }
}
</script>

<style lang="less" scoped>
.th_map{
    color: @cf;
    position: relative;
    text-align: right;
    &:after{
      content: " ";
      background-image: url('./imgs/map.png');
      background-size: contain;
      top: .55rem;
      left: 1.5rem;
      position: absolute;
      width: 1.1rem;
      height: 1.1rem;
    }
  }
</style>
