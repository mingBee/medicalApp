//把配置项单独处理

// import store from '/store/index.js'; //vuex  
let server_url = 'http://qianye1234.imwork.net/';//请求地址   http://qianye1234.imwork.net/    172.16.52.43:8090/
//#ifdef APP-PLUS
  //server_url = 'http://qianye1234.imwork.net/'
//#endif
// process.env.NODE_ENV === 'development' ? '192.168.0.1' : 'http://***/api' ; //环境配置
function fetch(options = {}) {
	let token;
	try {
		token = uni.getStorageSync('token'); //从vuex中获取登录凭证
	} catch (e) {
		console.log("接口提取token报错了");
	}
	let baseHeader={};
	baseHeader.Token = token;
  options.url = `${server_url}${options.url}`;
  //配置请求头
	options.header = Object.assign(baseHeader,{
    'content-type': 'application/x-www-form-urlencoded'
  },options.header)

  return new Promise((resolved, rejected) => {
    //成功
    options.success = (res) => {
		
      if (Number(res.data.code) == 0) {  //请求成功
        resolved(res.data.data);
      } else if(Number(res.data.code) == 401){
				const isFirstLogin = uni.getStorageSync('isFirstLogin');
				if(isFirstLogin ==='no'){
					uni.showToast({
						icon: 'none',
						duration: 1500,
						title: '登录凭证过期，需重新登录'
					});
					setTimeout(()=>{
						uni.reLaunch({
							url: '/pages/admin/login'
						})
					},1500)
				}
			}else{
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.data.message || res.data.msg}`
				});
				rejected(res.data.message);//错误
      }
    }
    //错误
    options.fail = (err) => {
			if(err && err.errMsg === "request:fail"){
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: '服务器开小差，请稍后尝试'
				});
			}
      rejected(err); //错误
    }
    uni.request(options);

  });
}
export default fetch;