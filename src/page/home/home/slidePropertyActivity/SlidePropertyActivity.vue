<template lang="html">
<div class="th_slide_property_activity" v-if="mySlidePropertyActivityList">
  <ul class="th_slide_property_activity-cont" ref="slide">
    <li class="th_slide_property_activity-Item"
      v-for="(itemValue, index) in mySlidePropertyActivityList"
      :key="index"
      @touchstart="cancelAnimation"
      @touchend="setAnimation"
      @mousedown="cancelAnimation"
      @mouseup="setAnimation">
      <th-img-box class="th_slide_property_activity-img" :imgUrl="itemValue.picPath" @click="click(itemValue.id)"></th-img-box>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    slidePropertyActivityList: {
      type: Array
    }
  },
  data () {
    return {
      dis: 0,
      timer: 0
    }
  },
  computed: {
    mySlidePropertyActivityList () {
      let list = []
      for (let i = 0; i < 2; i++) {
        this.slidePropertyActivityList && this.slidePropertyActivityList.forEach(item => {
          list.push(item)
        })
      }
      return list
    }
  },
  mounted () {
    this.scrollEnd = this.$refs.slide.offsetWidth / 2
    this.dis = (this.scrollEnd - this.$refs.slide.parentNode.scrollLeft) / 200 / this.slidePropertyActivityList.length
    // console.log(this.scrollEnd, this.dis)
    this.setAnimation()
  },
  methods: {
    setAnimation () {
      this.timer = requestAnimationFrame(() => {
        if (!this.$refs.slide) {
          return
        }
        let curlLeft = this.$refs.slide.parentNode.scrollLeft
        if (curlLeft < this.scrollEnd) {
          this.$refs.slide.parentNode.scrollLeft = curlLeft + this.dis
        } else {
          this.$refs.slide.parentNode.scrollLeft = 0
        }
        this.setAnimation()
      })
    },
    cancelAnimation () {
      cancelAnimationFrame(this.timer)
    },
    click (id) {
      this.$router.push({
        name: 'promoteDetail',
        params: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.th_slide_property_activity{
  padding-bottom:@ptb;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  -webkit-overflow-scrolling: auto;
  height: 6rem;
  &::-webkit-scrollbar {
    opacity: 0;
  }
  .th_slide_property_activity-cont{
    display: inline-flex;
    position: absolute;
    .th_slide_property_activity-Item{
      width: 10rem;
      margin-right: @plr*2;
      &:first-child{
        margin-left: @plrPage;
      }
      &:last-child{
        margin-right: @plrPage;
      }
      .th_slide_property_activity-img{
        padding-top: @imgBase
      }
    }
  }
}
</style>
