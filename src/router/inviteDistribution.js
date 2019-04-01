
/**
 * 设置路由
 */
const inviteDistributionRoutes = [
  {
    path: '/distributor',
    name: 'distributor',
    component: resolve => require(['../page/inviteDistribution/distributor.vue'], resolve),
    meta: {
      title: '邀请分销',
      mustH5Header: true,
      pageValue: 'distributor'
    }
  },
  {
    path: '/channel',
    name: 'channel',
    component: resolve => require(['../page/inviteDistribution/channel.vue'], resolve),
    meta: {
      title: '邀请渠道',
      mustH5Header: true,
      pageValue: 'channel'
    }
  }
]
export default inviteDistributionRoutes
