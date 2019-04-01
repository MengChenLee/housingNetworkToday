
/**
 * 设置路由
 */
const mineRoutes = [
  {
    path: '/mine',
    name: 'mine',
    component: resolve => require(['../page/mine/mine/Mine.vue'], resolve),
    meta: {
      title: '我的',
      pageValue: 'mine'
    }
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: resolve => require(['../page/mine/personalInfo/PersonalInfo.vue'], resolve),
    meta: {
      title: '个人信息',
      requireLogin: true,
      mustH5Header: true,
      pageValue: 'personalInfo'
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: resolve => require(['../page/mine/favorite/Favorite.vue'], resolve),
    meta: {
      title: '我的收藏',
      requireLogin: true,
      pageValue: 'favorite'
    }
  },
  {
    path: '/userInfo/:id',
    name: 'userInfo',
    component: resolve => require(['../page/mine/userInfo/UserInfo.vue'], resolve),
    meta: {
      title: '网店',
      requireLogin: true,
      pageValue: 'userInfo'
    }
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: resolve => require(['../page/mine/subscribe/Subscribe.vue'], resolve),
    meta: {
      title: '我的订阅',
      requireLogin: true,
      pageValue: 'subscribe'
    }
  },
  {
    path: '/history',
    name: 'history',
    component: resolve => require(['../page/mine/history/History.vue'], resolve),
    meta: {
      title: '我的足迹',
      requireLogin: true,
      pageValue: 'history'
    }
  },
  {
    path: '/calculatorMortgage',
    name: 'calculatorMortgage',
    component: resolve => require(['../page/mine/calculatorMortgage/CalculatorMortgage.vue'], resolve),
    meta: {
      title: '房贷计算器',
      pageValue: 'calculatorMortgage'
    }
  },
  {
    path: '/calculatorResult',
    name: 'calculatorResult',
    component: resolve => require(['../page/mine/calculatorResult/CalculatorResult.vue'], resolve),
    meta: {
      title: '计算结果',
      pageValue: 'calculatorResult'
    }
  },
  {
    path: '/interestRate/:id',
    name: 'interestRate',
    component: resolve => require(['../page/mine/interestRate/InterestRate.vue'], resolve),
    meta: {
      title: '利率',
      pageValue: 'interestRate'
    }
  },
  {
    path: '/calculatorTax',
    name: 'calculatorTax',
    component: resolve => require(['../page/mine/calculatorTax/CalculatorTax.vue'], resolve),
    meta: {
      title: '税费计算器',
      pageValue: 'calculatorTax'
    }
  },
  {
    path: '/qualification',
    name: 'qualification',
    component: resolve => require(['../page/mine/qualification/Qualification.vue'], resolve),
    meta: {
      title: '购房资格测试',
      pageValue: 'qualification'
    }
  },
  {
    path: '/encyclopedia',
    name: 'encyclopedia',
    component: resolve => require(['../page/mine/encyclopedia/Encyclopedia.vue'], resolve),
    meta: {
      title: '百问百科',
      pageValue: 'encyclopedia'
    }
  },
  {
    path: '/intention',
    name: 'intention',
    component: resolve => require(['../page/mine/intention/Intention.vue'], resolve),
    meta: {
      title: '意向找房',
      mustH5Header: true,
      requireLogin: true,
      pageValue: 'intention'
    }
  },
  {
    path: '/addIntention',
    name: 'addIntention',
    component: resolve => require(['../page/mine/addIntention/AddIntention.vue'], resolve),
    meta: {
      title: '意向找房设置',
      requireLogin: true,
      pageValue: 'addIntention'
    }
  },
  {
    path: '/intentionProperty',
    name: 'intentionProperty',
    component: resolve => require(['../page/mine/intentionProperty/IntentionProperty.vue'], resolve),
    meta: {
      title: '楼盘列表',
      pageValue: 'intentionProperty'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../page/mine/login/Login.vue'], resolve),
    meta: {
      title: '登陆',
      pageValue: 'login'
    }
  },
  {
    path: '/bindPhone',
    name: 'bindPhone',
    component: resolve => require(['../page/mine/bindPhone/bindPhone.vue'], resolve),
    meta: {
      title: '注册会员',
      requireLogin: true,
      pageValue: 'bindPhone'
    }
  },
  {
    path: '/myIframe',
    name: 'myIframe',
    component: resolve => require(['../page/mine/myIframe/MyIframe.vue'], resolve),
    meta: {
      title: '今日房网',
      pageValue: 'myIframe'
    }
  },
  {
    path: '/myFriends',
    name: 'myFriends',
    component: resolve => require(['../page/mine/myFriends/MyFriends.vue'], resolve),
    meta: {
      title: '好友列表',
      requireLogin: true,
      pageValue: 'myFriends'
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: resolve => require(['../page/mine/setting/Setting.vue'], resolve),
    meta: {
      title: '设置',
      pageValue: 'setting'
    }
  },
  {
    path: '/changePhone',
    name: 'changePhone',
    component: resolve => require(['../page/mine/changePhone/ChangePhone.vue'], resolve),
    meta: {
      title: '更换手机号',
      requireLogin: true,
      pageValue: 'changePhone'
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: resolve => require(['../page/mine/feedback/Feedback.vue'], resolve),
    meta: {
      title: '建议反馈',
      requireLogin: true,
      pageValue: 'feedback'
    }
  },
  {
    path: '/reportNotes',
    name: 'reportNotes',
    component: resolve => require(['../page/mine/reportNotes/ReportNotes.vue'], resolve),
    meta: {
      title: '看房记录',
      requireLogin: true,
      pageValue: 'reportNotes'
    }
  },
  {
    path: '/reward',
    name: 'reward',
    component: resolve => require(['../page/mine/reward/Reward.vue'], resolve),
    meta: {
      title: '我的奖励',
      mustH5Header: true,
      requireLogin: true,
      pageValue: 'reward'
    }
  },
  {
    path: '/rewardDetail/:id',
    name: 'rewardDetail',
    component: resolve => require(['../page/mine/rewardDetail/RewardDetail.vue'], resolve),
    meta: {
      title: '奖励详情',
      requireLogin: true,
      mustH5Header: true,
      pageValue: 'rewardDetail'
    }
  },
  {
    path: '/sharePic',
    name: 'sharePic',
    component: resolve => require(['../page/mine/sharePic/SharePic.vue'], resolve),
    meta: {
      title: '邀请好友',
      requireLogin: true,
      mustH5Header: true,
      pageValue: 'sharePic'
    }
  },
  {
    path: '/shareAPP',
    name: 'shareAPP',
    component: resolve => require(['../page/mine/shareAPP/shareAPP.vue'], resolve),
    meta: {
      title: '分享APP',
      requireLogin: true,
      mustH5Header: true,
      pageValue: 'shareAPP'
    }
  },
  {
    path: '/share',
    name: 'share',
    component: resolve => require(['../page/mine/share/share.vue'], resolve),
    meta: {
      title: '推客列表',
      pageValue: 'sharePic'
    }
  }
]
export default mineRoutes
