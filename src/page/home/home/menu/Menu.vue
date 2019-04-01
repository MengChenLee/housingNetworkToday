<template lang="html">
<ul class="th-menu">
  <li class="th-menu-Item" v-for="(itemValue, index) in menuList" :key="index" @click="click(itemValue.linkUrl)">
    <i class="th-menu-icon" :style="'background-image: url('+itemValue.iconUrl+')'"></i>
    <p class="th-menu-text">{{itemValue.iconName || '今日房网'}}</p>
  </li>
</ul>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array
    }
  },
  methods: {
    click (url) {
      this.dealLink(url)
    }
  }
}
</script>

<style lang="less" scoped>
.th-menu{
  overflow: hidden;
  .th-menu-Item{
    width:20%;
    text-align: center;
    float: left;
    .th-menu-icon{
      width: 2rem;
      height: 2rem;
      display: inline-block;
      border-radius: 50%;
      background-size: contain;
      margin-top: 11px;
    }
    .th-menu-text{
      color:@c3;
      font-size:@smallFontSize;
      font-weight:400;
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
