import wx from 'weixin-js-sdk'
import api from './api.js'
import {getSign} from './httpClient.js'

let jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo', 'chooseImage', 'uploadImage']
let userAgent = navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
let isWeixin = userAgent && userAgent[0] === 'micromessenger'

export function config (callback) {
  getSign({reqUrl: encodeURIComponent(location.href)}).then(res => {
    if (res.code === 1) {
      let cont = res.content
      wx.config({
        debug: false,
        appId: api.appid, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: cont.timestamp, // 必填，生成签名的时间戳
        nonceStr: cont.nonceStr, // 必填，生成签名的随机串
        signature: cont.signature, // 必填，签名，见附录1
        // 需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间，请求相册选中并发送图片
        jsApiList: jsApiList
      })
      wx.ready(function () {
        callback && callback()
      })
      wx.error(function (res) {
        console.log('weixin:' + res.msg)
      })
    } else {

    }
  })
}

export function share (data) {
  isWeixin && wx && wx.checkJsApi && wx.checkJsApi({
    jsApiList: jsApiList,
    success: function (res) {
      res.checkResult.onMenuShareAppMessage && wx.onMenuShareAppMessage({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          data.success && data.success('朋友')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          data.cancel && data.cancel('朋友')
        }
      })

      res.checkResult.onMenuShareTimeline && wx.onMenuShareTimeline({
        title: data.title, // 分享标题
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          data.success && data.success('朋友圈')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
          data.cancel && data.cancel('朋友圈')
        }
      })

      res.checkResult.onMenuShareQQ && wx.onMenuShareQQ({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
          data.success && data.success('QQ')
        },
        cancel: function () {
        // 用户取消分享后执行的回调函数
          data.cancel && data.cancel('QQ')
        }
      })

      res.checkResult.onMenuShareQZone && wx.onMenuShareQZone({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
          data.success && data.success('QQ')
        },
        cancel: function () {
        // 用户取消分享后执行的回调函数
          data.cancel && data.cancel('QQ')
        }
      })

      res.checkResult.onMenuShareWeibo && wx.onMenuShareWeibo({
        title: data.title, // 分享标题
        desc: data.desc, // 分享描述
        link: data.link, // 分享链接
        imgUrl: data.imgUrl, // 分享图标
        success: function () {
        // 用户确认分享后执行的回调函数
          data.success && data.success('微博')
        },
        cancel: function () {
        // 用户取消分享后执行的回调函数
          data.cancel && data.cancel('微博')
        }
      })
    }
  })
}
