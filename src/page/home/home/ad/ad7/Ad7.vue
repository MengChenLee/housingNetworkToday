<template lang="html">
  <div class="th-ad7">
    <ul class="th-ad7-cont">
      <li class="th-ad7-Item" v-for="(itemValue, index) in adList" :key="index"  v-if="index<4"  @click="click(itemValue)">
        <th-img-box class="th-ad7-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad7{
  .th-ad7-cont{
    width: calc(100% + 10px);
    margin:-4px;
    overflow: hidden;
    .th-ad7-Item{
      width:50%;
      text-align: center;
      float: left;
      .th-ad7-Item-img{
        margin: 4px;
        padding-top: 47.85%
      }
    }
  }
}
</style>
