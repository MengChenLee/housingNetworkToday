<template>
  <div class="th_area">
    <div class="areaDataBox" v-if="selectList && selectList.list">
      <ul>
        <li
          :class="{active:index === index1}"
          v-for="(item, index) in selectList.list"
          :key="index"
          @click="changeAreaIndex1(index,item)">
          {{item.name}}
        </li>
      </ul>
      <ul>
        <li
          :class="{active:item.select}"
          v-for="(item, index) in selectList.list[index1].list"
          :key="index"
          @click="changeAreaIndex2(index,item)">
          {{item.name}}
        </li>
      </ul>
      <ul>
        <li
          :class="{active:item.select}"
          v-for="(item, index) in selectList.list[index1].list[index2].child"
          :key="index"
          @click="changeAreaIndex3(index,item)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="btn">
      <ul>
        <li>
          <div @click="clean">清空</div>
        </li>
        <li>
          <div @click="submit">确定</div>
        </li>
      </ul>
    </div>
    </div>
</template>

<script>
export default {
  props: {
    select: {
      type: Object
    },
    selectList: {
      type: Object
    }
  },
  data () {
    return {
      active: '',
      tabContainStatus: false,
      index1: 0,
      index2: 0,
      areaList: this.Area
    }
  },
  watch: {
    select: {
      handler (val) {
        // console.log('select', val)
      },
      deep: true
    },
    selectList: {
      handler (val, old) {
        // console.log(val)
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
    changeAreaIndex1 (index, item) {
      this.index1 = index
      // this.$set(this.select, index, JSON.parse(JSON.stringify(item)))
    },
    changeAreaIndex2 (index, item) {
      let index2Old = this.index2
      this.index2 = index
      this.$set(this.selectList.list[this.index1].list[index2Old], 'select', false)
      this.$set(item, 'select', true)
    },
    changeAreaIndex3 (index, item) {
      this.$set(item, 'select', !item.select)
    },
    clean () {
      this.submit(false)
    },
    submit (flag = true) {
      let item = this.selectList.list[this.index1].list[this.index2]
      let arr = []
      let arrText = []
      !flag && (item.select = false)
      item.child.forEach(element => {
        if (element.select && flag) {
          arr.push(element.id)
          arrText.push(element.name)
        } else if (element.select && !flag) {
          element.select = false
        }
      })
      if (this.selectList.list[this.index1].type === 'city') { // 区域
        this.$set(this.select, 'districtId', flag && item.select ? item.id : 0)
        this.$set(this.select, 'streetIds', flag && arr.length ? arr.join(',') : '')
        this.$set(this.select, 'areaText', flag ? item.name + (arrText.length ? ',' : '') + arrText.join(',') : '')
      } else { // 地铁
        this.$set(this.select, 'lineId', flag && item.select ? item.id : 0)
        this.$set(this.select, 'stepIds', flag && arr.length ? arr.join(',') : '')
        this.$set(this.select, 'lineText', flag ? item.name + (arrText.length ? ',' : '') + arrText.join(',') : '')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_area{
  height: 100%;
    background-color: @cf;
    box-sizing: border-box;
    padding-bottom: 3rem;
    position: relative;
    .areaDataBox{
      height: 100%;
      ul{
        width: 4.5rem;
        height: 100%;
        float: left;
        padding-left: @plrPage;
        box-sizing: border-box;
        overflow: auto;
        &:nth-child(2){
          background-color: @cF9F9F9;
        }
        &:nth-child(3){
          width: calc(100% - 9rem);
          background-color: @cF3F3F3;
        }
        li{
          height: 2.5rem;
          line-height: 2.5rem;
          border-bottom: 1px solid @cD8D8D8;
          .lineClamp(1);
          &.active{
            color: @cD14E33;
          }
        }
      }
    }
    .btn{
      height: 3rem;
      padding: .75rem .75rem;
      box-sizing: border-box;
      text-align: center;
      ul{
        overflow: hidden;
        li{
          width: 50%;
          float: left;
          padding: 0 .5rem;
          box-sizing: border-box;
          div{
            border: 1px solid @cD8D8D8;
            border-radius: @borderRadius;
          }
          &:last-child{
            div{
              color: @cf;
              .lineargGradient(180deg)
            }
          }
        }
      }
    }
  }

</style>
