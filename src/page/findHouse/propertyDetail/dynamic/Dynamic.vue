<template>
    <div class="th_dynamic_detail">
      <th-cell :cellData="{title:'楼盘动态',num:num}">
        <!-- <div @click="click">更多</div> -->
      </th-cell>
      <th-dynamic-list :dynamicList="[dynamic]" v-if="dynamic" @click="click"></th-dynamic-list>
      <div class="th_dynamic-subscription" @click="openSubscribe">订阅动态</div>
    </div>
</template>

<script>
import ThDynamicList from '../../../../components/dynamicList/DynamicList.vue'
export default {
  props: {
    dynamic: {
      type: Object
    },
    propertyId: {
      type: Number
    },
    num: {
      type: Number
    }
  },
  data () {
    return {
    }
  },
  components: {
    ThDynamicList
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    click () {
      this.$router.push({name: 'dynamic', params: {id: this.propertyId}})
    },
    openSubscribe () {
      this.$emit('openSubscribe')
    }
  }
}
</script>

<style lang="less" scoped>
.th_dynamic_detail{
  .th_cell{
    padding: 0 @plrPage ;
  }
  .th-slide_property_activity{
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    height: 4rem;
    // &::-webkit-scrollbar {
    //   opacity: 0;
    // }
    .th-slide_property_activity-cont{
      display: inline-flex;
      position: absolute;
      .th-slide_property_activity-Item{
        width: 4rem;
        margin-right: @plr;
        &:first-child{
          margin-left: @plrPage;
        }
        &:last-child{
          margin-right: @plrPage;
        }
      }
    }
  }
  .th-dynamic-text{
    padding: 0 @plrPage ;
    color: @c9;
    font-size: @defaultFontSize;
    .lineClamp(3)
  }
  .th_dynamic-subscription{
    line-height: 1.5rem;
    text-align: center;
    margin: 1rem @plrPage 0;
    background-color: @cF0F0F0;
    color: @cTheme;
    font-size: @smallFontSize;
  }
}
</style>
