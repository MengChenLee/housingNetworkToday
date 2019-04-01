<template>
    <div class="th_look_house" v-if="lookHouseInfo">
      <th-cell :cellData="{title:'看房服务'}"></th-cell>
      <th-img-box :imgUrl="selfCar" v-if="lookHouseInfo.indexOf('113') > -1" @click="click('113')"></th-img-box>
      <th-img-box :imgUrl="regularCar" v-if="lookHouseInfo.indexOf('114') > -1" @click="click('114')"></th-img-box>
      <th-img-box :imgUrl="specialCar" v-if="lookHouseInfo.indexOf('115') > -1" @click="click('115')"></th-img-box>
    </div>
</template>

<script>
import regularCar from './imgs/regularCar.png'
import selfCar from './imgs/selfCar.png'
import specialCar from './imgs/specialCar.png'
export default {
  props: {
    lookHouseInfo: {
      type: String
    }
  },
  data () {
    return {
      regularCar: regularCar,
      selfCar: selfCar,
      specialCar: specialCar
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
    click (type) {
      this.$emit('click', type)
    }
  }
}
</script>

<style lang="less" scoped>
.th_look_house{
  padding: 0 @plrPage ;
  .th_img-box{
    padding-top: @imgService;
    margin-top: .5rem;
  }
}
</style>
