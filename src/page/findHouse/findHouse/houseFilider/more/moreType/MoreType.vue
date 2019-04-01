<template>
    <div class="th_more_type-moudel" v-if="selectList">
      <th-cell :cellData="{title:selectList.name}">
        <div @click="clean">清除</div>
      </th-cell>
      <ul class="th_more_type-list">
        <li class="th_more_type-item" v-for="(item,index) in selectList.list" :key="index">
          <input type="checkbox" name="checkbox" :id="item.name" v-model="myselect"  :value="item.id">
          <label :for="item.name" :class="{active:selectList.select && selectList.select.indexOf(item.id)>-1}">{{item.name}}</label>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    selectList: {
      type: Object
    }
  },
  data () {
    return {
      myselect: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  watch: {
    selectList: {
      handler (val) {
        // console.log('selectList', val)
        // this.setSelectList()
      },
      deep: true
    },
    myselect: {
      handler (val) {
        this.$set(this.selectList, 'select', val)
      },
      deep: true
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
    clean () {
      this.myselect = []
    }
  }
}
</script>

<style lang="less" scoped>

.th_more_type-moudel{
  position: relative;
  padding-bottom: @plrPage/2;
  .th_more_type-list{
    overflow: hidden;
    .th_more_type-item{
      min-width: 3.625rem;
      text-align: center;
      float: left;
      border-radius: @borderRadius;
      font-size:@smallFontSize;
      color: @c9;
      background-color: @cF0F0F0;
      margin:0 .375rem .5rem;
      overflow: hidden;
      input{
        display: none;
      }
      label{
        width: 100%;
        height: 100%;
        display:block;
        &.active{
          background-color: @cTheme;
          color:@cf;
        }
      }
    }
  }
}

</style>
