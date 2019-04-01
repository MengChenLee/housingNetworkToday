<template>
    <div class="th_house_type">
      <th-cell :cellData="{title:`全部户型（共${num}个户型）`}">
        <div @click="click">更多</div>
      </th-cell>
      <th-house-type-list :houseTypeList="houseType"></th-house-type-list>
    </div>
</template>

<script>
import ThHouseTypeList from '../../../../components/houseTypeList/HouseTypeList.vue'
export default {
  props: {
    houseType: {
      type: Array
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
    ThHouseTypeList
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    click () {
      this.$router.push({name: 'houseType', params: {id: this.propertyId}})
    }
  }
}
</script>

<style lang="less" scoped>
.th_house_type{
  padding: 0 @plrPage ;
  .th_promote_list-item{
    padding: 0 !important;
  }
}
</style>
