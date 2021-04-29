<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// setTimeout(()=>{
			// 	var prinf = plus.push.getClientInfo();
			// 	var cid = prinf.clientid;
			// 	uni.showToast({
			// 	    title: cid,
			// 			icon:'none',
			// 			duration:10000
			// 	});
			// },5000)
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
	@import './common/css/font/iconfont.css';
</style>
