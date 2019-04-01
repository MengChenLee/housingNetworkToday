<template lang="html">
  <div class="th-ad6">
    <ul class="th-ad6-cont">
      <li class="th-ad6-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<3"  @click="click(itemValue)">
        <th-img-box class="th-ad6-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad6{
  .th-ad6-cont{
    width: calc(100% + 10px);
    margin:-6px;
    overflow: hidden;
    .th-ad6-Item{
      width:50%;
      text-align: center;
      float: left;
      .th-ad6-Item-img{
        margin: 6px;
        padding-top: 66.6%
      }
      &:nth-child(3n){
        width:100%;
        .th-ad6-Item-img{
          padding-top: 28.3%
        }
      }
    }
  }
}
</style>
