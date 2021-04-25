//把配置项单独处理

// import store from '/store/index.js'; //vuex  
let server_url = '';//请求地址 http://qianye1234.imwork.net/
let Cookie = 'JSESSIONID=88f7184a-7177-4759-8cef-6b0cf618b559; rememberMe=eq8SimThTaSKKs/fC6/Wwypqa6fg2Ll8sxuzbiwKHyV2LteRZASTHk0P6QmBjyLJuzSUnr+El/AYG+1KoBne9GqZAwWGPM+lqq/IX781x+E5JC48HxU5l7BlkmaPdfbzcqGhICqZ+vcQyHGIlg5/fXnaM2s0i94HIIb7Fzu96IzMKSkNga4ivENq1jVkXSBpv5dVOHR5h5hr8/xblcxM+i9rRM/+Kv8KSSTZN5r1n0KS1479U5jGlo2IRNqDcNWU3W+trzYL8RCNgBU7HCwl/qu9s8t6m9pPSVLAsKxUkVO+qjSPgSdBjY6hyKEMbFOI75IE5jdUCbk8wfO4/PyFU/NKyMo5goTskmvOLyqSd2ZbASpWmKkoR1J/QmYMWmO51+6t0hFcqo2X7A4T8Yl2AlLq2WBmjXQ2XiPsfypSqxMjwsUDkH1sH+X0fne+HRWBaDqCmJYk5BqvCIEHctmQlAwGxY869gfNM49qlLSdUpG+/WjNoTiWmKzVmL2rCKkuAvw+ybPPHtuJX17O3gPwmRfPf44EiyzDeBWEYI3WVONv9rda08Tq781ur24OzKfAC8tIJUpZIPs4C/0H0vLXQnkFtfPjQc5YkZMwhDA4PwDb0cVwVyb7bcPxRiZOrQ2Q5kxJXti8mCYFJ0dF3xNlH2DXClV4fINm58NU6vgfjx4SLVE9I1zmINyBTZXcEOmq39nXb3OZ8mz8TmVDo4337GqPwWHcLG6IDBFzBvxwH4NjYPmyUFuVzq625ZTjMe8vT6tS/8RL4QahVBl1ebtTGa4YN0kg2Cn4V/LkwcvPdqRn6hh+QMvyCRWXacs5zno3/ZlYcjhRAyDKY4GsFwV/r+7tBUxLh4aDFBil1Zrln+43Z7afUJ7FjWDx22MrqTnyhqFwV2c5ynesJZoIEJeXvx9sAPB43YW9P6khiKoVnaoCt1rc1uvn6PomyoZdG05ClwFLjFwI0peXqx1kxEpd0yHHuu4lHY5vTB2RcDXc+LSVy+fDX66XzcC81opbR+enwD6BF7X0+K30heUHcXVMJWW3s1eUFawYDGzxj4AS+9m4J8dws82hfBgZhCbk+89XnHJRYyRXSbF8Fy2fWl/PPMIceKhJGH1JIY9P3gQpzp4ZEmCyFlNPdrfcxct2g1kWmt0AdFRuBShbW85mBtRWuX99v/5oUjIUA4lhd4uZie3qk9/jEbS2hC3RBO2ahaom7mVHA3XVIrPhAQ3gq0H1Q0pqDaE5FnK+4uxfrrPXv4aKJKRDiRk6GWII2JKZObAR7eMqo+vt5TLoSwMK6ADlFSVMtzrK0w7pLzt4p3JmualgiwRi97Q/9o3FRpbTuNLer1KuMaEzB3feGb3KglSfwSal0USETDyzaYkfTzM2o1AgYc/wbA+wBT5+dEnny/lsCwUlqE7L/kVQthWnydAEAPpgFgKyK/+/+GgiCkXj7/r72B4rkQL3oorPLUZEnLzWk2Hw0dBgnvCrObcZ4c96nloZr7NtjJ9+PDbb6aqfthrEVmDY0Ad25eyk4wT/xNdCVJPnh/Y8sKX/nsfwOXX+tJwxbwHpnP91SlE+SlzeuUYSsrHs1A0h3hv2ZLMbgimC46tdNdiLnhfEDSONjSNk1HdH2vlXJ4gJzhLuHOznA5JLWdY9GbQqgq/CxETKZTMOokqXRfBvKXhRF83aMO/QfTxhip8spX3qsPHMvpDOrfE9Fz+gpd27zv8HfU5sH33500d94s+7HQvPfZaV2QA4tcIfSBhv5tuly/aPGKWALtwCV0TffNZSoY2ypX/2J8193TXTbHZsnrv9rAD6dld5hfesorz6vCb2coY5DsrIKCTqu8zfUmtlJw4kX0m4vxkqa+uxBaat4JrZddaeha65tR1JcF9iotZ+zMxgnpdzqwOTpMPDS0TPR30fD/ZCqKZxMQDrg2uDU172GfavBKHL1yuyIoVh3Ui89Oleeui3hFpAUhsOWfLyjx958R1m+NB910+X';  //凭证
// process.env.NODE_ENV === 'development' ? '192.168.0.1' : 'http://***/api' ; //环境配置
function fetch(options = {}) {
  //  store.state.token && (token = store.state.token); //从vuex中获取登录凭证
  options.url = `${server_url}${options.url}`;
  //配置请求头
  options.header = {
    'content-type': 'application/x-www-form-urlencoded',
    'Cookie': `${Cookie}` //Bearer 
  };

  return new Promise((resolved, rejected) => {
    //成功
    options.success = (res) => {

      if (Number(res.data.code) == 0) {  //请求成功
        resolved(res.data.data);
      } else {
        uni.showToast({
          icon: 'none',
          duration: 3000,
          title: `${res.data.msg}`
        });
        rejected(res.data.msg);//错误
      }

    }
    //错误
    options.fail = (err) => {
      rejected(err); //错误
    }
    uni.request(options);

  });
}
export default fetch;