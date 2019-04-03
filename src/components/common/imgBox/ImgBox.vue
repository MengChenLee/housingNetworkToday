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
    background-size: 100%;
    position: absolute;
    background-position: center;
    top: 0;
    left: 0;
    user-select: none;
  }
}
</style>
