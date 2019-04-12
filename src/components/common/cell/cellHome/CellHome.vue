<template>
  <div class="th_home_other">
    <div class="th_home_other-cell"  :class="cellData.title==='今日优推'? 'isHaveArrow' : (cellData.title==='附近地图'? 'isArrowAfter' : 'arrow')">
      {{cellData.title}}
      <div class="th_home_other-cell-rigth" @click="click" v-show="cellData.title==='今日优推'? false : true">
        <slot><div>更多</div></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cellData: {
      type: Object
    },
    isHaveArrow: { // 是否拥有右向箭头
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    click () {
      sessionStorage.setItem('active', this.cellData.active)
      console.log(sessionStorage.getItem('active'))
      this.cellData.linkUrl && this.dealLink(this.cellData.linkUrl)
    }
  }
}
</script>

<style lang="less" scoped>
.th_home_other{
  padding:0 @plrPage;
  .th_home_other-cell{
    height: 2.5rem;
    line-height: 2.5rem;
    padding-left: 1rem;
    position: relative;
    font-size: @FontSize20;
    color: @c3;
    &::before{
      content: "";
      width: 4px;
      height: 21px;
      border-radius: 2px;
      background-color: blue;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -10.5px
    }
    &.isArrowAfter{
      .th_home_other-cell-rigth{
        right: .5rem;
      }
    }
    &.arrow{
      .th_home_other-cell-rigth{
        right: .5rem;
      }
      &::after{
        border: solid 1px @c6;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        position: absolute;
        right: 2px;
        width: 7px;
        height: 7px;
        transform: translateY(-50%) rotate(45deg);
      }
    }
    .th_home_other-cell-rigth{
      line-height: 2.5rem;
      font-size: @FontSize15;
      color: @c6;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
