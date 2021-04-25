
<template>
	<view class="content">
		
		<view class="header">登录</view>
		
		<view class="form">
      <view class="inputWrapper" v-if="isFirstLogin">
				<input class="input" type="text" v-model="form.hospital" placeholder="请输入医院名称"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.jobNum" :placeholder="loginType === 'jobNum' ? '请输入工号':'请输入手机号'"/>
			</view>
			<view class="inputWrapper">
				<input class="input" type="password" v-model="form.psd" placeholder="请输入密码"/>
			</view>
			
			<view class="loginBtn" @click="goTo_home">
				<text class="btnValue">登录</text>
			</view>
			
			<view class="flex-between flex-dir-row bottom-part">
				
				<view class="phone-login-btn">
					<text @click="changeLoginType">{{ loginType === 'jobNum' ? "手机登录":"工号登录" }}</text>
				</view>
				
				<view class="forgot-btn" @click="goTo_resetPsd">
					<text>找回密码</text>
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
          hospital:'',
          jobNum:'',
          psd:''
        },
				loginType:'jobNum',
				isFirstLogin:false
			}
		},
		onLoad() {
      
		},
		methods: {
			changeLoginType(){
				if(this.loginType === "jobNum"){
					this.loginType = "phone";
				}else{
					this.loginType = "jobNum";
				}
			},
			/**
			 * 跳转到重置密码页
			 */
			goTo_resetPsd() {
				uni.navigateTo({
					url: '/pages/admin/resetPsd'
				})
			},
			/**
			 * 跳转到tab 首页 home
			 */
			goTo_home() {
				console.log(111)
				uni.switchTab({
					url: '../tabBar/home/index'
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
		padding:250rpx 100rpx 0;
	}
	.header {
		font-size: 60rpx;
		text-align: center;
		color:#fff;
	}
	.form{
		margin-top: 80rpx;
		.inputWrapper{
			width: 100%;
			height: 75rpx;
			background: white;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 0 20px;
			margin-top: 25px;
			.input{
				width: 100%;
				height: 100%;
				text-align: left;
				font-size: 15px;
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
		margin-top: 40rpx;
		padding:0 20rpx;
		.phone-login-btn {
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
		.forgot-btn{
			text-align: center;
			color: #EAF6F9;
			font-size: 28rpx;
		}
	}
	
</style>