<template lang="html">
  <div class="th-ad3">
    <ul class="th-ad3-cont">
      <li class="th-ad3-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<3"  @click="click(itemValue)">
        <th-img-box class="th-ad3-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad3{
  .th-ad3-cont{
    width: calc(100% + 10px);
    margin:-4px;
    overflow: hidden;
    .th-ad3-Item{
      width:50%;
      text-align: center;
      float: left;
      .th-ad3-Item-img{
        margin: 4px;
        padding-top: 47.85%
      }
      &:nth-child(3n+1){
        .th-ad3-Item-img{
          padding-top: 100%
        }
      }
    }
    &:after {
      content: '';
      display: block;
      clear: both;
      width: 0;
      height: 0;
    }
  }
}
</style>
