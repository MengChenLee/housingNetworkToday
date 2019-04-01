<template>
    <div class="th_promote">
      <th-cell :cellData="{title:'优惠活动'}"></th-cell>
        <th-promote-list :promoteList="[promoteInfo]"></th-promote-list>
    </div>
</template>

<script>
import ThPromoteList from '../../../../components/promoteList/PromoteList.vue'
export default {
  props: {
    promoteInfo: {
      type: Object
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    ThPromoteList
  },
  computed: {

  },
  mounted () {

  },
  created () {
  },
  methods: {
    click (name) {
      console.log(name)
      this.$router.push({name: name})
    }
  }
}
</script>

<style lang="less" scoped>
.th_promote{
  .th_cell{
    padding: 0 @plrPage ;
  }

}
</style>
