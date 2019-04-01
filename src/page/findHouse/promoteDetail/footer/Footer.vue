<template>
    <div class="footer">
      <ul class="footer-menu">
        <!-- <li class="footer-menu-Item" @click="click('addFavorite')">
          <p class="footer-menu-text">加入收藏</p>
        </li> -->
        <li class="footer-menu-Item" @click="click('call')">
          <p class="footer-menu-text">电话咨询</p>
        </li>
        <li class="footer-menu-Item" @click="click('chat')">
          <p class="footer-menu-text">在线咨询</p>
        </li>
        <li class="footer-menu-Item" @click="click('signUp')">
          <p class="footer-menu-text">立即报名</p>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    bannerList: {
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
  },
  methods: {
    click (name) {
      this.$emit(name)
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: @footerHeight;
    overflow: hidden;
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
  .footer-menu-Item{
    // width:25%;
    // float: left;
    flex: 1;
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
      border-right: 1px solid @cD8D8D8;
    }
    &:nth-child(1){
      line-height: 1;
      padding-bottom: .4rem;
      border-top: 1px solid @cD8D8D8;
      &:before{
        background-image: url(./imgs/phone.png);
      }
    }
    // &:nth-child(2){
    //   line-height: 1;
    //   padding-bottom: .4rem;
    //   border-top: 1px solid @cD8D8D8;
    //   &:before{
    //     background-image: url(./imgs/makePoster.png);
    //   }
    // }
    &:nth-child(2){
      color: @cf;
      background:linear-gradient(180deg,rgba(234,134,98,1) 0%,rgba(209,78,51,1) 100%);
      &:before,&:after{
        display: none;
      }
    }
    &:nth-child(3){
      color: @cf;
      background:linear-gradient(183deg,rgba(94,109,228,1) 0%,rgba(51,71,209,1) 100%);
      &:before,&:after{
        display: none;
      }

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
}
</style>
