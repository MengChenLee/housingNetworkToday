<template>
  <div class="th_change_phone">
    <th-layout>
      <div class="th_change_phone-cont" ref="cont">
        <mt-cell title="新手机号">
            <input type="text" placeholder="请输入新手机号" v-model="submitData.phone" />
        </mt-cell>
        <mt-cell title="验证码">
          <div class="code">
            <input type="text" placeholder="请输入验证码" v-model="submitData.code" />
            <span @click="sendCode" v-show="show">{{countDownNum === 0?  '重新获取':'获取验证码'}}</span>
            <span v-show="!show">{{countDownNum+'s后重新获取'}}</span>
          </div>
        </mt-cell>
      </div>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        <div class="imgCodeBox">
          <h6>请输入图片验证码</h6>
          <ul class="imgCode">
            <li><input type="text" v-model="submitData.imgCodeText" placeholder="请输入验证码"/></li>
            <li><img :src="imgCode" @click="sendCode"/></li>
          </ul>
          <div @click="checkImgCode">确定</div>
        </div>
      </mt-popup>
      <div slot="footer" class="th_change_phone-footer" @click="submit">
        <span>确认</span>
      </div>
    </th-layout>
  </div>
</template>
<script>
import api from '../../../common/api.js'
import {checkPhone, getSmsCode, bindPhone} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      showImg: false,
      show: true,
      countDownNum: '',
      popupVisible: false,
      submitData: {
        'oldPhone': sessionStorage.getItem('myPhone') || '',
        'id': sessionStorage.getItem('myId') || '',
        'phone': '',
        'imgCodeText': '',
        'code': ''
      },
      imgCode: '',
      timer: null
    }
  },
  activated () {
    this.submitData.code = ''
    this.submitData.phone = ''
    this.show = true
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
      if (this.countDownNum > 0) {
        this.timer = setTimeout(() => {
          this.countDownNum--
        }, 1000)
      } else {
        this.show = true
      }
    }
  },
  methods: {
    sendCode () {
      let da = new Date()
      let dt = da.getTime()
      if (/^1[0-9]{10}/.test(this.submitData.phone)) {
        checkPhone({phone: this.submitData.phone}).then(res => {
          if (res.code !== 1 || res.content === 2) {
            this.toast(res.msg)
          } else {
            this.imgCode = api.getImgCode + this.submitData.phone + '&t=' + dt
            this.submitData.imgCodeText = ''
            this.popupVisible = true
            console.log(this.imgCode)
          }
        })
      } else {
        this.toast('请输入正确的手机号')
      }
    },
    checkImgCode () {
      let data = {
        phone: this.submitData.phone,
        verificationCode: this.submitData.imgCodeText
      }
      getSmsCode(data).then(res => {
        if (res.code === 1) {
          this.popupVisible = false
          this.show = false
          this.countDownNum = 60
          this.toast('未接收到短信请重新获取')
        } else {
          this.toast({
            message: res.msg
          })
          this.sendCode()
        }
      })
    },
    submit () {
      if (this.submitData.code.length !== 4) {
        this.toast('请输入正确的验证码')
        return
      }
      let data = {
        id: this.$store.state.user.user.id,
        phone: this.submitData.phone,
        verificationCode: this.submitData.code
      }
      bindPhone(data).then(res => {
        if (res.code === 1) {
          this.toast('手机认证成功')
          this.userInfo = Object.assign(this.userInfo, {
            phone: this.submitData.phone
          })
          this.$router.push({
            path: '/setting'
          })
          this.show = true
        } else {
          this.toast(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  & /deep/ .mint-cell-wrapper{
    outline: none !important;
  }
.th_change_phone{
  .th_change_phone-cont{
    & /deep/ .mint-cell{
        min-height: 1.8rem;
        .mint-cell-title{
          min-width: 4rem;
          color: @c3;
          flex: 0;
          .mint-cell-text{
            margin-left: .2rem;
          }
        }
        .mint-cell-mask{
          display: none;
        }
        .mint-cell-value{
          min-height: inherit;
          margin: 1px auto;
          flex: 1;
          font-size: @smallFontSize;
          input{
            width: 100%;
            min-height: inherit;
            font-size: 0.8rem;
            outline: none;
            border:0;
          }
          .code{
            width: 100%;
            display: flex;
            outline: none;
            input{
              flex: 1;
              min-height: inherit;
              outline: none;
              border:0;
            }
            span{
              line-height: 1.8rem;
              font-size: @FontSize13;
              color: @cTheme;
            }
          }
        }
      }
  }
  .th_change_phone-footer{
    width: 100%;
    height: @footerHeight;
    line-height: @footerHeight;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: right;
    color: @cTheme;
    border-top:1px solid @cD8D8D8;
    span{
      width: 3.75rem;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      display: inline-block;
      font-size:@FontSize13;
      background-color: @cTheme;
      border-radius: @borderRadius;
      color: @cf;
      font-weight: bold;
      margin-right: .6rem;
    }
  }
}
/deep/ .mint-popup{
  background-color: #00000000;
  .imgCodeBox{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        outline: none;
        flex: 0 0 45%;
        border-radius: @borderRadius;
        border: 1px solid @c9;
        overflow: hidden;
        height: 1.5rem;
        input {
          width: 100%;
          font-size: 0.8rem;
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
</style>
