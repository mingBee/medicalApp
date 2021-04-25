import request from '@/fetch/fetch.js'

export function getAppealList(data) {
  return request({
    url: 'vioFeedback/getAppealList',
    method: 'GET',
    data
  })
}