<template>
  <div class="invite" ref="cont">
    <div class="icon">
      <th-img-box :imgUrl="icon"></th-img-box>
      <p>今日房网</p>
    </div>
    <div class="wx_invite" @click="invite" v-if="userInfo.id">
      账号已注册，点击绑定公司
    </div>
    <div class="wx_login" @click="login" v-else><th-img-box :imgUrl="loginImg"></th-img-box></div>
  </div>
</template>

<script>
import icon from './imgs/icon.png'
import loginImg from './imgs/login.png'
import api from '../../../common/api.js'
import {setLogin, comfirmInvite} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      icon: icon,
      loginImg: loginImg,
      userInfo: {

      }
    }
  },
  created () {
    this.login()
  },
  methods: {
    async login () {
      let appid = api.appid
      let url = window.location.href
      let state = this.$route.query.companyId // 授权用户 绑定账号生成
      var scope = 'snsapi_userinfo' // snsapi_base静默授权，snsapi_userinfo弹出授权页面， snsapi_login 网页应用目前仅填写
      if (!this.$route.query.code) {
        window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect'
      } else {
        let params = {
          code: this.$route.query.code
        }
        let res = await setLogin(params)
        if (res && res.code === 1) {
          let cont = res.content
          if (!cont) {
            this.toast('cont为空')
            return
          }
          let yyAccount = cont.yyAccount
          if (!yyAccount || !yyAccount.id) {
            this.toast('yyAccount为空')
            return
          }
          this.userInfo = {
            id: yyAccount.id,
            loginToken: yyAccount.loginToken
          }
        } else {
          this.toast((res && res.message) || '授权登陆失败')
        }
      }
    },
    invite () {
      this.messageBox.confirm('是否确认成为该公司员工?').then(action => {
        let params2 = {
          'accountId': this.userInfo.id,
          'id': this.$route.query.companyId || this.$route.query.state,
          'loginToken': this.userInfo.loginToken // res.content && res.content.loginToken
        }
        comfirmInvite(params2).then((res) => {
          if (res && res.code === 1) {
            this.toast((res && res.msg) || '绑定员工成功')
          } else {
            this.toast((res && res.msg) || '绑定员工失败')
          }
        })
      }).catch(() => {})
    }
  }

}
</script>

<style lang="less" scoped>
.invite{
  height: 100%;
  background: url(./imgs/bg.png) no-repeat;
  background-position: center;
  background-size: cover;
  font-size: @largeFontSize;
  text-align: center;
  .icon{
    width: 3.6rem;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
  }
  .wx_invite{
    width: 12rem;
    line-height: 2rem;
    border-radius: @borderRadius;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    border:1px solid @c3;
  }
  .wx_login{
    width:10rem;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    .th_img-box{
      padding-top: 21.5%;
    }
  }
}

</style>
