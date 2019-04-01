
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
  }
]
export default newPropertyReportRoutes
