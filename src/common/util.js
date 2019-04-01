function isFirstScreen (val) {
  switch (val) {
    case 'home':
    case 'findHouse':
    case 'recommend':
    case 'information':
    case 'mine':
      return true
    default:
      return false
  }
}

// 今日房网 ios
function isJrfwIos () {
  return /jrfwiOS(?!_)/i.test(navigator.userAgent)
}

// 今日房网 安卓
function isJrfwAndroid () {
  return /jrfwAndroid(?!_)/i.test(navigator.userAgent)
}
// 今日房网
function isJrfw () {
  return isJrfwIos() || isJrfwAndroid()
}
// 房经济 ios
function isJrfwIosFjj () {
  return /jrfwiOS_fjj/i.test(navigator.userAgent)
}
// 房经济 安卓
function isJrfwAndroidFjj () {
  return /jrfwAndroid_fjj/i.test(navigator.userAgent)
}

// 房经济
function isJrfwFjj () {
  return isJrfwIosFjj() || isJrfwAndroidFjj()
}
// 房管家 ios
function isJrfwIosFgj () {
  return /jrfwiOS_fgj/i.test(navigator.userAgent)
}
// 房管家 安卓
function isJrfwAndroidFgj () {
  return /jrfwAndroid_fgj/i.test(navigator.userAgent)
}

// 房管家
function isJrfwFgj () {
  return isJrfwIosFgj() || isJrfwAndroidFgj()
}

// 房管家
function isApp () {
  // console.log(isJrfw() || isJrfwFjj() || isJrfwFgj())
  return isJrfw() || isJrfwFjj() || isJrfwFgj()
}

/**
     * 判断是否是微信环境
     */
function getIsWxClient () {
  let ua = navigator.userAgent.toLowerCase()
  // console.log(/MicroMessenger/i.test(ua))
  if (/MicroMessenger/i.test(ua)) {
    return true
  }
  return false
}

export default {
  isFirstScreen: isFirstScreen,
  isJrfwIos: isJrfwIos,
  isJrfwAndroid: isJrfwAndroid,
  isJrfw: isJrfw,
  isJrfwIosFjj: isJrfwIosFjj,
  isJrfwAndroidFjj: isJrfwAndroidFjj,
  isJrfwFjj: isJrfwFjj,
  isJrfwIosFgj: isJrfwIosFgj,
  isJrfwAndroidFgj: isJrfwAndroidFgj,
  isJrfwFgj: isJrfwFgj,
  isApp: isApp,
  getIsWxClient: getIsWxClient
}
