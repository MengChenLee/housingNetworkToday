import api from './api'
import axios from 'axios'
import Vue from 'vue'

let _this = new Vue()

// const token = localStorage.getItem('token')

function get (apiName, params) {
  return new Promise(function (resolve, reject) {
    _this.indicatorOpen()
    axios.get(api[apiName], {params: params}).then(res => {
      _this.indicatorClose()
      if (res) {
        resolve(res.data)
      } else {
        resolve({code: 0, content: '', mag: '请求失败'})
      }
    }).catch(error => {
      console.log(error)
      _this.indicatorClose()
      resolve({code: 0, content: '', mag: '网络异常'})
    })
  })
}

function post (apiName, params) {
  return new Promise(function (resolve, reject) {
    _this.indicatorOpen()
    axios.post(api[apiName], params).then(res => {
      _this.indicatorClose()
      if (res) {
        resolve(res.data)
      } else {
        resolve({code: 0, content: '', mag: '请求失败'})
      }
    }).catch(error => {
      console.log(error)
      _this.indicatorClose()
      resolve({code: 0, content: '', mag: '网络异常'})
    })
  })
}

/**
 * 登陆
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setLogin (params) { return get('setLogin', params) }

/**
 * 获取用户信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getByAccountId (params) { return post('getByAccountId', params) }

/**
 * 更新用户信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function updateUser (params) { return post('updateUser', params) }

/**
 * 获取分享图片
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSharePic (params) { return post('getSharePic', params) }

/**
 * GET /wx/getSign 获取权限
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSign (params) { return get('getSign', params) }

/**
 * 邀请 员工
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function comfirmInvite (params) { return post('comfirmInvite', params) }

/**
 * 贷款计算器 广告接口
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getAdsList (params) { return post('getAdsList', params) }

/**
 * app首页搜索
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHotSearch (params) { return post('setHotSearch', params) }

/**
 * app首页获取行政区划接口
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setCityList (params) { return post('setCityList', params) }

/**
 * 获得所有地级市
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getCityByName (params) { return post('getCityByName', params) }

/**
 * 获取首页定位接口
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setLocate (params) { return post('setLocate', params) }

/**
 * 获取首页数据
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHomeData (params) { return post('setHomeData', params) }

/**
 * 获取地图找房
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMapList (params) { return post('setMapList', params) }

/**
 * 获取找房数据
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setFindHouseData (params) { return post('setFindHouseData', params) }

/**
 * 获取找房数据
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setFindCondition (params) { return post('setFindCondition', params) }

/**
 * 获取楼盘数据
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyDetail (params) { return post('setPropertyDetail', params) }

/**
 * 获取群聊列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMyList (params) { return post('setMyList', params) }

/**
 * 获取群聊信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMsnListById (params) { return post('setMsnListById', params) }

/**
 * 群聊
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setGroupMsnList (params) { return post('setGroupMsnList', params) }

/**
 * 发送聊天信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function sendMsn (params) { return post('sendMsn', params) }

/**
 * 聊天成员
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMsnMemberList (params) { return post('setMsnMemberList', params) }

/**
 * 聊天信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getQuestionMsnList (params) { return post('getQuestionMsnList', params) }

/**
 * 单聊
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setChatMsnList (params) { return post('setChatMsnList', params) }

/**
 * 获取楼盘数据-基本信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyDetailInfo (params) { return post('setPropertyDetailInfo', params) }

/**
 * 获取楼盘数据-相册
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyDetailAttach (params) { return post('setPropertyDetailAttach', params) }

/**
 * 获取楼盘数据-优惠活动列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPromote (params) { return post('setPromote', params) }

/**
 * 获取楼盘数据-优惠活动列表-优惠活动详情
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPromoteDetail (params) { return post('setPromoteDetail', params) }

/**
 * 获取楼盘数据-优惠活动列表-优惠活动详情-报名
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setSignUpPromote (params) { return post('setSignUpPromote', params) }

/**
 * 获取楼盘数据-报备
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyReport (params) { return post('setPropertyReport', params) }

/**
 * 获取看房服务
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyServiceDetail (params) { return post('setPropertyServiceDetail', params) }

/**
 * 获取看房服务-免费班车
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setPropertyRegularCar (params) { return post('setPropertyRegularCar', params) }

/**
 * 获取看房记录
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getReportList (params) { return post('getReportList', params) }

/**
 * 获取楼盘数据-楼盘动态列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setDynamic (params) { return post('setDynamic', params) }

/**
 * 获取楼盘数据-楼盘动态列表-楼盘动态详情
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setDynamicDetail (params) { return post('setDynamicDetail', params) }

/**
 * 获取楼盘数据-楼盘全部户型列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHouseType (params) { return post('setHouseType', params) }

/**
 * 获取楼盘数据-楼盘楼栋列表-户型列表
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHouseTypeByBuilding (params) { return post('setHouseTypeByBuilding', params) }

/**
 * 获取楼盘数据-楼盘户型详情
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHouseTypeDetail (params) { return post('setHouseTypeDetail', params) }

/**
 * 获取楼盘数据-楼盘户型详情-降价通知我
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setHouseTypeSubscribe (params) { return post('setHouseTypeSubscribe', params) }

/**
 * 获取楼盘数据-楼盘楼栋列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuilding (params) { return post('setBuilding', params) }

/**
 * 获取楼盘数据-楼盘楼栋详情-筛选条件
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuildingDetailCondition (params) { return post('setBuildingDetailCondition', params) }

/**
 * 足迹列表
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuildingHistory (params) { return post('setBuildingHistory', params) }

/**
 * 获取楼盘数据-楼盘楼栋详情
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuildingDetail (params) { return post('setBuildingDetail', params) }

/**
 * 获取楼盘数据-楼盘楼栋详情-销控详情
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuildingModelDetail (params) { return post('setBuildingModelDetail', params) }

/**
 * 获取推荐数据-活动
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setRecommendData (params) { return post('setRecommendData', params) }

/**
 * 获取推荐数据-楼盘
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setCommendList (params) { return post('setCommendList', params) }

/**
 * 获取推荐数据-新闻
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setNewsList (params) { return post('setNewsList', params) }

/**
 * 获取新闻详情
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setNewsDetail (params) { return post('setNewsDetail', params) }

/**
 * 获取系统消息列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setInfoList (params) { return post('setInfoList', params) }

/**
 * 通过id获取单个系统消息列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setInfoListById (params) { return post('setInfoListById', params) }

/**
 * 判断手机号码是否存在
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function checkPhone (params) { return post('checkPhone', params) }

/**
 * 获取手机验证码
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSmsCode (params) { return post('getSmsCode', params) }

/**
 * 获取手机验证码
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getImgCode (params) { return post('getImgCode', params) }

/**
 * 认证手机
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function bindPhone (params) { return post('bindPhone', params) }
/**
 * 更新权限
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function updateUserRole (params) { return post('updateUserRole', params) }

/**
 * 购房资格
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setQualification (params) { return post('setQualification', params) }

/**
 * 购房意向
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setIntention (params) { return post('setIntention', params) }

/**
 * 新增购房意向
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function addIntention (params) { return post('addIntention', params) }

/**
 * 删除购房意向
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function delectIntention (params) { return post('delectIntention', params) }

/**
 * 获得好友列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMyFriends (params) { return post('setMyFriends', params) }
/**
 * 设置好友身份
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setMyFriendsIdentity (params) { return post('setMyFriendsIdentity', params) }
/**
 * 好友统一or拒绝身份设置
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function agreeFriends (params) { return post('agreeFriends', params) }

/**
 * 我的奖励
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getRewardBuildings (params) { return post('getRewardBuildings', params) }

/**
 * 奖励详情
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getRewardBuildingBouns (params) { return post('getRewardBuildingBouns', params) }

/**
 * 奖金规则
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getRewardBuildingBounsRule (params) { return post('getRewardBuildingBounsRule', params) }

/**
 * 贷款计算器
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setCalculatorMortgage (params) { return post('setCalculatorMortgage', params) }
export function setGroupCalculatorMortgage (params) { return post('setGroupCalculatorMortgage', params) }

/**
 * 协议相关
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setProtocol (params) { return post('setProtocol', params) }

/**
 * 获取基本信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBaseInfoList (params) { return post('setBaseInfoList', params) }

/**
 * 反馈
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function addFeedback (params) { return post('addFeedback', params) }
/**
 * 添加收藏
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function addFavorite (params) { return post('addFavorite', params) }

/**
 * 获取收藏列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getFavorites (params) { return post('getFavorites', params) }

/**
 * 增加订阅
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function addSubscribe (params) { return post('addSubscribe', params) }

/**
 * 获取订阅列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSubscribeList (params) { return post('getSubscribeList', params) }

/**
 * 点赞
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function addLikes (params) { return post('addLikes', params) }

/**
 * 网店
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getUserShop (params) { return post('getUserShop', params) }

/**
 * 生成 我的推客分享信息
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function setBuildingClient (params) { return post('setBuildingClient', params) }

/**
 * 我的推客分享列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getBuildingsClient (params) { return post('getBuildingsClient', params) }

/**
 * GET /aliOss/getSecurityToken 获取上传ali储存库token
 *  @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getSecurityToken (params) { return get('getSecurityToken', params) }

/**
 * POST 上传路径/aliOss/getPutOssAuthUrl
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getPutOssAuthUrl (params) { return post('getPutOssAuthUrl', params) }

/**
 * POST 获取邀请分销楼盘列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getDistributorBuildings (params) { return post('getDistributorBuildings', params) }

/**
 * POST 获取邀请渠道楼盘列表
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function getChannelBuildings (params) { return post('getChannelBuildings', params) }

/**
 * POST 确认邀请，成为渠道商
 * @param {Object} params 请求参数
 * @returns {Promise} 返回的promise对象
 */
export function confirmChannel (params) { return post('confirmChannel', params) }
