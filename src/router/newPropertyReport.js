
/**
 * 设置路由
 */
const newPropertyReportRoutes = [
  {
    path: '/newPropertyReport',
    name: 'newPropertyReport',
    component: resolve => require(['../page/newPropertyReport/newPropertyReport'], resolve),
    meta: {
      title: '新客户报备',
      pageValue: 'newPropertyReport'
    }
  },
  {
    path: '/newSelectProperty',
    name: 'newSelectProperty',
    component: resolve => require(['../page/newPropertyReport/newSelectProperty/newSelectProperty'], resolve),
    meta: {
      title: '收藏楼盘',
      pageValue: 'newSelectProperty'
    }
  }
]
export default newPropertyReportRoutes
