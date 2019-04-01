<template>
  <div class="th_house_type_list">
    <router-link  :to="'/houseTypeDetail/'+item.id" class="th_house_type_list-item" v-for="(item, index) in houseTypeList" :key="index">
      <th-img-text-level>
        <th-img-box class="th_house_type_list-item-img" :imgUrl="item.picPath" slot="left"></th-img-box>
        <div class="th_house_type_list-item-cont">
          <div class="th_house_type_list-item-title">{{item.modelTypeName}}<span class="th_house_type_list-item-area">{{item.area}}㎡</span></div>
          <div class="th_house_type_list-item-paice">{{item.price}}万元起</div>
          <div class="th_house_type_list-item-right">剩余<span>{{item.roomNum}}</span>套</div>
          <div class="th_house_type_list-item-bottom">
            <div class="th_house_type_list-item-type">{{item.title}}</div>
            <!-- <div class="th_house_type_list-item-sell" :class="[item.saleType==='在售'?'forSell':'']">{{item.saleType}}</div> -->
            <div class="th_house_type_list-item-sell" :class="[item.saleType==='在售'?'forSell':(item.saleType==='售罄'?'soldOut':'')]">{{item.saleType}}</div>
          </div>
        </div>
      </th-img-text-level>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    houseTypeList: {
      type: Array
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {

  },
  computed: {

  },
  mounted () {

  },
  created () {
    // console.log(this.houseTypeList)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.th_house_type_list{
  .th_house_type_list-item{
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
        .th_house_type_list-item-cont{
          height: 100%;
          position: relative;
          line-height: 1rem;
          font-size: @smallFontSize;
          .th_house_type_list-item-title{
            font-size: @defaultFontSize;
            color: @c3;
            font-weight: bold;
            .th_house_type_list-item-area{
              color: @c9;
              font-size: @smallFontSize;
              margin-left: .4rem;
              font-weight: normal;
            }
          }
          .th_house_type_list-item-paice{
            color: @cTheme;
          }
          .th_house_type_list-item-right{
            position: absolute;
            top: 0;
            right: 0;
            span{
              font-size: @defaultFontSize;
            }
          }
          .th_house_type_list-item-bottom{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            .th_house_type_list-item-type{
              float: left;
            }
            .th_house_type_list-item-sell{
              float: right;
              color: @cf;
              padding: 0 @borderRadius;
              background-color: @cTheme;
              border-radius: @borderRadius;
              &.forSell{
                background-color: @cD14E33;
              }
              &.soldOut{
                background-color: @c9;
              }
            }
          }
        }
      }
    }
  }
}
</style>
