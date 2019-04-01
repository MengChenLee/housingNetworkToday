<template>
  <div class="th_my_house_type">
    <div class="myHouseTypeDataBox">
      <div class="th_my_house_type-item"
        v-for="(item, index) in selectList"
        :key="index"
        @click="click(index)">
        <th-img-text-level>
          <th-img-box class="th_my_house_type-item-img" :imgUrl="item.picPath" slot="left"></th-img-box>
          <div class="th_my_house_type-item-cont">
            <div class="th_my_house_type-item-title">{{item.modelTypeName}}</div>
            <div class="th_my_house_type-item-area">{{item.area}}㎡</div>
            <!-- <div class="th_my_house_type-item-paice">{{item.price}}万元起</div> -->
            <div class="th_my_house_type-item-bottom">
              <div class="th_my_house_type-item-type">{{item.title}}</div>
              <div class="th_my_house_type-item-right">{{item.roomNum}}套房源</div>
            </div>
            <div class="th_my_house_type-item-select" v-if="select.buildingModelTypeId === index"></div>
          </div>
        </th-img-text-level>
      </div>
      <!-- <mt-radio
        v-if="selectList"
        align="right"
        v-model="select.unitId"
        :options="selectList">
      </mt-radio> -->
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
  data () {
    return {
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
    click (index) {
      this.$set(this.select, 'buildingModelTypeId', index)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.th_my_house_type{
  padding:0 @plrPage;
  background-color: @cf;
  .th_my_house_type-item{
    padding:@plrPage 0;
    overflow: hidden;
    border-bottom: 1px solid @cD8D8D8;
    color: @c9;
    display: block;
    & /deep/ .th_img_text_level{
      height: 4.2rem;
      .th_img_text_level-left{
        width: 4.2rem;
        box-shadow: 0 1px 5px @c9;
      }
      .th_img_text_level-right{
        width: calc(100% - 4.2rem);
        position: relative;
        .th_my_house_type-item-cont{
          height: 100%;
          position: relative;
          line-height: 1rem;
          font-size: @smallFontSize;
          .th_my_house_type-item-title{
            font-size: @defaultFontSize;
            color: @c3;
            font-weight: bold;
          }
          .th_my_house_type-item-right{
            position: absolute;
            top: 0;
            right: 0;
            span{
              font-size: @defaultFontSize;
            }
          }
          .th_my_house_type-item-bottom{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            .th_my_house_type-item-type{
              float: left;
            }
            .th_my_house_type-item-right{
              float: right;
              color: @c9;
            }
          }
        }
        .th_my_house_type-item-select{
          width: 1rem;
          height: 1rem;
          background-color: @cD14E33;
          border-radius: 50%;
          position: absolute;
          top:50%;
          right: .6rem;
          transform: translateY(-50%);
          &:after{
            content: "";
            width: 4px;
            height: 8px;
            border: 2px solid @cf;
            border-left: 0;
            border-top: 0;
            background-color: @cD14E33;
            top: 4px;
            left: 7px;
            position: absolute;
            transform: rotate(45deg) scale(1);
          }
        }
      }
    }
  }
}
</style>
