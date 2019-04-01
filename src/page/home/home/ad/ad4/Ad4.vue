<template lang="html">
  <div class="th-ad4">
    <ul class="th-ad4-cont">
      <li class="th-ad4-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<3"  @click="click(itemValue)">
        <th-img-box class="th-ad4-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad4{
  .th-ad4-cont{
    width: calc(100% + 10px);
    margin:-4px;
    overflow: hidden;
    .th-ad4-Item{
      width:50%;
      text-align: center;
      float: left;
      .th-ad4-Item-img{
        margin: 4px;
        padding-top: 47.85%
      }
      &:nth-child(3n+1){
        width:100%;
        .th-ad4-Item-img{
          padding-top: 28.3%
        }
      }
    }
  }
}
</style>
