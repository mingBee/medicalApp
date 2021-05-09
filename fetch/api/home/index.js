import request from '@/fetch/fetch.js'
/**
 * 首页饼状图，申诉与未申诉显示，截至日期显示
 */
export function getDetail(data) {
  return request({
    url: 'api/vioBatch/endTimeShow',
    method: 'GET',
    data
  })
}
/**
 * 个人累计情况
 * 
 */
export function personCollect(data) {
  return request({
    url: 'api/vioBatch/personAppealCollect',
    method: 'GET',
    data
  })
}

/**
 * 科室累计情况
 */
export function depatCollect(data) {
  return request({
    url: 'api/vioBatch/departmentTotalCollect',
    method: 'GET',
    data
  })
}

/**
 * 科室累计情况详情
 */
export function deptCollectDetail(data) {
  return request({
    url: 'api/vioBatch/departmentTotalCollectDetail',
    method: 'GET',
    data
  })
}

/**
 * 获取历史批次列表
 * hosId=100
 * userId=101
 * offset=0
 * limit=10
 */
export function getHistoryList(data) {
  return request({
    url: 'api/vioBatch/personAppealCollectRecord',
    method: 'GET',
    data
  })
}

/**
 * 获取历史批次详情
 * hosId=100&userId=101&batchId=839445923095375872&offset=0&limit=10
 */
export function getHistoryDetail(data) {
  return request({
    url: 'api/vioBatch/personAppealCollectDetail',
    method: 'GET',
    data
  })
}

/**
 * 获取轮播图列表
 */
export function getAllAdInfos(data={}) {
  return request({
    url: 'api/adInfo/getAllAdInfos',
    method: 'GET',
    data
  })
}

