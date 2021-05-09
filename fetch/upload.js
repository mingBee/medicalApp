//把配置项单独处理

// import store from '/store/index.js'; //vuex  
let server_url = 'http://qianye1234.imwork.net/';//请求地址 http://qianye1234.imwork.net/
// process.env.NODE_ENV === 'development' ? '192.168.0.1' : 'http://***/api' ; //环境配置
function upload(options = {}) {
  //  store.state.token && (token = store.state.token); //从vuex中获取登录凭证
  options.url = `${server_url}${options.url}`;
  //配置请求头
	let token;
	try {
		token = uni.getStorageSync('token'); //从vuex中获取登录凭证
	} catch (e) {
		console.log("接口提取token报错了");
	}
	let baseHeader={};
	if(token){
		baseHeader.Token = token;
	}else{
		uni.reLaunch({
			url: '/pages/admin/login'
		})
	}
	options.header = Object.assign(baseHeader,options.header);
  return new Promise((resolved, rejected) => {
    //成功
    options.success = (res) => {
		let data = JSON.parse(res.data);
      if (Number(data.code) == 0) {  //请求成功
        resolved(data.data);
      } else {
        uni.showToast({
          icon: 'none',
          duration: 3000,
          title: `${data.msg}`
        });
        rejected(data.msg);//错误
      }

    }
    //错误
    options.fail = (err) => {
      rejected(err); //错误
    }
    uni.uploadFile(options);

  });
}
export default upload;