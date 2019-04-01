
/**
 * 设置路由
 */

const findHouseRoutes = [
  {
    path: '/findHouse',
    name: 'findHouse',
    component: resolve => require(['../page/findHouse/findHouse/FindHouse.vue'], resolve),
    meta: {
      title: '找房',
      mustH5Header: true,
      pageValue: 'findHouse'
    }
  },
  {
    path: '/findHouse/locate',
    name: 'findHouseLocate',
    component: resolve => require(['../page/findHouse/locate/Locate'], resolve),
    meta: {
      title: '选择城市',
      mustH5Header: true,
      pageValue: 'findHouseLocate'
    }
  },
  {
    path: '/propertyDetail/:id',
    name: 'propertyDetail',
    component: resolve => require(['../page/findHouse/propertyDetail/PropertyDetail.vue'], resolve),
    meta: {
      title: '楼盘详情',
      // mustH5Header: true,
      pageValue: 'propertyDetail'
    }
  },
  {
    path: '/propertyBaseInfoDetail/:id',
    name: 'propertyBaseInfoDetail',
    component: resolve => require(['../page/findHouse/propertyBaseInfoDetail/PropertyBaseInfoDetail.vue'], resolve),
    meta: {
      title: '楼盘信息',
      pageValue: 'propertyBaseInfoDetail'
    }
  },
  {
    path: '/promote',
    name: 'promote',
    component: resolve => require(['../page/findHouse/promote/Promote.vue'], resolve),
    meta: {
      title: '优惠活动',
      pageValue: 'promote'
    }
  },
  {
    path: '/promoteDetail/:id',
    name: 'promoteDetail',
    component: resolve => require(['../page/findHouse/promoteDetail/promoteDetail.vue'], resolve),
    meta: {
      title: '优惠活动详情',
      pageValue: 'promoteDetail'
    }
  },
  {
    path: '/houseType/:id',
    name: 'houseType',
    component: resolve => require(['../page/findHouse/houseType/HouseType.vue'], resolve),
    meta: {
      title: '楼盘全部户型',
      pageValue: 'houseType'
    }
  },
  {
    path: '/houseTypeDetail/:id',
    name: 'houseTypeDetail',
    component: resolve => require(['../page/findHouse/houseTypeDetail/HouseTypeDetail.vue'], resolve),
    meta: {
      title: '户型详情',
      pageValue: 'houseTypeDetail'
    }
  },
  {
    path: '/dynamic/:id',
    name: 'dynamic',
    component: resolve => require(['../page/findHouse/dynamic/Dynamic.vue'], resolve),
    meta: {
      title: '楼盘动态',
      pageValue: 'dynamic'
    }
  },
  {
    path: '/dynamicDetail/:id',
    name: 'dynamicDetail',
    component: resolve => require(['../page/findHouse/dynamicDetail/DynamicDetail.vue'], resolve),
    meta: {
      title: '楼盘动态详情',
      pageValue: 'dynamicDetail'
    }
  },
  {
    path: '/building/:id',
    name: 'building',
    component: resolve => require(['../page/findHouse/building/Building.vue'], resolve),
    meta: {
      title: '楼栋信息',
      pageValue: 'building'
    }
  },
  {
    path: '/buildingDetail/:id',
    name: 'buildingDetail',
    component: resolve => require(['../page/findHouse/buildingDetail/BuildingDetail.vue'], resolve),
    meta: {
      title: '楼栋详情',
      pageValue: 'buildingDetail'
    }
  },
  {
    path: '/saleControl/:id',
    name: 'saleControl',
    component: resolve => require(['../page/findHouse/saleControl/SaleControl.vue'], resolve),
    meta: {
      title: '销控详情',
      pageValue: 'saleControl'
    }
  },
  {
    path: '/propertyMap',
    name: 'propertyMap',
    component: resolve => require(['../page/findHouse/propertyMap/PropertyMap.vue'], resolve),
    meta: {
      title: '楼盘周边',
      pageValue: 'propertyMap'
    }
  },
  {
    path: '/propertyServiceDetail/:id',
    name: 'propertyServiceDetail',
    component: resolve => require(['../page/findHouse/propertyServiceDetail/PropertyServiceDetail.vue'], resolve),
    meta: {
      title: '看房服务',
      mustH5Header: true,
      requireLogin: true,
      pageValue: 'propertyServiceDetail'
    }
  },
  {
    path: '/propertyReport/:id',
    name: 'propertyReport',
    component: resolve => require(['../page/findHouse/propertyReport/PropertyReport.vue'], resolve),
    meta: {
      title: '报备',
      requireLogin: true,
      pageValue: 'propertyReport'
    }
  },
  {
    path: '/selectProperty/:id',
    name: 'selectProperty',
    component: resolve => require(['../page/findHouse/selectProperty/SelectProperty.vue'], resolve),
    meta: {
      title: '选择楼盘',
      pageValue: 'selectProperty'
    }
  },
  {
    path: '/browserRes/:id',
    name: 'browserRes',
    component: resolve => require(['../page/findHouse/browserRes/BrowserRes.vue'], resolve),
    meta: {
      title: '资源浏览',
      mustH5Header: true,
      pageValue: 'browserRes'
    }
  }

]
export default findHouseRoutes
