const baseUrl = 'https://api.jrfw360.com'
// const baseUrl = 'http://dev.jrfw360.com'
const appid = 'wx2408f39c0ec22750'

// 邀请

// 员工
const comfirmInvite = baseUrl + '/company/comfirmInvite'

// 分享
const getSign = baseUrl + '/wx/getSign'

// 广告相关
const getAdsList = baseUrl + '/ads/getList'

// home
// app首页获取行政区划接口
const getCityByName = baseUrl + '/city/getCityByName'
const setCityList = baseUrl + '/city/getList'
// app首页接口
const setHomeData = baseUrl + '/buildingGroup/index'
// 获取首页定位接口
const setLocate = baseUrl + '/api/locate'
// 地图找房
const setMapList = baseUrl + '/buildingMap/getList'

// app首页搜索接口
const setHotSearch = baseUrl + '/buildingGroup/getBuildingTags'

// findHouse
const setFindCondition = baseUrl + '/buildingGroup/findCondition'
const setFindHouseData = baseUrl + '/buildingGroup/find'

// 找房-楼盘详情
const setPropertyDetail = baseUrl + '/buildingGroup/detail'
const setPropertyDetailInfo = baseUrl + '/buildingGroup/detailInfo'
// const setPropertyDynamic = baseUrl + '/buildingGroup/detailInfo'
// // 获取某一楼盘动态列表 id 楼盘id
// userDynamic/getDynamicById
const setPropertyDetailAttach = baseUrl + '/buildingAttach/list'

// 楼盘-聊天
const setGroupMsnList = baseUrl + '/group/getQuestionMsnList'
// 找房-优惠活动
const setPromote = baseUrl + '/activity/list'
const setPromoteDetail = baseUrl + '/activity/detail'
const setSignUpPromote = baseUrl + '/activity/signUp'
// 找房-看房服务
const setPropertyReport = baseUrl + '/buildingReport/insert'
const setPropertyServiceDetail = baseUrl + '/buildingReport/visitList'
const setPropertyRegularCar = baseUrl + '/buildingReport/listCar'
// 报备记录
const getReportList = baseUrl + '/buildingReport/getList'

// 找房-获取某一楼盘动态列表 id 楼盘id
const setDynamic = baseUrl + '/userDynamic/getDynamicById'
const setDynamicDetail = baseUrl + '/buildingNews/detail'
// 找房-户型
const setHouseType = baseUrl + '/building/listModelType'
const setHouseTypeDetail = baseUrl + '/building/modelTypeDetail'
const setHouseTypeSubscribe = baseUrl + '/booking/modelType'
// 找房-楼栋
const setBuilding = baseUrl + '/building/list'
const setHouseTypeByBuilding = baseUrl + '/building/getBuildingModelType'
const setBuildingDetailCondition = baseUrl + '/building/condition'
const setBuildingDetail = baseUrl + '/building/modelList'
const setBuildingModelDetail = baseUrl + '/building/getModelDetail'
const setBuildingHistory = baseUrl + '/buildingGroup/getHistory'

// recommend
// 推荐-活动
const setRecommendData = baseUrl + '/activity/list'
// 推荐-楼盘
const setCommendList = baseUrl + '/buildingGroup/commendList'
// 推荐-新闻，POST /news/list 新闻列表, 本地新闻传cityId,精选 百科 爆料 传typeId 分别为109 110 111,不传cityId 和typeId为全部
const setNewsList = baseUrl + '/news/list'
const setNewsDetail = baseUrl + '/news/detail'

// 消息
const setInfoList = baseUrl + '/system/myMsn'
const setInfoListById = baseUrl + '/system/getMsnList'
// 获取聊天列表
const setMyList = baseUrl + '/group/getMyList'
const setMsnListById = baseUrl + '/group/getGroupMsnList'
const sendMsn = baseUrl + '/group/sendMsn'
const setMsnMemberList = baseUrl + '/group/getGroupMemberList'
const setChatMsnList = baseUrl + '/group/getChatMsnList'

// main
// 登陆接口
const setLogin = baseUrl + '/wx/oauth'
const getByAccountId = baseUrl + '/user/getByAccountId'
const updateUser = baseUrl + '/user/updateUser'
const getSharePic = baseUrl + '/account/getSharePic'

// 判断手机号码是否存在
const checkPhone = baseUrl + '/account/checkPhone'
// 图片验证码
const getImgCode = baseUrl + '/code/getCode?phone='
// 获取手机验证码
const getSmsCode = baseUrl + '/account/getSmsCode'
// 认证手机
const bindPhone = baseUrl + '/account/bindPhone'
// 更新权限
const updateUserRole = baseUrl + '/account/role'
// 购房资格
const setQualification = baseUrl + '/purchaseTest/getResult'
// 意向找房
const setIntention = baseUrl + '/searchRecord/getMyList'
const delectIntention = baseUrl + '/searchRecord/delete'
const addIntention = baseUrl + '/searchRecord/insert'
// 我的好友
const setMyFriends = baseUrl + '/friend/queryUser'
const setMyFriendsIdentity = baseUrl + '/friend/invite'
const agreeFriends = baseUrl + '/friend/operate'
// 我的奖金
const getRewardBuildings = baseUrl + '/buildingGroup/getBuildings'
const getRewardBuildingBouns = baseUrl + '/buildingGroup/getBuildingBouns'
const getRewardBuildingBounsRule = baseUrl + '/buildingGroup/getBounsRule'

// 贷款计算器
const setCalculatorMortgage = baseUrl + '/userLoan/cal'
const setGroupCalculatorMortgage = baseUrl + '/userLoan/groupCal'

// 协议相关
const setProtocol = baseUrl + '/protocol/content'
// 反馈
const setBaseInfoList = baseUrl + '/base/getList'
const addFeedback = baseUrl + '/feedback/insert'
// 操作相关
// 操作相关-收藏
const addFavorite = baseUrl + '/buildGroupFavorite/addFavorite'
const getFavorites = baseUrl + '/buildGroupFavorite/getFavorites'
// 操作相关-订阅
const addSubscribe = baseUrl + '/booking/building'
const getSubscribeList = baseUrl + '/booking/myList'
// 操作相关-点赞
const addLikes = baseUrl + '/like/addLikes'

// 网店
const getUserShop = baseUrl + '/userDynamic/getUserInfoAndDynamic'
// 楼盘推客
const setBuildingClient = baseUrl + '/shareInfo/getResult'
const getBuildingsClient = baseUrl + '/shareInfo/getBuildings'

// ali-oss上传
const getSecurityToken = baseUrl + '/aliOss/getSecurityToken?loginId=122&type=0'
const getPutOssAuthUrl = baseUrl + '/aliOss/getPutOssAuthUrl'

// 邀请分销、渠道
const confirmChannel = baseUrl + '/invite/confirmChannel'
const getChannelBuildings = baseUrl + '/invite/getChannelBuildings'
const getDistributorBuildings = baseUrl + '/invite/getDistributorBuildings'
export default {
  confirmChannel: confirmChannel,
  getChannelBuildings: getChannelBuildings,
  getDistributorBuildings: getDistributorBuildings,
  getPutOssAuthUrl: getPutOssAuthUrl,
  getSecurityToken: getSecurityToken,
  comfirmInvite: comfirmInvite,
  getSign: getSign,
  appid: appid,
  getAdsList: getAdsList,
  getCityByName: getCityByName,
  setCityList: setCityList,
  setHomeData: setHomeData,
  setHotSearch: setHotSearch,
  setLocate: setLocate,
  setMapList: setMapList,
  setRecommendData: setRecommendData,
  setCommendList: setCommendList,
  setNewsList: setNewsList,
  setNewsDetail: setNewsDetail,
  setInfoList: setInfoList,
  setInfoListById: setInfoListById,
  setLogin: setLogin,
  getByAccountId: getByAccountId,
  updateUser: updateUser,
  getSharePic: getSharePic,
  setFindHouseData: setFindHouseData,
  setFindCondition: setFindCondition,
  setPropertyDetail: setPropertyDetail,
  setPropertyDetailInfo: setPropertyDetailInfo,
  setPropertyDetailAttach: setPropertyDetailAttach,
  sendMsn: sendMsn,
  setMsnMemberList: setMsnMemberList,
  setChatMsnList: setChatMsnList,
  setMyList: setMyList,
  setMsnListById: setMsnListById,
  setGroupMsnList: setGroupMsnList,
  setPromote: setPromote,
  setPromoteDetail: setPromoteDetail,
  setSignUpPromote: setSignUpPromote,
  setPropertyReport: setPropertyReport,
  setPropertyServiceDetail: setPropertyServiceDetail,
  setPropertyRegularCar: setPropertyRegularCar,
  getReportList: getReportList,
  setDynamic: setDynamic,
  setDynamicDetail: setDynamicDetail,
  setHouseType: setHouseType,
  setHouseTypeDetail: setHouseTypeDetail,
  setHouseTypeSubscribe: setHouseTypeSubscribe,
  setBuilding: setBuilding,
  setHouseTypeByBuilding: setHouseTypeByBuilding,
  setBuildingDetailCondition: setBuildingDetailCondition,
  setBuildingDetail: setBuildingDetail,
  setBuildingModelDetail: setBuildingModelDetail,
  setBuildingHistory: setBuildingHistory,
  checkPhone: checkPhone,
  getImgCode: getImgCode,
  getSmsCode: getSmsCode,
  bindPhone: bindPhone,
  updateUserRole: updateUserRole,
  setQualification: setQualification,
  setCalculatorMortgage: setCalculatorMortgage,
  setGroupCalculatorMortgage: setGroupCalculatorMortgage,
  setIntention: setIntention,
  addIntention: addIntention,
  delectIntention: delectIntention,
  setMyFriends: setMyFriends,
  setMyFriendsIdentity: setMyFriendsIdentity,
  agreeFriends: agreeFriends,
  getRewardBuildings: getRewardBuildings,
  getRewardBuildingBouns: getRewardBuildingBouns,
  getRewardBuildingBounsRule: getRewardBuildingBounsRule,
  setProtocol: setProtocol,
  setBaseInfoList: setBaseInfoList,
  addFeedback: addFeedback,
  addFavorite: addFavorite,
  getFavorites: getFavorites,
  addSubscribe: addSubscribe,
  getSubscribeList: getSubscribeList,
  addLikes: addLikes,
  getUserShop: getUserShop,
  setBuildingClient: setBuildingClient,
  getBuildingsClient: getBuildingsClient
}
