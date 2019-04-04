
const state = {
  user: {
    'id': 0,
    'phone': '',
    'userName': '',
    'avatar': '',
    'loginToken': '',
    'type': 0,
    'authenticationFlag': 0
    // 'id': 81,
    // 'phone': '',
    // 'userName': '梦辰',
    // 'avatar': 'http://thirdwx.qlogo.cn/mmopen/vi_32/aiaJNBib164qhShTnAKEefeDDRVDAOH4cekHxr42iawCLDDQbwRC9fLF91W5c8ibre5oJLRPECZncvx2SBf82kic77w/132', // http://img.jrfw360.com/upload-file1553651372308
    // 'loginToken': 'f325ff35d50fc9ca60fc7e1a4b948d986236f502'
  }
}
try {
  const user = localStorage.getItem('user')
  user && (state.user = JSON.parse(user))
} catch (error) {

}

// getters
const getters = {
  // location: state => state
}

// actions
const actions = {

}

// mutations
const mutations = {
  setUser (state, status) {
    localStorage.setItem('user', JSON.stringify(status))
    state.user = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
