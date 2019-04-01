<template>
    <div class="th_building">
      <th-cell :cellData="{title:'楼栋信息'}"></th-cell>
      <th-img-box :imgUrl="baseInfo.panorama" @click="click"></th-img-box>
    </div>
</template>

<script>
import banner from './imgs/banner.png'
export default {
  props: {
    baseInfo: {
      type: Object
    }
  },
  data () {
    return {
      banner: banner
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
    // click (name) {
    //   console.log(name)
    //   this.$router.push({name: name})
    // },
    click () {
      this.$router.push({name: 'building'})
    }
  }
}
</script>

<style lang="less" scoped>
.th_building{
  padding: 0 @plrPage ;
  .th_img-box{
    padding-top: @imgBanner;
    margin-top: .5rem;
  }
}
</style>
