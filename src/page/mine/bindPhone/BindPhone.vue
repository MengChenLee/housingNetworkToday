<template>
  <div class="bindPhone" ref="cont">
    <div class="icon">
      <th-img-box :imgUrl="icon"></th-img-box>
      <p>今日房网</p>
    </div>
    <ul class="bindPhone-info">
        <li>
            <label><th-img-box :imgUrl="phoneImg"></th-img-box></label>
            <input type="tell" placeholder="请输入手机号" v-model="phone" maxlength="11"/>
        </li>
        <li class="bindPhone-code">
            <label><th-img-box :imgUrl="codeImg"></th-img-box></label>
            <input type="text" placeholder="验证码" v-model="code"/>
            <span :class="{countDownNum:countDownNum}" @click="sendCode">
              {{countDownNum?countDownNum+'秒后可重新发送':'获取验证码'}}
            </span>
        </li>
    </ul>
    <div class="jumpOver" @click="goUrl">跳过</div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <div class="imgCodeBox">
          <h6>请输入图片验证码</h6>
          <ul class="imgCode">
            <li><input type="text" v-model="imgCodeText" placeholder="请输入验证码"/></li>
            <li><img :src="imgCode" @click="sendCode"/></li>
          </ul>
          <div  @click="getSmsCode">确定</div>
      </div>
    </mt-popup>
    <div class="bindPhone-submit" @click="submit">确认</div>
  </div>
</template>

<script>
import api from '../../../common/api.js'
import icon from './imgs/icon.png'
import phoneImg from './imgs/phone.png'
import codeImg from './imgs/code.png'
import {checkPhone, getSmsCode, bindPhone} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      countDownNum: 0, // 倒计时数字
      id: this.$route.query.id,
      imgCode: '', // 图片验证码图片
      imgCodeText: '', // 图片验证码数字
      phone: this.$route.query.phone, // 手机
      code: '', // 短信验证码
      verification: true,
      popupVisible: false,
      icon: icon,
      phoneImg: phoneImg,
      codeImg: codeImg
    }
  },
  computed: {
    userInfo: {
      get () {
        return this.$store.state.user.user
      },
      set (newValue) {
        this.$store.commit('user/setUser', newValue)
      }
    }
  },
  watch: {
    countDownNum (val) {
      if (this.countDownNum) {
        setTimeout(() => {
          this.countDownNum--
        }, 1000)
      }
    }
  },
  methods: {
    async sendCode () {
      let da = new Date()
      let dt = da.getTime()
      if (/^1[0-9]{10}/.test(this.phone)) {
        let phoneMask = await this.checkPhone()
        if (phoneMask) {
          this.imgCode = api.getImgCode + this.phone + '&t=' + dt
          this.imgCodeText = ''
          this.popupVisible = true
        }
      } else {
        this.toast('请输入正确的手机号')
      }
    },
    checkPhone () {
      let data = {
        phone: this.phone
      }
      return checkPhone(data).then(res => {
        if (res.code !== 1 || res.content === 2) {
          this.toast(res.msg)
          return false
        } else {
          return true
        }
      })
    },
    getSmsCode () {
      if (!this.imgCodeText) {
        this.toast('请输入图片验证码')
        return
      }
      let data = {
        phone: this.phone,
        verificationCode: this.imgCodeText
      }
      getSmsCode(data).then(res => {
        if (res.code === 1) {
          this.countDownNum = 60
          this.popupVisible = false
        } else {
          this.toast(res.msg)
          this.checkPhone()
        }
      })
    },
    submit () {
      if (!/^1[0-9]{10}/.test(this.phone)) {
        this.toast('请输入正确的手机号')
        return
      }
      if (this.code.length !== 4) {
        this.toast('请输入正确的验证码')
        return
      }
      let data = {
        id: this.id,
        phone: this.phone,
        verificationCode: this.code
      }
      bindPhone(data).then(res => {
        if (res.code === 1) {
          this.toast('手机认证成功')
          this.userInfo = Object.assign(this.userInfo, {
            phone: this.phone
          })
          this.$router.replace({name: 'home'})
        } else {
          this.toast(res.msg)
        }
      })
    },
    goUrl () {
      this.$router.replace({name: 'home'})
    }
  }
}
</script>

<style lang="less" scoped>
.bindPhone{
  height: 100%;
  background: url(./imgs/bg.png) no-repeat;
  background-position: center;
  background-size: cover;
  // padding-top:1.75rem;
  font-size: @largeFontSize;
  text-align: center;
  .jumpOver{
    height: @headerHeight;
    line-height: @headerHeight;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 .5rem;

  }
  .icon{
    width: 3.6rem;
    position: absolute;
    top: 16%;
    left: 50%;
    transform: translateX(-50%);
  }
  .bindPhone-info{
      width: 100%;
      color: @c565960;
      // background-color: @cf;
      font-size: @largeFontSize;
      height: 2.25rem;
      line-height: 2.25rem;
      position: absolute;
      top: 37%;
      left: 0;
      padding-left: .3rem;
      box-sizing: border-box;
      li{
        display: flex;
        padding-right: @plrPage;
        position: relative;
          label{
              width: .65rem;
              display: inline-block;
              margin-top: .6rem;
              .th_img-box{
                padding-top: 146%
              }
          }
          input{
              flex: 1;
              display: inline-block;
              color: @c3;
              font-size: @largeFontSize;
              outline:none;
              border: 0;
              height: 2.25rem;
              padding-left: .5rem;
              background-color: #00000000;
          }
          span{
                  font-size: @defaultFontSize;
                  color: @c9;
                  display: inline-block;
                  &.countDownNum{
                    color: @c3;
                  }
              }
          &.bindPhone-code{
              label{
                  width: .875rem;
                  margin-left: -.15rem;
                  .th_img-box{
                    padding-top: 114%
                  }
              }
          }
        &:after{
          content: '';
          display: inline-block;
          width: 100%;
          height: 1px;
          background-color: @c6;
          position: absolute;
          bottom: 0;
          left: 0;
          transform:scaleY(.5);
        }
      }
  }
  .bindPhone-submit{
      width: 10rem;
      line-height: 2.15rem;
      margin: 0 auto;
      font-size: @FontSize18;
      text-align: center;
      border-radius: @borderRadius;
      background-color: @cFF739A;
      color: @cf;
      position: absolute;
      top: 78%;
      left: 50%;
      transform: translateX(-50%);
      background:linear-gradient(183deg,rgba(94,109,228,1) 0%,rgba(51,71,209,1) 100%);
  }
  /deep/ .mint-popup{
      background-color: #00000000;
      .imgCodeBox{
          text-align: center;
          color:@c131313;
          border-radius: @borderRadius;
          // padding:.7rem 1rem;
          background-color: @cf;
          font-size: @defaultFontSize;
          h6{
            line-height: 1.5rem;
            font-weight: normal;
            border-bottom: 1px solid @cD8D8D8 ;
          }
          .imgCode{
            width: 12rem;
            display: flex;
            justify-content:space-between;
            padding: .95rem 1.5rem;
            li{
              flex: 0 0 45%;
              border-radius: @borderRadius;
              border: 1px solid @c9;
              overflow: hidden;
              height: 1.5rem;
              input {
                  width: 100%;
                  display: inline-block;
                  line-height: 1.5rem;
                  outline: none;
                  border: 0;
                  padding-left: .2rem;
              }
              img{
                max-height: 100%;
              }
            }
          }
          div {
            color: @cTheme;
              line-height: 2.5rem;
              border-top: 1px solid @cD8D8D8;
          }
      }
  }
}

</style>
