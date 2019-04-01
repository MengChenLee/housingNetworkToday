<template>
  <div class="th_my_unit">
    <div class="myUnitDataBox" @click="click">
      <mt-radio
        v-if="selectList"
        align="right"
        v-model="select.unitId"
        :options="selectList">
      </mt-radio>
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
      type: Array
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
    }
  },
  components: {
  },
  computed: {

  },
  mounted () {
    this.setSelectList()
  },
  created () {
  },
  methods: {
    setSelectList () {
      this.selectList && this.selectList.forEach(element => {
        element.value = element.id + ''
        element.label = element.unitName
      })
    },
    click () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_my_unit{
    background-color: @cf;
    position: relative;
    .myUnitDataBox{
      height: 100%;
      overflow: auto;
      & /deep/ .mint-radiolist{
        .mint-cell{
          height: 2.5rem;
          .mint-cell-title{
            height: 2.5rem;
            line-height: 2.5rem;
            .mint-radio-input:checked + .mint-radio-core {
              display: inline-block;
              background-color: @cD14E33;
              border-color: @cD14E33;
              &:after{
                content: "";
                border-radius: 0;
                border: 2px solid @cf;
                border-left: 0;
                border-top: 0;
                background-color: @cD14E33;
                width: 4px;
                height: 8px;
                top: 3px;
                left: 6px;
                transform: rotate(45deg) scale(1);
              }
            }
            .mint-radio-core{
              display: none;
              &:after{
                transform: rotate(45deg) scale(0);
              }
            }
          }
        }
      }
    }
  }

</style>
