
<template>
	<view class="content">
		
		<view class="header">重置密码</view>
		
		<view class="form">
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.phone" placeholder="请输入手机号"/>
			</view>	
      <view class="inputWrapper code-part">
				<input class="input code-input" type="text" v-model="form.code" placeholder="验证码"/>
				<view class="code-btn">获取验证码</view>
			</view>
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.psd" placeholder="请输入新密码"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="form.confirmPsd" placeholder="请输入再次密码"/>
			</view>
			
			<view class="loginBtn">
				<text class="btnValue">确认并登录</text>
			</view>
			
			<view class="flex-end flex-dir-row bottom-part">	
				
				<view class="forgot-btn" @click="goToDisablePhonePage">
					<text>手机号不可用？</text>
				</view>
				
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
          code:'',
          psd:'',
					confirmPsd:''
        }
			}
		},
		onLoad() {
      
		},
		methods: {
			/**
			 * 跳转到手机不可用页 打电话解决问题后重新登录
			 */
			goToDisablePhonePage(){
				uni.navigateTo({
					url: '/pages/admin/disablePhone'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.content {
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
	.form{
		margin-top: 80rpx;
		.inputWrapper{
			position: relative;
			width: 100%;
			height: 75rpx;
			background: white;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 0 20px;
			margin-top: 25px;
			&.code-part {
				padding-right: 180rpx;
			}
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
			}
			.code-btn {
				position: absolute;
				right:20rpx;
				top:10rpx;
				height:55rpx;
				line-height: 55rpx;
				width:160rpx;
				text-align: center;
				background-color: #1CAFF9;
				color:#fff;
				font-size: 27rpx;
				border-radius: 10rpx;
			}
		}
	}
	
	.loginBtn{
		width: 100%;
		height: 75rpx;
		background: #77B307;
		border-radius: 50rpx;
		margin-top: 40px;
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