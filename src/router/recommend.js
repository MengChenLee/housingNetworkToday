
/**
 * 设置路由
 */
const recommendRoutes = [
  {
    path: '/recommend',
    name: 'recommend',
    component: resolve => require(['../page/recommend/recommend/Recommend.vue'], resolve),
    meta: {
      title: '推荐',
      mustH5Header: true,
      pageValue: 'recommend'
    }
  },
  {
    path: '/newsDetail/:id',
    name: 'newsDetail',
    component: resolve => require(['../page/recommend/newsDetail/NewsDetail.vue'], resolve),
    meta: {
      title: '资讯详情',
      pageValue: 'news'
    }
  },
  {
    path: '/companyInvite',
    name: 'companyInvite',
    component: resolve => require(['../page/company/companyInvite/CompanyInvite.vue'], resolve),
    meta: {
      title: '员工注册',
      pageValue: 'companyInvite'
    }
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: resolve => require(['../page/protocol/aboutUs.vue'], resolve),
    meta: {
      title: '关于我们',
      pageValue: 'aboutUs'
    }
  },
  // {
  //   path: '/demo',
  //   name: 'demo',
  //   component: resolve => require(['../page/recommend/demo/demo.vue'], resolve),
  //   meta: {
  //     title: 'demo',
  //     pageValue: 'demo'
  //   }
  // },
  {
    path: '/protocol',
    name: 'protocol',
    component: resolve => require(['../page/protocol/Protocol.vue'], resolve),
    meta: {
      title: '协议',
      pageValue: 'protocol'
    }
  }
]
export default recommendRoutes
