<template>
    <div class="footer">
      <ul class="footer-menu">
        <li class="footer-menu-Item">
          <p class="footer-menu-text" @click="click('share')">微信分享</p>
        </li>
        <li class="footer-menu-Item" >
          <p class="footer-menu-text" @click="subscribe">订阅</p>
        </li>
        <li class="footer-menu-Item" :class="{active:isFavorite}" @click="click('addFavorite')">
          <p class="footer-menu-text">收藏</p>
        </li>
        <!--<li class="footer-menu-Item"  v-show="type===1 || type===2 || type===3 ? isShow : !isShow">
          <p class="footer-menu-text">加入网店</p>
        </li>-->
        <li class="footer-menu-Item" @click="click('chat')">
          <p class="footer-menu-text">在线咨询</p>
        </li>
        <li class="footer-menu-Item" >
          <p class="footer-menu-text" @click="click('goReport')">{{type===1 || type===2 ? "我要看房" :  type===3 ? "我要推客" : "报备客户"}}</p>
        </li>
      </ul>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"
        position="bottom">
        <mt-checklist
        align="right"
          v-model="value"
          :options="options">
        </mt-checklist>
        <ul class="submit">
          <li @click="popupVisible=false">取消</li>
          <li @click="click('addSubscribe',value)">确定</li>
        </ul>
      </mt-popup>
    </div>
</template>

<script>
// import { Toast } from 'mint-ui'
export default {
  props: {
    bannerList: {
      type: Array
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    booking: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      options: [
        {
          label: '优惠通知我',
          value: 'discount'
        },
        {
          label: '开盘通知我',
          value: 'sale'
        },
        {
          label: '订阅动态',
          value: 'news'
        }
      ],
      popupVisible: false,
      value: [],
      type: this.$store.state.user.user.type
    }
  },
  watch: {
    booking: {
      handler (val) {
        let newValue = []
        val.discount && newValue.push('discount')
        val.sale && newValue.push('sale')
        val.news && newValue.push('news')
        this.value = newValue
      },
      deep: true
    }
  },
  components: {
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  mounted () {

  },
  created () {
    // console.log(this.type)
  },
  methods: {
    click (name, params) {
      let data = {
        'discount': false,
        'news': false,
        'sale': false
      }
      params && params.forEach(element => {
        data[element] = true
      })
      this.popupVisible = false
      // if (name === 'goReport') {
      //   if (this.type === 3) {
      //     this.$emit(name, data)
      //   } else {
      //     Toast({
      //       message: '您没有权限',
      //       iconClass: 'icon icon-warning'
      //     })
      //   }
      // } else {
      this.$emit(name, data)
      // }
    },
    subscribe () {
      this.popupVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    .footer-menu{
      text-align: center;
      color: @cTheme;
      font-size:@smallFontSize;
      font-weight:400;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .footer-menu-Item{
        flex: 1;
        float: left;
        position: relative;
        &:before{
          content: '';
          width: 1rem;
          height: 1rem;
          display: inline-block;
          background: url(./imgs/keep.png) no-repeat;
          background-size: contain;
          background-position: center;
          margin-top: .4rem;
        }
        &:after{
          content: '';
          width: 0;
          height: 100%;
          display: inline-block;
          position: absolute;
          top: 0;
          right: 0;
        }
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3){
          line-height: 1;
          padding-bottom: .35rem;
          border-top: 1px solid @cD8D8D8;
          border-right: 1px solid @cD8D8D8;
        }
        &:nth-child(1){
          &:before{
            background-image: url(./imgs/share.png);
          }
        }
        &:nth-child(2){
          &:before{
            background-image: url(./imgs/subscribe.png);
          }
        }
        &:nth-child(3){
          &:before{
            background-image: url(./imgs/keep.png);
          }
          &.active:before{
            background-image: url(./imgs/keepActive.png);
          }
        }
        /*&:nth-child(4){
          &:before{
            background-image: url(./imgs/keep.png);
          }
          &.active:before{
            background-image: url(./imgs/keepActive.png);
          }
        }*/
        &:nth-last-child(2){
          color: @cf;
          background:linear-gradient(180deg,rgba(234,134,98,1) 0%,rgba(209,78,51,1) 100%);
          &:before,&:after{
            display: none;
          }
        }
        &:last-child{
          color: @cf;
          background:linear-gradient(183deg,rgba(94,109,228,1) 0%,rgba(51,71,209,1) 100%);
          &:before,&:after{
            display: none;
          }
        }
        .isShow{
          display: none;
        }
      }
      &:after {
        content: '';
        display: block;
        clear: both;
        width: 0;
        height: 0;
      }
    }
    /deep/ .mint-popup{
        width: 100%;
        .mint-checklist{
          .mint-checklist-title{
            display: none;
          }
          .mint-cell{
            height: 1.875rem;
            .mint-cell-wrapper{
              padding: 0;
              /*background-image: url('');*/
              border-bottom: 5px solid @ce;
              text-align: center;
            }
            .mint-cell-title{
              height: 1.875rem;
              line-height: 1.875rem;
              .mint-checkbox-input:checked + .mint-checkbox-core{
                background-color: @cD14E33;
                border-color: @cD14E33;
              }
            }
          }
        }
        .submit{
          display: flex;
          text-align: center;
          font-size: @FontSize15;
          line-height: 1.875rem;
          li{
            flex: 1;
            &:last-child{
              color: @cTheme;
            }
          }
        }
    }
}
</style>
