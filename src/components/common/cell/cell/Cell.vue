<template>
  <div class="th_cell">
    <div
      :is="isHomeCell?'th-cell-home':'th-cell-other'"
      :cellData="cellData"
      :isHaveArrow="isHaveArrow"
    >
    <slot></slot>
    </div>
  </div>
</template>

<script>
import ThCellHome from '../cellHome/CellHome.vue'
import ThCellOther from '../cellOther/CellOther.vue'
export default {
  name: 'th-cell',
  props: {
    isHomeCell: { // 是否是首页的cell，首页cell样式有很大不同
      type: Boolean,
      default: false
    },
    isHaveArrow: { // 是否拥有右向箭头
      type: Boolean,
      default: false
    },
    cellData: {
      type: Object
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ThCellHome,
    ThCellOther
  },
  computed: {

  },
  mounted () {
    // console.log(this.isHaveArrow)
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
