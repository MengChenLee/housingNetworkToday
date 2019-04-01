
/**
 * 设置路由
 */
const homeRoutes = [
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['../page/home/home/Home'], resolve),
    meta: {
      title: '主页',
      mustH5Header: true,
      pageValue: 'home'
    }
  },
  {
    path: '/home/locate',
    name: 'homeLocate',
    component: resolve => require(['../page/home/locate/Locate'], resolve),
    meta: {
      title: '主页定位',
      mustH5Header: true,
      pageValue: 'homeLocate'
    }
  },
  {
    path: '/home/search',
    name: 'homeSearch',
    component: resolve => require(['../page/home/search/Search'], resolve),
    meta: {
      title: '主页搜索',
      mustH5Header: true,
      pageValue: 'homeSearch'
    }
  },
  {
    path: '/home/map',
    name: 'homeMap',
    component: resolve => require(['../page/home/map/Map'], resolve),
    meta: {
      title: '地图找房',
      pageValue: 'homeMap'
    }
  }
]
export default homeRoutes
