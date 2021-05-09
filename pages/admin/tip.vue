<template>
	<view class="wrap">
		<view class="main">
			<view class="header">温馨提示</view>
			<view class="content">
				<text class="row">欢迎使用医疗行为移动智能监管App！</text>
				<text class="row">在您使用时，需要连接数据网络或者WLAN网络，产生的流量费用请咨询当地运营商。</text>
				<text class="row">在您使用本App前，请认真阅读《 <text class="agreement">用户服务协议</text> 》全部条款，您同意并接受全部条款后再开始使用我们的服务.</text>
				
			</view>
		</view>
		
		<view class="flex-center flex-dir-row btn-part">
			<view class="no-agree-btn" @click="logoutApp">不同意并退出</view>
			<view class="agree-btn" @click="goToLogin">同意</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			/**
			 * 退出登录
			 */
			logoutApp(){
				// #ifdef APP-PLUS  
				plus.runtime.quit();  
				// #endif
			},
			/**
			 * 跳转到登录页
			 */
			goToLogin(){
				this.$uniPromiseMethods.setStorageSync('isFirstLogin','no').then(StorageRes=>{
					uni.redirectTo({
						url: '/pages/admin/login'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding:250rpx 110rpx 30rpx;
	}
	.main {
		.header {
			font-size: 37rpx;
			text-align: center;
			margin-bottom: 35rpx;
		}
		.content {
			color:rgb(136, 136, 136);
			font-size: 30rpx;
			.row {
				text-indent: 25rpx;
				display: block;
				padding:8rpx 0;
			}
			.agreement {
				color:#0086AB;
			}
		}
	}
	
	.btn-part {
		margin-top:100rpx;
		.no-agree-btn {
			padding:10rpx 0;
			min-width:200rpx;
			background-color: rgb(97, 130, 116);
			box-shadow: 0 6px 6px #888888;
			color: rgb(255, 255, 255);
			border-radius: 10rpx;
			font-size: 28rpx;
			text-align: center;
			margin-right:40rpx;
		}
		.agree-btn {
			padding:10rpx 0;
			width:200rpx;
			background-color: rgb(86, 119, 252);
			box-shadow: 0 6px 6px #888888;
			color: rgb(255, 255, 255);
			border-radius: 10rpx;
			font-size: 28rpx;
			text-align: center;
		}
	}
</style>
