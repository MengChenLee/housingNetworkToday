<template lang="html">
  <div class="th-ad1">
    <ul class="th-ad1-cont">
      <li class="th-ad1-Item" v-for="(itemValue, index) in adList" :key="index" v-if="index<1" @click="click(itemValue)">
        <th-img-box class="th-ad1-Item-img" :imgUrl="itemValue.picPath"></th-img-box>
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
.th-ad1{
  .th-ad1-cont{
    width: calc(100% + 10px);
    margin:-4px;
    overflow: hidden;
     .th-ad1-Item{
      width:100%;
      text-align: center;
      float: left;
      .th-ad1-Item-img{
        margin: 4px;
        padding-top: 45.41%
      }
    }
  }

}
</style>
