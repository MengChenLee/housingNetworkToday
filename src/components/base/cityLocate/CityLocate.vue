<template>
  <div class="th-city-locate">
    <div class="locate" @click="click">
      {{!hiddenCity ? (this.location.selectCity || this.location.city) : '多选市'}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String
    },
    hiddenCity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    location () {
      return this.$store.state.locate.location
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
.th-city-locate{
  color: @cf;
  height: 100%;
  overflow: hidden;
  .locate{
    height: 100%;
    position: relative;
    padding-right: .5rem;
    .lineClamp(1);
    &:after{
      border: solid 1px @cf;
      border-bottom-width: 0;
      border-left-width: 0;
      content: " ";
      top: 43%;
      right: 20px;
      position: absolute;
      width: 8px;
      height: 8px;
      -webkit-transform: translateY(-50%) rotate(135deg);
      transform: translateY(-50%) rotate(135deg);
    }
  }
}
</style>
