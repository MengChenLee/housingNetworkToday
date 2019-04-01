
/**
 * 设置路由
 */
const informationRoutes = [
  {
    path: '/information',
    name: 'information',
    component: resolve => require(['../page/information/information/Information.vue'], resolve),
    meta: {
      title: '消息',
      mustH5Header: true,
      pageValue: 'information'
    }
  },
  {
    path: '/infoList/:id',
    name: 'infoList',
    component: resolve => require(['../page/information/infoList/InforList.vue'], resolve),
    meta: {
      title: '消息列表',
      pageValue: 'infoList',
      requireLogin: true
    }
  },
  {
    path: '/chatList/:id',
    name: 'chatList',
    component: resolve => require(['../page/information/chatList/ChatList.vue'], resolve),
    meta: {
      title: '聊天列表',
      requireLogin: true,
      pageValue: 'chatList'
    }
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: resolve => require(['../page/information/chat/Chat.vue'], resolve),
    meta: {
      title: '聊天',
      mustH5Header: true,
      requireLogin: true,
      pageValue: 'chat'
    }
  },
  {
    path: '/chatMemberList/:id',
    name: 'chatMemberList',
    component: resolve => require(['../page/information/chatMemberList/ChatMemberList.vue'], resolve),
    meta: {
      title: '聊天成员列表',
      requireLogin: true,
      pageValue: 'chatMemberList'
    }
  }
]
export default informationRoutes
