<template>
  <div class="th_house_type">
    <div class="houseTypeDataBox">
      <mt-checklist
        v-if="selectList && selectList.list"
        align="right"
        v-model="mySelect"
        :options="selectList.list">
      </mt-checklist>
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
  watch: {
    selectList: {
      handler (val) {
        this.setSelectList(val)
      },
      deep: true
    }
  },
  data () {
    return {
      mySelect: []
    }
  },
  components: {
  },
  computed: {

  },
  mounted () {
  },
  created () {
    this.setSelectList()
  },
  methods: {
    setSelectList () {
      this.selectList && this.selectList.list && this.selectList.list.forEach(element => {
        element.value = element.name
        element.label = element.name
      })
    },
    clean () {
      this.mySelect = []
      this.$set(this.select, 'moduleType', '')
      this.$emit('close')
    },
    submit () {
      this.$set(this.select, 'moduleType', this.mySelect.length ? this.mySelect.join(',') : '')
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_house_type{
  height: 19.5rem;
    background-color: @cf;
    box-sizing: border-box;
    padding-bottom: 3rem;
    position: relative;
    .houseTypeDataBox{
      height: 100%;
      overflow: auto;
      & /deep/ .mint-checklist{
        .mint-cell{
          height: 2.5rem;
          .mint-cell-title{
            height: 2.5rem;
            line-height: 2.5rem;
            .mint-checkbox-input:checked + .mint-checkbox-core{
              background-color: @cD14E33;
              border-color: @cD14E33;
            }
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
