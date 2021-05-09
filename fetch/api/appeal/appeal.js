import request from '@/fetch/fetch.js'
import upload from '@/fetch/upload.js'

export function getAppealList(data) {
  return request({
    url: 'api/vioFeedback/getAppealList',
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

export function imgUpload(files) {
  return upload({
    url: 'common/upload',
    files
  })
}
