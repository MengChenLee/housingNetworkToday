<template>
  <div class="th_price">
    <div class="priceDataBox">
      <ul v-if="selectList && selectList.list">
        <li
          :class="{active:index === index1}"
          v-for="(item, index) in selectList.list"
          :key="index"
          @click="changeindex1(index)">
          {{item.name}}
        </li>
      </ul>
      <ul v-if="selectList && selectList.list">
        <!--{active:item.select}-->
        <li
          v-for="(item, index) in selectList.list[index1].list"
          :key="index" @click="changeindex2(index,item)">
          <span :class="{active:index===indexSelect}">{{item.name}}</span>
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
      indexSelect: -1
    }
  },
  components: {
  },
  computed: {

  },
  mounted () {
    // console.log(this.selectList)
  },
  created () {
  },
  methods: {
    changeindex1 (index) {
      this.index1 = index
    },
    changeindex2 (index, item) {
      this.indexSelect = index
      this.$set(item, 'select', !item.select)
    },
    clean () {
      this.submit(false)
    },
    submit (flag = true) {
      let item = this.selectList.list[this.index1]
      console.log(item.select)
      let arr = ''
      !flag && (item.select = false)
      item.list.forEach(element => {
        if (element.select && flag) {
          // arr.push(element.name)
          arr = element.name
        } else if (element.select && !flag) {
          element.select = false
        }
      })
      console.log(arr, item)
      // 'eachPrice': '', // 单价
      //   'totlePrice': '', // 总价
      //   'firstPayment': '', // 首付
      // switch (item.type) {
      //   case 'totalPrice': // 总价
      this.$set(this.select, item.type, flag && arr)
      // arr.length ? arr.join(',') : ''
      //     break
      //   case 'eachPrice': // 单价

      //     break
      //   case 'firstPayment': // 首付比例

      //     break
      //   default:
      //     break
      // }
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_price{
  height: 19.5rem;
    background-color: @cf;
    box-sizing: border-box;
    padding-bottom: 3rem;
    position: relative;
    .priceDataBox{
      height: 100%;
      ul{
        width: 4.5rem;
        height: 100%;
        float: left;
        padding-left: @plrPage;
        box-sizing: border-box;
        overflow: auto;
        &:nth-child(2){
          width: calc(100% - 4.5rem);
          background-color: @cF9F9F9;
        }
        li{
          height: 2.5rem;
          line-height: 2.5rem;
          border-bottom: 1px solid @cD8D8D8;
          &.active{
            color: @cD14E33;
          }
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
