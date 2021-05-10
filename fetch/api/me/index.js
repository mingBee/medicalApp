import request from '@/fetch/fetch.js'
// import request from '@/fetch/axios.js'
/**
 * 重置密码
 * oldPassword=888888&newPassword=666666&confirmPassword=666666
 * @param {Object} data
 */
export function resetPwd(data) {
  return request({
    url: 'api/app/resetPwd',
    method: 'POST',
    data
  })
}
/**
 * 个人资料
 * @param {Object} data
 */
export function personInfo(data) {
  return request({
    url: 'api/user/personInfo',
    method: 'GET',
    data
  })
}

/**
 * 意见反馈
 * userId=1&qDesc=不好用&qCont=15888888888
 * @param {Object} data
 */
export function addOpinion(data) {
  return request({
    url: 'api/question/addOpinion',
    method: 'POST',
    data
  })
}
