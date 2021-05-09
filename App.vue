<script>
	import { tokenIsExpire } from "@/fetch/api/admin/index.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//#ifdef APP-PLUS

			//#endif
			//判断登陆状态
			const token = uni.getStorageSync('token');
			const isFirstLogin = uni.getStorageSync('isFirstLogin');
			
			if(token) { // 有登陆状态
				
				tokenIsExpire().then(res=>{ //交验token是否有效
					if(res){
						plus.navigator.closeSplashscreen();
					}else{
						uni.reLaunch({
							url: '/pages/admin/login',
							success() {
									// 手动关闭启动页(由于App.onLaunch方法和页面渲染是同时进行的，只有通过延长启动页的方法才能避免页面闪烁)
									plus.navigator.closeSplashscreen()
							}
						})
					}
				})
			}else { // 未登陆
				if(isFirstLogin ==='no'){
					uni.reLaunch({
						url: '/pages/admin/login',
						success() {
								// 手动关闭启动页(由于App.onLaunch方法和页面渲染是同时进行的，只有通过延长启动页的方法才能避免页面闪烁)
								plus.navigator.closeSplashscreen()
						}
					})
				}else{
					uni.reLaunch({
						url: '/pages/admin/tip',
						success() {
								// 手动关闭启动页(由于App.onLaunch方法和页面渲染是同时进行的，只有通过延长启动页的方法才能避免页面闪烁)
								plus.navigator.closeSplashscreen()
						}
					})
				}    
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/css/flex.css';
</style>
