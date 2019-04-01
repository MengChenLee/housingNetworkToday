<template>
  <div class="th_area">
    <div class="areaDataBox" v-if="areaList && areaList.list">
      <ul>
        <li
          v-for="(item, index) in areaList.list"
          :key="index" @click="changeAreaIndex1(index,item)">
          <span :class="{active:index===index1}">{{item.name}}</span>
        </li>
      </ul>
      <ul>
        <li
            v-for="(item, index) in areaList.list[index1].list"
          :key="item.id" @click="changeAreaIndex2(index,item)">
          <span :class="{active:index===index2}">{{item.name}}</span>
        </li>
      </ul>
      <ul>
        <li
          v-for="(item, index) in areaList.list[index1].list[index2].child"
          :key="item.id" @click="changeAreaIndex3(index,item)">
          <span :class="(index===indexSelect?'active':(item.select?'active':''))">{{item.name}}</span>
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
      indexSelect: 0,
      areaList: [],
      num: 1,
      num1: 1
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
        this.areaList = val
        // console.log(val, old)
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
  activated () {
  },
  created () {
  },
  methods: {
    changeAreaIndex1 (index, item) {
      this.selectList = Object.assign(this.selectList, this.areaList)
      // console.log(this.areaList.list, 'this.index1-------TOP')
      this.index1 = index
      this.index2 = 0
      // for (let k in this.selectList.list[this.index1].list) {
      for (let i in this.selectList.list[this.index1].list[this.index2].child) {
        if (i > 0) {
          if (this.selectList.list[this.index1].list[this.index2].child[i].select) {
            this.num1++
            if (this.num1 > 0) {
              this.num = 0
              this.indexSelect = -1
              this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', false)
              return
            }
          } else {
            this.indexSelect = 0
            this.num = 0
            this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', true)
          }
        }
        // }
      }
      this.$set(this.select, index, JSON.parse(JSON.stringify(item)))
      this.areaList = Object.assign(this.areaList, this.selectList)
      // this.$set(this.areaList, this.selectList)
      // console.log(this.areaList.list, 'this.index1-------END')
    },
    changeAreaIndex2 (index, item) {
      this.selectList = Object.assign(this.selectList, this.areaList)
      this.index2 = index
      for (let i in this.selectList.list[this.index1].list[this.index2].child) {
        if (i > 0) {
          if (this.selectList.list[this.index1].list[this.index2].child[i].select) {
            this.num1++
            if (this.num1 > 0) {
              this.num = 0
              this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', false)
              this.num1 = 0
              return
            }
          } else {
            this.num = 0
            this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', true)
          }
        }
      }
      this.$set(this.selectList.list[this.index1].list[0], 'select', false)
      this.$set(item, 'select', true)
      this.areaList = Object.assign(this.areaList, this.selectList)
      // console.log(this.areaList.list, 'this.index2')
    },
    changeAreaIndex3 (index, item) {
      this.selectList = Object.assign(this.selectList, this.areaList)
      if (index === 0) {
        this.num++
        for (let i in this.selectList.list[this.index1].list[this.index2].child) {
          if (this.num % 2 === 0) {
            // this.num = 0
            this.indexSelect = -1
            this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', false)
            this.$set(item, 'select', !item.select)
          } else {
            this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', true)
            if (i > 0) {
              this.$set(this.selectList.list[this.index1].list[this.index2].child[i], 'select', false)
            }
          }
        }
      } else {
        this.num = 0
        this.indexSelect = -1
        this.$set(this.selectList.list[this.index1].list[this.index2].child[0], 'select', false)
        this.$set(item, 'select', !item.select)
      }
      this.areaList = Object.assign(this.areaList, this.selectList)
      // console.log(this.areaList.list, 'this.index3')
    },
    clean () {
      this.submit(false)
    },
    submit (flag = true) {
      let item = this.selectList.list[this.index1].list[this.index2]
      let arr = []
      !flag && (item.select = false)
      item.child.forEach(element => {
        if (element.select && flag) {
          arr.push(element.id)
        } else if (element.select && !flag) {
          element.select = false
        }
      })
      if (this.selectList.list[this.index1].type === 'city') { // 区域
        this.$set(this.select, 'districtId', flag && item.select ? item.id : 0)
        this.$set(this.select, 'streetIds', flag && arr.length ? arr.join(',') : '')
      } else { // 地铁
        this.$set(this.select, 'lineId', flag && item.select ? item.id : 0)
        this.$set(this.select, 'stepIds', flag && arr.length ? arr.join(',') : '')
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_area{
  height: 19.5rem;
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
          span.active{
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
