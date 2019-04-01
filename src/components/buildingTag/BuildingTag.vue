<template>
    <div
    class="th_building_tag"
    :style="{'top':top,'left':left}"
    :class="{active:activeIndex,sellOut:saleTypeFlag<0,forSell:saleTypeFlag>0}"
    @click="click">
        <span class="th_building_tag-num">{{buildingTag.buildingName}}</span>
        <span class="th_building_tag-sellType">{{buildingTag.saleType}}</span>
    </div>
</template>

<script>
export default {
  props: {
    buildingTag: {
      type: Object
    },
    activeIndex: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    top () {
      return this.buildingTag.y * 100 + '%'
    },
    left () {
      return this.buildingTag.x * 100 + '%'
    },
    saleTypeFlag () {
      switch (this.buildingTag.saleType) {
        case '在售':
          return 1
        case '售罄':
          return -1
        default:
          return 0
      }
    }
  },
  methods: {
    click () {
      this.$emit('getActiveIndex', this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.th_building_tag{
    height: 1rem;
    line-height: .8rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50% + 3px,-100% + 3px);
    font-size:0;
    white-space:nowrap;
    &.sellOut{
        .th_building_tag-num{
            background-color: @c9;
            &::after{
                border-top-color:@c9;
            }
        }
        .th_building_tag-sellType{
            color: @c9;
        }
    }
    &.forSell{
        .th_building_tag-num{
            background-color: @cD14E33;
            &::after{
                border-top-color:@cD14E33;
            }
        }
    }
    &.active{
        z-index: 1;
        &.sellOut{
            .th_building_tag-sellType{
                background-color: @c9;
            }
        }
        &.forSell{
            .th_building_tag-sellType{
                background-color: @cD14E33;
            }
        }
        .th_building_tag-sellType{
            color: @cf;
            background-color: @cTheme;
        }
    }
    .th_building_tag-num{
        color: @cf;
        font-size: @smallFontSize;
        display: inline-block;
        background-color: @cTheme;
        padding: 1px 3px;
        position: relative;
        &::after{
            content: '';
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid @cTheme;
            display: inline-block;
            position: absolute;
            right: 0;
            bottom: -4px;
        }
    }
    .th_building_tag-sellType{
        font-size: @smallFontSize;
        display: inline-block;
        background-color: @cf;
        padding: 1px 3px;
    }
}
</style>
