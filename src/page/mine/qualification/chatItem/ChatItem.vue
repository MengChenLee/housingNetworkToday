<template>
  <div class="th-chat" >
    <ul>
      <li v-for="(item,i) in chatData" :key="i" class="th-chatItem" :class="{'owner':item.isOwner}">
        <div class="th-chatItem-avater" v-if="!item.isOwner">
          <th-img-box class="Th_propertyList-item-img" :imgUrl="baseIcon"></th-img-box>
        </div>
        <div class="th-chatItem-conter">
          <div v-if="item.type === 'isReport'" class="report">
            <h4 class="title">测试结果：{{item.ques}}</h4>
            <h4>您的情况：</h4>
            <span v-html="item.reportHtml"></span>
          </div>
          <div v-else>
            {{item.ques}}
            <p><router-link v-if="item.type === 'selectCity'" to='/home/locate' >选择城市</router-link></p>
          </div>
        </div>
        <div class="th-chatItem-avater" v-if="item.isOwner">
          <th-img-box class="Th_propertyList-item-img" :imgUrl="userInfo.avatar || baseIcon"></th-img-box>
        </div>
      </li>
      <li v-show="popupVisible"></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    chatData: {
      type: Array
    },
    popupVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      baseIcon: window.jrfw.baseIcon
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  }
}
</script>

<style lang="less" scoped>
.th-chat{
  .th-chatItem{
    display: flex;
    color: @c3;
    font-size: @defaultFontSize;
    padding: @plrPage;
    .th-chatItem-avater{
      width: 1.6rem;
    }
    .th-chatItem-conter{
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
      .th-chatItem-conter{
        .lineargGradient();
        color: @cf;
        border-radius: @borderRadius 0 @borderRadius @borderRadius;
      }
    }
    &:last-child{
      height: 10rem;
    }
  }
}
</style>
