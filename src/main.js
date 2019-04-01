// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import phone from './common/phone.js'
import util from './common/util.js'
import BaiduMap from 'vue-baidu-map'
import {config, share} from './common/wx_sdk.js'
// import VConsole from 'vconsole'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './common/WebViewJavascriptBridge.js' // 与app交互
import {
  Indicator,
  Swipe,
  SwipeItem,
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Cell,
  Header,
  Button,
  Checklist,
  Radio,
  Navbar,
  Toast,
  Picker,
  IndexList,
  IndexSection,
  Popup,
  DatetimePicker,
  // Loadmore,
  InfiniteScroll,
  MessageBox
  // Spinner
} from 'mint-ui'

window.jrfw = {...phone, ...util}
window.jrfw.baseIcon = 'http://web.jrfw360.com/recourse/img/108x108.png'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '0iHcMzD3HRWeh2aHmVV0hbGZlWvr8och'
})
// let vConsole = new VConsole() // 初始化
// console.log(vConsole)
// 按需引入部分组件
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Checklist.name, Checklist)
Vue.component(Radio.name, Radio)
Vue.component(Navbar.name, Navbar)
Vue.component(Picker.name, Picker)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
// Vue.component(Loadmore.name, Loadmore)
// Vue.component(Spinner.name, Spinner)
Vue.use(InfiniteScroll)
Vue.use(VueAwesomeSwiper)

Vue.prototype.toast = function (msg) {
  Toast({
    message: msg,
    // position: 'middle',
    duration: 1000
  })
}

Vue.prototype.messageBox = MessageBox

Vue.prototype.indicatorOpen = function () {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
    // 'snake'
    // 'fading-circle'
    // 'double-bounce'
    // 'triple-bounce'
  })
}

Vue.prototype.indicatorClose = function () {
  Indicator.close()
}

Vue.prototype.call = function (tel) {
  window.location.href = `tel:${tel}`
}

function _dealWxShareData (data) {
  let newData = {
    title: data.title || document.title,
    imgUrl: data.imgUrl || data.imageUrl || window.jrfw.baseIcon,
    link: data.link || data.url || location.href,
    desc: data.desc || data.description || '买房、卖房，今日房网帮你忙；房产购销一站式服务平台'
  }
  return newData
}
Vue.prototype.wxShare = function (data, mask = false) {
  if (mask) {
    if (window.jrfw.getIsWxClient()) {
      document.getElementById('shareImg').style = 'display:block'
    } else if (window.jrfw.isApp()) {
      // console.log(data)
      window.jrfw.setShare(_dealWxShareData(data))
    } else {
      Toast({
        message: '请在微信环境或者app打开',
        position: 'bottom',
        duration: 10000
      })
      return
    }
  }
  config(function () {
    share(_dealWxShareData(data))
  })
}

Vue.prototype.openApp = function (url) {
  Toast({
    message: '跳转app',
    position: 'bottom',
    duration: 5000
  })
  // window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.zl.date'
}

// 实现vue中的过滤器功能  先定义过滤器 在使用        value是过滤器前面的值，type是过滤器中定义的字段
Vue.filter('formatTime', function (value, type) {
  var dataTime = type
  var data = new Date()
  data.setTime(value)
  var year = data.getFullYear()
  var month = addZero(data.getMonth() + 1)
  var day = addZero(data.getDate())
  var hour = addZero(data.getHours())
  var minute = addZero(data.getMinutes())
  var second = addZero(data.getSeconds())
  if (type === 'YMD_') {
    dataTime = year + '年' + month + '月' + day + '日'
  } else if (type === 'YMD.') {
    dataTime = year + '.' + month + '.' + day
  } else if (type === 'YMDHM.') {
    dataTime = year + '.' + month + '.' + day + ' ' + hour + ':' + minute
  } else if (type === 'YMDHMS_') {
    dataTime = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second
  } else if (type === 'YMDHMS') {
    dataTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type === 'HMS') {
    dataTime = hour + ':' + minute + ':' + second
  } else if (type === 'YM') {
    dataTime = year + '-' + month
  } else {
    dataTime = year + '-' + month + '-' + day
  }
  return dataTime // 将格式化后的字符串输出到前端显示
})

Vue.filter('distanceTime', function (second) {
  // 获取分钟数
  var minute = parseInt(second / 60000) % 60

  // 获取小时
  var hour = parseInt(second / 3600000) % 24

  // 获取天数
  var days = parseInt(second / 3600000 / 24)

  return days + '天 ' + hour + '小时 ' + minute + '分钟'
})

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})
// 元素的补零计算
function addZero (val) {
  if (val < 10) {
    return '0' + val
  } else {
    return val
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
