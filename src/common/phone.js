import store from '../store'
// 封装和ios进行交互
const getCallBackName = (function () {
  let id = 0

  return function () {
    return '_native_callback_' + id++
  }
})()

function actionWithIos (type, args = {}) {
  if (args.callback) {
    const callBackName = getCallBackName()
    window[callBackName] = args.callback
    args.callback = callBackName
  }

  window.webkit.messageHandlers[type].postMessage(args)
}
// 封装和Android进行交互
function actionWithAndroid (type, args = {}) {
  const callback = args.callback
  if (callback) {
    delete args.callback
  }
  return window.WebViewJavascriptBridge.callHandler(
    type,
    args,
    callback
  )
}

// function connectWebViewJavascriptBridge (callback) {
//   if (window.WebViewJavascriptBridge) {
//     callback(window.WebViewJavascriptBridge)
//   } else {
//     document.addEventListener(
//       'WebViewJavascriptBridgeReady',
//       function () {
//         callback(window.WebViewJavascriptBridge)
//       },
//       false
//     )
//   }
// }

// 初始化!!!
// connectWebViewJavascriptBridge(bridge => {
//   bridge.init(function (message, responseCallback) {
//     var data = {
//       'Javascript Responds': 'Wee!'
//     }
//     responseCallback(data)
//   })

//   bridge.registerHandler('functionInJs', function (data, responseCallback) {
//     const responseData = 'Javascript Says Right back aka!'
//     responseCallback(responseData)
//   })
//   bridge.registerHandler('SUBMITCALLBACK', window.SUBMITCALLBACK)
// })

const { userAgent } = navigator
function actionWithNative (type, arg = {}) {
  if (/jrfwAndroid/i.test(userAgent)) {
    return actionWithAndroid(type, arg)
  } else if (/jrfwiOS/i.test(userAgent)) {
    return actionWithIos(type, arg)
  } else {
    // alert('交互异常')
  }
}

let userInfo = store.state.user.user
// 获取用户信息
function getUserInfo (params) {
  let newParams = Object.assign({force: false}, params)
  if (/jrfw/i.test(userAgent)) {
    return new Promise(function (resolve, reject) {
      actionWithNative('getUserInfo', Object.assign(newParams,
        {
          callback: function (res) { resolve(typeof (res) === 'string' ? JSON.parse(res) : res) }
        }
      ))
    })
  } else {
    if (newParams.force) {
      return new Promise(function (resolve, reject) {
        let time = setInterval(() => {
          try {
            const user = localStorage.getItem('user')
            user && (userInfo = JSON.parse(user))
          } catch (error) {
          }
          if (userInfo.id) {
            clearInterval(time)
            resolve(userInfo)
          } else {
            window.location.href = 'http://h5.jrfw360.com/login'
          }
        }, 500)
      })
    } else {
      return new Promise(function (resolve, reject) {
        resolve(userInfo)
      })
    }
  }
}

// 调起分享面板
function setShare (params) { return actionWithNative('setShare', params) }

// // 新建一个webview堆栈 打开H5
// function openWebview (params) { return actionWithNative('openWebview', params) }

// 点击返回
function back (params) { return actionWithNative('back', params) }

// 多选城市 今日房网 李明洋 独用
function multipleSelectCity (params) { return actionWithNative('multipleSelectCity', params) }

export default {
  getUserInfo: getUserInfo,
  setShare: setShare,
  // openWebview: openWebview,
  back: back,
  multipleSelectCity: multipleSelectCity
}
