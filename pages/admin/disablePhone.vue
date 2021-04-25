
<template>
	<view class="wrap">
		
		<view class="header">手机号不可用</view>
		
		<view class="main">
			
			<text class="content">请您拨打电话联系官方客服进行密码重置或手机号更改。</text>
			
			<view class="phone-area">
				<text class="title">官方客服电话：</text>
				<text class="phone-num" @click="phone">400-000-000</text>
			</view>
			
			<view class="loginBtn" @click="goToLoginPage">
				<text class="btnValue">已解决</text>
			</view>		
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        form:{
          phone:'',
          code:''
        }
			}
		},
		onLoad() {
      
		},
		methods: {
			phone(){
				uni.makePhoneCall({
				    phoneNumber: '400-000-000' //仅为示例
				});
			},
			/**
			 * 跳转到登录页 重新登陆
			 */
			goToLoginPage(){
				uni.redirectTo({
					url: '/pages/admin/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.wrap {
		box-sizing: border-box;
		background: #377EB4;
		width: 100vw;
		height: 100vh;
		padding:210rpx 100rpx 0;
	}
	.header {
		font-size: 60rpx;
		text-align: center;
		color:#fff;
	}
	.main{
		margin-top: 80rpx;
		font-size: 30rpx;
		color:#fff;
		.phone-area {
			margin-top: 55rpx;
			.phone-num {
				font-weight: 600;
				font-size: 33rpx;
				text-decoration: underline;
			}
		}
	}
	
	.loginBtn{
		width: 100%;
		height: 70rpx;
		background: #77B307;
		border-radius: 10rpx;
		margin-top: 65px;
		display: flex;
		justify-content: center;
		align-items: center;
		.btnValue{
			color: white;
		}
	}
	
	.bottom-part {
		margin-top: 50rpx;
		.forgot-btn{
			text-align: center;
			color: #EAF6F9;
			font-size: 26rpx;
		}
	}
	
</style>