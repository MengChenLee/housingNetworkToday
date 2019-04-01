<template>
  <bm-overlay
    class="myOverlay"
    ref="customOverlay"
    :class="{active,isArea:!!myOverlay.districtId}"
    pane="labelPane"
    @draw="draw">
    <div @click="handleClick" @touchend="handleClick">
      <p>{{myOverlay.districtName}}{{myOverlay.name}}</p>
      <p>
        <span v-if="myOverlay.countNum">{{myOverlay.countNum}}个</span>
        <span v-if="myOverlay.price">{{Math.ceil(myOverlay.price/10000)}}万元/㎡</span>
      </p>
    </div>
  </bm-overlay>
</template>

<script>
import BmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
export default {
  props: ['myOverlay', 'active', 'index'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  components: {
    BmOverlay
  },
  methods: {
    handleClick () {
      this.$emit('click', this.myOverlay)
    },
    draw ({el, BMap, map}) {
      let lat = this.myOverlay.latitude || this.myOverlay.lat
      let lng = this.myOverlay.longitude || this.myOverlay.lng
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - (el.clientWidth) / 2 + 'px'
      if (this.myOverlay.districtId) {
        el.style.top = pixel.y - (el.clientHeight) / 2 + 'px'
      } else {
        el.style.top = pixel.y - el.clientHeight - 18 + 'px'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.myOverlay {
  position: absolute;
  background: rgba(53,73,210,.95);
  border: 1px solid rgba(25, 45, 177, 0.95);
  color: #f4f4f4;
  text-align: center;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 12px;
  box-shadow: 2px 4px 7px rgba(12, 28, 135, 0.3);
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -6px;
    width: 13px;
    height: 13px;
    background: rgba(88, 109, 241, 0.95);
    background-size: 100%;
    opacity: .95;
    z-index: -1;
    transform: rotate(45deg)
  }
  &.isArea{
    width: 80px;
    height: 30px;

    padding: 25px 0;
    border-radius: 50%;
    &::after{
      display: none;
    }
  }
  p{
    margin: 0;
    line-height: 16px;
    white-space: nowrap;
  }
  &.active {
    // background: rgba(255,89,91,.95);
    // border: 1px solid rgba(255,66,69,.95);
    // box-shadow: 2px 4px 7px rgba(175,8,11,0.3);
    background: rgba(67,177,123,.9);
    border: 1px solid rgba(57,152,106,.9);
    box-shadow: 2px 4px 7px rgba(4,73,39,0.3);
    color: #fff;
    z-index: 1;
    &:after{
      background: rgba(67,177,123,.9);
      color: #fff;
    }
  }
}
</style>
