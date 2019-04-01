<template lang="html">
  <div class="th-ad5">
    <ul class="th-ad5-cont th-ad5-left">
      <li class="th-ad5-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<3 && index%3 !== 2"  @click="click(itemValue)">
        <th-img-box class="th-ad5-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
      </li>
    </ul>
    <ul class="th-ad5-cont th-ad5-rigth">
      <li class="th-ad5-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<3 && index%3 === 2" @click="click(itemValue)">
        <th-img-box class="th-ad5-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    adList: {
      type: Array
    }
  },
  methods: {
    click (item) {
      this.$emit('click', item)
    }
  }
}
</script>

<style lang="less" scoped>
.th-ad5{
  // width: calc(100% - @plrPage * 2);
  overflow: hidden;
  .th-ad5-cont{
    width: calc(100% + 10px);
    margin:-4px;
    &.th-ad5-left,&.th-ad5-rigth{
      width:calc(50% + 4px);
      float: left;
      .th-ad5-Item{
        width:100%;
        text-align: center;
        float: left;
        .th-ad5-Item-img{
          margin: 4px;
          padding-top: 47.85%
        }
      }
      &.th-ad5-rigth{
        padding-left: 10px;
        .th-ad5-Item-img{
          padding-top: 119% !important;
        }
      }
    }
  }
}
</style>
