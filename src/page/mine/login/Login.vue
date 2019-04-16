<template>
  <div class="login" ref="cont">
    <div class="icon">
      <th-img-box :imgUrl="icon"></th-img-box>
      <p>今日房网</p>
    </div>
    <div class="wx_login"><th-img-box :imgUrl="login"></th-img-box></div>
  </div>
</template>

<script>
import icon from './imgs/icon.png'
import login from './imgs/login.png'
import api from '../../../common/api.js'
import {setLogin} from '../../../common/httpClient.js'
export default {
  data () {
    return {
      icon: icon,
      login: login
    }
  },
  computed: {
    userInfo: {
      get () {
        return this.$store.state.user.user
      }
      // set (newValue) {
      //   this.$store.commit('user/setUser', newValue)
      // }
    }
  },
  async created () {
    if (!this.$route.query.code) {
      this.gologin()
    } else {
      console.log(this.$route.query.code)
      let params = {
        code: this.$route.query.code,
        id: this.$route.query.id
      }
      await setLogin(params).then((res) => {
        if (res && res.code === 1) {
          // console.log(res)
          let resData = res.content
          this.$store.commit('user/setUser', {
            id: resData.yyAccount.id,
            phone: resData.yyAccount.phone,
            userName: resData.yyAccount.yyUser.userName,
            avatar: resData.yyAccount.yyUser.avatar,
            loginToken: resData.yyAccount.loginToken,
            type: resData.yyAccount.type,
            authenticationFlag: resData.yyAccount.yyUser.authenticationFlag
          })
          // this.$router.push({name: 'home'})
          sessionStorage.setItem('myId', resData.yyAccount.id)
          sessionStorage.setItem('loginToken', resData.yyAccount.loginToken)
          sessionStorage.setItem('username', resData.yyAccount.username)
          if (!resData.isBindPhone) { // 未绑定手机
            this.$router.replace({
              name: 'bindPhone',
              query: {
                id: resData.yyAccount.id,
                phone: resData.yyAccount.phone
              }})
          } else {
            sessionStorage.setItem('myPhone', resData.yyAccount.phone)
            let redirect = '/home'
            this.$route.query.redirect && (redirect = this.$route.query.redirect)
            this.$router.replace({path: redirect})
          }
        } else {
          this.toast((res && res.message) || '授权登陆失败')
        }
      })
    }
  },
  methods: {
    gologin () {
      let appid = api.appid
      let url = window.location.href
      let state = 'jrfw360' // 授权用户 绑定账号生成
      var scope = 'snsapi_userinfo' // snsapi_base 静默授权，snsapi_userinfo 弹出授权页面， snsapi_login 网页应用目前仅填写
      window.location.href = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect'
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
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
