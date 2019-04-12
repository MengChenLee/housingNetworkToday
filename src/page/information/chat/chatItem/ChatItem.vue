<template>
  <div class="th-chat" >
    <ul>
      <!--<li v-for="(item,i) in chatData" :key="i" class="th_chat_item">-->
        <!--<div class="th_chat_item-time" v-if="item.createDate">{{item.createDate | formatTime('YMDHMS')}}</div>-->
        <!--<div class="th_chat_item-wrap" :class="{'owner':accountId === item.accountId}">-->
          <!--<div class="th_chat_item-avater" v-if="accountId !== item.accountId">-->
            <!--<th-img-box class="th_chat_item-img" :imgUrl="item.avatar"></th-img-box>-->
          <!--</div>-->
          <!--<div class="th_chat_item-conter">{{item.content || '请在APP上进行查看'}}</div>-->
          <!--<div class="th_chat_item-avater" v-if="accountId === item.accountId">-->
            <!--<th-img-box class="th_chat_item-img" :imgUrl="item.avatar"></th-img-box>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
      <li v-for="(item,i) in chatData" :key="i" class="th_chat_item">
        <div class="th_chat_item-time" v-if="item.createDate">{{item.createDate | formatTime('YMDHMS')}}</div>
        <div class="th_chat_item-wrap" :class="{'owner':accountId === item.accountId}">
          <div class="th_chat_item-avater" v-if="accountId !== item.accountId">
            <th-img-box class="th_chat_item-img" :imgUrl="item.avatar"></th-img-box>
          </div>
          <div class="th_chat_item-conter">{{item.content || '请在APP上进行查看'}}</div>
          <div class="th_chat_item-avater" v-if="accountId === item.accountId">
            <th-img-box class="th_chat_item-img" :imgUrl="item.avatar"></th-img-box>
          </div>
        </div>
      </li>
      <li></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    chatData: {
      type: Array
    },
    accountId: {
      type: Number
    }
  },
  data () {
    return {
      slots: [
        {
          values: []
        }
      ],
      value: '',
      city: ''
    }
  },
  watch: {
    chatData: {
      handler (val) {
        if (!val.length) return
        let lastItem = val[val.length - 1]
        if (lastItem.ansList && lastItem.ansList.length) {
          this.$set(this.slots[0], 'values', lastItem.ansList)
        }
      },
      deep: true
    }
  },
  methods: {
    onValuesChange (picker, values) {
      this.value = values[0]
    }
  }
}
</script>

<style lang="less" scoped>
.th-chat{
  .th_chat_item{
    color: @c3;
    font-size: @defaultFontSize;
    padding: @plrPage;
    .th_chat_item-time{
      text-align: center
    }
    .th_chat_item-wrap{
      display: flex;
      .th_chat_item-avater{
        width: 1.6rem;
      }
      .th_chat_item-conter{
        max-width: 12rem;
        padding: .25rem .35rem;
        background:@cF9F9F9;
        margin:0 .5rem;
        line-height: 1.1rem;
        border-radius:0 @borderRadius @borderRadius @borderRadius;
        p{
          text-align: right;
          a{
            color: @cTheme;
          }
        }
        .report{
          .title{
            color: @cD14E33;
          }
          span{
            color: @c6;
          }

        }
      }
      &.owner{
        justify-content: flex-end;
        .th_chat_item-conter{
          color: @cf;
          .lineargGradient;
          border-radius: @borderRadius 0 @borderRadius @borderRadius;
        }
      }
    }
    &:last-child{
      height: 10rem;
    }
  }
  /deep/ .mint-popup{
    width: 100%;
    .picker-center-highlight{
      background-color: @cDBE0FF;
      z-index: -1;
    }
    .submit{
      display: flex;
      text-align: center;
      font-size: @FontSize15;
      line-height: 1.875rem;
      li{
        flex: 1;
        .lineargGradient();
        color: @cf;
      }
    }
  }
  /deep/ .v-modal{
    opacity: 0;
  }
}
</style>
