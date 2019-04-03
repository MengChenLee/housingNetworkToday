<template>
  <div class="th_setting">
    <th-layout :hiddenFooter="true">
      <div class="th_setting-cont" ref="cont">
        <div>
          <!-- <mt-cell title="推送设置" isLink></mt-cell> -->
          <mt-cell title="权限控制" @click.native="setPermit">
            <span class="link"></span>
          </mt-cell>
          <mt-cell title="更换手机号" @click.native="clickLink('changePhone')">
            <span class="link"></span>
          </mt-cell>
          <mt-cell title="免责说明" @click.native="clickLink('protocol?app=1&type=7')">
            <span class="link"></span>
          </mt-cell>
          <!-- <mt-cell title="版本更新" isLink ></mt-cell> -->
          <!-- <mt-cell title="应用推荐" isLink ></mt-cell> -->
          <mt-cell title="建议反馈" @click.native="clickLink('feedback')">
            <span class="link"></span>
          </mt-cell>
          <mt-cell title="关于我们" @click.native="clickLink('protocol?app=1&type=6')">
            <span class="link"></span>
          </mt-cell>
          <!-- <mt-cell title="清除缓存" ></mt-cell> -->
        </div>
        <!--<p class="logout" @click="loginOut">退出登录</p>-->
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade">
          <mt-checklist
            title="权限控制"
            v-model="value"
            :options="['手机号码是否显示', '客户咨询通知', '报备聊天通知']">
          </mt-checklist>
          <div class="th_setting-submit" @click="submit">确定</div>
        </mt-popup>
      </div>
    </th-layout>
  </div>
</template>
<script>
import {getByAccountId, updateUserRole} from '../../../common/httpClient.js'
import ThSwiper from '../../../components/swiper/Swiper.vue'

export default {
  data () {
    return {
      popupVisible: false,
      value: [],
      submitData: {
        'lookNotice': false,
        'msnNotice': false,
        'quesNotice': false,
        'showPhone': false
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.user
    }
  },
  components: {
    ThSwiper
  },
  mounted () {
    this.setData()
  },
  activated () {
  },
  methods: {
    setData () {
      let data = {
        'accountId': this.userInfo.id,
        'loginToken': this.userInfo.loginToken
      }
      getByAccountId(data).then((res) => {
        if (res && res.code === 1) {
          let userInfo = res.content.account
          this.submitData = {
            'lookNotice': !!userInfo.lookNotice,
            'msnNotice': !!userInfo.msnNotice,
            'quesNotice': !!userInfo.quesNotice,
            'showPhone': !!userInfo.showPhone
          }
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    clickLink (name) {
      this.$router.push({
        path: '/' + name
      })
    },
    setPermit () {
      this.popupVisible = true
    },
    submit () {
      let data = {
        'id': this.userInfo.id,
        ...this.submitData
      }
      updateUserRole(data).then((res) => {
        if (res && res.code === 1) {
          this.toast(res.msg || '设置成功')
          this.popupVisible = false
        } else {
          this.toast(res.msg || '加载失败')
        }
      })
    },
    loginOut () {
      sessionStorage.clear()
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.th_setting{
 height: 100%;
 .th_setting-cont{
    & /deep/ .mint-cell{
      min-height: 1.8rem;
      .mint-cell-wrapper{
        font-size: @FontSize13;
      }
    }
    .logout{
      text-align: center;
      height: 1.8rem;
      line-height: 1.8rem;
      font-size: @FontSize13;
      color: @cD14E33;
    }
    /deep/ .mint-popup{
      width: 13.75rem;
      height: 15.4rem;
      border-radius:@borderRadius;
      .mint-checklist-title{
        text-align: center;
        color: @c131313;
      }
      .mint-checkbox-input:checked + .mint-checkbox-core{
        background-color: @cD14E33;
        border-color: @cD14E33;
      }
      .th_setting-submit{
        width: 100%;
        height: 2.35rem;
        line-height: 2.35rem;
        position: absolute;
        left: 0;
        bottom: 0;
        color: @c31AC48;
        text-align: center;
        font-size: @FontSize13;
        border-top: 1px solid @cD8D8D8;
      }
    }
   /deep/ .mint-cell span.link{
     position: relative;
     &:before{
       display: inline-block;
       content: '';
       position: absolute;
       top: 1px;
       left: 0;
       border: 6px solid;
       border-top-color: transparent;
       border-left-color: @cf;
       border-right-color: transparent;
       border-bottom-color: transparent;
     }
     &:after{
       display: inline-block;
       content: '';
       border: 7px solid;
       border-top-color: transparent;
       border-left-color: @c9;
       border-right-color: transparent;
       border-bottom-color: transparent;
     }
   }
  }
}
</style>
