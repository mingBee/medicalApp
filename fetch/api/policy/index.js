import request from '@/fetch/fetch.js'
/**
 * 获取政策列表（刷新）
 * cmsTitle=印&offset=0&limit=10
 * @param {Object} data
 */
export function getPolicyList(data) {
  return request({
    url: 'api/cmsInfo/policyList',
    method: 'GET',
    data
  })
}

export function saveAppealInfo(data) {
  return request({
    url: 'api/vioFeedback/saveAppealInfo',
    method: 'POST',
    data
  })
}
