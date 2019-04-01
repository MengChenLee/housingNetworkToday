<template lang="html">
  <div class="th-ad2">
    <ul class="th-ad2-cont">
      <li class="th-ad2-Item" v-for="(itemValue, index) in adList" :key="index"  v-if="index<2"  @click="click(itemValue)">
        <th-img-box class="th-ad2-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad2{
  .th-ad2-cont{
    width: calc(100% + 10px);
    margin:-4px;
    overflow: hidden;
     .th-ad2-Item{
      width:50%;
      text-align: center;
      float: left;
      .th-ad2-Item-img{
        margin: 4px;
        padding-top: 100%
      }
    }
  }

}
</style>
