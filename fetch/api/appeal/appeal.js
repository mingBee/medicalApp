import request from '@/fetch/fetch.js'
import upload from '@/fetch/upload.js'
// import request from '@/fetch/axios.js'

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
    url: 'api/common/upload',
    files
  })
}

// const api = require("./api.js");
// import Vue from 'vue';

// // 获取登陆验证码
// export const userRegister = (params) => {
//     console.log("请求Vue:",Vue)
//     return Vue.prototype.$axios.post(
//         api.REGISTERVERIFICATIONCODE,
//         params
//     )
// }