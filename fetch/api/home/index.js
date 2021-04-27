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
    method: 'POST',
    data
  })
}

/**
 * 科室累计情况
 */
export function depatCollect(data) {
  return request({
    url: 'api/vioBatch/departmentTotalCollect',
    method: 'POST',
    data
  })
}

/**
 * 科室累计情况详情
 */
export function deptCollectDetail(data) {
  return request({
    url: 'api/vioBatch/departmentTotalCollectDetail',
    method: 'POST',
    data
  })
}
