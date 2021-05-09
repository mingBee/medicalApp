
<template>
	<view class="content">
		
		<view class="header">忘记密码</view>
		
		<view class="form">
			
			<view class="inputWrapper">
				<input class="input" type="text" v-model="form.phone" placeholder="请输入手机号"/>
			</view>	
      <view class="inputWrapper code-part">
				<input class="input code-input" type="text" v-model="form.code" placeholder="验证码"/>
				<view class="code-btn" @click="verifyCode">获取验证码</view>
			</view>
			
			<view class="loginBtn" @click="forgetPassword">
				<text class="btnValue">修改密码</text>
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
	import { verifyCode, forgetPassword } from "@/fetch/api/admin/index.js"
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
			/**
			 * 接收验证码
			 */
			verifyCode(){
				if( !this.form.phone ){
					uni.showToast({
					    title: '请先填写手机号',
							icon:'none'
					});
					return
				}
				verifyCode(this.form.phone).then(res=>{
					uni.showToast({
					    title: '验证码发送成功',
							icon:'none'
					});
					this.form.code = res;
				})
			},
			//忘记密码
			forgetPassword(){
				if( !this.form.phone ){
					uni.showToast({
					    title: '请先填写手机号',
							icon:'none'
					});
					return
				}
				if( !this.form.code ){
					uni.showToast({
					    title: '请先填写验证码',
							icon:'none'
					});
					return
				}
				let params = {
					verifyCode:this.form.code,
					phonenumber:this.form.phone
				};
				forgetPassword(params).then(res=>{
					uni.redirectTo({
						url: `/pages/admin/newPsd?phone=${this.form.phone}`
					})
				})
			},

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