import request from '@/fetch/fetch.js'
// import request from '@/fetch/axios.js'
/**
 * 重置密码
 * oldPassword=888888&newPassword=666666&confirmPassword=666666
 * @param {Object} data
 */
export function resetPwd(data) {
  return request({
    url: 'system/user/profile/resetPwd',
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

