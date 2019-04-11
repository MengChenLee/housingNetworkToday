<template>
    <div class="th_chat-footer" ref="inputBoxContainer">
      <div class="th_chat-fun" ref="chatFun">
        <span class="imgBox voice" @click="changeRecording"><th-img-box class="th_chat-item-img" :imgUrl="recording?keyboard:voiceImg"></th-img-box></span>
        <span class="centerBox" ref="input" @click.native="inputFocus" @touchend="inputFocus">
          <div v-show="recording" @touchstart="recordingStart" @touchend="recordingEnd">按住&nbsp;&nbsp;&nbsp;说话</div>
          <input v-show="!recording" type="text" placeholder="请输入文字" v-model="content" id="focus" @focus="focus" @blur="blur"/>
        </span>
        <div class="imgBox send" v-if="focusFlag" @click="send">发送</div>
        <!-- <span class="imgBox" v-if="!focusFlag"><th-img-box class="th_chat-item-img" :imgUrl="expression"></th-img-box></span> -->
        <span class="imgBox add" v-if="!focusFlag"><th-img-box class="th_chat-item-img" :imgUrl="chatAdd" @click.native="showMenu"></th-img-box></span>
      </div>
      <ul class="menuList" :class="{hidden:menuHidden}">
        <li @click="sendImg">
          <span><th-img-box class="th_chat-menu-item-img" :imgUrl="img"></th-img-box></span>
          <p>照片</p>
        </li>
        <li>
          <span><th-img-box class="th_chat-menu-item-img" :imgUrl="locate"></th-img-box></span>
          <p>位置</p>
        </li>
        <li>
          <span><th-img-box class="th_chat-menu-item-img" :imgUrl="property"></th-img-box></span>
          <p>楼盘</p>
        </li>
        <li @click="openApp">
          <span><th-img-box class="th_chat-menu-item-img" :imgUrl="camera"></th-img-box></span>
          <p>相机</p>
        </li>
      </ul>
    </div>
</template>

<script>
// https://segmentfault.com/a/1190000006243816#articleHeader2
// https://blog.csdn.net/qq_39398332/article/details/81303438
import expression from './imgs/expression.png'
import keyboard from './imgs/keyboard.png'
import chatAdd from './imgs/chatAdd.png'
import voiceImg from './imgs/voice.png'
import camera from './imgs/camera.png'
import locate from './imgs/locate.png'
import img from './imgs/img.png'
import property from './imgs/property.png'
// import wx from '../../../../common/wx_sdk.js'
export default {
  props: {
    footerText: {
      type: String
    }
  },
  data () {
    return {
      expression: expression,
      keyboard: keyboard,
      chatAdd: chatAdd,
      voiceImg: voiceImg,
      camera: camera,
      locate: locate,
      img: img,
      property: property,
      content: '',
      recording: false, // 录音
      menuHidden: true, // 菜单隐藏
      focusFlag: false, // 聚焦状态
      start: 0,
      recordTimer: 0,
      voice: null,
      Width: window.innerWidth,
      Height: window.innerHeight
    }
  },
  components: {
  },
  computed: {

  },
  methods: {
    changeRecording () {
      this.recording = !this.recording
    },
    inputFocus () {
      this.$el.querySelector('#focus').focus()
    },
    focus () {
      this.$refs.input.style.width = this.$refs.input.offsetWidth - 42 + 'px'
      this.focusFlag = true
      this.menuHidden = true
    },
    blur () {
      window.scrollTo(0, document.body.scrollTop - 1)
      this.$emit('scrollTop')
      this.$refs.input.style.width = this.$refs.inputBoxContainer.offsetWidth - 78 + 'px'
      this.focusFlag = false
    },
    showMenu () {
      this.menuHidden = !this.menuHidden
    },
    recordingStart (event) {
      // wx.openLocation({
      //   latitude: 0, // 纬度，浮点数，范围为90 ~ -90
      //   longitude: 0, // 经度，浮点数，范围为180 ~ -180。
      //   name: '', // 位置名
      //   address: '', // 地址详情说明
      //   scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      //   infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      // })
      // event.preventDefault()
      // this.start = new Date().getTime()
      //
      // this.recordTimer = setTimeout(function () {
      //   wx.startRecord({
      //     success: function () {
      //       localStorage.rainAllowRecord = 'true'
      //     },
      //     cancel: function () {
      //       this.toast('用户拒绝授权录音')
      //     }
      //   })
      // }, 300)
    },
    recordingEnd (event) {
      // event.preventDefault()
      // let end = new Date().getTime()
      // if ((end - this.start) < 300) {
      //   this.start = 0
      //   // 小于300ms，不录音
      //   clearTimeout(this.recordTimer)
      // } else {
      //   wx.stopRecord({
      //     success: function (res) {
      //       this.voice.localId = res.localId
      //       wx.playVoice({
      //         localId: res.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      //       })
      //       this.uploadVoice()
      //     },
      //     fail: function (res) {
      //       alert(JSON.stringify(res))
      //     }
      //   })
      // }
    },
    uploadVoice () {
      // 调用微信的上传录音接口把本地录音先上传到微信的服务器
      // 不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
      // wx.uploadVoice({
      //   localId: this.voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
      //   isShowProgressTips: 1, // 默认为1，显示进度提示
      //   success: function (res) {
      //     console.log(res)
      //     // 把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
      //     // $.ajax({
      //     //   url: '后端处理上传录音的接口',
      //     //   type: 'post',
      //     //   data: JSON.stringify(res),
      //     //   dataType: 'json',
      //     //   success: function (data) {
      //     //     alert('文件已经保存到七牛的服务器')// 这回，我使用七牛存储
      //     //   },
      //     //   error: function (xhr, errorType, error) {
      //     //     console.log(error)
      //     //   }
      //     // })
      //   }
      // })
    },
    sendImg () {
      // wx.config()
      // wx.chooseImage({
      //   count: 9, // 最多可以选择的图片张数，默认9
      //   sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      //   success: function (res) {
      //     let localIds = res.localIds // 返回选定照片的本地ID列表（手机上操作就是手机端的ID列表，是一个数组），localId可以作为img标签的src属性显示图片
      //     wx.uploadImage({
      //       localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
      //       isShowProgressTips: 1, // 默认为1，显示进度提示
      //       success: function (res) {
      //         console.log(res.serverId)
      //         // let serverId = result.serverId // 返回图片的服务器端ID
      //         // 可以将serverId传给后台，用于存放在自己服务器上
      //       }
      //     })
      //   },
      //   fail: function () {},
      //   complete: function () {}
      // })
    },
    send () {
      if (!this.content) {
        this.toast('不能发布空信息')
        this.$el.querySelector('#focus').focus()
        // this.$refs.input.
        return
      }
      let data = {
        'content': this.content,
        'targetType': 1
      }
      this.content = ''
      this.$emit('send', data)
    }
  }
}
</script>

<style lang="less" scoped>
.th_chat-footer{
    width: 100%;
  /*height: 55px;*/
    background-color: @cf;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    text-align: center;
    color: @cf;
    font-size: @FontSize15;
    font-weight: bolder;
    .th_chat-fun{
      height: @footerHeight;
      line-height: @footerHeight;
      display: flex;
      align-items:center;
      position: relative;
      .imgBox{
        position: absolute;
        /*display: inline-block;*/
        width: 1.1rem;
        padding: @plrPage;
        &.voice{
          left: 0;
          /*padding: .1rem;*/
        }
        &.add{
          right: 0;
        }
        &.send{
          right: 4px;
          width: 2.5rem;
          line-height: 0.5rem;
          color: @cf;
          font-size: @defaultFontSize;
          text-align: center;
          .lineargGradient();
          border-radius: 1rem;
        }
      }
      .centerBox{
        width: calc(100% - 78px);
        position: absolute;
        top: 50%;
        left: 38px;
        transform: translateY(-50%);
        height: 1rem;
        line-height: 1rem;
        font-size: @FontSize13;
        text-align: center;
        border:1px solid @c9;
        border-radius: .5rem;
        display: inline-block;
        overflow: hidden;
        user-select:none;
        -webkit-user-select: none;
        input{
          width: 100%;
          line-height: 1rem;
          display:block;
          border: 0;
          border-radius: .5rem;
          text-align: left;
          outline: none;
          padding: 0 0.5rem;
          background-color: @cF5F5F5;
          box-sizing: border-box;
          -webkit-user-select: auto !important;
        }
      }
    }

    .menuList{
      display: flex;
      font-size: @smallFontSize;
      color: @c9;
      padding: @plrPage (100% - 2.4rem)/20;
      &.hidden{
        display: none;
      }
      li{
        flex: 1;
        text-align:center;
        span{
          width: 2.4rem;
          display: inline-block;
        }
      }
    }
}
</style>
