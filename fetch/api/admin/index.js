import request from '@/fetch/fetch.js'
// import request from '@/fetch/axios.js'

export function getAllHosp(data) {
  return request({
    url: 'api/hosInfo/getAllHos',
    method: 'GET',
    data
  })
}

export function login(data) {
  return request({
    url: 'jwt/login',
    method: 'POST',
    data
  })
}

export function verifyCode(phoneNum) {
  return request({
    url: `api/verify-code/generate/${phoneNum}`,
    method: 'GET',
  })
}

/**
 * 忘记密码
 * @param {Object} phoneNum
 */
export function forgetPassword(data) {
  return request({
    url: 'api/app/forgetPassword',
    method: 'POST',
		data
  })
}
/**
 * 重置密码
 * @param {Object} data
 * verifyCode=348853
 * phonenumber=18211111111
 * newPassword=888888
 */
export function resetPassword(data) {
  return request({
    url: 'api/app/resetPassword',
    method: 'POST',
		data
  })
}

/**
 * 重置密码
 * @param {Object} data
 * phonenumber=18211111111
 * newPassword=888888
 */
export function updatePassword(data) {
  return request({
    url: 'api/app/updatePass',
    method: 'POST',
		data
  })
}

/**
 * 获取用户信息
 * @param {Object} data
 */
export function getUserInfo(data) {
  return request({
    url: 'api/user/personInfo',
    method: 'GET',
		data
  })
}